import React from "react";
import { Link, NavLink, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import Logo from "../../components/Logo";

const Navbar = () => {
  const { user, logOut } = useAuth();
  console.log("Navbar user:", user);

  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Always visible links
  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/all-scholarships">All Scholarships</NavLink>
      </li>
    </>
  );

  return (
    <div 
    className="navbar  bg-base-200 shadow-sm"
    >
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
              <>
                <li>
                  <NavLink to="/dashboard">Dashboard</NavLink>
                </li>
                <li>
                  <a onClick={handleLogOut}>Logout</a>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Logo */}
        <Link to="/" className="btn btn-ghost">
          <Logo />
        </Link>
      </div>

      {/* Navbar Center - Desktop Navigation Links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      {/* Navbar End - Auth Section */}
      <div className="navbar-end">
        {user ? (
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
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-50 w-52 p-2 shadow"
            >
              <li className="menu-title">
                <span>{user.displayName || "User"}</span>
              </li>
              <li>
                <NavLink to="/dashboard">Dashboard</NavLink>
              </li>
              {/* <li>
                <NavLink to="/profile">Profile</NavLink>
              </li> */}
              <li>
                <a onClick={handleLogOut}>Logout</a>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link className="btn bg-[#9f87e2] text-white btn-sm" to="/login">
              Login
            </Link>
            <Link className="btn bg-[#9f87e2] text-white btn-sm" to="/register">
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
