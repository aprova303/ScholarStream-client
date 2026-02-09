import React from "react";
import { Link } from "react-router";
import { FiArrowLeft } from "react-icons/fi";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="text-center max-w-md">
        {/* 404 Number with animation */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 animate-pulse">
            404
          </h1>
        </div>

        {/* Error Message */}
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Page Not Found
        </h2>

        <p className="text-xl text-gray-600 mb-8">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>

        {/* SVG Illustration */}
        <div className="mb-8">
          <svg
            className="mx-auto w-64 h-48 text-gray-400"
            viewBox="0 0 200 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 60 L40 20 L60 40 L80 10 L100 50 L120 30 L140 60 L160 40 L180 70"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="50" cy="80" r="8" fill="currentColor" />
            <circle cx="150" cy="85" r="8" fill="currentColor" />
          </svg>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center flex-wrap">
          <Link to="/" className="btn btn-primary gap-2">
            <FiArrowLeft size={20} />
            Back to Home
          </Link>

          <Link to="/all-scholarships" className="btn btn-outline btn-primary">
            Browse Scholarships
          </Link>
        </div>

        {/* Additional Info */}
        <div className="mt-12 p-6 bg-white rounded-lg shadow-sm">
          <p className="text-sm text-gray-600">
            If you believe this is a mistake, please{" "}
            <Link to="/#contact" className="link link-primary font-semibold">
              contact us
            </Link>{" "}
            for assistance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
