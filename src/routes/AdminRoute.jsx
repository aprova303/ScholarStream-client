import React from "react";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import { Navigate } from "react-router";

const AdminRoute = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const { role, roleLoading } = useRole();

  if (authLoading || roleLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-dots loading-xl"></span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (role !== "Admin") {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Access Denied
          </h2>
          <p className="text-gray-600 mb-6">
            You are not authorized to access this page. Only Admins can access
            this resource.
          </p>
          <button
            onClick={() => window.history.back()}
            className="btn btn-primary"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return children;
};

export default AdminRoute;
