import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-bg text-gray-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl font-bold mb-6 leading-tight animate-slide-up">
                AI-Powered Pneumonia Detection
              </h1>
              <p className="text-xl mb-8 text-gray-700 animate-fade-in stagger-1">
                Upload a chest X-ray image and get instant, accurate pneumonia
                detection powered by advanced deep learning technology.
              </p>
              <div className="flex flex-wrap gap-4 animate-scale-in stagger-2">
                <Link
                  to="/detect"
                  className="btn-3d bg-primary-dark text-white px-8 py-3 rounded-lg font-semibold hover:bg-olive-dark transition-colors duration-200 shadow-lg"
                >
                  Start Detection
                </Link>
                <Link
                  to="/about"
                  className="btn-3d bg-white text-primary-dark px-8 py-3 rounded-lg font-semibold hover:bg-primary-lighter transition-colors duration-200 border-2 border-primary-dark"
                >
                  Learn More
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12 animate-slide-up stagger-3">
                <div className="text-center transform hover:scale-110 transition-transform duration-300">
                  <div className="text-3xl font-bold text-primary-dark">
                    90.54%
                  </div>
                  <div className="text-gray-600 text-sm">Accuracy</div>
                </div>
                <div className="text-center transform hover:scale-110 transition-transform duration-300">
                  <div className="text-3xl font-bold text-primary-dark">
                    &lt;2s
                  </div>
                  <div className="text-gray-600 text-sm">Analysis Time</div>
                </div>
                <div className="text-center transform hover:scale-110 transition-transform duration-300">
                  <div className="text-3xl font-bold text-primary-dark">
                    24/7
                  </div>
                  <div className="text-gray-600 text-sm">Available</div>
                </div>
              </div>
            </div>

            <div className="hidden md:block perspective-container">
              <div className="bg-white/30 backdrop-blur-lg rounded-2xl p-8 border border-primary-light float-animation card-3d">
                <svg
                  className="w-full h-64 text-primary-dark opacity-80"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-primary-lighter">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose PneumoAI?
            </h2>
            <p className="text-xl text-gray-600">
              Advanced technology meets healthcare accessibility
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 perspective-container">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-xl shadow-lg card-3d animate-slide-up stagger-1">
              <div className="bg-primary-light w-16 h-16 rounded-full flex items-center justify-center mb-6 transform hover:rotate-12 transition-transform duration-300">
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
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Fast Analysis
              </h3>
              <p className="text-gray-600">
                Get results in under 2 seconds. Our optimized deep learning
                model provides instant feedback on chest X-ray images.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-xl shadow-lg card-3d animate-slide-up stagger-2">
              <div className="bg-primary-light w-16 h-16 rounded-full flex items-center justify-center mb-6 transform hover:rotate-12 transition-transform duration-300">
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                High Accuracy
              </h3>
              <p className="text-gray-600">
                Powered by VGG16 Transfer Learning with 90.54% accuracy on test
                data. Trained on thousands of chest X-ray images.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-xl shadow-lg card-3d animate-slide-up stagger-3">
              <div className="bg-primary-light w-16 h-16 rounded-full flex items-center justify-center mb-6 transform hover:rotate-12 transition-transform duration-300">
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
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Secure & Private
              </h3>
              <p className="text-gray-600">
                Your medical images are processed securely and not permanently
                stored. Privacy and data security are our top priorities.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-8 rounded-xl shadow-lg card-3d animate-slide-up stagger-4">
              <div className="bg-primary-light w-16 h-16 rounded-full flex items-center justify-center mb-6 transform hover:rotate-12 transition-transform duration-300">
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
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                AI Technology
              </h3>
              <p className="text-gray-600">
                Built with TensorFlow and VGG16 architecture. State-of-the-art
                deep learning for medical image analysis.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white p-8 rounded-xl shadow-lg card-3d animate-slide-up stagger-5">
              <div className="bg-primary-light w-16 h-16 rounded-full flex items-center justify-center mb-6 transform hover:rotate-12 transition-transform duration-300">
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
                    d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Statistics Dashboard
              </h3>
              <p className="text-gray-600">
                Track prediction history and view comprehensive statistics.
                Monitor detection trends over time.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white p-8 rounded-xl shadow-lg card-3d animate-slide-up stagger-6">
              <div className="bg-primary-light w-16 h-16 rounded-full flex items-center justify-center mb-6 transform hover:rotate-12 transition-transform duration-300">
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
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Easy to Use
              </h3>
              <p className="text-gray-600">
                Simple drag-and-drop interface. No technical knowledge required.
                Upload your X-ray and get instant results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Three simple steps to get your results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center perspective-container">
              <div className="bg-primary-dark text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 card-3d shadow-lg">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Upload X-Ray
              </h3>
              <p className="text-gray-600">
                Simply drag and drop or click to upload a chest X-ray image in
                JPG, PNG, or JPEG format.
              </p>
            </div>

            <div className="text-center perspective-container">
              <div className="bg-primary-dark text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 card-3d shadow-lg">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                AI Analysis
              </h3>
              <p className="text-gray-600">
                Our deep learning model analyzes the image using advanced VGG16
                architecture in real-time.
              </p>
            </div>

            <div className="text-center perspective-container">
              <div className="bg-primary-dark text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 card-3d shadow-lg">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Get Results
              </h3>
              <p className="text-gray-600">
                Receive instant predictions with confidence scores indicating
                NORMAL or PNEUMONIA status.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-dark text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Try It Out?</h2>
          <p className="text-xl mb-8 text-primary-lighter">
            Experience the power of AI-driven pneumonia detection today
          </p>
          <Link
            to="/detect"
            className="btn-3d inline-block bg-white text-primary-dark px-10 py-4 rounded-lg font-semibold text-lg hover:bg-primary-lighter transition-colors duration-200 shadow-xl"
          >
            Start Free Detection
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
