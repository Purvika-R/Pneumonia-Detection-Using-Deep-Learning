import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path
      ? "text-primary-dark border-b-2 border-primary-dark"
      : "text-gray-700 hover:text-primary-dark";
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center animate-slide-up">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
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
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-900">PneumoAI</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`${isActive(
                "/"
              )} transition-all duration-200 pb-1 transform hover:scale-105`}
            >
              Home
            </Link>
            <Link
              to="/detect"
              className={`${isActive(
                "/detect"
              )} transition-all duration-200 pb-1 transform hover:scale-105`}
            >
              Detection
            </Link>
            <Link
              to="/about"
              className={`${isActive(
                "/about"
              )} transition-all duration-200 pb-1 transform hover:scale-105`}
            >
              About
            </Link>
            <Link
              to="/detect"
              className="btn-3d bg-primary-dark text-white px-6 py-2 rounded-lg hover:bg-olive-dark transition-colors duration-200"
            >
              Try Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-primary-dark focus:outline-none transform transition-transform duration-200 hover:scale-110"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t animate-slide-up">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive(
                "/"
              )}`}
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/detect"
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive(
                "/detect"
              )}`}
              onClick={() => setIsOpen(false)}
            >
              Detection
            </Link>
            <Link
              to="/about"
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive(
                "/about"
              )}`}
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
