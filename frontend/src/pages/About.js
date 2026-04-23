import React from "react";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="min-h-screen bg-primary-lighter">
      {/* Header */}
      <section className="bg-primary-dark text-white py-16 animate-slide-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-4">About PneumoAI</h1>
          <p className="text-xl text-primary-lighter">
            Advancing healthcare with artificial intelligence
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-lg text-gray-700 mb-4">
            PneumoAI is an AI-powered medical imaging tool designed to assist in
            the early detection of pneumonia from chest X-ray images. Our
            mission is to make advanced diagnostic technology accessible to
            healthcare providers and contribute to faster, more accurate
            diagnoses.
          </p>
          <p className="text-lg text-gray-700">
            By leveraging state-of-the-art deep learning techniques, we aim to
            support medical professionals in their diagnostic workflow,
            potentially saving lives through early detection.
          </p>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-16 bg-primary-lighter">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            The Technology
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 perspective-container">
            {/* Deep Learning */}
            <div className="bg-white p-8 rounded-xl shadow-lg card-3d animate-scale-in stagger-1">
              <div className="flex items-center mb-4">
                <div className="bg-primary-light p-3 rounded-lg mr-4 transform hover:rotate-12 transition-transform duration-300">
                  <svg
                    className="w-8 h-8 text-primary-dark"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  VGG16 Transfer Learning
                </h3>
              </div>
              <p className="text-gray-700">
                Our model uses VGG16, a proven convolutional neural network
                architecture pre-trained on ImageNet, fine-tuned specifically
                for pneumonia detection in chest X-rays.
              </p>
            </div>

            {/* Training Data */}
            <div className="bg-white p-8 rounded-xl shadow-lg card-3d animate-scale-in stagger-2">
              <div className="flex items-center mb-4">
                <div className="bg-primary-light p-3 rounded-lg mr-4 transform hover:rotate-12 transition-transform duration-300">
                  <svg
                    className="w-8 h-8 text-primary-dark"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Large Dataset
                </h3>
              </div>
              <p className="text-gray-700">
                Trained on thousands of chest X-ray images from the Kaggle Chest
                X-Ray dataset, including both normal and pneumonia cases for
                robust learning.
              </p>
            </div>

            {/* Accuracy */}
            <div className="bg-white p-8 rounded-xl shadow-lg card-3d animate-scale-in stagger-3">
              <div className="flex items-center mb-4">
                <div className="bg-primary-light p-3 rounded-lg mr-4 transform hover:rotate-12 transition-transform duration-300">
                  <svg
                    className="w-8 h-8 text-primary-dark"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  90.54% Accuracy
                </h3>
              </div>
              <p className="text-gray-700">
                Achieved 90.54% accuracy on test data with 94% precision for
                NORMAL cases and 97% recall for PNEUMONIA detection.
              </p>
            </div>

            {/* Real-time */}
            <div className="bg-white p-8 rounded-xl shadow-lg card-3d animate-scale-in stagger-4">
              <div className="flex items-center mb-4">
                <div className="bg-primary-light p-3 rounded-lg mr-4 transform hover:rotate-12 transition-transform duration-300">
                  <svg
                    className="w-8 h-8 text-primary-dark"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Real-time Processing
                </h3>
              </div>
              <p className="text-gray-700">
                Flask backend with optimized model inference provides results in
                under 2 seconds, enabling rapid clinical decision support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Technology Stack
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Frontend */}
            <div className="transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="bg-primary-dark text-white px-3 py-1 rounded mr-2">
                  Frontend
                </span>
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-700">
                  <span className="text-primary-dark mr-2">▸</span>
                  React.js
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="text-primary-dark mr-2">▸</span>
                  Tailwind CSS
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="text-primary-dark mr-2">▸</span>
                  React Router
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="text-primary-dark mr-2">▸</span>
                  Axios
                </li>
              </ul>
            </div>

            {/* Backend */}
            <div className="transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="bg-primary-dark text-white px-3 py-1 rounded mr-2">
                  Backend
                </span>
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-700">
                  <span className="text-primary-dark mr-2">▸</span>
                  Flask (Python)
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="text-primary-dark mr-2">▸</span>
                  TensorFlow/Keras
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="text-primary-dark mr-2">▸</span>
                  MongoDB
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="text-primary-dark mr-2">▸</span>
                  Flask-CORS
                </li>
              </ul>
            </div>

            {/* AI/ML */}
            <div className="transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="bg-primary-dark text-white px-3 py-1 rounded mr-2">
                  AI/ML
                </span>
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-700">
                  <span className="text-primary-dark mr-2">▸</span>
                  VGG16 Architecture
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="text-primary-dark mr-2">▸</span>
                  Transfer Learning
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="text-primary-dark mr-2">▸</span>
                  Data Augmentation
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="text-primary-dark mr-2">▸</span>
                  Class Balancing
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-16 bg-yellow-50 border-t-4 border-primary-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg
                className="w-12 h-12 text-primary-dark"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div className="ml-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Important Disclaimer
              </h3>
              <p className="text-gray-700 mb-4">
                <strong>
                  This tool is for educational and research purposes only.
                </strong>{" "}
                It should not be used as a substitute for professional medical
                advice, diagnosis, or treatment.
              </p>
              <p className="text-gray-700">
                Always seek the advice of qualified healthcare providers with
                any questions you may have regarding a medical condition. Never
                disregard professional medical advice or delay in seeking it
                because of something you have learned from this tool.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Experience It?</h2>
          <p className="text-xl mb-8 text-primary-lighter">
            Try our AI-powered pneumonia detection now
          </p>
          <Link
            to="/detect"
            className="btn-3d inline-block bg-white text-primary-dark px-10 py-4 rounded-lg font-semibold text-lg hover:bg-primary-lighter transition-colors duration-200 shadow-xl"
          >
            Start Detection
          </Link>
        </div>
      </section>
    </div>
  );
}

export default About;
