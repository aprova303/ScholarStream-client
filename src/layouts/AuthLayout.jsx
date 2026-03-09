import React from "react";
import { Outlet } from "react-router";
import Logo from "../components/Logo";
import authImage from "../assets/banner2.jpeg";
import useThemeContext from "../hooks/useThemContext";

const AuthLayout = () => {
  const { theme } = useThemeContext();

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${theme === "light" ? "bg-gray-50" : "bg-gray-950"}`}
    >
      {/* Header */}
      <div
        className={`${theme === "light" ? "bg-white" : "bg-gray-900 text-white"} shadow-sm sticky top-0 z-40`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Logo />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center rounded-2xl overflow-hidden shadow-2xl ${theme === "light" ? "bg-white" : "bg-gray-900"}`}
        >
          {/* Form Section */}
          <div
            className={`p-6 sm:p-8 lg:p-12 ${theme === "light" ? "bg-white" : "bg-gray-900"}`}
          >
            <Outlet />
          </div>

          {/* Image Section */}
          <div className="hidden lg:flex items-center justify-center p-8 lg:p-12">
            <div className="relative w-full aspect-square lg:aspect-auto lg:h-full rounded-xl overflow-hidden shadow-lg">
              <img
                src={authImage}
                alt="ScholarStream"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div
          className={`mt-8 text-center text-sm ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}
        >
          <p>Secure • Fast • Reliable</p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
