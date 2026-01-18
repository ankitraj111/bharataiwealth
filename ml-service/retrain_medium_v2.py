"""
Retrain Medium Risk Model - Symbol-Specific Approach
Train separate model for each symbol and average performance
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

def train_and_evaluate_symbol(symbol, fp):
    """Train model on single symbol and return metrics"""
    print(f"\n  → Training on {symbol}...")
    
    processed = fp.process_symbol(symbol)
    if not processed:
        return None
    
    X_train = processed["X_train"].select_dtypes(include=[np.number])
    y_train = processed["y_train"]
    X_val = processed["X_val"].select_dtypes(include=[np.number])
    y_val = processed["y_val"]
    
    # Improved parameters
    params = {
        'n_estimators': 300,
        'max_depth': 5,
        'learning_rate': 0.08,
        'subsample': 0.85,
        'colsample_bytree': 0.85,
        'min_child_weight': 2,
        'gamma': 0.05,
        'reg_alpha': 0.05,
        'reg_lambda': 0.5,
        'random_state': 42,
        'objective': 'reg:squarederror'
    }
    
    model = XGBRegressor(**params)
    model.fit(X_train, y_train, verbose=False)
    
    # Predict
    y_pred = model.predict(X_val)
    
    # Calculate metrics
    rmse = np.sqrt(mean_squared_error(y_val, y_pred))
    mae = mean_absolute_error(y_val, y_pred)
    r2 = r2_score(y_val, y_pred)
    
    # MAPE with safety check
    mape = np.mean(np.abs((y_val - y_pred) / np.maximum(y_val, 1))) * 100
    accuracy = max(0, 100 - mape)
    
    # Directional accuracy
    if len(y_val) > 1:
        y_val_diff = np.diff(y_val.values)
        y_pred_diff = np.diff(y_pred)
        directional_accuracy = np.mean((y_val_diff > 0) == (y_pred_diff > 0)) * 100
    else:
        directional_accuracy = 0
    
    print(f"    RMSE: ₹{rmse:.2f} | R²: {r2:.4f} | Accuracy: {accuracy:.2f}%")
    
    return {
        'symbol': symbol,
        'model': model,
        'rmse': rmse,
        'mae': mae,
        'r2': r2,
        'mape': mape,
        'accuracy': accuracy,
        'directional_accuracy': directional_accuracy,
        'X_train': X_train,
        'y_train': y_train
    }

def retrain_medium_risk_ensemble():
    print("\n" + "="*60)
    print("🔄 RETRAINING MEDIUM RISK MODEL - ENSEMBLE APPROACH")
    print("="*60 + "\n")
    
    fp = FeaturePipeline()
    symbols = ["TCS.NS", "INFY.NS", "AXISBANK.NS", "HDFCLIFE.NS", "TATASTEEL.NS"]
    
    print("📊 Training individual models for each symbol...")
    results = []
    
    for symbol in symbols:
        result = train_and_evaluate_symbol(symbol, fp)
        if result:
            results.append(result)
    
    if not results:
        print("❌ No models could be trained!")
        return
    
    # Calculate average metrics
    avg_accuracy = np.mean([r['accuracy'] for r in results])
    avg_r2 = np.mean([r['r2'] for r in results])
    avg_rmse = np.mean([r['rmse'] for r in results])
    avg_directional = np.mean([r['directional_accuracy'] for r in results])
    
    print("\n" + "="*60)
    print("📊 ENSEMBLE MODEL - AVERAGE PERFORMANCE")
    print("="*60)
    print(f"Average RMSE:                      ₹{avg_rmse:.2f}")
    print(f"Average R² Score:                  {avg_r2:.4f}")
    print("="*60)
    print(f"✅ AVERAGE ACCURACY:                {avg_accuracy:.2f}%")
    print(f"📈 Average Directional Accuracy:    {avg_directional:.2f}%")
    print("="*60)
    
    # Train final model on combined data
    print("\n🎯 Training final ensemble model on all data...")
    
    all_X = pd.concat([r['X_train'] for r in results], ignore_index=True)
    all_y = pd.concat([r['y_train'] for r in results], ignore_index=True)
    
    final_params = {
        'n_estimators': 400,
        'max_depth': 6,
        'learning_rate': 0.06,
        'subsample': 0.8,
        'colsample_bytree': 0.8,
        'min_child_weight': 2,
        'gamma': 0.05,
        'reg_alpha': 0.1,
        'reg_lambda': 0.8,
        'random_state': 42,
        'objective': 'reg:squarederror'
    }
    
    final_model = XGBRegressor(**final_params)
    final_model.fit(all_X, all_y, verbose=False)
    
    print("✅ Final model trained!")
    
    # Save if accuracy is acceptable
    if avg_accuracy > 70 or avg_r2 > 0.7:
        print("\n💾 Saving improved model...")
        
        # Archive old model
        if os.path.exists("models/mid.pkl"):
            timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
            archive_path = f"models/archive/mid-backup-{timestamp}.pkl"
            os.makedirs("models/archive", exist_ok=True)
            import shutil
            shutil.copy2("models/mid.pkl", archive_path)
            print(f"  → Old model archived")
        
        # Save new model
        joblib.dump(final_model, "models/mid.pkl")
        print("  → New model saved: models/mid.pkl")
        
        # Save metadata
        metadata = {
            "best_params": final_params,
            "avg_rmse": float(avg_rmse),
            "avg_accuracy": float(avg_accuracy),
            "avg_r2_score": float(avg_r2),
            "avg_directional_accuracy": float(avg_directional),
            "training_symbols": symbols,
            "training_samples": len(all_X),
            "individual_results": [
                {
                    "symbol": r['symbol'],
                    "accuracy": float(r['accuracy']),
                    "r2": float(r['r2']),
                    "rmse": float(r['rmse'])
                }
                for r in results
            ],
            "updated_at": datetime.datetime.now().isoformat()
        }
        
        os.makedirs("models/meta", exist_ok=True)
   