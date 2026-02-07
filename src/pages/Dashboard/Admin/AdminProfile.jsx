import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";

const AdminProfile = () => {
  const { user, role } = useAuth() || {};
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Admin Profile
        </h1>
        <p className="text-gray-500 mt-2">Manage your admin account settings</p>
      </div>

      {/* Profile Card */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body p-4 md:p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="card-title text-2xl">Account Information</h2>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="btn btn-sm btn-outline"
            >
              {isEditing ? "Cancel" : "Edit"}
            </button>
          </div>

          {!isEditing ? (
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="avatar placeholder">
                  <div className="bg-gradient-to-br from-[#654ea3] to-[#eaafc8] text-white rounded-full w-16">
                    <span className="text-xl font-bold">
                      {user?.displayName?.charAt(0) || "A"}
                    </span>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500">Display Name</p>
                  <p className="text-lg font-semibold">
                    {user?.displayName || "Not Set"}
                  </p>
                </div>
              </div>

              <div className="divider"></div>

              <div>
                <p className="text-sm text-gray-500">Email Address</p>
                <p className="text-lg font-semibold">{user?.email}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Role</p>
                <div className="badge badge-lg bg-gradient-to-r from-[#654ea3] to-[#eaafc8] text-white">
                  {role}
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500">Account Status</p>
                <div className="badge badge-success gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  Active
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Display Name"
                defaultValue={user?.displayName || ""}
                className="input input-bordered w-full"
              />
              <input
                type="email"
                placeholder="Email"
                defaultValue={user?.email}
                disabled
                className="input input-bordered w-full opacity-50 cursor-not-allowed"
              />
              <button className="btn btn-primary w-full">Save Changes</button>
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card bg-base-200">
          <div className="card-body">
            <h3 className="text-sm font-semibold text-gray-600">
              Total Scholarships
            </h3>
            <p className="text-3xl font-bold">--</p>
          </div>
        </div>
        <div className="card bg-base-200">
          <div className="card-body">
            <h3 className="text-sm font-semibold text-gray-600">Total Users</h3>
            <p className="text-3xl font-bold">--</p>
          </div>
        </div>
        <div className="card bg-base-200">
          <div className="card-body">
            <h3 className="text-sm font-semibold text-gray-600">
              Pending Applications
            </h3>
            <p className="text-3xl font-bold">--</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
