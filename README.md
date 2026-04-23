# 🫁 Pneumonia Detection using Deep Learning

A full-stack web application that uses deep learning to detect pneumonia from chest X-ray images. Built with React, Flask, TensorFlow, and MongoDB.

![Project Banner](https://img.shields.io/badge/AI-Pneumonia%20Detection-blue)
![React](https://img.shields.io/badge/React-18.2.0-61dafb)
![Flask](https://img.shields.io/badge/Flask-3.0.0-black)
![TensorFlow](https://img.shields.io/badge/TensorFlow-2.15.0-orange)
![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green)

---

## 🎯 Features

- **AI-Powered Detection**: CNN model trained on chest X-ray images
- **Real-time Predictions**: Upload an X-ray and get instant results
- **Confidence Score**: See the model's confidence level for each prediction
- **Beautiful UI**: Modern, responsive design with Tailwind CSS
- **Statistics Dashboard**: Track total scans and detection rates
- **MongoDB Integration**: Store all predictions with timestamps
- **RESTful API**: Well-structured backend API

---

## 🏗️ Architecture

```
Frontend (React) → Backend (Flask) → CNN Model (TensorFlow)
                                   ↓
                              MongoDB Database
```

---

## 📁 Project Structure

```
Pneumonia/
├── backend/
│   ├── app.py                    # Flask application
│   ├── config.py                 # Configuration settings
│   ├── utils.py                  # Utility functions
│   ├── train_model.py            # Model training script
│   ├── requirements.txt          # Python dependencies
│   ├── model/                    # Trained model directory
│   │   └── pneumonia_model.h5
│   └── uploads/                  # Uploaded X-ray images
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/           # React components
│   │   │   ├── Header.js
│   │   │   ├── UploadSection.js
│   │   │   ├── ResultSection.js
│   │   │   └── StatsSection.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── dataset/
│   └── chest_xray/               # Dataset (not included)
│       ├── train/
│       ├── test/
│       └── val/
│
├── .env.example                  # Environment variables template
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **Python** (v3.8 or higher)
- **MongoDB** (v4.4 or higher)
- **pip** (Python package manager)
- **npm** or **yarn**

### 1️⃣ Clone the Repository

```bash
cd /Users/kodelaakshay/Documents/programs/Pneumonia
```

### 2️⃣ Setup Environment Variables

```bash
# Copy the example .env file
cp .env.example .env

# Edit .env with your settings (optional)
# Default values work for local development
```

### 3️⃣ Setup Backend

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python3 -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
# venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### 4️⃣ Setup Frontend

```bash
# Navigate to frontend directory (from root)
cd frontend

# Install dependencies
npm install
```

### 5️⃣ Setup MongoDB

#### Option A: Local MongoDB

```bash
# Install MongoDB (macOS with Homebrew)
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB service
brew services start mongodb-community

# Verify MongoDB is running
mongosh
```

#### Option B: MongoDB Atlas (Cloud)

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string
4. Update `MONGO_URI` in `.env` file:
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/pneumonia_db
   ```

---

## 🎓 Training the Model

Before running the application, you need to train the CNN model or use a pre-trained one.

### Download Dataset

1. Download the **Chest X-Ray Pneumonia Dataset** from Kaggle:

   - [Kaggle Dataset Link](https://www.kaggle.com/datasets/paultimothymooney/chest-xray-pneumonia)

2. Extract and place it in the `dataset/` folder:
   ```
   dataset/
   └── chest_xray/
       ├── train/
       │   ├── NORMAL/
       │   └── PNEUMONIA/
       ├── test/
       │   ├── NORMAL/
       │   └── PNEUMONIA/
       └── val/
           ├── NORMAL/
           └── PNEUMONIA/
   ```

### Train the Model

```bash
# Navigate to backend directory
cd backend

# Activate virtual environment
source venv/bin/activate

# Run training script
python train_model.py
```

**Training Time**: ~30-60 minutes (depending on your hardware)

The trained model will be saved as `backend/model/pneumonia_model.h5`

---

## 🏃 Running the Application

You need to run **both** the backend and frontend servers.

### Terminal 1: Start Backend

```bash
# Navigate to backend directory
cd backend

# Activate virtual environment
source venv/bin/activate

# Run Flask server
python app.py
```

Backend will run on: **http://localhost:8000**

### Terminal 2: Start Frontend

```bash
# Navigate to frontend directory
cd frontend

# Start React development server
npm start
```

Frontend will run on: **http://localhost:3000**

### 🎉 Open the Application

Open your browser and go to: **http://localhost:3000**

---

## 📡 API Endpoints

### Health Check

```
GET /
```

Returns API status and health information.

### Predict Pneumonia

```
POST /predict
Content-Type: multipart/form-data
Body: { file: <image_file> }
```

Returns prediction result with confidence score.

**Response:**

```json
{
  "prediction": "PNEUMONIA" | "NORMAL",
  "confidence": 94.5,
  "filename": "xray_image.jpg"
}
```

### Get Prediction History

```
GET /history
```

Returns last 10 predictions from database.

### Get Statistics

```
GET /stats
```

Returns overall statistics (total scans, pneumonia cases, normal cases).

---

## 🧪 Testing the Application

### Sample X-Ray Images

You can test with images from the dataset:

- Normal: `dataset/chest_xray/test/NORMAL/`
- Pneumonia: `dataset/chest_xray/test/PNEUMONIA/`

Or find sample chest X-rays online (ensure they are for educational purposes).

---

## 🎨 UI Features

- **Drag & Drop Upload**: Easy image upload interface
- **Real-time Results**: Instant prediction display
- **Confidence Meter**: Visual confidence indicator
- **Statistics Dashboard**: Track all predictions
- **Responsive Design**: Works on desktop and mobile
- **Loading Animations**: Smooth user experience

---

## 🔧 Configuration

### Backend Configuration (`backend/config.py`)

- `BACKEND_PORT`: Flask server port (default: 8000)
- `MONGO_URI`: MongoDB connection string
- `IMG_SIZE`: Input image size for model (default: 224x224)
- `MAX_CONTENT_LENGTH`: Max upload file size (default: 16MB)

### Frontend Configuration (`frontend/package.json`)

- Port: 3000 (configured in React)
- Proxy: Points to backend at http://localhost:8000

---

## 📊 Model Architecture

```
Input (224x224x3)
    ↓
Conv2D(32) → MaxPooling → Dropout(0.25)
    ↓
Conv2D(64) → MaxPooling → Dropout(0.25)
    ↓
Conv2D(128) → MaxPooling → Dropout(0.25)
    ↓
Conv2D(256) → MaxPooling → Dropout(0.25)
    ↓
Flatten
    ↓
Dense(512) → Dropout(0.5)
    ↓
Dense(256) → Dropout(0.5)
    ↓
Dense(1, sigmoid) → Output
```

---

## 🐛 Troubleshooting

### Backend Issues

**Problem**: `Module not found` error

```bash
# Make sure virtual environment is activated
source venv/bin/activate
pip install -r requirements.txt
```

**Problem**: `Model file not found`

```bash
# Train the model first
python train_model.py
```

**Problem**: `MongoDB connection error`

```bash
# Check if MongoDB is running
brew services list
# Or restart MongoDB
brew services restart mongodb-community
```

### Frontend Issues

**Problem**: `npm install` fails

```bash
# Clear npm cache
npm cache clean --force
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Problem**: Port 3000 already in use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
# Or use a different port
PORT=3001 npm start
```

### CORS Issues

If you encounter CORS errors:

1. Make sure backend is running on port 8000
2. Check `flask-cors` is installed
3. Verify `CORS(app)` is in `app.py`

---

## 📦 Dependencies

### Backend

- Flask 3.0.0
- TensorFlow 2.15.0
- PyMongo 4.6.0
- Pillow 10.1.0
- NumPy 1.24.3

### Frontend

- React 18.2.0
- Axios 1.6.2
- Tailwind CSS 3.3.5

---

## ⚠️ Important Notes

1. **Medical Disclaimer**: This tool is for **educational purposes only**. It should NOT be used for actual medical diagnosis. Always consult qualified healthcare professionals.

2. **Dataset**: The chest X-ray dataset is NOT included in this repository. Download it separately from Kaggle.

3. **Model Performance**: Model accuracy depends on training data quality and quantity. Results may vary.

4. **Privacy**: Do not upload real patient data without proper authorization and privacy compliance.

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Report bugs
- Suggest features
- Submit pull requests

---

## 📝 License

This project is for educational purposes. Please respect the Kaggle dataset license.

---

## 👨‍💻 Author

Built with ❤️ using Cursor IDE

---

## 🙏 Acknowledgments

- Kaggle for the Chest X-Ray Pneumonia Dataset
- TensorFlow team for the deep learning framework
- React community for the amazing UI libraries

---

## 📞 Support

If you encounter any issues:

1. Check the **Troubleshooting** section above
2. Review error messages in terminal
3. Ensure all prerequisites are installed
4. Verify MongoDB is running
5. Check that both servers (frontend & backend) are running

---

**Happy Coding! 🚀**
