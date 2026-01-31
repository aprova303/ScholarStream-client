import React from "react";
import { Link } from "react-router";

const Banner = () => {
  return (
    <div
      className="hero min-h-[600px]"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070)",
      }}
    >
      <div className="hero-overlay bg-opacity-70 bg-black/60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-2xl">
          <h1 className="mb-5 text-5xl font-bold text-white">
            Unlock Your Future with ScholarStream
          </h1>
          <p className="mb-8 text-lg text-gray-200">
            Discover thousands of scholarship opportunities tailored just for
            you. Whether you're an undergraduate, graduate, or doctoral student,
            ScholarStream connects you with the financial aid you need to
            achieve your academic dreams.
          </p>
          <Link to="/scholarships" className="btn btn-primary btn-lg">
            Search Scholarships
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
