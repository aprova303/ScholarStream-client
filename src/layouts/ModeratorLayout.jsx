import React from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const ModeratorLayout = () => {
  const { user, logOut, loading: authLoading } = useAuth();
  const { role, isLoading: roleLoading } = useRole();
  const navigate = useNavigate();

  const isLoading = authLoading || roleLoading;

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleLogout = async () => {
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
        document.getElementById("my-drawer-4").checked = false;
      }
    } catch (error) {
      toast.error("Error logging out. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-dots loading-xl"></span>
      </div>
    );
  }

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <nav className="navbar w-full bg-gradient-to-r from-[#654ea3] to-[#eaafc8] shadow-lg sticky top-0 z-30">
          <div className="flex-1 flex gap-10">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
                className="my-1.5 inline-block size-5 text-white"
              >
                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                <path d="M9 4v16"></path>
                <path d="M14 10l2 2l-2 2"></path>
              </svg>
            </label>
            <div className="px-4 text-white font-bold text-lg">
              ScholarStream Dashboard
            </div>
            <div className="badge badge-primary text-white">{role}</div>
          </div>

          {/* Right navbar: User Profile */}
          <div className="flex-none">
            <div className="dropdown dropdown-end">
              <button tabIndex={0} className="btn btn-ghost btn-circle avatar">
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || "User"}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <div className="w-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold text-sm">
                    {getInitials(user?.displayName || user?.email)}
                  </div>
                )}
              </button>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-300 rounded-box z-[1] w-52 p-2 shadow"
              >
                <li className="menu-title">
                  <span>{user?.displayName || user?.email}</span>
                </li>
                <li className="menu-title">
                  <span className="text-xs text-gray-600">Role: {role}</span>
                </li>
                <li>
                  <a
                    onClick={() => {
                      navigate("/dashboard/moderator/profile");
                      document.getElementById("my-drawer-4").checked = false;
                    }}
                  >
                    My Profile
                  </a>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        {/* Page content here */}
        <main className="flex-1 p-4 md:p-8 bg-base-100 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <Outlet></Outlet>
          </div>
        </main>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-40 is-drawer-open:w-40">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* Homepage Link */}
            <li>
              <Link
                to="/"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Homepage"
                onClick={() => {
                  document.getElementById("my-drawer-4").checked = false;
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-4"
                >
                  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                  <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                </svg>
                <span className="is-drawer-close:hidden">Homepage</span>
              </Link>
            </li>

            {/* Moderator-specific links */}
            <li>
              <NavLink to="/dashboard/moderator/profile">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-4"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span className="is-drawer-close:hidden">My Profile</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/moderator/manage-applications">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-4"
                >
                  <path d="M9 11l3 3L22 4"></path>
                  <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span className="is-drawer-close:hidden">
                  Manage Applications
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/moderator/reviews">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-4"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                <span className="is-drawer-close:hidden">Reviews</span>
              </NavLink>
            </li>

            {/* All Scholarships Link */}
            <li>
              <Link
                to="/all-scholarships"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Scholarships"
                onClick={() => {
                  document.getElementById("my-drawer-4").checked = false;
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-4"
                >
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                </svg>
                <span className="is-drawer-close:hidden">All Scholarships</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ModeratorLayout;
