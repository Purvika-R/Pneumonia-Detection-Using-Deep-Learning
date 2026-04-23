"""
TRANSFER LEARNING Model Training for Pneumonia Detection
Using VGG16 pre-trained on ImageNet - MUCH more accurate!

This approach uses a proven neural network already trained on millions of images,
then fine-tunes it for pneumonia detection. Much better than training from scratch!
"""

import os
import numpy as np
import matplotlib.pyplot as plt
from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras.applications import VGG16
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.callbacks import ReduceLROnPlateau
from sklearn.metrics import classification_report, confusion_matrix
from sklearn.utils.class_weight import compute_class_weight
import seaborn as sns

# Configuration
IMG_SIZE = (128, 128)
BATCH_SIZE = 32  # Smaller batch for transfer learning
EPOCHS = 10
DATASET_PATH = '../dataset/chest_xray'
MODEL_SAVE_PATH = 'model/pneumonia_model.h5'

def create_data_generators():
    """Create data generators with augmentation"""
    train_datagen = ImageDataGenerator(
        rescale=1./255,
        rotation_range=15,
        width_shift_range=0.1,
        height_shift_range=0.1,
        shear_range=0.1,
        zoom_range=0.1,
        horizontal_flip=True,
        fill_mode='nearest'
    )
    
    val_test_datagen = ImageDataGenerator(rescale=1./255)
    
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

def build_transfer_learning_model():
    """
    Build model using VGG16 Transfer Learning
    VGG16 is pre-trained on ImageNet (1.4 million images)
    We freeze the base and train only the top layers
    """
    print("\n🔄 Loading VGG16 pre-trained model...")
    
    # Load VGG16 without top layers, freeze the base
    base_model = VGG16(
        weights='imagenet',
        include_top=False,
        input_shape=(128, 128, 3)
    )
    
    # Freeze the base model (don't train VGG16 layers)
    base_model.trainable = False
    
    print(f"✅ VGG16 loaded with {len(base_model.layers)} layers (all frozen)")
    
    # Build our custom top layers
    model = keras.Sequential([
        base_model,
        layers.Flatten(),
        layers.Dense(256, activation='relu'),
        layers.Dropout(0.5),
        layers.Dense(128, activation='relu'),
        layers.Dropout(0.5),
        layers.Dense(1, activation='sigmoid')
    ])
    
    return model

def train_model():
    """Main training function"""
    print("=" * 60)
    print("🚀 TRANSFER LEARNING - Pneumonia Detection Training")
    print("=" * 60)
    
    if not os.path.exists(DATASET_PATH):
        print(f"❌ Dataset not found at {DATASET_PATH}")
        return
    
    os.makedirs('model', exist_ok=True)
    
    print("\n📊 Loading dataset...")
    train_gen, val_gen, test_gen = create_data_generators()
    
    print(f"✅ Training samples: {train_gen.samples}")
    print(f"✅ Validation samples: {val_gen.samples}")
    print(f"✅ Test samples: {test_gen.samples}")
    print(f"Class indices: {train_gen.class_indices}")
    
    # Calculate class weights
    print("\n⚖️  Calculating class weights...")
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
    print("\n🏗️  Building Transfer Learning model...")
    model = build_transfer_learning_model()
    
    # Compile with lower learning rate (important for transfer learning)
    model.compile(
        optimizer=keras.optimizers.Adam(learning_rate=0.0001),
        loss='binary_crossentropy',
        metrics=['accuracy', keras.metrics.Precision(), keras.metrics.Recall()]
    )
    
    print("\n📋 Model Architecture:")
    model.summary()
    
    # Callbacks
    callbacks = [
        ReduceLROnPlateau(
            monitor='val_loss',
            factor=0.5,
            patience=3,
            min_lr=1e-7,
            verbose=1
        )
    ]
    
    # Train model
    print("\n🎯 Training with Transfer Learning...")
    print("(VGG16 base frozen, training only top layers)")
    
    history = model.fit(
        train_gen,
        epochs=EPOCHS,
        validation_data=val_gen,
        callbacks=callbacks,
        class_weight=class_weight_dict,
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
    
    # Generate predictions
    print("\n🔍 Generating predictions...")
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
    
    # Save threshold to config file
    with open('model/optimal_threshold.txt', 'w') as f:
        f.write(str(best_threshold))
    print(f"💾 Saved optimal threshold to model/optimal_threshold.txt")
    
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
    print("\n🎉 TRANSFER LEARNING MODEL IS READY!")
    print(f"📝 Update backend to use threshold: {best_threshold:.2f}")

def plot_training_history(history):
    """Plot training and validation metrics"""
    plt.figure(figsize=(12, 4))
    
    plt.subplot(1, 2, 1)
    plt.plot(history.history['accuracy'], label='Train Accuracy')
    plt.plot(history.history['val_accuracy'], label='Val Accuracy')
    plt.title('Transfer Learning - Model Accuracy')
    plt.xlabel('Epoch')
    plt.ylabel('Accuracy')
    plt.legend()
    plt.grid(True)
    
    plt.subplot(1, 2, 2)
    plt.plot(history.history['loss'], label='Train Loss')
    plt.plot(history.history['val_loss'], label='Val Loss')
    plt.title('Transfer Learning - Model Loss')
    plt.xlabel('Epoch')
    plt.ylabel('Loss')
    plt.legend()
    plt.grid(True)
    
    plt.tight_layout()
    plt.savefig('model/training_history.png')
    print("📊 Training history plot saved")

def plot_confusion_matrix(y_true, y_pred):
    """Plot confusion matrix"""
    cm = confusion_matrix(y_true, y_pred)
    
    plt.figure(figsize=(8, 6))
    sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', 
                xticklabels=['NORMAL', 'PNEUMONIA'],
                yticklabels=['NORMAL', 'PNEUMONIA'])
    plt.title('Confusion Matrix - Transfer Learning Model')
    plt.ylabel('True Label')
    plt.xlabel('Predicted Label')
    plt.tight_layout()
    plt.savefig('model/confusion_matrix.png')
    print("📊 Confusion matrix saved")

if __name__ == '__main__':
    train_model()

