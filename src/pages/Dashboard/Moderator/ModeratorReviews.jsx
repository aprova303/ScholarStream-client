import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../contexts/useAxiosSecure";
import { toast } from "react-toastify";
import useThemeContext from "../../../hooks/useThemContext";

const ModeratorReviews = () => {
  const axiosSecure = useAxiosSecure();
  const qc = useQueryClient();
const {theme} = useThemeContext();
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["all-reviews"],
    queryFn: async () => {
      const res = await axiosSecure.get("/reviews");
      return res.data;
    },
  });

   const bgColor = theme === "light" ? "bg-base-100" : "bg-gray-900";
  const textColor = theme === "light" ? "text-gray-800" : "text-white";
  const secondaryText = theme === "light" ? "text-gray-500" : "text-gray-400";
  const cardBg = theme === "light" ? "bg-base-100" : "bg-gray-800";
  const inputBg = theme === "light" ? "bg-white" : "bg-gray-700";
  const borderColor = theme === "light" ? "border-gray-200" : "border-gray-700";

  const deleteReviewMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/reviews/${id}`),
    onSuccess: () => {
      toast.success("Review deleted successfully");
      qc.invalidateQueries({ queryKey: ["all-reviews"] });
      qc.invalidateQueries({ queryKey: ["my-reviews"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "Failed to delete review");
    },
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
      <div className="mb-8}">
        <h1 className={`text-3xl md:text-4xl font-bold ${theme === "dark" ? "text-gray-50" : "text-gray-800"}`}>
          All Reviews
        </h1>
        <p className={`text-${theme === "dark" ? "gray-400" : "gray-500"} mt-2`}>
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
            <p className={`text-${theme === "dark" ? "gray-400" : "gray-500"} text-lg`}>No reviews available yet</p>
          </div>
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className={`hidden md:block card bg-base-100 shadow-xl ${theme === "dark" ? "bg-gray-800 text-white" : ""}`}>
            <div className="card-body p-4 md:p-6">
              <div className="overflow-x-auto">
                <table className={`table w-full text-sm ${theme === "dark" ? "bg-gray-800 text-white" : ""}`}>
                  <thead>
                    <tr className={`bg-base-200 ${theme === "dark" ? "bg-gray-700 text-white" : ""}`}>
                      <th>Scholarship Name</th>
                      <th>University Name</th>
                      <th>Reviewer Name</th>
                      <th>Review Comment</th>
                      <th>Rating</th>
                      <th>Review Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reviews.map((review) => (
                      <tr key={review._id} className={`bg-base-100 ${theme === "dark" ? "bg-gray-800 text-white" : ""}`}>
                        <td className="font-semibold">
                          {review.scholarshipName || "N/A"}
                        </td>
                        <td>{review.universityName}</td>
                        <td>{review.userName}</td>
                        <td>
                          <div className="max-w-xs">
                            <p className="text-xs line-clamp-2">
                              {review.reviewComment}
                            </p>
                          </div>
                        </td>
                        <td>
                          <div className="flex gap-1">
                            {renderStars(review.ratingPoint)}
                            <span className="badge badge-sm">
                              {review.ratingPoint}/5
                            </span>
                          </div>
                        </td>
                        <td className="text-xs">
                          {new Date(review.reviewDate).toLocaleDateString()}
                        </td>
                        <td>
                          <button
                            onClick={() => {
                              if (
                                confirm(
                                  "Are you sure you want to delete this review?",
                                )
                              ) {
                                deleteReviewMutation.mutate(review._id);
                              }
                            }}
                            disabled={deleteReviewMutation.isPending}
                            className="btn btn-xs btn-outline btn-error"
                          >
                            {deleteReviewMutation.isPending ? (
                              <span className="loading loading-spinner loading-xs"></span>
                            ) : (
                              "Delete"
                            )}
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
          <div className="md:hidden space-y-4">
            {reviews.map((review) => (
              <div key={review._id} className={`card ${cardBg} shadow-md`}>
                <div className="card-body gap-3">
                  <div>
                    <h3 className="font-bold text-lg">
                      {review.scholarshipName || "N/A"}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {review.universityName}
                    </p>
                  </div>

                  <div className={`bg-base-200 p-3 rounded-lg ${cardBg}`}>
                    <p className="text-xs font-semibold mb-2">
                      Reviewed by: {review.userName}
                    </p>
                    <p className="text-sm">{review.reviewComment}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {renderStars(review.ratingPoint)}
                    </div>
                    <span className="badge badge-sm">
                      {review.ratingPoint}/5
                    </span>
                  </div>

                  <div className="text-xs text-gray-500">
                    {new Date(review.reviewDate).toLocaleDateString()}
                  </div>

                  <div className="card-actions justify-end gap-2 pt-2">
                    <button
                      onClick={() => {
                        if (
                          confirm(
                            "Are you sure you want to delete this review?",
                          )
                        ) {
                          deleteReviewMutation.mutate(review._id);
                        }
                      }}
                      disabled={deleteReviewMutation.isPending}
                      className="btn btn-sm btn-outline btn-error flex-1"
                    >
                      {deleteReviewMutation.isPending ? (
                        <span className="loading loading-spinner loading-xs"></span>
                      ) : (
                        "Delete"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ModeratorReviews;
