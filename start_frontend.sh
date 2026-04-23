#!/bin/bash

echo "🚀 Starting Pneumonia Detection Frontend..."
echo ""

# Navigate to frontend directory
cd frontend

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Start React development server
echo "🎯 Starting React server on port 3000..."
echo ""
npm start

