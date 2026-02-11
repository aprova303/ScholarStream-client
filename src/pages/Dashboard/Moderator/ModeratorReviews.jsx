import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../contexts/useAxiosSecure";

const ModeratorReviews = () => {
  const axiosSecure = useAxiosSecure();
  const qc = useQueryClient();
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["all-reviews"],
    queryFn: async () => {
      const res = await axiosSecure.get("/reviews");
      return res.data;
    },
  });

  const deleteReviewMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/reviews/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["all-reviews"] }),
  });

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={i <= rating ? "text-yellow-400" : "text-gray-300"}
        >
          ★
        </span>,
      );
    }
    return stars;
  };

  const flagInappropriate = (_id) => {
    // TODO: Call API to flag/hide review
    alert("Review flagged for review");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          All Reviews
        </h1>
        <p className="text-gray-500 mt-2">
          Moderate student reviews and feedback
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : reviews.length === 0 ? (
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body text-center py-12">
            <p className="text-gray-500 text-lg">No reviews available yet</p>
          </div>
        </div>
      ) : (
        <div className="grid gap-6">
          {reviews.map((r) => (
            <div key={r._id || r.id} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="card-title">{r.scholarshipName}</h3>
                    <p className="text-sm text-gray-500">
                      Reviewed by:{" "}
                      <strong>{r.reviewerName || "Anonymous"}</strong> •
                      University: <strong>{r.universityName}</strong>
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => flagInappropriate(r._id || r.id)}
                      className="btn btn-warning btn-sm"
                    >
                      Flag
                    </button>
                    <button
                      onClick={() => deleteReviewMutation.mutate(r._id || r.id)}
                      className="btn btn-error btn-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-3">
                  <div className="flex gap-1 text-xl">
                    {renderStars(r.rating)}
                  </div>
                  <span className="badge badge-lg">{r.rating} / 5</span>
                </div>

                <div className="bg-base-200 p-4 rounded-lg mb-4">
                  <p className="text-sm">{r.comment}</p>
                </div>

                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>{new Date(r.date).toLocaleDateString()}</span>
                  <span className="badge">
                    Review ID: {(r._id || r.id).toString().slice(0, 8)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ModeratorReviews;
