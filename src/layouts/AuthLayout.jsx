import React from "react";
import { Outlet } from "react-router";
import Logo from "../components/Logo";
import authImage from "../assets/banner2.jpeg";
const AuthLayout = () => {
  return (
    <div className="max-w-5xl mx-auto pt-5 transition-colors duration-300 bg-white">
      <Logo></Logo>
      <div className="flex items-center h-full mt-5 rounded-lg overflow-hidden transition-colors duration-300 bg-white">
        <div className="flex-2">
          <Outlet></Outlet>
        </div>
        <div className="flex-1">
          <img src={authImage} alt="" />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
