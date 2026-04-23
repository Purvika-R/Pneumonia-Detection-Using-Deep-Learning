# 🚀 Quick Start Guide

Get up and running in 5 minutes!

## Step 1: Install Dependencies

### Backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### Frontend

```bash
cd frontend
npm install
```

## Step 2: Setup MongoDB

### Option A: Local (Recommended for testing)

```bash
# Install MongoDB
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community
```

### Option B: MongoDB Atlas (Cloud)

1. Create free account at mongodb.com/cloud/atlas
2. Create cluster and get connection string
3. Create `.env` file in root:

```
MONGO_URI=your_connection_string_here
```

## Step 3: Get the Dataset (Required for Training)

1. Download from: https://www.kaggle.com/datasets/paultimothymooney/chest-xray-pneumonia
2. Extract to `dataset/chest_xray/`

## Step 4: Train the Model

```bash
cd backend
source venv/bin/activate
python train_model.py
```

⏱️ This takes ~30-60 minutes. Get a coffee! ☕

## Step 5: Run the Application

### Terminal 1 - Backend:

```bash
cd backend
source venv/bin/activate
python app.py
```

✅ Backend running at http://localhost:8000

### Terminal 2 - Frontend:

```bash
cd frontend
npm start
```

✅ Frontend running at http://localhost:3000

## Step 6: Test It Out!

1. Open http://localhost:3000
2. Upload a chest X-ray image
3. Click "Analyze X-Ray"
4. See the AI prediction! 🎉

---

## 🆘 Having Issues?

### Backend won't start?

- Check MongoDB is running: `brew services list`
- Verify virtual environment: `which python` should show venv path
- Check model exists: `ls backend/model/pneumonia_model.h5`

### Frontend won't start?

- Clear cache: `rm -rf node_modules && npm install`
- Check port 3000 is free: `lsof -ti:3000`

### CORS errors?

- Ensure backend is running on port 8000
- Check `flask-cors` is installed

---

## 📝 Environment Variables (Optional)

Create `.env` file in root directory:

```env
BACKEND_PORT=8000
MONGO_URI=mongodb://localhost:27017/pneumonia_db
FRONTEND_URL=http://localhost:3000
```

Default values work fine for local development!

---

## 🎯 What's Next?

- Check out the full README.md for detailed documentation
- Experiment with different X-ray images
- View statistics dashboard
- Check prediction history

---

**Need Help?** Open an issue or check the Troubleshooting section in README.md
