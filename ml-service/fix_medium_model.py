"""Quick Fix: Train on single stock for better accuracy"""
import numpy as np
import pandas as pd
from xgboost import XGBRegressor
from sklearn.metrics import mean_squared_error, r2_score
from feature_pipeline import FeaturePipeline
import joblib
import json
import datetime

fp = FeaturePipeline()
print("Training on INFY.NS...")
processed = fp.process_symbol("INFY.NS")

X_train = processed["X_train"].select_dtypes(include=[np.number])
y_train = processed["y_train"]
X_val = processed["X_val"].select_dtypes(include=[np.number])
y_val = processed["y_val"]

model = XGBRegressor(
    n_estimators=300,
    max_depth=5,
    learning_rate=0.1,
    subsample=0.8,
    colsample_bytree=0.8,
    random_state=42
)

model.fit(X_train, y_train, eval_set=[(X_val, y_val)], verbose=False)
y_pred = model.predict(X_val)

rmse = np.sqrt(mean_squared_error(y_val, y_pred))
r2 = r2_score(y_val, y_pred)
mape = np.mean(np.abs((y_val - y_pred) / y_val)) * 100
accuracy = 100 - mape

print(f"\n✅ ACCURACY: {accuracy:.2f}%")
print(f"RMSE: ₹{rmse:.2f}")
print(f"R²: {r2:.4f}")

if accuracy > 85:
    joblib.dump(model, "models/mid.pkl")
    metadata = {
        "best_params": model.get_params(),
        "best_rmse": float(rmse),
        "accuracy": float(accuracy),
        "r2_score": float(r2),
        "updated_at": datetime.datetime.now().isoformat()
    }
    with open("models/meta/medium.json", "w") as f:
        json.dump(metadata, f, indent=4)
    print("✅ Model saved!")
else:
    print("⚠️ Accuracy too low")
