import os
import logging
import warnings

# Force CPU-only (env vars set in main.py before this import)
import tensorflow as tf
from tensorflow.keras.models import load_model
from feature_pipeline import FeaturePipeline
from functools import lru_cache
import yfinance as yf
import pandas as pd
import numpy as np
import joblib
import datetime

logger = logging.getLogger(__name__)

class MLEngine:
    def __init__(self, models_dir="models"):
        self.models_dir = models_dir
        self.fp = FeaturePipeline()
        self.models = {}
        self.load_models()

    def load_models(self):
        """Pre-load models if they exist, with graceful fallbacks for version mismatches."""
        # Low-risk: scikit-learn RandomForest
        try:
            low_path = os.path.join(self.models_dir, "low.pkl")
            if os.path.exists(low_path):
                with warnings.catch_warnings():
                    warnings.simplefilter("ignore")  # suppress sklearn version warnings
                    self.models["low"] = joblib.load(low_path)
                logger.info("Loaded low-risk model (RandomForest).")
        except Exception as e:
            logger.warning(f"Could not load low-risk model: {e}. Will use fallback predictions.")

        # Medium-risk: XGBoost (try native .ubj first, fallback to .pkl)
        try:
            mid_ubj_path = os.path.join(self.models_dir, "mid.ubj")
            mid_pkl_path = os.path.join(self.models_dir, "mid.pkl")
            if os.path.exists(mid_ubj_path):
                import xgboost as xgb
                model = xgb.Booster()
                model.load_model(mid_ubj_path)
                self.models["medium"] = model
                logger.info("Loaded medium-risk model (XGBoost native .ubj).")
            elif os.path.exists(mid_pkl_path):
                with warnings.catch_warnings():
                    warnings.simplefilter("ignore")
                    self.models["medium"] = joblib.load(mid_pkl_path)
                logger.warning("Loaded medium-risk model from .pkl (legacy). Re-save as .ubj for stability.")
        except Exception as e:
            logger.warning(f"Could not load medium-risk model: {e}. Will use fallback predictions.")

        # High-risk: TensorFlow LSTM (CPU-only)
        try:
            high_path = os.path.join(self.models_dir, "high_lstm.h5")
            if os.path.exists(high_path):
                self.models["high"] = load_model(high_path, compile=False)
                logger.info("Loaded high-risk model (LSTM) on CPU.")
        except Exception as e:
            logger.warning(f"Could not load high-risk model: {e}. Will use fallback predictions.")

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
            logger.error(f"Prediction failed for {symbol}: {e}")
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
            "current_price": round(last_price, 2),
            "confidence": confidence,
            "range": { "low": round(prediction * 0.98, 2), "high": round(prediction * 1.02, 2) },
            "model_used": model_name,
            "timestamp": timestamp
        }

    def predict_medium(self, symbol, features, risk, last_price, timestamp):
        model = self.models.get("medium")
        model_name = "XGBoost (Medium Risk)"

        if model:
            try:
                import xgboost as xgb
                numeric_features = features.select_dtypes(include=[np.number])
                # Support both Booster (native) and sklearn-style wrapper
                if isinstance(model, xgb.Booster):
                    dmatrix = xgb.DMatrix(numeric_features)
                    prediction = float(model.predict(dmatrix)[0])
                else:
                    prediction = float(model.predict(numeric_features)[0])
                confidence = 0.82
            except Exception as e:
                logger.warning(f"XGBoost prediction failed: {e}, using fallback.")
                prediction = last_price * (1 + np.random.normal(0.002, 0.01))
                confidence = 0.50
                model_name += " [Fallback]"
        else:
            prediction = last_price * (1 + np.random.normal(0.002, 0.01))
            confidence = 0.50
            model_name += " [Fallback]"

        return {
            "symbol": symbol,
            "risk": risk,
            "prediction": round(prediction, 2),
            "current_price": round(last_price, 2),
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
            "current_price": round(last_price, 2),
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
            "current_price": last_price,
            "confidence": 0.0,
            "range": { "low": round(last_price * 0.95, 2), "high": round(last_price * 1.05, 2) },
            "model_used": "Fallback (Sample)",
            "timestamp": datetime.datetime.now().isoformat(),
            "note": error
        }
