import React, { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../contexts/useAxiosSecure";
import useThemeContext from "../../../hooks/useThemContext";

const ModeratorProfile = () => {
  const { user, role } = useAuth() || {};
  const { theme } = useThemeContext();
  const axiosSecure = useAxiosSecure();
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);

  const bgColor = theme === "light" ? "bg-base-100" : "bg-gray-900";
  const textColor = theme === "light" ? "text-gray-800" : "text-white";
  const secondaryText = theme === "light" ? "text-gray-500" : "text-gray-400";
  const cardBg = theme === "light" ? "bg-base-100" : "bg-gray-800";
  const inputBg = theme === "light" ? "bg-white" : "bg-gray-700";
  const borderColor = theme === "light" ? "border-gray-200" : "border-gray-700";

  // Fetch moderator analytics
  const { data: analytics = {} } = useQuery({
    queryKey: ["moderator-analytics"],
    queryFn: async () => {
      const res = await axiosSecure.get("/moderator-analytics");
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Handle save changes
  const handleSaveChanges = async () => {
    setSaveError("");
    setSaveSuccess(false);

    if (!displayName.trim()) {
      setSaveError("Display name cannot be empty");
      return;
    }

    setIsSaving(true);
    try {
      const response = await axiosSecure.patch(`/users/${user?.email}`, {
        name: displayName.trim(),
      });

      if (response.data.success) {
        setSaveSuccess(true);
        setIsEditing(false);
        // Clear success message after 3 seconds
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      setSaveError(
        error.response?.data?.error ||
          "Failed to save profile. Please try again.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div
      className={`space-y-6 ${bgColor} transition-colors duration-300 min-h-screen p-4 md:p-8`}
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className={`text-3xl md:text-4xl font-bold ${textColor}`}>
          Moderator Profile
        </h1>
        <p className={`${secondaryText} mt-2`}>
          Manage your moderator account settings
        </p>
      </div>

      {/* Profile Card */}
      <div className={`card ${cardBg} shadow-xl`}>
        <div className="card-body p-4 md:p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className={`card-title text-2xl ${textColor}`}>
              Account Information
            </h2>
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
                  {/* <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-full w-16">
                    <span className="text-xl font-bold">
                      {user?.displayName?.charAt(0) || "M"}
                    </span>
                  </div> */}
                </div>
                <div className="ml-4">
                  <p className={`text-sm ${secondaryText}`}>Display Name</p>
                  <p className="text-lg font-semibold">
                    {user?.displayName || "Not Set"}
                  </p>
                </div>
              </div>

              <div className="divider"></div>

              <div>
                <p className={`text-sm ${secondaryText}`}>Email Address</p>
                <p className="text-lg font-semibold">{user?.email}</p>
              </div>

              <div>
                <p className={`text-sm ${secondaryText}`}>Account Role</p>
                <div className="badge badge-lg badge-info text-white mt-2">
                  {role || "Moderator"}
                </div>
              </div>

              <div>
                <p className={`text-sm ${secondaryText}`}>Account Status</p>
                <div className="badge badge-success gap-2 mt-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  Active
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {saveSuccess && (
                <div className="alert alert-success shadow-lg">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="stroke-current flex-shrink-0 h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>Profile updated successfully!</span>
                  </div>
                </div>
              )}
              {saveError && (
                <div className="alert alert-error shadow-lg">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="stroke-current flex-shrink-0 h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 14l-2-2m0 0l-2-2m2 2l2-2m-2 2l-2 2"
                      />
                    </svg>
                    <span>{saveError}</span>
                  </div>
                </div>
              )}
              <input
                type="text"
                placeholder="Display Name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className={`input input-bordered w-full ${inputBg} ${borderColor} ${textColor}`}
              />
              <input
                type="email"
                placeholder="Email"
                defaultValue={user?.email}
                disabled
                className={`input input-bordered w-full opacity-50 cursor-not-allowed ${inputBg} ${borderColor} ${textColor}`}
              />
              <button
                onClick={handleSaveChanges}
                disabled={isSaving}
                className="btn btn-primary w-full"
              >
                {isSaving ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
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
        <div
          className={`card bg-base-100 shadow-xl ${theme === "dark" ? "bg-gray-800 text-white" : ""}`}
        >
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

        <div
          className={`card bg-base-100 shadow-xl ${theme === "dark" ? "bg-gray-800 text-white" : ""}`}
        >
          <div className="card-body">
            <h3 className="card-title text-lg">Review Activity</h3>
            <div className="space-y-4 mt-4">
              <div className="flex items-center justify-between">
                <span>Total Reviews Written</span>
                <span className="badge badge-lg badge-primary">
                  {analytics.totalReviews || 0}
                </span>
              </div>
              <div
                className={`divider my-2 ${theme === "dark" ? "divider-dark" : ""}`}
              ></div>
              <p className="text-sm text-gray-500">
                You are reviewing {analytics.totalApplications || 0} total
                applications across the platform
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div
        className={`card bg-base-100 shadow-xl ${theme === "dark" ? "bg-gray-800 text-white" : ""}`}
      >
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
              Reviews
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModeratorProfile;
