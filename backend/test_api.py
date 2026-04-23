"""
Simple script to test the Flask API endpoints
Run this after starting the Flask server to verify everything works
"""

import requests
import json

BASE_URL = "http://localhost:8000"

def test_health_check():
    """Test the health check endpoint"""
    print("🧪 Testing Health Check Endpoint...")
    try:
        response = requests.get(f"{BASE_URL}/")
        if response.status_code == 200:
            data = response.json()
            print("✅ Health check passed!")
            print(f"   Status: {data.get('status')}")
            print(f"   Model loaded: {data.get('model_loaded')}")
            print(f"   Database connected: {data.get('database_connected')}")
            return True
        else:
            print(f"❌ Health check failed with status code: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return False

def test_stats_endpoint():
    """Test the statistics endpoint"""
    print("\n🧪 Testing Statistics Endpoint...")
    try:
        response = requests.get(f"{BASE_URL}/stats")
        if response.status_code == 200:
            data = response.json()
            print("✅ Statistics endpoint working!")
            print(f"   Total predictions: {data.get('total_predictions')}")
            print(f"   Pneumonia detected: {data.get('pneumonia_detected')}")
            print(f"   Normal detected: {data.get('normal_detected')}")
            return True
        else:
            print(f"❌ Stats endpoint failed with status code: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return False

def test_history_endpoint():
    """Test the history endpoint"""
    print("\n🧪 Testing History Endpoint...")
    try:
        response = requests.get(f"{BASE_URL}/history")
        if response.status_code == 200:
            data = response.json()
            print("✅ History endpoint working!")
            print(f"   Records found: {data.get('count')}")
            return True
        else:
            print(f"❌ History endpoint failed with status code: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return False

def test_predict_endpoint_no_file():
    """Test the predict endpoint without a file (should fail gracefully)"""
    print("\n🧪 Testing Predict Endpoint (no file)...")
    try:
        response = requests.post(f"{BASE_URL}/predict")
        if response.status_code == 400:
            print("✅ Predict endpoint correctly rejects empty requests!")
            return True
        else:
            print(f"⚠️  Unexpected status code: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return False

def main():
    """Run all tests"""
    print("=" * 60)
    print("🚀 Testing Pneumonia Detection API")
    print("=" * 60)
    print(f"Base URL: {BASE_URL}")
    print()
    
    results = []
    results.append(test_health_check())
    results.append(test_stats_endpoint())
    results.append(test_history_endpoint())
    results.append(test_predict_endpoint_no_file())
    
    print("\n" + "=" * 60)
    print("📊 TEST SUMMARY")
    print("=" * 60)
    passed = sum(results)
    total = len(results)
    print(f"Passed: {passed}/{total}")
    
    if passed == total:
        print("✅ All tests passed!")
    else:
        print(f"⚠️  {total - passed} test(s) failed")
    
    print("\n💡 To test image upload:")
    print("   1. Start the frontend: cd frontend && npm start")
    print("   2. Open http://localhost:3000")
    print("   3. Upload a chest X-ray image")

if __name__ == "__main__":
    main()

