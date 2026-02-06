import React from "react";
import { Link } from "react-router";
import banner from "../../assets/banner3.jpeg";
const Banner = () => {
  return (
    <div
      className="hero min-h-[600px]"
      style={{
        backgroundImage: `url(${banner})`,
      }}
    >
      <div className="hero-overlay bg-opacity-70 bg-black/60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-2xl">
          <h1 className="mb-5 text-5xl font-bold text-white">
            Unlock Your Future with{" "}
            <span className="bg-gradient-to-r from-[#654ea3] to-[#eaafc8] text-transparent bg-clip-text">
              ScholarStream
            </span>
          </h1>
          <p className="mb-8 text-lg text-gray-200 font-semibold">
            Discover thousands of scholarship opportunities tailored just for
            you. Whether you're an undergraduate, graduate, or doctoral student,
            ScholarStream connects you with the financial aid you need to
            achieve your academic dreams.
          </p>
          <Link
            to="/all-scholarships"
            className="btn bg-gradient-to-r from-[#654ea3] to-[#eaafc8] border-none btn-lg"
          >
            Search Scholarships
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
