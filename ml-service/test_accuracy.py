"""
Test Model Accuracy Script
Calculates actual accuracy metrics for all three models
"""

import numpy as np
import pandas as pd
import joblib
from tensorflow.keras.models import load_model
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
from feature_pipeline import FeaturePipeline
import warnings
warnings.filterwarnings('ignore')

def calculate_accuracy_metrics(y_true, y_pred, model_name):
    """Calculate comprehensive accuracy metrics"""
    
    # Basic metrics
    rmse = np.sqrt(mean_squared_error(y_true, y_pred))
    mae = mean_absolute_error(y_true, y_pred)
    r2 = r2_score(y_true, y_pred)
    
    # MAPE (Mean Absolute Percentage Error)
    mape = np.mean(np.abs((y_true - y_pred) / y_true)) * 100
    
    # Accuracy percentage (100 - MAPE)
    accuracy = 100 - mape
    
    # Directional Accuracy (predicting up/down correctly)
    y_true_diff = np.diff(y_true)
    y_pred_diff = np.diff(y_pred)
    directional_accuracy = np.mean((y_true_diff > 0) == (y_pred_diff > 0)) * 100
    
    print(f"\n{'='*60}")
    print(f"📊 {model_name} - Accuracy Report")
    print(f"{'='*60}")
    print(f"RMSE (Root Mean Square Error):     ₹{rmse:.2f}")
    print(f"MAE (Mean Absolute Error):         ₹{mae:.2f}")
    print(f"R² Score (Coefficient):            {r2:.4f}")
    print(f"MAPE (Mean Abs % Error):           {mape:.2f}%")
    print(f"{'='*60}")
    print(f"✅ ACCURACY:                        {accuracy:.2f}%")
    print(f"📈 Directional Accuracy:            {directional_accuracy:.2f}%")
    print(f"{'='*60}\n")
    
    return {
        'model': model_name,
        'rmse': rmse,
        'mae': mae,
        'r2': r2,
        'mape': mape,
        'accuracy': accuracy,
        'directional_accuracy': directional_accuracy
    }

def test_low_risk_model():
    """Test RandomForest (Low Risk) Model"""
    print("\n🟢 Testing Low Risk Model (RandomForest)...")
    
    try:
        # Load model
        model = joblib.load("models/low.pkl")
        
        # Load test data
        fp = FeaturePipeline()
        symbol = "RELIANCE.NS"
        processed = fp.process_symbol(symbol)
        
        if not processed:
            print("❌ Could not load test data")
            return None
        
        # Get test data (last 30% of data)
        X = processed["X_val"]
        y = processed["y_val"]
        
        # Make predictions
        X_num = X.select_dtypes(include=[np.number])
        y_pred = model.predict(X_num)
        
        # Calculate metrics
        return calculate_accuracy_metrics(y.values, y_pred, "Low Risk (RandomForest)")
        
    except Exception as e:
        print(f"❌ Error testing low risk model: {e}")
        return None

def test_medium_risk_model():
    """Test XGBoost (Medium Risk) Model"""
    print("\n🟡 Testing Medium Risk Model (XGBoost)...")
    
    try:
        # Load model
        model = joblib.load("models/mid.pkl")
        
        # Load test data
        fp = FeaturePipeline()
        symbol = "TCS.NS"
        processed = fp.process_symbol(symbol)
        
        if not processed:
            print("❌ Could not load test data")
            return None
        
        # Get test data
        X = processed["X_val"]
        y = processed["y_val"]
        
        # Make predictions
        X_num = X.select_dtypes(include=[np.number])
        y_pred = model.predict(X_num)
        
        # Calculate metrics
        return calculate_accuracy_metrics(y.values, y_pred, "Medium Risk (XGBoost)")
        
    except Exception as e:
        print(f"❌ Error testing medium risk model: {e}")
        return None

def test_high_risk_model():
    """Test LSTM (High Risk) Model"""
    print("\n🔴 Testing High Risk Model (LSTM)...")
    
    try:
        # Load model
        model = load_model("models/high_lstm.h5")
        
        # Load test data (use existing parquet if available)
        fp = FeaturePipeline()
        
        # Try to load from existing clean data first
        import os
        btc_path = "data/clean/BTC.parquet"
        if os.path.exists(btc_path):
            print("Loading BTC data from cache...")
            df = pd.read_parquet(btc_path)
            processed = fp.process_dataframe(df, "BTC")
        else:
            symbol = "BTC-USD"
            processed = fp.process_symbol(symbol)
        
        if not processed:
            print("❌ Could not load test data")
            return None
        
        # Get test data
        X = processed["X_val"]
        y = processed["y_val"]
        
        # Prepare LSTM input (need 60 time steps)
        X_num = X.select_dtypes(include=[np.number])
        
        if len(X_num) < 60:
            print("❌ Not enough data for LSTM (need 60+ samples)")
            return None
        
        # Create sliding windows
        window_size = 60
        X_windows = []
        y_windows = []
        
        for i in range(window_size, len(X_num)):
            X_windows.append(X_num.iloc[i-window_size:i].values)
            y_windows.append(y.iloc[i])
        
        X_windows = np.array(X_windows)
        y_windows = np.array(y_windows)
        
        # Make predictions
        y_pred = model.predict(X_windows, verbose=0).flatten()
        
        # Calculate metrics
        return calculate_accuracy_metrics(y_windows, y_pred, "High Risk (LSTM)")
        
    except Exception as e:
        print(f"❌ Error testing high risk model: {e}")
        import traceback
        traceback.print_exc()
        return None

def main():
    print("\n" + "="*60)
    print("🎯 MODEL ACCURACY TESTING - Bharat AI Wealth")
    print("="*60)
    
    results = []
    
    # Test all models
    low_result = test_low_risk_model()
    if low_result:
        results.append(low_result)
    
    medium_result = test_medium_risk_model()
    if medium_result:
        results.append(medium_result)
    
    high_result = test_high_risk_model()
    if high_result:
        results.append(high_result)
    
    # Summary
    if results:
        print("\n" + "="*60)
        print("📊 SUMMARY - All Models")
        print("="*60)
        print(f"{'Model':<25} {'Accuracy':<15} {'RMSE':<15}")
        print("-"*60)
        for r in results:
            print(f"{r['model']:<25} {r['accuracy']:.2f}%{'':<10} ₹{r['rmse']:.2f}")
        print("="*60)
        
        avg_accuracy = np.mean([r['accuracy'] for r in results])
        print(f"\n✅ Average Accuracy Across All Models: {avg_accuracy:.2f}%")
        print("="*60 + "\n")
    else:
        print("\n❌ No models could be tested successfully\n")

if __name__ == "__main__":
    main()
