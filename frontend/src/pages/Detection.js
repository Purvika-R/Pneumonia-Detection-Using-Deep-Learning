import React, { useState } from "react";
import axios from "axios";
import UploadSection from "../components/UploadSection";
import ResultSection from "../components/ResultSection";
import StatsSection from "../components/StatsSection";

function Detection() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:8000";

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResult(null);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select an image first");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(
        `${API_BASE}/predict`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResult(response.data);
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Failed to analyze image. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen gradient-bg">
      {/* Page Header */}
      <div className="bg-white shadow-sm border-b animate-slide-up">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Pneumonia Detection
          </h1>
          <p className="text-gray-600 text-lg">
            Upload a chest X-ray image for AI-powered analysis
          </p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 perspective-container">
          {/* Upload Section */}
          <div className="animate-scale-in">
            <UploadSection
              selectedFile={selectedFile}
              previewUrl={previewUrl}
              loading={loading}
              onFileSelect={handleFileSelect}
              onUpload={handleUpload}
              onReset={handleReset}
            />
          </div>

          {/* Result Section */}
          <div className="animate-scale-in stagger-1">
            <ResultSection result={result} error={error} loading={loading} />
          </div>
        </div>

        {/* Stats Section */}
        <div className="animate-slide-up stagger-2">
          <StatsSection />
        </div>
      </main>
    </div>
  );
}

export default Detection;
