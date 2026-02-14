import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../contexts/useAxiosSecure";

const AdminProfile = () => {
  const { user, role } = useAuth() || {};
  const axiosSecure = useAxiosSecure();
  const [isEditing, setIsEditing] = useState(false);

  // Fetch admin analytics
  const { data: analytics = {} } = useQuery({
    queryKey: ["admin-analytics"],
    queryFn: async () => {
      const res = await axiosSecure.get("/analytics");
      return res.data;
    },
    enabled: !!user?.email,
  });

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
                <p className="text-sm text-gray-500">Account Role</p>
                <div className="badge badge-lg bg-gradient-to-r from-[#654ea3] to-[#eaafc8] text-white mt-2">
                  {role || "Admin"}
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500">Account Status</p>
                <div className="badge badge-success gap-2 mt-2">
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md">
          <div className="card-body">
            <h3 className="text-sm font-semibold opacity-90">
              Total Scholarships
            </h3>
            <p className="text-3xl font-bold">
              {analytics.totalScholarships || 0}
            </p>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white shadow-md">
          <div className="card-body">
            <h3 className="text-sm font-semibold opacity-90">Total Users</h3>
            <p className="text-3xl font-bold">{analytics.totalUsers || 0}</p>
            <p className="text-xs opacity-75 mt-1">
              S: {analytics.studentCount}, M: {analytics.moderatorCount}, A:{" "}
              {analytics.adminCount}
            </p>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-md">
          <div className="card-body">
            <h3 className="text-sm font-semibold opacity-90">
              Total Applications
            </h3>
            <p className="text-3xl font-bold">
              {analytics.totalApplications || 0}
            </p>
            <p className="text-xs opacity-75 mt-1">
              P: {analytics.pendingApplications || 0}
            </p>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-yellow-500 to-yellow-600 text-white shadow-md">
          <div className="card-body">
            <h3 className="text-sm font-semibold opacity-90">
              Revenue Collected
            </h3>
            <p className="text-2xl font-bold">
              ${(analytics.totalFees || 0).toLocaleString()}
            </p>
            <p className="text-xs opacity-75 mt-1">
              Paid: {analytics.paidApplications || 0}
            </p>
          </div>
        </div>
      </div>

      {/* Detailed Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h3 className="card-title text-lg">Application Status Overview</h3>
            <div className="space-y-2 mt-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Pending</span>
                <div className="badge badge-warning">
                  {analytics.pendingApplications || 0}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Processing</span>
                <div className="badge badge-info">
                  {analytics.processingApplications || 0}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Approved</span>
                <div className="badge badge-success">
                  {analytics.approvedApplications || 0}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Rejected</span>
                <div className="badge badge-error">
                  {analytics.rejectedApplications || 0}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Completed</span>
                <div className="badge badge-primary">
                  {analytics.completedApplications || 0}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h3 className="card-title text-lg">User Distribution</h3>
            <div className="space-y-3 mt-4">
              <div className="flex items-center gap-3">
                <div className="badge badge-lg badge-primary">S</div>
                <span className="flex-1">Students</span>
                <span className="font-bold">{analytics.studentCount || 0}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="badge badge-lg badge-info">M</div>
                <span className="flex-1">Moderators</span>
                <span className="font-bold">
                  {analytics.moderatorCount || 0}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="badge badge-lg badge-accent">A</div>
                <span className="flex-1">Admins</span>
                <span className="font-bold">{analytics.adminCount || 0}</span>
              </div>
            </div>
            <div className="divider my-2"></div>
            <div className="flex items-center gap-3">
              <div className="badge badge-lg badge-ghost">T</div>
              <span className="flex-1">Total</span>
              <span className="font-bold text-lg">
                {analytics.totalUsers || 0}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h3 className="card-title">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <a
              href="/dashboard/admin/manage-scholarships"
              className="btn btn-primary"
            >
              Manage Scholarships
            </a>
            <a href="/dashboard/admin/manage-users" className="btn btn-outline">
              Manage Users
            </a>
            <a href="/dashboard/admin/analytics" className="btn btn-outline">
              View Analytics
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
