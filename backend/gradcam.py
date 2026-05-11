"""
gradcam.py — Grad-CAM for VGG16-based Sequential Pneumonia Detection model.
"""

import os
import uuid
import numpy as np
import cv2
import tensorflow as tf


# Hardcoded — confirmed from model inspection: block5_conv3 is the last conv layer
LAST_CONV_LAYER = "block5_conv3"


def generate_gradcam_heatmap(
    model: tf.keras.Model,
    img_array: np.ndarray,
    last_conv_layer_name: str = LAST_CONV_LAYER,
) -> np.ndarray:
    """
    Compute Grad-CAM heatmap for a VGG16-based Sequential model.
    Uses GradientTape on the nested vgg16 sub-model's conv output.
    """
    vgg_submodel = model.layers[0]  # the nested 'vgg16' Functional model

    # Sub-model: image input → (block5_conv3 output, vgg16 final output)
    last_conv_layer = vgg_submodel.get_layer(last_conv_layer_name)
    feature_extractor = tf.keras.Model(
        inputs=vgg_submodel.input,
        outputs=[last_conv_layer.output, vgg_submodel.output],
    )

    with tf.GradientTape() as tape:
        conv_output, vgg_features = feature_extractor(img_array, training=False)
        tape.watch(conv_output)

        # Pass vgg features through the remaining top layers (flatten, dense, dropout...)
        x = vgg_features
        for layer in model.layers[1:]:  # skip vgg16, run flatten → dense → output
            x = layer(x, training=False)

        loss = x[:, 0]  # binary sigmoid output

    grads = tape.gradient(loss, conv_output)           # (1, 14, 14, 512)
    pooled_grads = tf.reduce_mean(grads, axis=(0, 1, 2))  # (512,)

    conv_output = conv_output[0]                       # (14, 14, 512)
    heatmap = conv_output @ pooled_grads[..., tf.newaxis]  # (14, 14, 1)
    heatmap = tf.squeeze(heatmap)
    heatmap = tf.maximum(heatmap, 0) / (tf.math.reduce_max(heatmap) + 1e-8)
    return heatmap.numpy()


def overlay_heatmap_on_image(
    original_img_path: str,
    heatmap: np.ndarray,
    output_dir: str,
    alpha: float = 0.45,
) -> str:
    """
    Resize heatmap to original image size, apply jet colormap, blend, and save.
    Returns the saved file path.
    """
    original_bgr = cv2.imread(original_img_path)
    if original_bgr is None:
        raise FileNotFoundError(f"Cannot read image: {original_img_path}")

    h, w = original_bgr.shape[:2]
    heatmap_uint8 = np.uint8(255 * heatmap)
    heatmap_resized = cv2.resize(heatmap_uint8, (w, h))
    heatmap_colored = cv2.applyColorMap(heatmap_resized, cv2.COLORMAP_JET)

    overlay = cv2.addWeighted(original_bgr, 1 - alpha, heatmap_colored, alpha, 0)

    filename = f"gradcam_{uuid.uuid4().hex}.jpg"
    save_path = os.path.join(output_dir, filename)
    cv2.imwrite(save_path, overlay)
    return save_path


def analyze_heatmap_regions(heatmap: np.ndarray) -> dict:
    """
    Analyse upper/lower lung activation for the explanation generator.
    """
    h = heatmap.shape[0]
    upper = heatmap[: h // 2, :]
    lower = heatmap[h // 2 :, :]
    threshold = 0.5

    return {
        "upper_activation": float(np.mean(upper)),
        "lower_activation": float(np.mean(lower)),
        "peak_intensity": float(np.max(heatmap)),
        "activation_spread": float(np.sum(heatmap > threshold) / heatmap.size),
    }