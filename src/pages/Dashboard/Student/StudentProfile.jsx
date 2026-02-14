import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../contexts/useAxiosSecure";
import RequestRoleModal from "../../../components/RequestRoleModal";

const StudentProfile = () => {
  const { user, role } = useAuth() || {};
  const axiosSecure = useAxiosSecure();
  const [isEditing, setIsEditing] = useState(false);
  const [roleModalOpen, setRoleModalOpen] = useState(false);

  // Fetch applications count
  const { data: applications = [] } = useQuery({
    queryKey: ["my-applications-count", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/applications?email=${encodeURIComponent(user?.email)}`,
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Fetch reviews count
  const { data: reviews = [] } = useQuery({
    queryKey: ["my-reviews-count", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/reviews?email=${encodeURIComponent(user?.email)}`,
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Calculate stats
  const totalApplications = applications.length;
  const approvedApplications = applications.filter(
    (app) => app.applicationStatus === "approved",
  ).length;
  const rejectedApplications = applications.filter(
    (app) => app.applicationStatus === "rejected",
  ).length;
  const pendingApplications = applications.filter(
    (app) => app.applicationStatus === "pending",
  ).length;
  const totalReviews = reviews.length;
  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, review) => sum + review.ratingPoint, 0) /
          reviews.length
        ).toFixed(1)
      : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Student Profile
        </h1>
        <p className="text-gray-500 mt-2">Manage your student account</p>
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
                  <div className="bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-full w-16">
                    <span className="text-xl font-bold">
                      {user?.displayName?.charAt(0) || "S"}
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
                <div className="badge badge-lg badge-primary text-white mt-2">
                  {role || "Student"}
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

      {/* Student Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card bg-base-200 shadow-md">
          <div className="card-body">
            <h3 className="text-sm font-semibold text-gray-600">
              Total Applications
            </h3>
            <p className="text-3xl font-bold text-primary">
              {totalApplications}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              {pendingApplications} pending
            </p>
          </div>
        </div>

        <div className="card bg-base-200 shadow-md">
          <div className="card-body">
            <h3 className="text-sm font-semibold text-gray-600">
              Approved Apps
            </h3>
            <p className="text-3xl font-bold text-success">
              {approvedApplications}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              {rejectedApplications} rejected
            </p>
          </div>
        </div>

        <div className="card bg-base-200 shadow-md">
          <div className="card-body">
            <h3 className="text-sm font-semibold text-gray-600">My Reviews</h3>
            <p className="text-3xl font-bold text-accent">{totalReviews}</p>
            <p className="text-xs text-gray-500 mt-2">
              Avg Rating: ⭐ {averageRating}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h3 className="card-title">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a href="/all-scholarships" className="btn btn-primary">
              Browse Scholarships
            </a>
            <a
              href="/dashboard/student/applications"
              className="btn btn-outline"
            >
              View My Applications
            </a>
            {role === "Student" && (
              <button
                onClick={() => setRoleModalOpen(true)}
                className="btn btn-accent"
              >
                Request Moderator/Admin
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Role Request Modal */}
      <RequestRoleModal
        isOpen={roleModalOpen}
        onClose={() => setRoleModalOpen(false)}
        onSuccess={() => window.location.reload()}
        userName={user?.displayName || "User"}
      />
    </div>
  );
};

export default StudentProfile;
