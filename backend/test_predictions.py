"""
Quick test to check model predictions on uploaded images
"""
import os
from tensorflow import keras
import numpy as np
from PIL import Image

# Load model
model = keras.models.load_model('model/pneumonia_model.h5')
print("✅ Model loaded\n")

# Test images
uploads_dir = 'uploads'
images = [f for f in os.listdir(uploads_dir) if f.endswith(('.jpg', '.jpeg', '.png'))]

print("🔍 Testing predictions on uploaded images:\n")
print("="*60)

for img_file in images:
    img_path = os.path.join(uploads_dir, img_file)
    
    # Preprocess image
    img = Image.open(img_path).convert('RGB')
    img = img.resize((128, 128))
    img_array = np.array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    
    # Predict
    prediction = model.predict(img_array, verbose=0)[0][0]
    confidence = prediction * 100
    
    if prediction > 0.5:
        result = "PNEUMONIA"
        emoji = "🦠"
    else:
        result = "NORMAL"
        emoji = "✅"
    
    print(f"{emoji} {img_file:30s} → {result:10s} ({confidence:.2f}%)")

print("="*60)

