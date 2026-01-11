import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from xgboost import XGBRegressor
import joblib
import os
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout

MODELS_DIR = "models"

def setup_directories():
    if not os.path.exists(MODELS_DIR):
        os.makedirs(MODELS_DIR)
        print(f"Created directory: {MODELS_DIR}")

def train_low_risk_model():
    print("Training Low Risk Model (RandomForest)...")
    X = np.random.rand(100, 5)
    y = np.random.rand(100)
    model = RandomForestRegressor(n_estimators=10)
    model.fit(X, y)
    joblib.dump(model, os.path.join(MODELS_DIR, "low.pkl"))
    print("Saved low.pkl")

def train_mid_risk_model():
    print("Training Medium Risk Model (XGBoost)...")
    X = np.random.rand(100, 5)
    y = np.random.rand(100)
    model = XGBRegressor(n_estimators=10)
    model.fit(X, y)
    joblib.dump(model, os.path.join(MODELS_DIR, "mid.pkl"))
    print("Saved mid.pkl")

def train_high_risk_model():
    print("Training High Risk Model (LSTM)...")
    # Simple LSTM model
    model = Sequential([
        LSTM(50, return_sequences=True, input_shape=(60, 1)),
        Dropout(0.2),
        LSTM(50, return_sequences=False),
        Dropout(0.2),
        Dense(25),
        Dense(1)
    ])
    model.compile(optimizer='adam', loss='mean_squared_error')
    
    # Dummy training data
    X = np.random.rand(10, 60, 1)
    y = np.random.rand(10)
    model.fit(X, y, epochs=1, verbose=0)
    
    model.save(os.path.join(MODELS_DIR, "high_lstm.h5"))
    print("Saved high_lstm.h5")

if __name__ == "__main__":
    setup_directories()
    train_low_risk_model()
    train_mid_risk_model()
    train_high_risk_model()
    print("Initial model setup complete.")
