import axios from "axios";
import useAuth from "../hooks/useAuth";

const useAxiosSecure = () => {
  const { token } = useAuth();

  const axiosSecure = axios.create({
    baseURL: "http://localhost:3000",
  });

  // Add the token to request headers
  if (token) {
    axiosSecure.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return axiosSecure;
};

export default useAxiosSecure;
