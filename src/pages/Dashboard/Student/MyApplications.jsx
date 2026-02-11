import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../contexts/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const MyApplications = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth() || {};
  const qc = useQueryClient();
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

  const deleteApplicationMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/applications/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["my-applications"] }),
  });

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
          My Applications
        </h1>
        <p className="text-gray-500 mt-2">
          Track your scholarship applications
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : apps.length === 0 ? (
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
        <div className="grid gap-6">
          {apps.map((a) => (
            <div
              key={a._id || a.id}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow"
            >
              <div className="card-body">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="card-title text-xl">{a.universityName}</h3>
                    <p className="text-sm text-gray-500">
                      {a.universityAddress}
                    </p>
                  </div>
                  <div className="flex gap-2 flex-wrap justify-end">
                    <span className={`badge ${getStatusBadge(a.status)}`}>
                      {a.status}
                    </span>
                    <span
                      className={`badge ${getPaymentBadge(a.paymentStatus)}`}
                    >
                      {a.paymentStatus}
                    </span>
                  </div>
                </div>

                <div className="divider my-2"></div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Subject Category</p>
                    <p className="font-semibold">{a.subjectCategory}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Application Fees</p>
                    <p className="font-semibold">${a.applicationFees}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Feedback</p>
                    <p className="font-semibold">{a.feedback || "Pending"}</p>
                  </div>
                </div>

                <div className="card-actions justify-end gap-2 mt-4">
                  <button className="btn btn-sm btn-outline">Details</button>
                  {a.status === "pending" && (
                    <button className="btn btn-sm btn-outline">Edit</button>
                  )}
                  {a.status === "pending" && a.paymentStatus === "unpaid" && (
                    <button className="btn btn-sm btn-outline">Pay</button>
                  )}
                  {a.status === "pending" && (
                    <button
                      onClick={() =>
                        deleteApplicationMutation.mutate(a._id || a.id)
                      }
                      className="btn btn-sm btn-error"
                    >
                      Delete
                    </button>
                  )}
                  {a.status === "completed" && (
                    <button className="btn btn-sm btn-primary">
                      Add Review
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyApplications;
