import React from "react";

function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-white bg-opacity-20 p-3 rounded-lg">
              <svg
                className="w-8 h-8"
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
            </div>
            <div>
              <h1 className="text-3xl font-bold">Pneumonia Detection AI</h1>
              <p className="text-blue-100 text-sm">
                Deep Learning powered chest X-ray analysis
              </p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-6 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold">95%</div>
              <div className="text-blue-200">Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">Fast</div>
              <div className="text-blue-200">Results</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
