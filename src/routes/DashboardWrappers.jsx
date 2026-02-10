import PrivateRoute from "./PrivateRoute";
import AdminLayout from "../layouts/AdminLayout";
import ModeratorLayout from "../layouts/ModeratorLayout";
import StudentLayout from "../layouts/StudentLayout";
import DashboardRedirect from "./DashboardRedirect";

export const AdminDashboardWrapper = () => (
  <PrivateRoute>
    <AdminLayout />
  </PrivateRoute>
);

export const ModeratorDashboardWrapper = () => (
  <PrivateRoute>
    <ModeratorLayout />
  </PrivateRoute>
);

export const StudentDashboardWrapper = () => (
  <PrivateRoute>
    <StudentLayout />
  </PrivateRoute>
);

export const DashboardRedirectWrapper = () => (
  <PrivateRoute>
    <DashboardRedirect />
  </PrivateRoute>
);
