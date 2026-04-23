from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import tensorflow as tf
import os
from werkzeug.utils import secure_filename
from config import Config
from utils import (
    allowed_file, 
    preprocess_image, 
    get_prediction_label, 
    save_prediction_to_db,
    create_upload_folder
)

# Initialize Flask app
app = Flask(__name__)
app.config.from_object(Config)
# Configure CORS for production domains if provided
allowed_origin = os.environ.get("FRONTEND_URL")
if allowed_origin:
    CORS(app, resources={r"/*": {"origins": [allowed_origin]}})
else:
    CORS(app)

# Create upload folder
create_upload_folder()

# MongoDB connection
try:
    client = MongoClient(Config.MONGO_URI)
    db = client.pneumonia_db
    print("✅ Connected to MongoDB")
except Exception as e:
    print(f"❌ MongoDB connection error: {str(e)}")
    db = None

# Load the trained model
model = None
try:
    if os.path.exists(Config.MODEL_PATH):
        model = tf.keras.models.load_model(Config.MODEL_PATH)
        print("✅ Model loaded successfully")
    else:
        print("⚠️  Model file not found. Please train the model first.")
except Exception as e:
    print(f"❌ Error loading model: {str(e)}")

@app.route('/', methods=['GET'])
def home():
    """Health check endpoint"""
    return jsonify({
        'status': 'running',
        'message': 'Pneumonia Detection API is running',
        'model_loaded': model is not None,
        'database_connected': db is not None
    })

@app.route('/predict', methods=['POST'])
def predict():
    """
    Main prediction endpoint
    Accepts image file and returns prediction
    """
    # Check if model is loaded
    if model is None:
        return jsonify({
            'error': 'Model not loaded. Please train the model first.'
        }), 500
    
    # Check if file is in request
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400
    
    file = request.files['file']
    
    # Check if file is selected
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400
    
    # Check if file is allowed
    if not allowed_file(file.filename):
        return jsonify({
            'error': 'Invalid file type. Only PNG, JPG, JPEG allowed.'
        }), 400
    
    try:
        # Save uploaded file
        filename = secure_filename(file.filename)
        filepath = os.path.join(Config.UPLOAD_FOLDER, filename)
        file.save(filepath)
        
        # Preprocess image
        img_array = preprocess_image(filepath)
        if img_array is None:
            return jsonify({'error': 'Error processing image'}), 500
        
        # Make prediction
        prediction = model.predict(img_array)
        prediction_value = prediction[0][0]
        
        # Calculate confidence (using optimal threshold 0.50 from Transfer Learning)
        confidence = float(prediction_value) if prediction_value >= 0.50 else float(1 - prediction_value)
        
        # Get prediction label
        label = get_prediction_label(prediction_value, confidence)
        
        # Save to database
        if db is not None:
            save_prediction_to_db(db, filename, label, confidence)
        
        # Clean up uploaded file (optional)
        # os.remove(filepath)
        
        # Return result
        return jsonify({
            'prediction': label,
            'confidence': round(confidence * 100, 2),
            'filename': filename
        })
    
    except Exception as e:
        return jsonify({'error': f'Prediction failed: {str(e)}'}), 500

@app.route('/history', methods=['GET'])
def get_history():
    """
    Get prediction history from database
    """
    if db is None:
        return jsonify({'error': 'Database not connected'}), 500
    
    try:
        # Get last 10 predictions
        predictions = list(db.predictions.find(
            {}, 
            {'_id': 0}
        ).sort('timestamp', -1).limit(10))
        
        return jsonify({
            'history': predictions,
            'count': len(predictions)
        })
    except Exception as e:
        return jsonify({'error': f'Failed to fetch history: {str(e)}'}), 500

@app.route('/stats', methods=['GET'])
def get_stats():
    """
    Get prediction statistics
    """
    if db is None:
        return jsonify({'error': 'Database not connected'}), 500
    
    try:
        total = db.predictions.count_documents({})
        pneumonia_count = db.predictions.count_documents({'result': 'PNEUMONIA'})
        normal_count = db.predictions.count_documents({'result': 'NORMAL'})
        
        return jsonify({
            'total_predictions': total,
            'pneumonia_detected': pneumonia_count,
            'normal_detected': normal_count
        })
    except Exception as e:
        return jsonify({'error': f'Failed to fetch stats: {str(e)}'}), 500

if __name__ == '__main__':
    port = int(os.environ.get("PORT", Config.BACKEND_PORT))
    debug = os.environ.get("FLASK_DEBUG", "1") == "1"
    print(f"🚀 Starting Flask server on port {port}")
    app.run(
        host='0.0.0.0',
        port=port,
        debug=debug
    )

