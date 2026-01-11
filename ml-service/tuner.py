import optuna
import os
import json
import joblib
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from xgboost import XGBRegressor
from sklearn.metrics import mean_squared_error
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout
from tensorflow.keras.optimizers import Adam
from feature_pipeline import FeaturePipeline
import datetime

class MLTuner:
    def __init__(self, data_dir="data/clean", meta_dir="models/meta", models_dir="models"):
        self.data_dir = data_dir
        self.meta_dir = meta_dir
        self.models_dir = models_dir
        self.fp = FeaturePipeline()
        
        os.makedirs(self.meta_dir, exist_ok=True)
        os.makedirs(self.models_dir, exist_ok=True)

    def load_data(self, symbol: str):
        data = self.fp.process_symbol(symbol)
        if not data:
            raise ValueError(f"Could not process data for {symbol}")
        return data

    def save_best_params(self, risk, params, score):
        path = os.path.join(self.meta_dir, f"{risk}.json")
        meta = {
            "best_params": params,
            "best_rmse": float(score),
            "updated_at": datetime.datetime.now().isoformat()
        }
        with open(path, 'w') as f:
            json.dump(meta, f, indent=4)
        print(f"Saved best params for {risk} to {path}")

    def tune_low_risk(self, X_train, y_train, X_val, y_val, n_trials=50):
        print("Tuning Low Risk (Random Forest)...")
        X_train_num = X_train.select_dtypes(include=[np.number])
        X_val_num = X_val.select_dtypes(include=[np.number])

        def objective(trial):
            params = {
                'n_estimators': trial.suggest_int('n_estimators', 200, 800),
                'max_depth': trial.suggest_int('max_depth', 5, 25),
                'min_samples_split': trial.suggest_int('min_samples_split', 2, 8),
                'random_state': 42
            }
            model = RandomForestRegressor(**params)
            model.fit(X_train_num, y_train)
            preds = model.predict(X_val_num)
            return np.sqrt(mean_squared_error(y_val, preds))

        study = optuna.create_study(direction='minimize')
        study.optimize(objective, n_trials=n_trials, n_jobs=-1)
        
        print(f"Best trial: {study.best_trial.value}")
        self.save_best_params("low", study.best_params, study.best_trial.value)
        return study.best_params

    def tune_medium_risk(self, X_train, y_train, X_val, y_val, n_trials=50):
        print("Tuning Medium Risk (XGBoost)...")
        X_train_num = X_train.select_dtypes(include=[np.number])
        X_val_num = X_val.select_dtypes(include=[np.number])

        def objective(trial):
            params = {
                'learning_rate': trial.suggest_float('learning_rate', 0.01, 0.3, log=True),
                'max_depth': trial.suggest_int('max_depth', 4, 10),
                'n_estimators': trial.suggest_int('n_estimators', 200, 600),
                'subsample': trial.suggest_float('subsample', 0.5, 1.0),
                'colsample_bytree': trial.suggest_float('colsample_bytree', 0.5, 1.0),
                'objective': 'reg:squarederror',
                'random_state': 42
            }
            model = XGBRegressor(**params)
            model.fit(X_train_num, y_train)
            preds = model.predict(X_val_num)
            return np.sqrt(mean_squared_error(y_val, preds))

        study = optuna.create_study(direction='minimize')
        study.optimize(objective, n_trials=n_trials, n_jobs=-1)
        
        print(f"Best trial: {study.best_trial.value}")
        self.save_best_params("medium", study.best_params, study.best_trial.value)
        return study.best_params

    def tune_high_risk(self, X_train, y_train, X_val, y_val, n_trials=20):
        print("Tuning High Risk (LSTM)...")
        
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
            print("Not enough data for LSTM tuning.")
            return {}

        X_train_win, y_train_win = create_windows(X_train_num, y_train.values, window_size)
        X_val_win, y_val_win = create_windows(X_val_num, y_val.values, window_size)

        def objective(trial):
            n_layers = trial.suggest_int('n_layers', 1, 3)
            units = trial.suggest_int('units', 32, 128)
            dropout = trial.suggest_float('dropout', 0.0, 0.4)
            lr = trial.suggest_float('lr', 1e-5, 1e-2, log=True)
            batch_size = trial.suggest_categorical('batch_size', [16, 32, 64, 128])

            model = Sequential()
            for i in range(n_layers):
                is_last = (i == n_layers - 1)
                model.add(LSTM(units, return_sequences=not is_last, input_shape=(window_size, X_train_num.shape[1])))
                model.add(Dropout(dropout))
            
            model.add(Dense(1))
            model.compile(optimizer=Adam(learning_rate=lr), loss='mean_squared_error')
            
            # Use small epochs for tuning speed
            history = model.fit(
                X_train_win, y_train_win,
                validation_data=(X_val_win, y_val_win),
                epochs=5, 
                batch_size=batch_size,
                verbose=0
            )
            
            val_loss = history.history['val_loss'][-1]
            return np.sqrt(val_loss)

        study = optuna.create_study(direction='minimize')
        study.optimize(objective, n_trials=n_trials) # N_jobs=1 for GPU/Tensorflow safety
        
        print(f"Best trial (LSTM): {study.best_trial.value}")
        self.save_best_params("high", study.best_params, study.best_trial.value)
        return study.best_params

    def run_all_tuning(self, symbol="RELIANCE"):
        try:
            data = self.load_data(symbol)
            X_train, X_val = data["X_train"], data["X_val"]
            y_train, y_val = data["y_train"], data["y_val"]
            
            self.tune_low_risk(X_train, y_train, X_val, y_val, n_trials=10)
            self.tune_medium_risk(X_train, y_train, X_val, y_val, n_trials=10)
            self.tune_high_risk(X_train, y_train, X_val, y_val, n_trials=5)
            
            print("Hyperparameter tuning complete for all tiers.")
        except Exception as e:
            print(f"Error during tuning: {e}")
            import traceback
            traceback.print_exc()

if __name__ == "__main__":
    tuner = MLTuner()
    tuner.run_all_tuning()
