import React from "react";

function ResultSection({ result, error, loading }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <svg
          className="w-6 h-6 mr-2 text-green-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        Analysis Result
      </h2>

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center h-64">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-blue-200 rounded-full"></div>
            <div className="w-20 h-20 border-4 border-blue-600 rounded-full animate-spin border-t-transparent absolute top-0 left-0"></div>
          </div>
          <p className="mt-6 text-gray-600 font-medium">
            Analyzing X-ray image...
          </p>
          <p className="mt-2 text-sm text-gray-500">
            This may take a few seconds
          </p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="flex flex-col items-center justify-center h-64">
          <div className="bg-red-100 p-4 rounded-full mb-4">
            <svg
              className="w-12 h-12 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-red-600 font-semibold text-lg">Analysis Failed</p>
          <p className="text-gray-600 text-sm mt-2 text-center">{error}</p>
        </div>
      )}

      {/* Result State */}
      {result && !loading && (
        <div className="space-y-6">
          {/* Prediction Badge */}
          <div
            className={`p-6 rounded-xl border-2 ${
              result.prediction === "PNEUMONIA"
                ? "bg-red-50 border-red-300"
                : "bg-green-50 border-green-300"
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-gray-600">
                Prediction:
              </span>
              <span
                className={`px-4 py-2 rounded-full text-lg font-bold ${
                  result.prediction === "PNEUMONIA"
                    ? "bg-red-600 text-white"
                    : "bg-green-600 text-white"
                }`}
              >
                {result.prediction}
              </span>
            </div>

            {/* Confidence Bar */}
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="font-semibold text-gray-700">Confidence:</span>
                <span className="font-bold text-gray-900">
                  {result.confidence}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-3 rounded-full transition-all duration-500 ${
                    result.prediction === "PNEUMONIA"
                      ? "bg-red-600"
                      : "bg-green-600"
                  }`}
                  style={{ width: `${result.confidence}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Details Card */}
          <div className="bg-gray-50 rounded-xl p-5 space-y-3">
            <h3 className="font-semibold text-gray-800 mb-3">
              Analysis Details
            </h3>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Model:</span>
              <span className="font-medium text-gray-900">
                CNN Deep Learning
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Processed:</span>
              <span className="font-medium text-gray-900">
                {new Date().toLocaleTimeString()}
              </span>
            </div>
            {result.filename && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Filename:</span>
                <span className="font-medium text-gray-900 truncate ml-2 max-w-[200px]">
                  {result.filename}
                </span>
              </div>
            )}
          </div>

          {/* Interpretation */}
          <div
            className={`p-5 rounded-xl ${
              result.prediction === "PNEUMONIA"
                ? "bg-red-50 border border-red-200"
                : "bg-green-50 border border-green-200"
            }`}
          >
            <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              Interpretation
            </h3>
            <p className="text-sm text-gray-700">
              {result.prediction === "PNEUMONIA" ? (
                <>
                  The AI model has detected <strong>signs of pneumonia</strong>{" "}
                  in the X-ray image with {result.confidence}% confidence.
                  Please consult a medical professional for proper diagnosis and
                  treatment.
                </>
              ) : (
                <>
                  The AI model indicates <strong>no signs of pneumonia</strong>{" "}
                  in the X-ray image with {result.confidence}% confidence.
                  However, this does not replace professional medical advice.
                </>
              )}
            </p>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!result && !loading && !error && (
        <div className="flex flex-col items-center justify-center h-64 text-gray-400">
          <svg
            className="w-24 h-24 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <p className="text-lg font-medium">No results yet</p>
          <p className="text-sm mt-2">Upload an X-ray image to get started</p>
        </div>
      )}
    </div>
  );
}

export default ResultSection;
