"""
Retrain Medium Risk (XGBoost) Model with Improved Accuracy
"""

import numpy as np
import pandas as pd
from xgboost import XGBRegressor
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
from feature_pipeline import FeaturePipeline
import joblib
import json
import os
import datetime

def retrain_medium_risk():
    print("\n" + "="*60)
    print("🔄 RETRAINING MEDIUM RISK MODEL (XGBoost)")
    print("="*60 + "\n")
    
    # Initialize feature pipeline
    fp = FeaturePipeline()
    
    # Use multiple symbols for better generalization
    symbols = ["TCS.NS", "INFY.NS", "AXISBANK.NS", "HDFCLIFE.NS", "TATASTEEL.NS"]
    
    all_X_train = []
    all_y_train = []
    all_X_val = []
    all_y_val = []
    
    print("📊 Loading training data from multiple symbols...")
    for symbol in symbols:
        print(f"  → Processing {symbol}...")
        processed = fp.process_symbol(symbol)
        
        if processed:
            all_X_train.append(processed["X_train"])
            all_y_train.append(processed["y_train"])
            all_X_val.append(processed["X_val"])
            all_y_val.append(processed["y_val"])
    
    if not all_X_train:
        print("❌ No data could be loaded!")
        return
    
    # Combine all data
    print("\n🔗 Combining data from all symbols...")
    X_train = pd.concat(all_X_train, ignore_index=True)
    y_train = pd.concat(all_y_train, ignore_index=True)
    X_val = pd.concat(all_X_val, ignore_index=True)
    y_val = pd.concat(all_y_val, ignore_index=True)
    
    # Select only numeric features
    X_train_num = X_train.select_dtypes(include=[np.number])
    X_val_num = X_val.select_dtypes(include=[np.number])
    
    print(f"✅ Training samples: {len(X_train_num)}")
    print(f"✅ Validation samples: {len(X_val_num)}")
    print(f"✅ Features: {X_train_num.shape[1]}")
    
    # Improved XGBoost parameters
    print("\n🎯 Training XGBoost with optimized parameters...")
    
    params = {
        'n_estimators': 500,
        'max_depth': 6,
        'learning_rate': 0.05,
        'subsample': 0.8,
        'colsample_bytree': 0.8,
        'min_child_weight': 3,
        'gamma': 0.1,
        'reg_alpha': 0.1,
        'reg_lambda': 1.0,
        'random_state': 42,
        'objective': 'reg:squarederror',
        'tree_method': 'hist',
        'early_stopping_rounds': 50
    }
    
    model = XGBRegressor(**params)
    
    # Train with early stopping
    model.fit(
        X_train_num, 
        y_train,
        eval_set=[(X_val_num, y_val)],
        verbose=False
    )
    
    print("✅ Training complete!")
    
    # Evaluate on validation set
    print("\n📊 Evaluating model performance...")
    y_pred = model.predict(X_val_num)
    
    rmse = np.sqrt(mean_squared_error(y_val, y_pred))
    mae = mean_absolute_error(y_val, y_pred)
    r2 = r2_score(y_val, y_pred)
    mape = np.mean(np.abs((y_val - y_pred) / y_val)) * 100
    accuracy = 100 - mape
    
    # Directional accuracy
    y_val_diff = np.diff(y_val.values)
    y_pred_diff = np.diff(y_pred)
    directional_accuracy = np.mean((y_val_diff > 0) == (y_pred_diff > 0)) * 100
    
    print("\n" + "="*60)
    print("📊 MEDIUM RISK MODEL - NEW ACCURACY REPORT")
    print("="*60)
    print(f"RMSE (Root Mean Square Error):     ₹{rmse:.2f}")
    print(f"MAE (Mean Absolute Error):         ₹{mae:.2f}")
    print(f"R² Score (Coefficient):            {r2:.4f}")
    print(f"MAPE (Mean Abs % Error):           {mape:.2f}%")
    print("="*60)
    print(f"✅ ACCURACY:                        {accuracy:.2f}%")
    print(f"📈 Directional Accuracy:            {directional_accuracy:.2f}%")
    print("="*60 + "\n")
    
    # Save model
    if accuracy > 80:  # Only save if accuracy is good
        print("💾 Saving improved model...")
        
        # Archive old model
        if os.path.exists("models/mid.pkl"):
            timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
            archive_path = f"models/archive/mid-backup-{timestamp}.pkl"
            os.makedirs("models/archive", exist_ok=True)
            import shutil
            shutil.copy2("models/mid.pkl", archive_path)
            print(f"  → Old model archived: {archive_path}")
        
        # Save new model
        joblib.dump(model, "models/mid.pkl")
        print("  → New model saved: models/mid.pkl")
        
        # Save metadata
        metadata = {
            "best_params": params,
            "best_rmse": float(rmse),
            "accuracy": float(accuracy),
            "r2_score": float(r2),
            "mape": float(mape),
            "directional_accuracy": float(directional_accuracy),
            "training_symbols": symbols,
            "training_samples": len(X_train_num),
            "updated_at": datetime.datetime.now().isoformat()
        }
        
        os.makedirs("models/meta", exist_ok=True)
        with open("models/meta/medium.json", "w") as f:
            json.dump(metadata, f, indent=4)
        print("  → Metadata saved: models/meta/medium.json")
        
        print("\n✅ Model successfully retrained and saved!")
        print(f"🎯 New Accuracy: {accuracy:.2f}%")
        
    else:
        print(f"\n⚠️ Accuracy ({accuracy:.2f}%) is still low. Model not saved.")
        print("Consider:")
        print("  1. Adding more training data")
        print("  2. Feature engineering")
        print("  3. Different hyperparameters")
    
    return accuracy

if __name__ == "__main__":
    retrain_medium_risk()
