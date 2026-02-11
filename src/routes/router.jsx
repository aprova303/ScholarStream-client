import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import AllScholarships from "../pages/Scholarship/all_scholarships";
import ScholarshipDetails from "../pages/Scholarship/scholarshipDetails";
import CheckoutPage from "../pages/Payment/CheckoutPage";
import PaymentSuccessPage from "../pages/Payment/PaymentSuccessPage";
import PaymentFailurePage from "../pages/Payment/PaymentFailurePage";
import DashboardRedirect from "./DashboardRedirect";
import StudentProfile from "../pages/Dashboard/Student/StudentProfile";
import AdminProfile from "../pages/Dashboard/Admin/AdminProfile";
import AddScholarship from "../pages/Dashboard/Admin/AddScholarship";
import UpdateScholarship from "../pages/Dashboard/Admin/UpdateScholarship";
import ManageScholarships from "../pages/Dashboard/Admin/ManageScholarships";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import Analytics from "../pages/Dashboard/Admin/analytics";
import ManageRoleRequests from "../pages/Dashboard/Admin/ManageRoleRequests";
import ModeratorProfile from "../pages/Dashboard/Moderator/ModeratorProfile";
import ManageApplications from "../pages/Dashboard/Moderator/ManageApplications";
import MyApplications from "../pages/Dashboard/Student/MyApplications";
import MyReviews from "../pages/Dashboard/Student/MyReviews";
import ModeratorReviews from "../pages/Dashboard/Moderator/ModeratorReviews";
import AdminRoute from "./AdminRoute";
import { StudentRoute, ModeratorRoute } from "./ProtectedRoutes";
import NotFound from "../pages/Shared/NotFound";
import {
  AdminDashboardWrapper,
  ModeratorDashboardWrapper,
  StudentDashboardWrapper,
  DashboardRedirectWrapper,
} from "./DashboardWrappers";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "all-scholarships",
        Component: AllScholarships,
      },
      {
        path: "scholarship-details/:id",
        Component: ScholarshipDetails,
      },
      {
        path: "checkout/:scholarshipId",
        Component: CheckoutPage,
      },
      {
        path: "payment-success",
        Component: PaymentSuccessPage,
      },
      {
        path: "payment-cancel",
        Component: PaymentFailurePage,
      },
    ],
  },

  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "dashboard",
    children: [
      {
        index: true,
        Component: DashboardRedirectWrapper,
      },
      {
        path: "admin",
        Component: AdminDashboardWrapper,
        children: [
          {
            path: "profile",
            element: (
              <AdminRoute>
                <AdminProfile />
              </AdminRoute>
            ),
          },
          {
            path: "add-scholarship",
            element: (
              <AdminRoute>
                <AddScholarship></AddScholarship>
              </AdminRoute>
            ),
          },
          {
            path: "update-scholarship/:id",
            element: (
              <AdminRoute>
                <UpdateScholarship></UpdateScholarship>
              </AdminRoute>
            ),
          },
          {
            path: "manage-scholarships",
            element: (
              <AdminRoute>
                <ManageScholarships />
              </AdminRoute>
            ),
          },
          {
            path: "manage-applications",
            element: (
              <AdminRoute>
                <ManageApplications />
              </AdminRoute>
            ),
          },
          {
            path: "manage-users",
            element: (
              <AdminRoute>
                <ManageUsers />
              </AdminRoute>
            ),
          },
          {
            path: "analytics",
            element: (
              <AdminRoute>
                <Analytics></Analytics>
              </AdminRoute>
            ),
          },
          {
            path: "role-requests",
            element: (
              <AdminRoute>
                <ManageRoleRequests></ManageRoleRequests>
              </AdminRoute>
            ),
          },
        ],
      },
      {
        path: "moderator",
        Component: ModeratorDashboardWrapper,
        children: [
          {
            path: "profile",
            element: (
              <ModeratorRoute>
                <ModeratorProfile />
              </ModeratorRoute>
            ),
          },
          {
            path: "manage-applications",
            element: (
              <ModeratorRoute>
                <ManageApplications />
              </ModeratorRoute>
            ),
          },
          {
            path: "reviews",
            element: (
              <ModeratorRoute>
                <ModeratorReviews />
              </ModeratorRoute>
            ),
          },
        ],
      },
      {
        path: "student",
        Component: StudentDashboardWrapper,
        children: [
          {
            path: "profile",
            element: (
              <StudentRoute>
                <StudentProfile />
              </StudentRoute>
            ),
          },
          {
            path: "applications",
            element: (
              <StudentRoute>
                <MyApplications />
              </StudentRoute>
            ),
          },
          {
            path: "reviews",
            element: (
              <StudentRoute>
                <MyReviews />
              </StudentRoute>
            ),
          },
        ],
      },
    ],
  },

  // 404 Not Found - Catch-all route (must be last)
  {
    path: "*",
    Component: NotFound,
  },
]);
