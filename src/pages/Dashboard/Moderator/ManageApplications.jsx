import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../contexts/useAxiosSecure";

const ManageApplications = () => {
  const axiosSecure = useAxiosSecure();
  const [filterStatus, setFilterStatus] = useState("");
  const qc = useQueryClient();
  const { data: apps = [], isLoading } = useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      const res = await axiosSecure.get("/applications");
      return res.data;
    },
  });

  const updateApplication = useMutation({
    mutationFn: ({ id, updates }) =>
      axiosSecure.patch(`/applications/${id}`, updates),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["applications"] }),
  });

  const filteredApps = filterStatus
    ? apps.filter((a) => a.status === filterStatus)
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Manage Applications
        </h1>
        <p className="text-gray-500 mt-2">
          Review and update scholarship applications
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <>
          {/* Filter Section */}
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h3 className="card-title">Filter by Status</h3>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="select select-bordered w-full md:max-w-xs"
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
                <p className="text-gray-500 text-lg">No applications found</p>
              </div>
            </div>
          ) : (
            <>
              {/* Desktop Table View */}
              <div className="hidden md:block card bg-base-100 shadow-xl">
                <div className="card-body p-4 md:p-6">
                  <div className="overflow-x-auto">
                    <table className="table w-full">
                      <thead>
                        <tr className="bg-base-200">
                          <th>Applicant Name</th>
                          <th>Email</th>
                          <th>University</th>
                          <th>Status</th>
                          <th>Payment</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredApps.map((a) => (
                          <tr key={a._id || a.id} className="hover:bg-base-200">
                            <td>
                              <div className="font-semibold">
                                {a.applicantName}
                              </div>
                            </td>
                            <td className="text-sm">{a.applicantEmail}</td>
                            <td>
                              <div className="font-semibold">
                                {a.universityName}
                              </div>
                            </td>
                            <td>
                              <span
                                className={`badge ${getStatusBadge(a.status)}`}
                              >
                                {a.status}
                              </span>
                            </td>
                            <td>
                              <span
                                className={`badge ${getPaymentBadge(a.paymentStatus)}`}
                              >
                                {a.paymentStatus}
                              </span>
                            </td>
                            <td className="space-x-1">
                              <button className="btn btn-xs btn-outline">
                                Details
                              </button>
                              <button className="btn btn-xs btn-outline">
                                Feedback
                              </button>
                              <select
                                defaultValue={a.status}
                                onChange={(e) =>
                                  updateApplication.mutate({
                                    id: a._id || a.id,
                                    updates: { status: e.target.value },
                                  })
                                }
                                className="select select-xs select-bordered"
                              >
                                <option value="pending">Pending</option>
                                <option value="processing">Processing</option>
                                <option value="completed">Completed</option>
                                <option value="rejected">Rejected</option>
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden space-y-4">
                {filteredApps.map((a) => (
                  <div
                    key={a._id || a.id}
                    className="card bg-base-100 shadow-md"
                  >
                    <div className="card-body gap-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-lg">
                            {a.applicantName}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {a.applicantEmail}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="font-semibold">University:</span>{" "}
                          {a.universityName}
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-semibold">Status:</span>
                          <span className={`badge ${getStatusBadge(a.status)}`}>
                            {a.status}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-semibold">Payment:</span>
                          <span
                            className={`badge ${getPaymentBadge(a.paymentStatus)}`}
                          >
                            {a.paymentStatus}
                          </span>
                        </div>
                      </div>

                      <div className="divider my-2"></div>

                      <div className="space-y-2">
                        <label className="label">
                          <span className="label-text font-semibold">
                            Change Status
                          </span>
                        </label>
                        <select
                          defaultValue={a.status}
                          onChange={(e) =>
                            updateApplication.mutate({
                              id: a._id || a.id,
                              updates: { status: e.target.value },
                            })
                          }
                          className="select select-sm select-bordered w-full"
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="completed">Completed</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </div>

                      <div className="card-actions justify-end gap-2 pt-2">
                        <button className="btn btn-sm btn-outline flex-1">
                          Details
                        </button>
                        <button className="btn btn-sm btn-outline flex-1">
                          Feedback
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
    </div>
  );
};

export default ManageApplications;
