"""
Create a simple demo model for testing the app
This is just for demonstration - not a real trained model
"""
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
import os

# Create model directory if needed
os.makedirs('model', exist_ok=True)

# Build a simple model (same architecture as training)
model = keras.Sequential([
    layers.Conv2D(16, (3, 3), activation='relu', input_shape=(128, 128, 3)),
    layers.MaxPooling2D((2, 2)),
    layers.Dropout(0.25),
    
    layers.Conv2D(32, (3, 3), activation='relu'),
    layers.MaxPooling2D((2, 2)),
    layers.Dropout(0.25),
    
    layers.Conv2D(64, (3, 3), activation='relu'),
    layers.MaxPooling2D((2, 2)),
    layers.Dropout(0.25),
    
    layers.Flatten(),
    layers.Dense(128, activation='relu'),
    layers.Dropout(0.5),
    
    layers.Dense(1, activation='sigmoid')
])

# Compile the model
model.compile(
    optimizer='adam',
    loss='binary_crossentropy',
    metrics=['accuracy']
)

# Save the model
model.save('model/pneumonia_model.h5')

print("✅ Demo model created successfully!")
print("📁 Saved to: backend/model/pneumonia_model.h5")
print("")
print("⚠️  NOTE: This is an UNTRAINED model for demo purposes only.")
print("   It will give random predictions until properly trained.")
print("")
print("🚀 You can now start the backend server:")
print("   python app.py")

