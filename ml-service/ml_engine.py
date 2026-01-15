from feature_pipeline import FeaturePipeline
from functools import lru_cache
import yfinance as yf
import pandas as pd
import numpy as np
import os
import joblib
import tensorflow as tf
from tensorflow.keras.models import load_model
import datetime

class MLEngine:
    def __init__(self, models_dir="models"):
        self.models_dir = models_dir
        self.fp = FeaturePipeline()
        self.models = {}
        self.load_models()

    def load_models(self):
        """Pre-load models if they exist."""
        try:
            low_path = os.path.join(self.models_dir, "low.pkl")
            if os.path.exists(low_path):
                self.models["low"] = joblib.load(low_path)
            
            mid_path = os.path.join(self.models_dir, "mid.pkl")
            if os.path.exists(mid_path):
                self.models["medium"] = joblib.load(mid_path)
            
            high_path = os.path.join(self.models_dir, "high_lstm.h5")
            if os.path.exists(high_path):
                self.models["high"] = load_model(high_path)
        except Exception as e:
            print(f"Error loading models: {e}")

    @lru_cache(maxsize=128)
    def predict(self, symbol: str):
        """Main prediction orchestration."""
        try:
            # Use FeaturePipeline to get processed features
            processed = self.fp.process_symbol(symbol)
            if not processed:
                return self.get_fallback_response(symbol)

            full_df = processed["full_df"]
            # Get latest features for prediction
            last_features = processed["X_val"].iloc[-1:]
            
            # Calculate volatility for risk classification
            # Volatility is already in the dataframe from feature pipeline
            volatility = full_df['Returns'].std() * 100
            risk = self.get_risk_level(volatility)
            
            last_price = float(full_df['Close'].iloc[-1])
            timestamp = datetime.datetime.now().isoformat()
            
            if risk == "low":
                return self.predict_low(symbol, last_features, risk, last_price, timestamp)
            elif risk == "medium":
                return self.predict_medium(symbol, last_features, risk, last_price, timestamp)
            else:
                # LSTM needs windowed data
                # X_val already has the scaled windowed features conceptually if we take the last 60
                # Actually, the feature pipeline gave us the last row of features.
                # For LSTM, we need the last 60 rows of features.
                last_60_features = processed["X_val"].iloc[-60:].values
                return self.predict_high(symbol, last_60_features, risk, last_price, timestamp)
                
        except Exception as e:
            print(f"Prediction failed for {symbol}: {e}")
            import traceback
            traceback.print_exc()
            return self.get_fallback_response(symbol, str(e))

    def get_risk_level(self, volatility: float):
        if volatility < 1.5:
            return "low"
        elif 1.5 <= volatility <= 3.5:
            return "medium"
        else:
            return "high"

    def predict_low(self, symbol, features, risk, last_price, timestamp):
        model = self.models.get("low")
        model_name = "RandomForest (Low Risk)"
        
        if model:
            prediction = float(model.predict(features.select_dtypes(include=[np.number]))[0])
            confidence = 0.85
        else:
            # Fallback simulation
            prediction = last_price * (1 + (np.random.normal(0.001, 0.005)))
            confidence = 0.50
            model_name += " [Fallback]"

        return {
            "symbol": symbol,
            "risk": risk,
            "prediction": round(prediction, 2),
            "confidence": confidence,
            "range": { "low": round(prediction * 0.98, 2), "high": round(prediction * 1.02, 2) },
            "model_used": model_name,
            "timestamp": timestamp
        }

    def predict_medium(self, symbol, features, risk, last_price, timestamp):
        model = self.models.get("medium")
        model_name = "XGBoost (Medium Risk)"
        
        if model:
            prediction = float(model.predict(features.select_dtypes(include=[np.number]))[0])
            confidence = 0.82
        else:
            prediction = last_price * (1 + (np.random.normal(0.002, 0.01)))
            confidence = 0.50
            model_name += " [Fallback]"

        return {
            "symbol": symbol,
            "risk": risk,
            "prediction": round(prediction, 2),
            "confidence": confidence,
            "range": { "low": round(prediction * 0.95, 2), "high": round(prediction * 1.05, 2) },
            "model_used": model_name,
            "timestamp": timestamp
        }

    def predict_high(self, symbol, window_features, risk, last_price, timestamp):
        model = self.models.get("high")
        model_name = "LSTM (High Risk)"
        
        if model and len(window_features) == 60:
            # Reshape for LSTM: [1, 60, num_features]
            input_data = window_features.reshape(1, 60, -1)
            prediction = float(model.predict(input_data, verbose=0)[0][0])
            confidence = 0.78
        else:
            prediction = last_price * (1 + (np.random.normal(0.005, 0.03)))
            confidence = 0.50
            model_name += " [Fallback]"

        return {
            "symbol": symbol,
            "risk": risk,
            "prediction": round(prediction, 2),
            "confidence": confidence,
            "range": { "low": round(prediction * 0.90, 2), "high": round(prediction * 1.10, 2) },
            "model_used": model_name,
            "timestamp": timestamp
        }

    def get_fallback_response(self, symbol, error="Data missing or processing error"):
        last_price = 2800.0 
        return {
            "symbol": symbol,
            "risk": "unknown",
            "prediction": last_price,
            "confidence": 0.0,
            "range": { "low": round(last_price * 0.95, 2), "high": round(last_price * 1.05, 2) },
            "model_used": "Fallback (Sample)",
            "timestamp": datetime.datetime.now().isoformat(),
            "note": error
        }
