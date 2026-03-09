import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../contexts/useAxiosSecure";
import { toast } from "react-toastify";
import ApplicationDetailsModal from "../../../components/ApplicationDetailsModal";
import FeedbackModal from "../../../components/FeedbackModal";
import useThemeContext from "../../../hooks/useThemContext";

const ManageApplications = () => {
  const axiosSecure = useAxiosSecure();
  const { theme } = useThemeContext();
  const [filterStatus, setFilterStatus] = useState("");
  const [detailsApp, setDetailsApp] = useState(null);
  const [detailsScholarship, setDetailsScholarship] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [feedbackApp, setFeedbackApp] = useState(null);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const qc = useQueryClient();

  const bgColor = theme === "light" ? "bg-base-100" : "bg-gray-900";
  const textColor = theme === "light" ? "text-gray-800" : "text-white";
  const secondaryText = theme === "light" ? "text-gray-500" : "text-gray-400";
  const cardBg = theme === "light" ? "bg-base-100" : "bg-gray-800";
  const inputBg = theme === "light" ? "bg-white" : "bg-gray-700";
  const borderColor = theme === "light" ? "border-gray-200" : "border-gray-700";


  const { data: apps = [], isLoading } = useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      const res = await axiosSecure.get("/applications");
      return res.data;
    },
  });

  const updateApplicationMutation = useMutation({
    mutationFn: ({ id, updates }) =>
      axiosSecure.patch(`/applications/${id}`, updates),
    onSuccess: () => {
      toast.success("Application updated successfully");
      qc.invalidateQueries({ queryKey: ["applications"] });
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.error || "Failed to update application",
      );
    },
  });

  const filteredApps = filterStatus
    ? apps.filter((a) => a.applicationStatus === filterStatus)
    : apps;

  const getStatusBadge = (status) => {
    const badges = {
      pending: "badge-warning",
      processing: "badge-info",
      completed: "badge-success",
      rejected: "badge-error",
    };
    return badges[status?.toLowerCase()] || "badge-ghost";
  };

  const getPaymentBadge = (status) => {
    return status === "paid" ? "badge-success" : "badge-error";
  };

  const handleDetailsClick = async (app) => {
    setDetailsApp(app);
    // Optionally fetch scholarship details
    try {
      const scholarshipRes = await axiosSecure.get(
        `/scholarships/${app.scholarshipId}`,
      );
      setDetailsScholarship(scholarshipRes.data);
    } catch (error) {
      console.log("Scholarship details not found");
    }
    setIsDetailsOpen(true);
  };

  const handleFeedbackClick = (app) => {
    setFeedbackApp(app);
    setIsFeedbackOpen(true);
  };

  const handleStatusChange = (appId, newStatus) => {
    updateApplicationMutation.mutate({
      id: appId,
      updates: { applicationStatus: newStatus },
    });
  };

  const handleCancelApplication = (appId) => {
    if (confirm("Are you sure you want to reject this application?")) {
      updateApplicationMutation.mutate({
        id: appId,
        updates: { applicationStatus: "rejected" },
      });
    }
  };

  return (
    <div
      className={`space-y-6 ${bgColor} transition-colors duration-300 min-h-screen p-4 md:p-8`}
    >
      {/* Header */}
      <div className="mb-8">
        <h1
          className={`text-3xl md:text-4xl font-bold ${theme === "dark" ? "text-gray-50" : "text-gray-800"}`}
        >
          Manage Applications
        </h1>
        <p
          className={`text-${theme === "dark" ? "gray-400" : "gray-500"} mt-2`}
        >
          Review and manage scholarship applications
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <>
          {/* Filter Section */}
          <div
            className={`card bg-base-100 shadow-lg ${theme === "dark" ? "bg-gray-800 text-white" : ""}`}
          >
            <div className="card-body">
              <h3 className="card-title">Filter by Status</h3>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className={`select select-bordered w-full md:max-w-xs ${theme === "dark" ? "bg-gray-700 text-white border-none" : ""}`}
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="completed">Completed</option>
                <option value="rejected">Rejected</option>
              </select>
              <p className="text-sm text-gray-500 mt-2">
                Showing {filteredApps.length} of {apps.length} applications
              </p>
            </div>
          </div>

          {filteredApps.length === 0 ? (
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body text-center py-12">
                <p
                  className={`text-${theme === "dark" ? "gray-400" : "gray-500"} text-lg`}
                >
                  No applications found
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Desktop Table View */}
              <div
                className={`hidden md:block card bg-base-100 shadow-xl ${theme === "dark" ? "bg-gray-800 text-white" : ""}`}
              >
                <div className="card-body p-4 md:p-6">
                  <div className="overflow-x-auto">
                    <table
                      className={`table w-full text-sm ${theme === "dark" ? "bg-gray-800 text-white" : ""}`}
                    >
                      <thead>
                        <tr
                          className={`bg-base-200 ${theme === "dark" ? "bg-gray-700 text-white" : ""}`}
                        >
                          <th>Applicant Name</th>
                          <th>Email</th>
                          <th>University</th>
                          <th>Feedback</th>
                          <th>Status</th>
                          <th>Payment</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredApps.map((app) => (
                          <tr
                            key={app._id}
                            className={` ${theme === "dark" ? "bg-gray-800 text-white" : ""}`}
                          >
                            <td className="font-semibold">{app.userName}</td>
                            <td className="text-xs">{app.userEmail}</td>
                            <td>{app.universityName}</td>
                            <td>
                              <div className="max-w-xs">
                                <p className="text-xs line-clamp-2">
                                  {app.feedback || "No feedback"}
                                </p>
                              </div>
                            </td>
                            <td>
                              <span
                                className={`badge ${getStatusBadge(
                                  app.applicationStatus,
                                )}`}
                              >
                                {app.applicationStatus}
                              </span>
                            </td>
                            <td>
                              <span
                                className={`badge ${getPaymentBadge(
                                  app.paymentStatus,
                                )}`}
                              >
                                {app.paymentStatus}
                              </span>
                            </td>
                            <td className="space-x-1">
                              <button
                                onClick={() => handleDetailsClick(app)}
                                className="btn btn-xs btn-outline"
                              >
                                Details
                              </button>
                              <button
                                onClick={() => handleFeedbackClick(app)}
                                className="btn btn-xs btn-outline btn-info"
                              >
                                Feedback
                              </button>
                              <select
                                value={app.applicationStatus}
                                onChange={(e) =>
                                  handleStatusChange(app._id, e.target.value)
                                }
                                className={`select select-xs select-bordered mt-3 mb-3 ${theme === "dark" ? "bg-gray-700 text-white" : ""}`}
                              >
                                <option value="pending">Pending</option>
                                <option value="processing">Processing</option>
                                <option value="completed">Completed</option>
                              </select>
                              <button
                                onClick={() => handleCancelApplication(app._id)}
                                className={`btn btn-xs btn-outline btn-error ${theme === "dark" ? "bg-gray-700 text-white" : ""}`}
                              >
                                Cancel
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden space-y-4 ">
                {filteredApps.map((app) => (
                  <div
                    key={app._id}
                    className={`card bg-base-100 shadow-md ${theme === "dark" ? "bg-gray-700 text-white" : ""}`}
                  >
                    <div className="card-body gap-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-lg ">{app.userName}</h3>
                          <p
                            className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
                          >
                            {app.userEmail}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div>
                          <span
                            className={`font-semibold  ${theme === "dark" ? "text-gray-300" : ""}`}
                          >
                            University:
                          </span>{" "}
                          {app.universityName}
                        </div>
                        <div className="flex justify-between items-center">
                          <span
                            className={`font-semibold ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
                          >
                            Status:
                          </span>
                          <span
                            className={`badge ${getStatusBadge(
                              app.applicationStatus,
                            )}`}
                          >
                            {app.applicationStatus}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span
                            className={`font-semibold ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
                          >
                            Payment:
                          </span>
                          <span
                            className={`badge ${getPaymentBadge(
                              app.paymentStatus,
                            )}`}
                          >
                            {app.paymentStatus}
                          </span>
                        </div>
                        {app.feedback && (
                          <div>
                            <span className="font-semibold text-xs">
                              Feedback:
                            </span>
                            <p
                              className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"} mt-1`}
                            >
                              {app.feedback}
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="divider my-2"></div>

                      <div className="space-y-2">
                        <label className="label">
                          <span className="label-text font-semibold">
                            Change Status
                          </span>
                        </label>
                        <select
                          value={app.applicationStatus}
                          onChange={(e) =>
                            handleStatusChange(app._id, e.target.value)
                          }
                          className={`select select-sm select-bordered w-full ${inputBg}`}
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="completed">Completed</option>
                        </select>
                      </div>

                      <div className="card-actions justify-end gap-2 pt-2 flex-wrap">
                        <button
                          onClick={() => handleDetailsClick(app)}
                          className="btn btn-sm btn-outline flex-1"
                        >
                          Details
                        </button>
                        <button
                          onClick={() => handleFeedbackClick(app)}
                          className="btn btn-sm btn-outline btn-info flex-1"
                        >
                          Feedback
                        </button>
                        <button
                          onClick={() => handleCancelApplication(app._id)}
                          className="btn btn-sm btn-outline btn-error flex-1"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}

      {/* Modals */}
      <ApplicationDetailsModal
        isOpen={isDetailsOpen}
        application={detailsApp}
        scholarship={detailsScholarship}
        onClose={() => {
          setIsDetailsOpen(false);
          setDetailsApp(null);
        }}
      />
      <FeedbackModal
        isOpen={isFeedbackOpen}
        application={feedbackApp}
        onClose={() => {
          setIsFeedbackOpen(false);
          setFeedbackApp(null);
        }}
      />
    </div>
  );
};

export default ManageApplications;
