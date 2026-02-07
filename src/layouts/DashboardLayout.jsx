import React from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import Logo from "../components/Logo";

const DashboardLayout = () => {
  const { user, logOut, role } = useAuth();
  const navigate = useNavigate();

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleLogout = () => {
    logOut()
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const getProfileRoute = () => {
    switch (role) {
      case "Admin":
        return "/dashboard/admin/profile";
      case "Moderator":
        return "/dashboard/moderator/profile";
      default:
        return "/dashboard/student-profile";
    }
  };

  return (
    <div className=" drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <nav className="navbar w-full bg-gradient-to-r from-[#654ea3] to-[#eaafc8] shadow-lg">
          <div className=" flex-1 flex gap-10">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost lg:hidden"
            >
              {/* Sidebar toggle icon */}
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
            
          </div>

          {/* Right navbar: User Profile */}
          <div className="flex-none">
            <div className="dropdown dropdown-end">
                
              <button className="btn btn-ghost btn-circle avatar">
               <img
                    src={user.photoURL}
                    alt={user.displayName || "User"}
                    className="w-full h-full object-cover"
                  />
                <div className="w-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold text-sm">
                  {getInitials(user?.displayName || user?.email)}
                </div>
              </button>
              <ul className="dropdown-content menu bg-base-300 rounded-box z-[1] w-52 p-2 shadow">
                <li className="menu-title">
                  <span>{user?.displayName || user?.email}</span>
                </li>
                <li>
                  <a
                    onClick={() => {
                      navigate(getProfileRoute());
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
        {/* <div className="flex min-h-full flex-col items-start bg-base-200 border-r border-base-300 shadow-xl is-drawer-close:w-14 is-drawer-open:w-64 transition-all duration-300"> */}
        <div className=" flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-40 is-drawer-open:w-40">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* List item */}
            <li>
              <Link
                to="/"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Homepage"
              >
                {/* Home icon */}
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

            {/* Role-based dashboard links */}
            {(() => {
              if (role === "Admin") {
                return (
                  <>
                    <li>
                      <NavLink to="/dashboard/admin/profile">
                        My Profile
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/dashboard/admin/add-scholarship">
                        Add Scholarship
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/dashboard/admin/manage-scholarships">
                        Manage Scholarships
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/dashboard/admin/manage-users">
                        Manage Users
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/dashboard/admin/analytics">
                        Analytics
                      </NavLink>
                    </li>
                  </>
                );
              }
              if (role === "Moderator") {
                return (
                  <>
                    <li>
                      <NavLink to="/dashboard/moderator/profile">
                        My Profile
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/dashboard/moderator/manage-applications">
                        Manage Applications
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/dashboard/moderator/all-reviews">
                        All Reviews
                      </NavLink>
                    </li>
                  </>
                );
              }
              // default Student
              return (
                <>
                  <li>
                    <NavLink to="/dashboard/student-profile">
                      My Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/student/applications">
                      My Applications
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/student/reviews">
                      My Reviews
                    </NavLink>
                  </li>
                </>
              );
            })()}

            {/* List item */}
            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Settings"
              >
                {/* Settings icon */}
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
                  <path d="M20 7h-9"></path>
                  <path d="M14 17H5"></path>
                  <circle cx="17" cy="17" r="3"></circle>
                  <circle cx="7" cy="7" r="3"></circle>
                </svg>
                <span className="is-drawer-close:hidden">Settings</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
