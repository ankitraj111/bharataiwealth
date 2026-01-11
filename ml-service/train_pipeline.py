import os
import datetime
import joblib
import pandas as pd
import numpy as np
import json
from sklearn.ensemble import RandomForestRegressor
from xgboost import XGBRegressor
from sklearn.metrics import mean_squared_error, mean_absolute_error
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout
from tensorflow.keras.callbacks import EarlyStopping
import shutil

class TrainPipeline:
    def __init__(self, data_dir="data/clean", models_dir="models", archive_dir="models/archive"):
        self.data_dir = data_dir
        self.models_dir = models_dir
        self.archive_dir = archive_dir
        
        # Ensure directories exist
        for d in [self.models_dir, self.archive_dir]:
            os.makedirs(d, exist_ok=True)

    def load_data(self, symbol: str) -> pd.DataFrame:
        """Load cleaned parquet data."""
        path = os.path.join(self.data_dir, f"{symbol}.parquet")
        if not os.path.exists(path):
            raise FileNotFoundError(f"Clean data not found for {symbol} at {path}")
        return pd.read_parquet(path)

    def evaluate(self, y_true, y_pred, name="Model"):
        """Calculate and log evaluation metrics."""
        rmse = np.sqrt(mean_squared_error(y_true, y_pred))
        mae = mean_absolute_error(y_true, y_pred)
        
        # Directional Accuracy (Up vs Down)
        # Assuming we are predicting absolute price, we compare change from previous known price
        # For simplicity, if y_pred[i] > y_true[i-1] and y_true[i] > y_true[i-1], it's a correct direction
        # But we need the previous prices. 
        # A simpler way if we don't have prev prices in y_true subset: compare sign of change if available.
        # Let's just track if (y_pred > threshold) matches (y_true > threshold) if we had a baseline.
        # Since we might not have the previous price easily here, we'll skip DA for now or use a simple shift.
        
        mape = np.mean(np.abs((y_true - y_pred) / y_true)) * 100
        
        print(f"--- {name} Metrics ---")
        print(f"RMSE: {rmse:.4f}")
        print(f"MAE: {mae:.4f}")
        print(f"MAPE: {mape:.2f}%")
        
        return {"rmse": rmse, "mae": mae, "mape": mape}

    def archive_model(self, model_name, risk_level, symbol, is_keras=False):
        """Move current model to archive with timestamp."""
        timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
        ext = ".h5" if is_keras else ".pkl"
        src = os.path.join(self.models_dir, model_name)
        
        if os.path.exists(src):
            archive_name = f"{risk_level}-{symbol}-{timestamp}{ext}"
            dst = os.path.join(self.archive_dir, archive_name)
            shutil.copy2(src, dst)
            print(f"Archived {model_name} as {archive_name}")

    def get_best_params(self, risk):
        """Retrieve best parameters from meta directory if they exist."""
        path = os.path.join("models/meta", f"{risk}.json")
        if os.path.exists(path):
            with open(path, 'r') as f:
                meta = json.load(f)
                print(f"Using tuned parameters for {risk}: {meta['best_params']}")
                return meta['best_params']
        return None

    def train_low_risk(self, X_train, y_train, X_val, y_val, symbol):
        """Train RandomForest for Low Risk."""
        print(f"Training Low Risk Model for {symbol}...")
        
        params = self.get_best_params("low")
        if not params:
            params = {'n_estimators': 300, 'max_depth': 10, 'random_state': 42}
            
        model = RandomForestRegressor(**params)
        model.fit(X_train.select_dtypes(include=[np.number]), y_train)
        
        # Evaluate
        preds = model.predict(X_val.select_dtypes(include=[np.number]))
        self.evaluate(y_val, preds, "RandomForest (Low)")
        
        # Archive & Save
        self.archive_model("low.pkl", "low", symbol)
        joblib.dump(model, os.path.join(self.models_dir, "low.pkl"))
        print("Model saved to models/low.pkl")

    def train_mid_risk(self, X_train, y_train, X_val, y_val, symbol):
        """Train XGBoost for Medium Risk."""
        print(f"Training Medium Risk Model for {symbol}...")
        
        params = self.get_best_params("medium")
        if not params:
            params = {
                'objective': "reg:squarederror",
                'max_depth': 6,
                'n_estimators': 400,
                'learning_rate': 0.1,
                'random_state': 42
            }
            
        model = XGBRegressor(**params)
        model.fit(X_train.select_dtypes(include=[np.number]), y_train)
        
        # Evaluate
        preds = model.predict(X_val.select_dtypes(include=[np.number]))
        self.evaluate(y_val, preds, "XGBoost (Mid)")
        
        # Archive & Save
        self.archive_model("mid.pkl", "mid", symbol)
        joblib.dump(model, os.path.join(self.models_dir, "mid.pkl"))
        print("Model saved to models/mid.pkl")

    def train_high_risk(self, X_train, y_train, X_val, y_val, symbol):
        """Train LSTM for High Risk."""
        print(f"Training High Risk Model (LSTM) for {symbol}...")
        
        # Reshape for LSTM: [samples, time_steps, features]
        # For simplicity, we assume the feature pipeline provided sliding windows 
        # or we just treat the features as a single time step of many features here.
        # Real LSTM needs [batch, windows, features]. 
        # Requirement says "Train using sliding windows". 
        # We need to transform the data here.
        
        def create_windows(X, y, window=60):
            X_win, y_win = [], []
            for i in range(window, len(X)):
                X_win.append(X[i-window:i])
                y_win.append(y[i])
            return np.array(X_win), np.array(y_win)

        window_size = 60
        X_train_num = X_train.select_dtypes(include=[np.number]).values
        X_val_num = X_val.select_dtypes(include=[np.number]).values
        
        if len(X_train_num) <= window_size:
            print("Not enough data for LSTM sliding windows, skipping training.")
            return

        X_train_win, y_train_win = create_windows(X_train_num, y_train.values, window_size)
        X_val_win, y_val_win = create_windows(X_val_num, y_val.values, window_size)

        params = self.get_best_params("high")
        
        if params:
            model = Sequential()
            n_layers = params.get('n_layers', 2)
            units = params.get('units', 64)
            dropout = params.get('dropout', 0.2)
            lr = params.get('lr', 0.001)
            batch_size = params.get('batch_size', 32)
            
            for i in range(n_layers):
                is_last = (i == n_layers - 1)
                model.add(LSTM(units, return_sequences=not is_last, input_shape=(window_size, X_train_num.shape[1])))
                model.add(Dropout(dropout))
            model.add(Dense(1))
            optimizer = tf.keras.optimizers.Adam(learning_rate=lr)
        else:
            # Default model architecture
            model = Sequential([
                LSTM(64, return_sequences=True, input_shape=(window_size, X_train_num.shape[1])),
                Dropout(0.2),
                LSTM(32),
                Dropout(0.2),
                Dense(1)
            ])
            batch_size = 32
            optimizer = 'adam'

        model.compile(optimizer=optimizer, loss='mean_squared_error')
        early_stop = EarlyStopping(monitor='val_loss', patience=5, restore_best_weights=True)
        
        model.fit(
            X_train_win, y_train_win,
            validation_data=(X_val_win, y_val_win),
            epochs=20,
            batch_size=batch_size,
            callbacks=[early_stop],
            verbose=0
        )
        
        # Evaluate
        preds = model.predict(X_val_win).flatten()
        self.evaluate(y_val_win, preds, "LSTM (High)")
        
        # Archive & Save
        self.archive_model("high_lstm.h5", "high", symbol, is_keras=True)
        model.save(os.path.join(self.models_dir, "high_lstm.h5"))
        print("Model saved to models/high_lstm.h5")

    def run_full_retraining(self, symbol: str):
        """Orchestrate retraining for all tiers."""
        try:
            from feature_pipeline import FeaturePipeline
            fp = FeaturePipeline()
            # We use target_type="price" for these regressions 
            data = fp.process_symbol(symbol)
            
            if not data:
                print(f"Failed to process {symbol}")
                return

            X_train, X_val = data["X_train"], data["X_val"]
            y_train, y_val = data["y_train"], data["y_val"]

            self.train_low_risk(X_train, y_train, X_val, y_val, symbol)
            self.train_mid_risk(X_train, y_train, X_val, y_val, symbol)
            self.train_high_risk(X_train, y_train, X_val, y_val, symbol)
            
            print(f"Retraining complete for {symbol}")
        except Exception as e:
            print(f"Retraining failed for {symbol}: {e}")
            import traceback
            traceback.print_exc()

if __name__ == "__main__":
    pipeline = TrainPipeline()
    # Process a major symbol for training
    pipeline.run_full_retraining("RELIANCE")
