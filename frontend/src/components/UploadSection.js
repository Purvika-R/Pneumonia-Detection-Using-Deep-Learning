// src/components/UploadSection.js
// Preserves the original drag-and-drop upload UI.
// Additionally passes a local preview URL up to the parent via onPreviewChange
// so ResultSection can show the original image alongside the heatmap.

import React, { useState, useCallback } from "react";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";

export default function UploadSection({ onResult, onPreviewChange, onLoading }) {
  const [dragging, setDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");

  const handleFile = useCallback(
    (file) => {
      if (!file) return;
      const allowed = ["image/jpeg", "image/png", "image/gif", "image/bmp", "image/webp"];
      if (!allowed.includes(file.type)) {
        setError("Please upload a valid image file (JPG, PNG, BMP, WEBP).");
        return;
      }
      setError("");
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreview(url);
      onPreviewChange && onPreviewChange(url);
    },
    [onPreviewChange]
  );

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragging(false);
      handleFile(e.dataTransfer.files[0]);
    },
    [handleFile]
  );

  const handleInputChange = (e) => handleFile(e.target.files[0]);

  const handleSubmit = async () => {
    if (!selectedFile) {
      setError("Please select an image first.");
      return;
    }
    setError("");
    onLoading && onLoading(true);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const { data } = await axios.post(`${BACKEND_URL}/predict`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onResult && onResult(data);
    } catch (err) {
      const msg =
        err.response?.data?.error || "Prediction failed. Is the backend running?";
      setError(msg);
      onResult && onResult(null);
    } finally {
      onLoading && onLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Upload Chest X-Ray</h2>

      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-10 cursor-pointer transition-colors ${
          dragging ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-gray-50 hover:border-blue-400"
        }`}
        onClick={() => document.getElementById("xray-input").click()}
      >
        <input
          id="xray-input"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleInputChange}
        />

        {preview ? (
          <img
            src={preview}
            alt="Selected X-Ray"
            className="max-h-56 rounded-lg object-contain"
          />
        ) : (
          <>
            <span className="text-5xl mb-3">🫁</span>
            <p className="text-gray-500 text-sm text-center">
              Drag & drop an X-ray image here, or{" "}
              <span className="text-blue-600 font-semibold">browse</span>
            </p>
            <p className="text-xs text-gray-400 mt-1">PNG, JPG, BMP, WEBP supported</p>
          </>
        )}
      </div>

      {selectedFile && (
        <p className="text-xs text-gray-400 mt-2 truncate">
          📎 {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
        </p>
      )}

      {error && (
        <p className="text-sm text-red-500 mt-2">⚠️ {error}</p>
      )}

      <button
        onClick={handleSubmit}
        disabled={!selectedFile}
        className="mt-4 w-full py-3 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        Analyse X-Ray
      </button>
    </div>
  );
}