# 📋 Project Information

## 🎯 Project Overview

**Name**: Pneumonia Detection using Deep Learning  
**Type**: Full-Stack AI Web Application  
**Purpose**: Educational demonstration of AI-powered medical image analysis

---

## 🏗️ Technology Stack

### Frontend

- **Framework**: React 18.2.0
- **Styling**: Tailwind CSS 3.3.5
- **HTTP Client**: Axios 1.6.2
- **Port**: 3000

### Backend

- **Framework**: Flask 3.0.0
- **Deep Learning**: TensorFlow 2.15.0
- **Image Processing**: Pillow 10.1.0
- **CORS**: flask-cors 4.0.0
- **Port**: 8000

### Database

- **Database**: MongoDB
- **Driver**: PyMongo 4.6.0
- **Collection**: predictions

### AI Model

- **Type**: Convolutional Neural Network (CNN)
- **Input**: 224x224 RGB images
- **Output**: Binary classification (NORMAL/PNEUMONIA)
- **Format**: .h5 (Keras)

---

## 📊 Model Details

### Architecture

```
Input Layer: 224x224x3 (RGB Image)
↓
Conv2D(32, 3x3) + ReLU
MaxPooling2D(2x2)
Dropout(0.25)
↓
Conv2D(64, 3x3) + ReLU
MaxPooling2D(2x2)
Dropout(0.25)
↓
Conv2D(128, 3x3) + ReLU
MaxPooling2D(2x2)
Dropout(0.25)
↓
Conv2D(256, 3x3) + ReLU
MaxPooling2D(2x2)
Dropout(0.25)
↓
Flatten
↓
Dense(512) + ReLU
Dropout(0.5)
↓
Dense(256) + ReLU
Dropout(0.5)
↓
Dense(1) + Sigmoid
↓
Output: Probability [0-1]
```

### Training Parameters

- **Optimizer**: Adam (lr=0.0001)
- **Loss**: Binary Crossentropy
- **Metrics**: Accuracy, Precision, Recall
- **Batch Size**: 32
- **Max Epochs**: 25
- **Early Stopping**: Patience=5

### Data Augmentation

- Rotation: ±20°
- Width/Height Shift: 20%
- Shear: 20%
- Zoom: 20%
- Horizontal Flip: Yes

---

## 🗂️ Database Schema

### Collection: `predictions`

```javascript
{
  _id: ObjectId,
  filename: String,          // "patient_xray.jpg"
  result: String,            // "PNEUMONIA" or "NORMAL"
  confidence: Number,        // 0.0 - 100.0
  timestamp: ISODate         // "2025-10-28T10:30:00.000Z"
}
```

---

## 🔌 API Endpoints

| Method | Endpoint   | Description             | Request             | Response                      |
| ------ | ---------- | ----------------------- | ------------------- | ----------------------------- |
| GET    | `/`        | Health check            | -                   | Status object                 |
| POST   | `/predict` | Analyze X-ray           | multipart/form-data | Prediction result             |
| GET    | `/history` | Get last 10 predictions | -                   | Array of predictions          |
| GET    | `/stats`   | Get statistics          | -                   | Total/Pneumonia/Normal counts |

---

## 📁 File Structure Details

### Backend Files

| File               | Purpose                              |
| ------------------ | ------------------------------------ |
| `app.py`           | Main Flask application & routes      |
| `config.py`        | Configuration settings               |
| `utils.py`         | Helper functions (preprocessing, DB) |
| `train_model.py`   | CNN model training script            |
| `requirements.txt` | Python dependencies                  |
| `test_api.py`      | API testing script                   |

### Frontend Files

| File               | Purpose                    |
| ------------------ | -------------------------- |
| `App.js`           | Main application component |
| `Header.js`        | Navigation header          |
| `UploadSection.js` | Image upload interface     |
| `ResultSection.js` | Prediction display         |
| `StatsSection.js`  | Statistics dashboard       |

---

## 🚀 Deployment Checklist

### Production Considerations

- [ ] Change `SECRET_KEY` in config
- [ ] Use production MongoDB (MongoDB Atlas)
- [ ] Enable HTTPS
- [ ] Set `FLASK_ENV=production`
- [ ] Build React for production (`npm run build`)
- [ ] Use production WSGI server (Gunicorn)
- [ ] Set up proper error logging
- [ ] Implement rate limiting
- [ ] Add authentication (if needed)
- [ ] Optimize model inference
- [ ] Set up monitoring

### Environment Variables (Production)

```env
BACKEND_PORT=8000
SECRET_KEY=<strong-random-key>
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/pneumonia_db
FRONTEND_URL=https://yourdomain.com
FLASK_ENV=production
```

---

## 📈 Performance Metrics

### Expected Model Performance

- **Accuracy**: 85-95%
- **Precision**: 85-95%
- **Recall**: 85-95%
- **Inference Time**: < 1 second

### API Performance

- **Response Time**: < 2 seconds (including preprocessing)
- **Max File Size**: 16 MB
- **Supported Formats**: PNG, JPG, JPEG

---

## 🔒 Security Notes

1. **Input Validation**: File type and size checked
2. **File Sanitization**: Filenames sanitized with `secure_filename`
3. **CORS**: Configured for specified frontend URL
4. **Environment Variables**: Sensitive data in .env
5. **Production**: Use HTTPS and proper authentication

---

## 🧪 Testing

### Manual Testing

```bash
# Test backend API
cd backend
python test_api.py

# Test with sample images
# Upload images from dataset/chest_xray/test/
```

### Frontend Testing

1. Open http://localhost:3000
2. Upload NORMAL image → should predict "NORMAL"
3. Upload PNEUMONIA image → should predict "PNEUMONIA"
4. Check statistics dashboard updates
5. Verify responsive design on mobile

---

## 📚 Dataset Information

**Source**: Kaggle - Chest X-Ray Images (Pneumonia)  
**Link**: https://www.kaggle.com/datasets/paultimothymooney/chest-xray-pneumonia

### Dataset Statistics

- **Total Images**: ~5,863
- **Training Set**: ~5,216
- **Validation Set**: ~16
- **Test Set**: ~624
- **Classes**: NORMAL, PNEUMONIA

---

## 🐛 Known Issues & Limitations

1. **Small Validation Set**: Original dataset has very small validation set
2. **Binary Classification**: Only detects presence/absence of pneumonia
3. **No Disease Type**: Doesn't distinguish bacterial vs viral pneumonia
4. **Educational Only**: Not for clinical use
5. **Model Size**: ~50MB (may need optimization for deployment)

---

## 🔄 Future Enhancements

- [ ] Multi-class classification (bacterial/viral/normal)
- [ ] Grad-CAM visualization for interpretability
- [ ] User authentication system
- [ ] Export prediction reports (PDF)
- [ ] Batch processing for multiple images
- [ ] REST API documentation (Swagger)
- [ ] Docker containerization
- [ ] CI/CD pipeline
- [ ] Model versioning
- [ ] A/B testing framework

---

## 📞 Support & Contact

For issues, improvements, or questions:

1. Check README.md troubleshooting section
2. Review error logs in terminal
3. Verify all services are running
4. Check dataset is properly downloaded

---

**Last Updated**: October 28, 2025  
**Version**: 1.0.0  
**Status**: Development/Educational
