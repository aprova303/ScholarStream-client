import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../contexts/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import ReviewEditModal from "../../../components/ReviewEditModal";
import { toast } from "react-toastify";

const MyReviews = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth() || {};
  const qc = useQueryClient();
  const [editingReview, setEditingReview] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["my-reviews", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/reviews?email=${encodeURIComponent(user?.email)}`,
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  const deleteReviewMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/reviews/${id}`),
    onSuccess: () => {
      toast.success("Review deleted successfully");
      qc.invalidateQueries({ queryKey: ["my-reviews"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "Failed to delete review");
    },
  });

  const handleEditClick = (review) => {
    setEditingReview(review);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingReview(null);
  };

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
          Manage your scholarship reviews and ratings
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
        <>
          {/* Desktop Table View */}
          <div className="hidden md:block card bg-base-100 shadow-xl">
            <div className="card-body p-4 md:p-6">
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead>
                    <tr className="bg-base-200">
                      <th>Scholarship Name</th>
                      <th>University Name</th>
                      <th>Review Comment</th>
                      <th>Review Date</th>
                      <th>Rating</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reviews.map((review) => (
                      <tr key={review._id} className="hover:bg-base-200">
                        <td>
                          <div className="font-semibold">
                            {review.scholarshipName || "N/A"}
                          </div>
                        </td>
                        <td>
                          <div className="font-semibold">
                            {review.universityName}
                          </div>
                        </td>
                        <td>
                          <div className="max-w-xs">
                            <p className="text-sm text-gray-700 line-clamp-2">
                              {review.reviewComment}
                            </p>
                          </div>
                        </td>
                        <td className="text-sm">
                          {new Date(review.reviewDate).toLocaleDateString()}
                        </td>
                        <td>
                          <div className="flex gap-1">
                            {renderStars(review.ratingPoint)}
                            <span className="ml-2 badge badge-sm">
                              {review.ratingPoint}/5
                            </span>
                          </div>
                        </td>
                        <td className="space-x-1">
                          <button
                            onClick={() => handleEditClick(review)}
                            className="btn btn-xs btn-outline btn-info"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() =>
                              deleteReviewMutation.mutate(review._id)
                            }
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
              <div key={review._id} className="card bg-base-100 shadow-md">
                <div className="card-body gap-3">
                  <div>
                    <h3 className="font-bold text-lg">
                      {review.scholarshipName || "N/A"}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {review.universityName}
                    </p>
                  </div>

                  <div className="bg-base-200 p-3 rounded-lg">
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
                      onClick={() => handleEditClick(review)}
                      className="btn btn-sm btn-outline btn-info flex-1"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteReviewMutation.mutate(review._id)}
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

      {/* Edit Modal */}
      <ReviewEditModal
        isOpen={isModalOpen}
        review={editingReview}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default MyReviews;
