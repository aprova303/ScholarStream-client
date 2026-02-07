import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import AllScholarships from "../pages/Scholarship/all_scholarships";
import ScholarshipDetails from "../pages/Scholarship/scholarshipDetails";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import StudentProfile from "../pages/Dashboard/Student/StudentProfile";
import AdminProfile from "../pages/Dashboard/Admin/AdminProfile";
import AddScholarship from "../pages/Dashboard/Admin/AddScholarship";
import ManageScholarships from "../pages/Dashboard/Admin/ManageScholarships";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import Analytics from "../pages/Dashboard/Admin/analytics";
import ModeratorProfile from "../pages/Dashboard/Moderator/ModeratorProfile";
import ManageApplications from "../pages/Dashboard/Moderator/ManageApplications";
import MyApplications from "../pages/Dashboard/Student/MyApplications";
import MyReviews from "../pages/Dashboard/Student/MyReviews";
import ModeratorReviews from "../pages/Dashboard/Moderator/ModeratorReviews";
import AdminRoute from "./AdminRoute";

const DashboardWrapper = () => <PrivateRoute><DashboardLayout /></PrivateRoute>;

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
    path: 'dashboard',
    Component: DashboardWrapper,
    children: [
      {
        path: 'student-profile',
        Component: StudentProfile,

      }
      ,
      {
        path: 'admin/profile',
        Component: AdminProfile
      },
      {
        path: 'admin/add-scholarship',
        element:<AdminRoute><AddScholarship></AddScholarship></AdminRoute>
      },
      {
        path: 'admin/manage-scholarships',
       element: <AdminRoute><ManageScholarships /></AdminRoute>
      },
      {
        path: 'admin/manage-users',
        element:<AdminRoute><ManageUsers /></AdminRoute>
      },
      {
        path: 'admin/analytics',
        element:<AdminRoute><Analytics></Analytics></AdminRoute>
      },
      {
        path: 'moderator/profile',
        Component: ModeratorProfile
      },
      {
        path: 'moderator/manage-applications',
        Component: ManageApplications
      },
      {
        path: 'moderator/reviews',
        Component: ModeratorReviews
      },
      {
        path: 'student/applications',
        Component: MyApplications
      },
      {
        path: 'student/reviews',
        Component: MyReviews
      }
    ]
  }
]);
