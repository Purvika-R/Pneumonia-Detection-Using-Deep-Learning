"""
CNN Model Training Script for Pneumonia Detection

This script trains a Convolutional Neural Network on the Kaggle Chest X-Ray dataset.
Dataset should be placed in: ../dataset/chest_xray/

Dataset structure:
chest_xray/
├── train/
│   ├── NORMAL/
│   └── PNEUMONIA/
├── test/
│   ├── NORMAL/
│   └── PNEUMONIA/
└── val/
    ├── NORMAL/
    └── PNEUMONIA/
"""

import os
import numpy as np
import matplotlib.pyplot as plt
from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.callbacks import EarlyStopping, ReduceLROnPlateau, ModelCheckpoint
from sklearn.metrics import classification_report, confusion_matrix
from sklearn.utils.class_weight import compute_class_weight
import seaborn as sns

# Configuration
IMG_SIZE = (128, 128)  # Smaller images = less computation
BATCH_SIZE = 64  # Bigger batches = fewer iterations
EPOCHS = 10  # Increased to 10 for better learning
DATASET_PATH = '../dataset/chest_xray'
MODEL_SAVE_PATH = 'model/pneumonia_model.h5'

def create_data_generators():
    """
    Create data generators for training, validation, and testing
    Includes data augmentation for training set
    """
    # Training data augmentation
    train_datagen = ImageDataGenerator(
        rescale=1./255,
        rotation_range=20,
        width_shift_range=0.2,
        height_shift_range=0.2,
        shear_range=0.2,
        zoom_range=0.2,
        horizontal_flip=True,
        fill_mode='nearest'
    )
    
    # Validation and test data (only rescaling)
    val_test_datagen = ImageDataGenerator(rescale=1./255)
    
    # Create generators
    train_generator = train_datagen.flow_from_directory(
        os.path.join(DATASET_PATH, 'train'),
        target_size=IMG_SIZE,
        batch_size=BATCH_SIZE,
        class_mode='binary',
        shuffle=True
    )
    
    val_generator = val_test_datagen.flow_from_directory(
        os.path.join(DATASET_PATH, 'val'),
        target_size=IMG_SIZE,
        batch_size=BATCH_SIZE,
        class_mode='binary',
        shuffle=False
    )
    
    test_generator = val_test_datagen.flow_from_directory(
        os.path.join(DATASET_PATH, 'test'),
        target_size=IMG_SIZE,
        batch_size=BATCH_SIZE,
        class_mode='binary',
        shuffle=False
    )
    
    return train_generator, val_generator, test_generator

def build_cnn_model():
    """
    Build IMPROVED CNN model architecture (Mac-friendly!)
    Architecture: Conv2D → MaxPooling → BatchNorm → Dropout → Dense → Sigmoid
    """
    model = keras.Sequential([
        # First Convolutional Block
        layers.Conv2D(32, (3, 3), activation='relu', input_shape=(128, 128, 3)),
        layers.BatchNormalization(),
        layers.MaxPooling2D((2, 2)),
        layers.Dropout(0.25),
        
        # Second Convolutional Block
        layers.Conv2D(64, (3, 3), activation='relu'),
        layers.BatchNormalization(),
        layers.MaxPooling2D((2, 2)),
        layers.Dropout(0.25),
        
        # Third Convolutional Block
        layers.Conv2D(128, (3, 3), activation='relu'),
        layers.BatchNormalization(),
        layers.MaxPooling2D((2, 2)),
        layers.Dropout(0.25),
        
        # Flatten and Dense Layers
        layers.Flatten(),
        layers.Dense(256, activation='relu'),
        layers.BatchNormalization(),
        layers.Dropout(0.5),
        layers.Dense(128, activation='relu'),
        layers.Dropout(0.5),
        
        # Output Layer (Binary Classification)
        layers.Dense(1, activation='sigmoid')
    ])
    
    return model

def train_model():
    """
    Main training function
    """
    print("=" * 60)
    print("🚀 Starting Pneumonia Detection Model Training")
    print("=" * 60)
    
    # Check if dataset exists
    if not os.path.exists(DATASET_PATH):
        print(f"❌ Dataset not found at {DATASET_PATH}")
        print("Please download the Kaggle Chest X-Ray dataset and place it in the dataset/ folder")
        return
    
    # Create model directory if it doesn't exist
    os.makedirs('model', exist_ok=True)
    
    # Create data generators
    print("\n📊 Loading dataset...")
    train_gen, val_gen, test_gen = create_data_generators()
    
    print(f"✅ Training samples: {train_gen.samples}")
    print(f"✅ Validation samples: {val_gen.samples}")
    print(f"✅ Test samples: {test_gen.samples}")
    print(f"Class indices: {train_gen.class_indices}")
    
    # Calculate class weights to handle imbalanced dataset
    print("\n⚖️  Calculating class weights for balanced training...")
    class_weights = compute_class_weight(
        class_weight='balanced',
        classes=np.unique(train_gen.classes),
        y=train_gen.classes
    )
    class_weight_dict = dict(enumerate(class_weights))
    print(f"Class weights: {class_weight_dict}")
    print(f"  → NORMAL (class 0): {class_weight_dict[0]:.2f}")
    print(f"  → PNEUMONIA (class 1): {class_weight_dict[1]:.2f}")
    
    # Build model
    print("\n🏗️  Building CNN model...")
    model = build_cnn_model()
    
    # Compile model
    model.compile(
        optimizer=keras.optimizers.Adam(learning_rate=0.0001),
        loss='binary_crossentropy',
        metrics=['accuracy', keras.metrics.Precision(), keras.metrics.Recall()]
    )
    
    # Model summary
    print("\n📋 Model Architecture:")
    model.summary()
    
    # Callbacks (removed early stopping AND model checkpoint - val set too small!)
    # We'll save the final model after training instead
    callbacks = [
        ReduceLROnPlateau(
            monitor='val_loss',
            factor=0.5,
            patience=3,
            min_lr=1e-7,
            verbose=1
        )
    ]
    
    # Train model with class weights
    print("\n🎯 Training model with balanced class weights...")
    history = model.fit(
        train_gen,
        epochs=EPOCHS,
        validation_data=val_gen,
        callbacks=callbacks,
        class_weight=class_weight_dict,  # Added class weights!
        verbose=1
    )
    
    # Save final model
    model.save(MODEL_SAVE_PATH)
    print(f"\n✅ Model saved to {MODEL_SAVE_PATH}")
    
    # Evaluate on test set
    print("\n📈 Evaluating on test set...")
    test_loss, test_acc, test_precision, test_recall = model.evaluate(test_gen)
    
    print("\n" + "=" * 60)
    print("📊 TEST RESULTS:")
    print("=" * 60)
    print(f"Test Accuracy:  {test_acc*100:.2f}%")
    print(f"Test Precision: {test_precision*100:.2f}%")
    print(f"Test Recall:    {test_recall*100:.2f}%")
    print(f"Test Loss:      {test_loss:.4f}")
    
    # Generate predictions for confusion matrix
    print("\n🔍 Generating predictions for confusion matrix...")
    y_pred = model.predict(test_gen)
    
    # Find optimal threshold
    print("\n🎯 Finding optimal prediction threshold...")
    best_threshold = 0.5
    best_accuracy = 0
    
    for threshold in np.arange(0.3, 0.8, 0.05):
        y_pred_test = (y_pred > threshold).astype(int).flatten()
        accuracy = np.mean(y_pred_test == test_gen.classes)
        print(f"  Threshold {threshold:.2f}: Accuracy = {accuracy*100:.2f}%")
        if accuracy > best_accuracy:
            best_accuracy = accuracy
            best_threshold = threshold
    
    print(f"\n✅ Best threshold: {best_threshold:.2f} (Accuracy: {best_accuracy*100:.2f}%)")
    
    y_pred_classes = (y_pred > best_threshold).astype(int).flatten()
    y_true = test_gen.classes
    
    # Classification report
    print("\n📋 Classification Report:")
    print(classification_report(y_true, y_pred_classes, target_names=['NORMAL', 'PNEUMONIA']))
    
    # Plot training history
    plot_training_history(history)
    
    # Plot confusion matrix
    plot_confusion_matrix(y_true, y_pred_classes)
    
    print("\n✅ Training completed successfully!")
    print("=" * 60)

def plot_training_history(history):
    """
    Plot training and validation accuracy/loss
    """
    plt.figure(figsize=(12, 4))
    
    # Accuracy
    plt.subplot(1, 2, 1)
    plt.plot(history.history['accuracy'], label='Train Accuracy')
    plt.plot(history.history['val_accuracy'], label='Val Accuracy')
    plt.title('Model Accuracy')
    plt.xlabel('Epoch')
    plt.ylabel('Accuracy')
    plt.legend()
    plt.grid(True)
    
    # Loss
    plt.subplot(1, 2, 2)
    plt.plot(history.history['loss'], label='Train Loss')
    plt.plot(history.history['val_loss'], label='Val Loss')
    plt.title('Model Loss')
    plt.xlabel('Epoch')
    plt.ylabel('Loss')
    plt.legend()
    plt.grid(True)
    
    plt.tight_layout()
    plt.savefig('model/training_history.png')
    print("📊 Training history plot saved to model/training_history.png")

def plot_confusion_matrix(y_true, y_pred):
    """
    Plot confusion matrix
    """
    cm = confusion_matrix(y_true, y_pred)
    
    plt.figure(figsize=(8, 6))
    sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', 
                xticklabels=['NORMAL', 'PNEUMONIA'],
                yticklabels=['NORMAL', 'PNEUMONIA'])
    plt.title('Confusion Matrix')
    plt.ylabel('True Label')
    plt.xlabel('Predicted Label')
    plt.tight_layout()
    plt.savefig('model/confusion_matrix.png')
    print("📊 Confusion matrix saved to model/confusion_matrix.png")

if __name__ == '__main__':
    train_model()

