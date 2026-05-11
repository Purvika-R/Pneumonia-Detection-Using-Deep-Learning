// src/components/ResultSection.js
// Extends the original ResultSection to display Grad-CAM heatmap and
// AI-generated explanation alongside the existing prediction + confidence.

import React, { useState } from "react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";

// ── Confidence meter (preserved from original) ────────────────────────────────
function ConfidenceMeter({ confidence, prediction }) {
  const color =
    prediction === "PNEUMONIA"
      ? "bg-red-500"
      : "bg-green-500";

  return (
    <div className="w-full mt-2">
      <div className="flex justify-between text-sm text-gray-500 mb-1">
        <span>Confidence</span>
        <span className="font-semibold">{confidence.toFixed(1)}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className={`${color} h-3 rounded-full transition-all duration-700`}
          style={{ width: `${confidence}%` }}
        />
      </div>
    </div>
  );
}

// ── Heatmap viewer ────────────────────────────────────────────────────────────
function HeatmapViewer({ originalSrc, heatmapUrl }) {
  const [activeTab, setActiveTab] = useState("side-by-side");

  if (!heatmapUrl) return null;

  const fullHeatmapUrl = `${BACKEND_URL}${heatmapUrl}`;

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
        <span className="text-2xl">🔬</span> Grad-CAM Visualisation
      </h3>

      {/* Tab switcher */}
      <div className="flex gap-2 mb-4">
        {["side-by-side", "original", "heatmap"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {tab === "side-by-side"
              ? "Side by Side"
              : tab === "original"
              ? "Original"
              : "Heatmap"}
          </button>
        ))}
      </div>

      {activeTab === "side-by-side" && (
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col items-center">
            <p className="text-xs text-gray-500 mb-1 font-medium uppercase tracking-wide">
              Original X-Ray
            </p>
            <img
              src={originalSrc}
              alt="Original X-Ray"
              className="w-full rounded-lg object-contain border border-gray-200 shadow-sm bg-black"
              style={{ maxHeight: 280 }}
            />
          </div>
          <div className="flex flex-col items-center">
            <p className="text-xs text-gray-500 mb-1 font-medium uppercase tracking-wide">
              Grad-CAM Overlay
            </p>
            <img
              src={fullHeatmapUrl}
              alt="Grad-CAM Heatmap Overlay"
              className="w-full rounded-lg object-contain border border-gray-200 shadow-sm"
              style={{ maxHeight: 280 }}
            />
          </div>
        </div>
      )}

      {activeTab === "original" && (
        <img
          src={originalSrc}
          alt="Original X-Ray"
          className="w-full rounded-lg object-contain border border-gray-200 shadow-sm bg-black"
          style={{ maxHeight: 400 }}
        />
      )}

      {activeTab === "heatmap" && (
        <img
          src={fullHeatmapUrl}
          alt="Grad-CAM Heatmap Overlay"
          className="w-full rounded-lg object-contain border border-gray-200 shadow-sm"
          style={{ maxHeight: 400 }}
        />
      )}

      {/* Legend */}
      <div className="flex items-center gap-3 mt-3 text-xs text-gray-500">
        <span className="font-medium">Activation scale:</span>
        <div className="flex items-center gap-1">
          <span className="inline-block w-4 h-3 rounded" style={{ background: "blue" }} />
          <span>Low</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="inline-block w-4 h-3 rounded" style={{ background: "green" }} />
          <span>Medium</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="inline-block w-4 h-3 rounded" style={{ background: "red" }} />
          <span>High</span>
        </div>
      </div>
    </div>
  );
}

// ── AI explanation block ───────────────────────────────────────────────────────
function ExplanationBlock({ text }) {
  if (!text) return null;
  return (
    <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-xl">
      <h3 className="text-lg font-semibold text-blue-800 mb-2 flex items-center gap-2">
        <span className="text-xl">🧠</span> AI Explanation
      </h3>
      <p className="text-sm text-blue-900 leading-relaxed">{text}</p>
      <p className="mt-3 text-xs text-blue-500 italic">
        ⚠️ For educational purposes only. Not a substitute for professional medical advice.
      </p>
    </div>
  );
}

// ── Main ResultSection ─────────────────────────────────────────────────────────
export default function ResultSection({ result, previewSrc }) {
  if (!result) return null;

  const isPneumonia = result.prediction === "PNEUMONIA";

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
      {/* ── Prediction badge (original design preserved) ── */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">Analysis Result</h2>
        <span
          className={`px-4 py-1.5 rounded-full text-sm font-bold tracking-wide ${
            isPneumonia
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {isPneumonia ? "🫁 PNEUMONIA" : "✅ NORMAL"}
        </span>
      </div>

      <ConfidenceMeter
        confidence={result.confidence}
        prediction={result.prediction}
      />

      {/* ── XAI: Heatmap ── */}
      <HeatmapViewer
        originalSrc={previewSrc}
        heatmapUrl={result.heatmap_image_url}
      />

      {/* ── XAI: Explanation ── */}
      <ExplanationBlock text={result.explanation_text} />
    </div>
  );
}