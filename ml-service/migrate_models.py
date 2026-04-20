"""
Model Migration Script
======================
Run this ONCE locally to re-save XGBoost models in the native .ubj format
so they load without version warnings in production.

Usage:
    python migrate_models.py
"""
import os
import joblib
import logging

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger(__name__)

MODELS_DIR = "models"


def migrate_xgboost_model():
    """Re-save the XGBoost medium-risk model in native .ubj format."""
    pkl_path = os.path.join(MODELS_DIR, "mid.pkl")
    ubj_path = os.path.join(MODELS_DIR, "mid.ubj")

    if os.path.exists(ubj_path):
        logger.info("mid.ubj already exists. Skipping XGBoost migration.")
        return

    if not os.path.exists(pkl_path):
        logger.warning(f"mid.pkl not found at {pkl_path}. Skipping XGBoost migration.")
        return

    try:
        import xgboost as xgb
        logger.info("Loading XGBoost model from mid.pkl ...")
        model = joblib.load(pkl_path)

        # Handle both sklearn wrapper and raw Booster
        if hasattr(model, "get_booster"):
            booster = model.get_booster()
        elif isinstance(model, xgb.Booster):
            booster = model
        else:
            logger.error("Loaded object is not a recognized XGBoost model type.")
            return

        booster.save_model(ubj_path)
        logger.info(f"[OK] XGBoost model saved in native format: {ubj_path}")

    except Exception as e:
        logger.error(f"XGBoost migration failed: {e}")


def check_sklearn_model():
    """Verify the sklearn model loads correctly."""
    pkl_path = os.path.join(MODELS_DIR, "low.pkl")
    if not os.path.exists(pkl_path):
        logger.warning(f"low.pkl not found at {pkl_path}.")
        return

    try:
        import warnings
        with warnings.catch_warnings(record=True) as w:
            warnings.simplefilter("always")
            model = joblib.load(pkl_path)
            if w:
                logger.warning(f"sklearn version warnings during load: {[str(warning.message) for warning in w]}")
                logger.warning("Consider retraining with scikit-learn==1.8.0 to eliminate warnings.")
            else:
                logger.info("[OK] sklearn low-risk model loaded cleanly.")
    except Exception as e:
        logger.error(f"sklearn model check failed: {e}")


def check_tensorflow_model():
    """Verify LSTM model loads on CPU."""
    os.environ["CUDA_VISIBLE_DEVICES"] = "-1"
    os.environ["TF_CPP_MIN_LOG_LEVEL"] = "3"
    h5_path = os.path.join(MODELS_DIR, "high_lstm.h5")
    if not os.path.exists(h5_path):
        logger.warning(f"high_lstm.h5 not found at {h5_path}.")
        return

    try:
        import tensorflow as tf
        from tensorflow.keras.models import load_model
        model = load_model(h5_path, compile=False)
        logger.info(f"[OK] LSTM model loaded on CPU. Input shape: {model.input_shape}")
    except Exception as e:
        logger.error(f"TensorFlow model check failed: {e}")


if __name__ == "__main__":
    logger.info("=== Bharat AI Wealth - Model Migration ===")
    os.makedirs(MODELS_DIR, exist_ok=True)

    migrate_xgboost_model()
    check_sklearn_model()
    check_tensorflow_model()

    logger.info("=== Migration complete. ===")
