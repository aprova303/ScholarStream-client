import React from "react";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import { Navigate } from "react-router";

/**
 * Private Route Component
 * Protects routes that require authentication
 */
export const PrivateRoute = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const { roleLoading } = useRole();

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

  return children;
};

/**
 * Student Route Component
 * Protects routes that only students can access
 */
export const StudentRoute = ({ children }) => {
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

  if (role !== "Student") {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

/**
 * Moderator Route Component
 * Protects routes that only moderators can access
 */
export const ModeratorRoute = ({ children }) => {
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

  if (role !== "Moderator" && role !== "Admin") {
    return <Navigate to="/" />;
  }

  return children;
};

/**
 * Admin Route Component
 * Protects routes that only admins can access
 */
export const AdminRoute = ({ children }) => {
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
    return <Navigate to="/" />;
  }

  return children;
};

/**
 * Role Based Access Route
 * Allows access for multiple specified roles
 */
export const RoleBasedRoute = ({ children, allowedRoles = [] }) => {
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

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
