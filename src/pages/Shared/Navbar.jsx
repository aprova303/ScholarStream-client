import React from "react";
import { Link, NavLink, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import Logo from "../../components/Logo";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, logOut, loading: authLoading } = useAuth();
  const { role, roleLoading } = useRole();
  const navigate = useNavigate();

  const isLoading = authLoading || roleLoading;

  // Handle logout with confirmation
  const handleLogOut = async () => {
    try {
      const result = await Swal.fire({
        title: "Logout Confirmation",
        text: "Are you sure you want to logout?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#9f87e2",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, logout",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        await logOut();
        toast.success("Logged out successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
        navigate("/");
      }
    } catch (error) {
      toast.error("Error logging out. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
      console.error("Logout error:", error);
    }
  };

  // Navigation links based on role
  const renderRoleBasedLinks = () => {
    const baseLinks = (
      <>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/all-scholarships">All Scholarships</NavLink>
        </li>
      </>
    );

    if (!user) {
      return baseLinks;
    }

    const dashboardLink = (
      <li>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </li>
    );

    // Role-specific dashboard links
    const roleLinks = {};

    roleLinks.Student = (
      <>
        {dashboardLink}
        <li>
          <NavLink to="/dashboard/student/applications">My Applications</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/student/reviews">My Reviews</NavLink>
        </li>
      </>
    );

    roleLinks.Moderator = (
      <>
        {dashboardLink}
        <li>
          <NavLink to="/dashboard/manage-applications">
            Manage Applications
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/moderator-reviews">Reviews</NavLink>
        </li>
      </>
    );

    roleLinks.Admin = (
      <>
        {dashboardLink}
        <li>
          <NavLink to="/dashboard/add-scholarship">Add Scholarship</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/manage-scholarships">
            Manage Scholarships
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/manage-applications">
            Manage Applications
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/manage-users">Manage Users</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/analytics">Analytics</NavLink>
        </li>
      </>
    );

    return (
      <>
        {baseLinks}
        {roleLinks[role]}
      </>
    );
  };

  const links = renderRoleBasedLinks();

  return (
    <div className="navbar bg-base-200 shadow-sm sticky top-0 z-40">
      {/* Navbar Start - Logo & Mobile Menu */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
          >
            {links}
            {user && (
              <li>
                <a
                  onClick={handleLogOut}
                  className="text-red-600 font-semibold"
                >
                  Logout
                </a>
              </li>
            )}
          </ul>
        </div>

        {/* Logo */}
        <Link to="/" className="btn btn-ghost text-xl">
          <Logo />
        </Link>
      </div>

      {/* Navbar Center - Desktop Navigation Links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      {/* Navbar End - Auth Section */}
      <div className="navbar-end gap-2">
        {isLoading ? (
          <span className="loading loading-spinner loading-sm"></span>
        ) : user ? (
          <div className="dropdown dropdown-end">
            <button tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || "User"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[#9f87e2] text-white font-bold text-lg">
                    {user.email?.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
            </button>
            {/* Dropdown menu */}
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-50 w-64 p-2 shadow"
            >
              <li className="menu-title">
                <span>{user.displayName || user.email}</span>
              </li>
              <li className="menu-title">
                <span className="text-xs text-gray-500 font-semibold">
                  Role: {role}
                </span>
              </li>
              <li>
                <NavLink to="/dashboard">Dashboard</NavLink>
              </li>
              <li>
                <a
                  onClick={handleLogOut}
                  className="text-red-600 font-semibold hover:bg-red-50"
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link className="btn bg-[#9f87e2] text-white btn-sm" to="/login">
              Login
            </Link>
            <Link
              className="btn bg-[#9f87e2] text-white btn-sm hidden sm:inline-flex"
              to="/register"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
