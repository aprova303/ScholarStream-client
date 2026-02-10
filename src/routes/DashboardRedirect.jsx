import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const DashboardRedirect = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { role, roleLoading } = useRole();

  useEffect(() => {
    if (authLoading || roleLoading) return;
    if (!user || !role) return;

    if (role === "Admin") {
      navigate("/dashboard/admin/profile", { replace: true });
    } else if (role === "Moderator") {
      navigate("/dashboard/moderator/profile", { replace: true });
    } else {
      navigate("/dashboard/student/profile", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authLoading, roleLoading, role, user]);

  // Show loading while determining role
  return (
    <div className="flex justify-center items-center h-screen">
      <span className="loading loading-dots loading-xl"></span>
    </div>
  );
};

export default DashboardRedirect;
