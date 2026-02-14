import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../contexts/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import ApplicationDetailsModal from "../../../components/ApplicationDetailsModal";
import ApplicationEditModal from "../../../components/ApplicationEditModal";
import AddReviewModal from "../../../components/AddReviewModal";
import { toast } from "react-toastify";

const MyApplications = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth() || {};
  const qc = useQueryClient();

  // Modal states
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);

  // Fetch applications
  const { data: apps = [], isLoading } = useQuery({
    queryKey: ["my-applications", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/applications?email=${encodeURIComponent(user?.email)}`,
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Delete application mutation
  const deleteApplicationMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/applications/${id}`),
    onSuccess: () => {
      toast.success("Application deleted successfully");
      qc.invalidateQueries({ queryKey: ["my-applications"] });
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.error || "Failed to delete application",
      );
    },
  });

  // Status badge helper
  const getStatusBadge = (status) => {
    const badges = {
      pending: "badge-warning",
      processing: "badge-info",
      completed: "badge-success",
      approved: "badge-success",
      rejected: "badge-error",
    };
    return badges[status?.toLowerCase()] || "badge-ghost";
  };

  // Payment badge helper
  const getPaymentBadge = (status) => {
    return status === "paid" ? "badge-success" : "badge-error";
  };

  // Modal handlers
  const handleDetailsClick = (app) => {
    setSelectedApplication(app);
    setDetailsModalOpen(true);
  };

  const handleEditClick = (app) => {
    setSelectedApplication(app);
    setEditModalOpen(true);
  };

  const handlePayClick = (app) => {
    // Redirect to payment page
    window.location.href = `/payment/${app._id}`;
  };

  const handleAddReviewClick = (app) => {
    setSelectedApplication(app);
    setReviewModalOpen(true);
  };

  const handleDeleteClick = (id) => {
    if (window.confirm("Are you sure you want to delete this application?")) {
      deleteApplicationMutation.mutate(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          My Applications
        </h1>
        <p className="text-gray-500 mt-2">
          Track your scholarship applications
        </p>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : apps.length === 0 ? (
        /* Empty State */
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body text-center py-12">
            <p className="text-gray-500 text-lg">
              No applications yet. Start applying to scholarships!
            </p>
            <a
              href="/all-scholarships"
              className="btn btn-primary mt-4 w-32 mx-auto"
            >
              Browse Scholarships
            </a>
          </div>
        </div>
      ) : (
        /* Applications Table - Desktop */
        <>
          <div className="hidden md:block card bg-base-100 shadow-xl">
            <div className="card-body p-4 md:p-6">
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead>
                    <tr className="bg-base-200">
                      <th>University Name</th>
                      <th>Address</th>
                      <th>Subject</th>
                      <th>Fees</th>
                      <th>Feedback</th>
                      <th>App Status</th>
                      <th>Payment</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {apps.map((app) => (
                      <tr key={app._id} className="hover:bg-base-200">
                        <td className="font-semibold">{app.universityName}</td>
                        <td className="text-sm">
                          {app.scholarshipId?.universityCity || "N/A"}
                        </td>
                        <td className="text-sm">{app.scholarshipCategory}</td>
                        <td className="font-semibold">
                          ${app.applicationFees}
                        </td>
                        <td className="text-xs max-w-xs">
                          <span className="line-clamp-2">
                            {app.feedback || "-"}
                          </span>
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
                            title="View details"
                          >
                            Details
                          </button>
                          {app.applicationStatus === "pending" && (
                            <>
                              <button
                                onClick={() => handleEditClick(app)}
                                className="btn btn-xs btn-outline btn-info"
                                title="Edit application"
                              >
                                Edit
                              </button>
                              {app.paymentStatus === "unpaid" && (
                                <button
                                  onClick={() => handlePayClick(app)}
                                  className="btn btn-xs btn-outline btn-success"
                                  title="Make payment"
                                >
                                  Pay
                                </button>
                              )}
                              <button
                                onClick={() => handleDeleteClick(app._id)}
                                disabled={deleteApplicationMutation.isPending}
                                className="btn btn-xs btn-outline btn-error"
                                title="Delete application"
                              >
                                {deleteApplicationMutation.isPending ? (
                                  <span className="loading loading-spinner loading-xs"></span>
                                ) : (
                                  "Delete"
                                )}
                              </button>
                            </>
                          )}
                          {app.applicationStatus === "completed" && (
                            <button
                              onClick={() => handleAddReviewClick(app)}
                              className="btn btn-xs btn-primary"
                              title="Add review"
                            >
                              Review
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Applications Cards - Mobile */}
          <div className="md:hidden space-y-4">
            {apps.map((app) => (
              <div key={app._id} className="card bg-base-100 shadow-md">
                <div className="card-body gap-3">
                  <div>
                    <h3 className="font-bold text-lg">{app.universityName}</h3>
                    <p className="text-sm text-gray-500">
                      {app.scholarshipId?.universityCity || "N/A"}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-gray-600">Category</p>
                      <p className="font-semibold">{app.scholarshipCategory}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Fees</p>
                      <p className="font-semibold">${app.applicationFees}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Status</p>
                      <span
                        className={`badge ${getStatusBadge(
                          app.applicationStatus,
                        )}`}
                      >
                        {app.applicationStatus}
                      </span>
                    </div>
                    <div>
                      <p className="text-gray-600">Payment</p>
                      <span
                        className={`badge ${getPaymentBadge(
                          app.paymentStatus,
                        )}`}
                      >
                        {app.paymentStatus}
                      </span>
                    </div>
                  </div>

                  {app.feedback && (
                    <div className="bg-base-200 p-2 rounded text-sm">
                      <p className="font-semibold text-xs">Feedback:</p>
                      <p>{app.feedback}</p>
                    </div>
                  )}

                  <div className="card-actions justify-between gap-2 flex-wrap pt-2">
                    <button
                      onClick={() => handleDetailsClick(app)}
                      className="btn btn-sm btn-outline flex-1"
                    >
                      Details
                    </button>
                    {app.applicationStatus === "pending" && (
                      <>
                        <button
                          onClick={() => handleEditClick(app)}
                          className="btn btn-sm btn-outline btn-info flex-1"
                        >
                          Edit
                        </button>
                        {app.paymentStatus === "unpaid" && (
                          <button
                            onClick={() => handlePayClick(app)}
                            className="btn btn-sm btn-outline btn-success flex-1"
                          >
                            Pay
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteClick(app._id)}
                          disabled={deleteApplicationMutation.isPending}
                          className="btn btn-sm btn-outline btn-error flex-1"
                        >
                          Delete
                        </button>
                      </>
                    )}
                    {app.applicationStatus === "completed" && (
                      <button
                        onClick={() => handleAddReviewClick(app)}
                        className="btn btn-sm btn-primary flex-1"
                      >
                        Add Review
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Modals */}
      <ApplicationDetailsModal
        isOpen={detailsModalOpen}
        application={selectedApplication}
        scholarship={selectedApplication?.scholarshipId}
        onClose={() => {
          setDetailsModalOpen(false);
          setSelectedApplication(null);
        }}
      />

      <ApplicationEditModal
        isOpen={editModalOpen}
        application={selectedApplication}
        onClose={() => {
          setEditModalOpen(false);
          setSelectedApplication(null);
        }}
        onSuccess={() => {
          setSelectedApplication(null);
        }}
      />

      <AddReviewModal
        isOpen={reviewModalOpen}
        application={selectedApplication}
        onClose={() => {
          setReviewModalOpen(false);
          setSelectedApplication(null);
        }}
        onSuccess={() => {
          setSelectedApplication(null);
        }}
      />
    </div>
  );
};

export default MyApplications;
