# 🎯 Complete Setup Guide

## 📦 What You Have

A complete full-stack Pneumonia Detection AI system with:

✅ **Backend** - Flask API with TensorFlow  
✅ **Frontend** - React with Tailwind CSS  
✅ **Database** - MongoDB integration  
✅ **AI Model** - CNN training script  
✅ **Documentation** - Complete guides  
✅ **Scripts** - Easy startup scripts

---

## 🚀 Quick Start (5 Steps)

### Step 1: Install MongoDB

```bash
# macOS
brew install mongodb-community
brew services start mongodb-community

# Verify it's running
mongosh
# (Type 'exit' to quit)
```

### Step 2: Setup Backend

```bash
cd backend

# Create virtual environment
python3 -m venv venv

# Activate it
source venv/bin/activate

# Install dependencies (takes ~2-3 minutes)
pip install -r requirements.txt
```

### Step 3: Setup Frontend

```bash
cd frontend

# Install dependencies (takes ~1-2 minutes)
npm install
```

### Step 4: Download Dataset & Train Model

```bash
# 1. Download dataset from Kaggle:
# https://www.kaggle.com/datasets/paultimothymooney/chest-xray-pneumonia

# 2. Extract to: dataset/chest_xray/

# 3. Train the model
cd backend
source venv/bin/activate
python train_model.py
# ⏱️ Takes 30-60 minutes
```

### Step 5: Run the Application

**Terminal 1 (Backend):**

```bash
./start_backend.sh
# Or manually:
# cd backend && source venv/bin/activate && python app.py
```

**Terminal 2 (Frontend):**

```bash
./start_frontend.sh
# Or manually:
# cd frontend && npm start
```

**Open**: http://localhost:3000

---

## 📂 Project Structure

```
Pneumonia/
│
├── 📄 README.md              ← Full documentation
├── 📄 QUICKSTART.md          ← Quick start guide
├── 📄 PROJECT_INFO.md        ← Technical details
├── 📄 SETUP_GUIDE.md         ← This file
│
├── 🔧 .gitignore             ← Git ignore rules
├── 🚀 start_backend.sh       ← Backend startup script
├── 🚀 start_frontend.sh      ← Frontend startup script
│
├── 🗂️ backend/
│   ├── app.py                ← Main Flask application
│   ├── config.py             ← Configuration
│   ├── utils.py              ← Helper functions
│   ├── train_model.py        ← Model training
│   ├── test_api.py           ← API testing
│   ├── requirements.txt      ← Python packages
│   ├── .env                  ← Environment variables
│   ├── model/                ← Trained model directory
│   │   └── .gitkeep
│   └── uploads/              ← Uploaded images
│       └── .gitkeep
│
├── 🗂️ frontend/
│   ├── package.json          ← Node dependencies
│   ├── tailwind.config.js    ← Tailwind config
│   ├── postcss.config.js     ← PostCSS config
│   ├── .gitignore            ← Frontend ignore
│   ├── public/
│   │   └── index.html        ← HTML template
│   └── src/
│       ├── App.js            ← Main React app
│       ├── index.js          ← Entry point
│       ├── index.css         ← Global styles
│       └── components/       ← React components
│           ├── Header.js
│           ├── UploadSection.js
│           ├── ResultSection.js
│           └── StatsSection.js
│
└── 🗂️ dataset/               ← Dataset directory
    └── .gitkeep              ← (Download from Kaggle)
```

---

## 🔍 Understanding the Flow

### 1. User Journey

```
User opens app → Uploads X-ray → Clicks "Analyze" → Sees result
```

### 2. Technical Flow

```
React Frontend (Port 3000)
    ↓ (axios POST request)
Flask Backend (Port 8000)
    ↓ (loads & preprocesses image)
TensorFlow Model
    ↓ (prediction)
MongoDB Database
    ↓ (saves result)
React Frontend
    ↓ (displays result)
User sees prediction + confidence
```

### 3. File Processing

```
1. User selects image file
2. Frontend validates file (type, size)
3. Sends as multipart/form-data to /predict
4. Backend saves to uploads/ directory
5. Preprocesses: resize → normalize → add batch dimension
6. Model predicts: output is probability [0-1]
7. Convert to label: <0.5 = NORMAL, ≥0.5 = PNEUMONIA
8. Calculate confidence percentage
9. Save to MongoDB with timestamp
10. Return JSON response to frontend
11. Frontend displays result with UI
```

---

## 🎨 Features You Built

### Backend API

- ✅ `/` - Health check
- ✅ `/predict` - Main prediction endpoint
- ✅ `/history` - Get recent predictions
- ✅ `/stats` - Get statistics

### Frontend UI

- ✅ Drag & drop file upload
- ✅ Image preview
- ✅ Loading animations
- ✅ Result display with confidence
- ✅ Statistics dashboard
- ✅ Responsive design
- ✅ Beautiful Tailwind CSS styling

### AI Model

- ✅ 4-layer CNN architecture
- ✅ Data augmentation
- ✅ Dropout for regularization
- ✅ Early stopping
- ✅ Model checkpointing
- ✅ Evaluation metrics

### Database

- ✅ MongoDB integration
- ✅ Predictions storage
- ✅ Timestamp tracking
- ✅ Statistics aggregation

---

## ⚙️ Environment Variables

Located in `backend/.env`:

```env
BACKEND_PORT=8000                               # Flask server port
MONGO_URI=mongodb://localhost:27017/pneumonia_db  # MongoDB connection
FRONTEND_URL=http://localhost:3000              # Frontend URL
FLASK_ENV=development                           # Development mode
```

---

## 🧪 Testing

### 1. Test Backend API

```bash
cd backend
source venv/bin/activate
python test_api.py
```

### 2. Test with Real Images

1. Open http://localhost:3000
2. Use test images from `dataset/chest_xray/test/`
3. Upload NORMAL image → should predict NORMAL
4. Upload PNEUMONIA image → should predict PNEUMONIA

---

## 🐛 Common Issues & Solutions

### Issue: "Module not found"

```bash
# Solution: Activate virtual environment
cd backend
source venv/bin/activate
pip install -r requirements.txt
```

### Issue: "Model file not found"

```bash
# Solution: Train the model
cd backend
source venv/bin/activate
python train_model.py
```

### Issue: "MongoDB connection error"

```bash
# Solution: Start MongoDB
brew services start mongodb-community
# Check status
brew services list
```

### Issue: "Port 3000 already in use"

```bash
# Solution: Kill process or use different port
lsof -ti:3000 | xargs kill -9
# Or
PORT=3001 npm start
```

### Issue: "CORS error"

```bash
# Solution: Check backend is running on port 8000
# Verify flask-cors is installed
pip install flask-cors
```

---

## 📊 Model Training Tips

### Faster Training (For Testing)

In `train_model.py`, reduce epochs:

```python
EPOCHS = 5  # Instead of 25
```

### Better Accuracy

- Use more training data
- Train for more epochs
- Adjust learning rate
- Add more data augmentation

### Monitor Training

Watch the output for:

- Training accuracy
- Validation accuracy
- Loss values
- Early stopping triggers

---

## 🎓 Learning Resources

### What You Can Learn From This Project

1. **Full-Stack Development**

   - React frontend development
   - Flask backend API design
   - REST API integration

2. **Deep Learning**

   - CNN architecture
   - Image preprocessing
   - Model training and evaluation
   - Transfer learning concepts

3. **Database**

   - MongoDB operations
   - Schema design
   - Data aggregation

4. **DevOps**
   - Environment management
   - Dependency management
   - Project structuring

---

## 🚢 Next Steps After Setup

1. **Experiment**: Upload different X-ray images
2. **Customize**: Change colors in Tailwind config
3. **Extend**: Add new features (see PROJECT_INFO.md)
4. **Deploy**: Follow deployment guide in README.md
5. **Learn**: Study the code and understand each part

---

## 📞 Need Help?

1. ✅ Read README.md for detailed docs
2. ✅ Check QUICKSTART.md for quick commands
3. ✅ Review PROJECT_INFO.md for technical details
4. ✅ Look at terminal errors carefully
5. ✅ Verify all services are running

---

## 🎉 You're Ready!

Everything is set up and ready to go. Follow the steps above and you'll have a working AI-powered pneumonia detection system!

**Remember**: This is for educational purposes only. Not for clinical use.

---

**Good luck!** 🚀
