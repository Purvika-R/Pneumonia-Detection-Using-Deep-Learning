import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-primary-dark text-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <svg
                className="w-8 h-8 text-primary-light"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              <span className="text-xl font-bold text-white">PneumoAI</span>
            </div>
            <p className="text-gray-300 mb-4">
              AI-powered pneumonia detection using advanced deep learning
              technology. Fast, accurate, and reliable chest X-ray analysis.
            </p>
            <p className="text-sm text-gray-400">
              © 2025 PneumoAI. All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="hover:text-primary-light transition-colors transform inline-block hover:translate-x-1 duration-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/detect"
                  className="hover:text-primary-light transition-colors transform inline-block hover:translate-x-1 duration-200"
                >
                  Detection
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-primary-light transition-colors transform inline-block hover:translate-x-1 duration-200"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Technology</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <span className="text-primary-light">✓</span>
                <span>VGG16 Transfer Learning</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-primary-light">✓</span>
                <span>90.54% Accuracy</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-primary-light">✓</span>
                <span>Real-time Analysis</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-primary-light">✓</span>
                <span>Secure & Private</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>
            ⚠️ Disclaimer: This tool is for educational purposes only. Always
            consult with healthcare professionals for medical diagnosis.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
