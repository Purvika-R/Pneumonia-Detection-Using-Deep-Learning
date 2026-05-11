// src/App.js
// Wires up XAI state: passes preview URL from UploadSection to ResultSection.
// All existing layout, routing, and component structure is preserved.

import React, { useState } from "react";
import Header from "./components/Header";
import UploadSection from "./components/UploadSection";
import ResultSection from "./components/ResultSection";
import StatsSection from "./components/StatsSection";

export default function App() {
  const [result, setResult] = useState(null);
  const [previewSrc, setPreviewSrc] = useState(null);  // XAI: track selected image preview
  const [loading, setLoading] = useState(false);

  const handleResult = (data) => {
    setResult(data);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Loading overlay */}
        {loading && (
          <div className="fixed inset-0 bg-white/70 flex items-center justify-center z-50">
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-blue-700 font-medium">Analysing X-Ray…</p>
            </div>
          </div>
        )}

        <UploadSection
          onResult={handleResult}
          onPreviewChange={setPreviewSrc}   // XAI: receive preview URL
          onLoading={setLoading}
        />

        {/* XAI: pass previewSrc alongside result */}
        <ResultSection result={result} previewSrc={previewSrc} />

        <StatsSection />
      </main>
    </div>
  );
}