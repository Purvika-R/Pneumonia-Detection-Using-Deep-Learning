#!/bin/bash

echo "🚀 Starting Pneumonia Detection Backend..."
echo ""

# Navigate to backend directory
cd backend

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "❌ Virtual environment not found!"
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "✅ Activating virtual environment..."
source venv/bin/activate

# Check if dependencies are installed
if [ ! -f "venv/bin/flask" ]; then
    echo "📦 Installing dependencies..."
    pip install -r requirements.txt
fi

# Check if model exists
if [ ! -f "model/pneumonia_model.h5" ]; then
    echo "⚠️  Warning: Model file not found!"
    echo "Please train the model first by running: python train_model.py"
    echo ""
fi

# Start Flask server
echo "🎯 Starting Flask server on port 8000..."
echo ""
python app.py

