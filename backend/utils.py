"""
utils.py — Utility helpers (preprocessing, file validation).

This file extends the original utils.py. Existing functions are preserved as-is.
"""

import os
import numpy as np
from PIL import Image

ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif", "bmp", "webp"}


def allowed_file(filename: str) -> bool:
    """Return True if the file extension is in the allowed set."""
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


def preprocess_image(image_path: str, target_size: tuple = (224, 224)) -> np.ndarray:
    img = Image.open(image_path).convert("RGB")
    w, h = target_size[0], target_size[1]
    img = img.resize((w, h), Image.LANCZOS)
    img_array = np.array(img, dtype=np.float32) / 255.0
    return np.expand_dims(img_array, axis=0)