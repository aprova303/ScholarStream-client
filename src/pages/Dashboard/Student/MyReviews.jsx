import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../services/api";
import useAuth from "../../../hooks/useAuth";

const fetchMyReviews = async (email) => {
  const res = await api.get(`/reviews?email=${encodeURIComponent(email)}`);
  return res.data;
};

const MyReviews = () => {
  const { user } = useAuth() || {};
  const qc = useQueryClient();
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["my-reviews", user?.email],
    queryFn: () => fetchMyReviews(user?.email),
    enabled: !!user?.email,
  });

  const deleteReviewMutation = useMutation({
    mutationFn: (id) => api.delete(`/reviews/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["my-reviews"] }),
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          My Reviews
        </h1>
        <p className="text-gray-500 mt-2">
          Share your experiences with scholarships
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : reviews.length === 0 ? (
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body text-center py-12">
            <p className="text-gray-500 text-lg">
              No reviews yet. Complete an application and share your feedback!
            </p>
          </div>
        </div>
      ) : (
        <div className="grid gap-6">
          {reviews.map((r) => (
            <div
              key={r._id || r.id}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow"
            >
              <div className="card-body">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="card-title">{r.scholarshipName}</h3>
                    <p className="text-sm text-gray-500">{r.universityName}</p>
                  </div>
                  <button
                    onClick={() => deleteReviewMutation.mutate(r._id || r.id)}
                    className="btn btn-ghost btn-sm btn-circle"
                  >
                    ✕
                  </button>
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
                  <button className="btn btn-xs btn-outline">Edit</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReviews;
