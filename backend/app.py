"""
app.py — Flask backend for Explainable AI Pneumonia Detection System.

XAI additions (Grad-CAM + explanation) are integrated into the existing /predict
endpoint. All existing endpoints remain unchanged.
"""

import os
import uuid
import logging
from datetime import datetime

import numpy as np
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure
from PIL import Image
import tensorflow as tf

from config import Config
from utils import preprocess_image, allowed_file
from gradcam import generate_gradcam_heatmap, overlay_heatmap_on_image, analyze_heatmap_regions
from explainer import generate_explanation

# ── App setup ────────────────────────────────────────────────────────────────

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Temporary directory for Grad-CAM overlays (separate from uploads)
HEATMAP_DIR = os.path.join(os.path.dirname(__file__), "heatmaps")
os.makedirs(HEATMAP_DIR, exist_ok=True)
os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)

# ── MongoDB ───────────────────────────────────────────────────────────────────

try:
    client = MongoClient(app.config["MONGO_URI"], serverSelectionTimeoutMS=5000)
    client.admin.command("ping")
    db = client[app.config["DB_NAME"]]
    predictions_collection = db["predictions"]
    logger.info("MongoDB connected successfully.")
except ConnectionFailure:
    logger.warning("MongoDB unavailable — predictions will not be persisted.")
    predictions_collection = None

# ── Model loading ─────────────────────────────────────────────────────────────

model = None
MODEL_PATH = os.path.join(os.path.dirname(__file__), "model", "pneumonia_model.h5")

def load_model():
    global model
    if os.path.exists(MODEL_PATH):
        model = tf.keras.models.load_model(MODEL_PATH)
        logger.info("Model loaded from %s", MODEL_PATH)
    else:
        logger.error("Model file not found at %s", MODEL_PATH)

load_model()

# ── Helpers ───────────────────────────────────────────────────────────────────

def _save_upload(file) -> str:
    """Save uploaded file to UPLOAD_FOLDER and return its path."""
    ext = os.path.splitext(file.filename)[1].lower() or ".jpg"
    filename = f"{uuid.uuid4().hex}{ext}"
    path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
    file.save(path)
    return path


def _cleanup(path: str):
    """Silently remove a file — used for uploaded originals after processing."""
    try:
        if path and os.path.exists(path):
            os.remove(path)
    except OSError as e:
        logger.warning("Could not remove file %s: %s", path, e)

# ── Routes ────────────────────────────────────────────────────────────────────

@app.route("/", methods=["GET"])
def health_check():
    return jsonify({
        "status": "healthy",
        "message": "Explainable AI Pneumonia Detection API",
        "model_loaded": model is not None,
        "xai_features": ["grad-cam", "textual-explanation"],
    })


@app.route("/predict", methods=["POST"])
def predict():
    """
    POST /predict
    Accepts a chest X-ray image. Returns:
      - prediction, confidence       (existing)
      - explanation_text             (NEW — XAI)
      - heatmap_image_url            (NEW — Grad-CAM overlay)
    """
    if model is None:
        return jsonify({"error": "Model not loaded. Run train_model.py first."}), 503

    if "file" not in request.files:
        return jsonify({"error": "No file part in request."}), 400

    file = request.files["file"]
    if file.filename == "" or not allowed_file(file.filename):
        return jsonify({"error": "Invalid or missing file."}), 400

    upload_path = None
    heatmap_path = None

    try:
        # 1. Save upload
        upload_path = _save_upload(file)

        # 2. Preprocess for model
        img_size = app.config["IMG_SIZE"]
        target = img_size if isinstance(img_size, tuple) else (img_size, img_size)
        img_array = preprocess_image(upload_path, target_size=target)
        # 3. Predict
        raw_confidence = float(model.predict(img_array, verbose=0)[0][0])
        if raw_confidence >= 0.5:
            prediction = "PNEUMONIA"
            confidence = round(raw_confidence * 100, 2)
        else:
            prediction = "NORMAL"
            confidence = round((1 - raw_confidence) * 100, 2)

        # 4. Grad-CAM
        heatmap = generate_gradcam_heatmap(model, img_array)
        heatmap_path = overlay_heatmap_on_image(upload_path, heatmap, HEATMAP_DIR)
        heatmap_filename = os.path.basename(heatmap_path)

        # 5. Region analysis + explanation
        region_stats = analyze_heatmap_regions(heatmap)
        explanation_text = generate_explanation(prediction, confidence, region_stats)

        # 6. Persist to MongoDB (extended record)
        record = {
            "prediction": prediction,
            "confidence": confidence,
            "filename": os.path.basename(upload_path),
            "heatmap_filename": heatmap_filename,
            "region_stats": region_stats,
            "timestamp": datetime.utcnow(),
        }
        if predictions_collection is not None:
            predictions_collection.insert_one(record)

        return jsonify({
            "prediction": prediction,
            "confidence": confidence,
            "filename": os.path.basename(upload_path),
            "explanation_text": explanation_text,
            "heatmap_image_url": f"/heatmaps/{heatmap_filename}",
        })

    except Exception as e:
        logger.exception("Error during prediction: %s", e)
        return jsonify({"error": "Internal server error during prediction."}), 500

    finally:
        # Clean up the uploaded original (heatmap is kept until served)
        _cleanup(upload_path)


@app.route("/heatmaps/<filename>", methods=["GET"])
def serve_heatmap(filename: str):
    """Serve a Grad-CAM heatmap image."""
    return send_from_directory(HEATMAP_DIR, filename)


@app.route("/history", methods=["GET"])
def history():
    """Return last 10 predictions (existing endpoint — unchanged)."""
    if predictions_collection is None:
        return jsonify({"error": "Database unavailable."}), 503
    records = list(predictions_collection.find({}, {"_id": 0}).sort("timestamp", -1).limit(10))
    for r in records:
        if "timestamp" in r:
            r["timestamp"] = r["timestamp"].isoformat()
    return jsonify(records)


@app.route("/stats", methods=["GET"])
def stats():
    """Return aggregate statistics (existing endpoint — unchanged)."""
    if predictions_collection is None:
        return jsonify({"error": "Database unavailable."}), 503
    total = predictions_collection.count_documents({})
    pneumonia = predictions_collection.count_documents({"prediction": "PNEUMONIA"})
    normal = predictions_collection.count_documents({"prediction": "NORMAL"})
    return jsonify({
        "total_scans": total,
        "pneumonia_cases": pneumonia,
        "normal_cases": normal,
        "pneumonia_rate": round((pneumonia / total * 100) if total else 0, 1),
    })


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=app.config.get("BACKEND_PORT", 8000), debug=False)