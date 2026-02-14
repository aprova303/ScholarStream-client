import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../contexts/useAxiosSecure";

const ModeratorProfile = () => {
  const { user, role } = useAuth() || {};
  const axiosSecure = useAxiosSecure();
  const [isEditing, setIsEditing] = useState(false);

  // Fetch moderator analytics
  const { data: analytics = {} } = useQuery({
    queryKey: ["moderator-analytics"],
    queryFn: async () => {
      const res = await axiosSecure.get("/moderator-analytics");
      return res.data;
    },
    enabled: !!user?.email,
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Moderator Profile
        </h1>
        <p className="text-gray-500 mt-2">Manage your moderator account</p>
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
                  <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-full w-16">
                    <span className="text-xl font-bold">
                      {user?.displayName?.charAt(0) || "M"}
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
                <div className="badge badge-lg badge-info text-white mt-2">
                  {role || "Moderator"}
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

      {/* Moderator Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card bg-gradient-to-br from-cyan-500 to-cyan-600 text-white shadow-md">
          <div className="card-body">
            <h3 className="text-sm font-semibold opacity-90">
              Total Applications
            </h3>
            <p className="text-3xl font-bold">
              {analytics.totalApplications || 0}
            </p>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-md">
          <div className="card-body">
            <h3 className="text-sm font-semibold opacity-90">Pending Review</h3>
            <p className="text-3xl font-bold">
              {analytics.pendingApplications || 0}
            </p>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white shadow-md">
          <div className="card-body">
            <h3 className="text-sm font-semibold opacity-90">Approved</h3>
            <p className="text-3xl font-bold">
              {analytics.approvedApplications || 0}
            </p>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-red-500 to-red-600 text-white shadow-md">
          <div className="card-body">
            <h3 className="text-sm font-semibold opacity-90">Rejected</h3>
            <p className="text-3xl font-bold">
              {analytics.rejectedApplications || 0}
            </p>
          </div>
        </div>
      </div>

      {/* Detailed Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h3 className="card-title text-lg">Application Status Summary</h3>
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
            <h3 className="card-title text-lg">Review Activity</h3>
            <div className="space-y-4 mt-4">
              <div className="flex items-center justify-between">
                <span>Total Reviews Written</span>
                <span className="badge badge-lg badge-primary">
                  {analytics.totalReviews || 0}
                </span>
              </div>
              <div className="divider my-2"></div>
              <p className="text-sm text-gray-500">
                You are reviewing {analytics.totalApplications || 0} total
                applications across the platform
              </p>
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
              href="/dashboard/moderator/manage-applications"
              className="btn btn-primary"
            >
              Review Applications
            </a>
            <a
              href="/dashboard/moderator/manage-applications"
              className="btn btn-outline"
            >
              View All Applications
            </a>
            <a href="/dashboard/moderator/reviews" className="btn btn-outline">
              My Reviews
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModeratorProfile;
