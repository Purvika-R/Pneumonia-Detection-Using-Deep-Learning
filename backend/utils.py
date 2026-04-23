import os
import numpy as np
from PIL import Image
import tensorflow as tf
from datetime import datetime
from config import Config

def allowed_file(filename):
    """Check if file extension is allowed"""
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in Config.ALLOWED_EXTENSIONS

def preprocess_image(image_path):
    """
    Preprocess image for model prediction
    - Load image
    - Resize to model input size
    - Normalize pixel values
    - Add batch dimension
    """
    try:
        # Load and resize image
        img = Image.open(image_path).convert('RGB')
        img = img.resize(Config.IMG_SIZE)
        
        # Convert to numpy array
        img_array = np.array(img)
        
        # Normalize to [0, 1]
        img_array = img_array / 255.0
        
        # Add batch dimension
        img_array = np.expand_dims(img_array, axis=0)
        
        return img_array
    except Exception as e:
        print(f"Error preprocessing image: {str(e)}")
        return None

def get_prediction_label(prediction_value, confidence):
    """
    Convert model prediction to human-readable label
    Optimal threshold: 0.50 (Transfer Learning model - gives 90.54% accuracy)
    """
    if prediction_value >= 0.50:
        label = Config.CLASS_LABELS[1]  # PNEUMONIA
    else:
        label = Config.CLASS_LABELS[0]  # NORMAL
    
    return label

def save_prediction_to_db(db, filename, prediction, confidence):
    """
    Save prediction result to MongoDB
    """
    try:
        prediction_doc = {
            'filename': filename,
            'result': prediction,
            'confidence': float(confidence),
            'timestamp': datetime.utcnow().isoformat()
        }
        db.predictions.insert_one(prediction_doc)
        return True
    except Exception as e:
        print(f"Error saving to database: {str(e)}")
        return False

def create_upload_folder():
    """Create upload folder if it doesn't exist"""
    if not os.path.exists(Config.UPLOAD_FOLDER):
        os.makedirs(Config.UPLOAD_FOLDER)

