import axios from "axios";
import useAuth from "../hooks/useAuth";
import { useEffect, useRef } from "react";

const useAxiosSecure = () => {
  const { token } = useAuth();
  const axiosSecureRef = useRef(null);

  // Create axios instance once
  if (!axiosSecureRef.current) {
    axiosSecureRef.current = axios.create({
      baseURL: "https://scholar-stream-server-ten.vercel.app",
    });
  }

  const axiosSecure = axiosSecureRef.current;

  // Add token to request headers via interceptor
  useEffect(() => {
    if (token) {
      axiosSecure.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      console.log("Token added to axios headers:", token.slice(0, 20) + "...");
    } else {
      delete axiosSecure.defaults.headers.common["Authorization"];
      console.log("Token removed from axios headers");
    }
  }, [token, axiosSecure]);

  return axiosSecure;
};

export default useAxiosSecure;
