import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../contexts/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";

const AddReviewModal = ({ isOpen, application, onClose, onSuccess }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth() || {};
  const qc = useQueryClient();
  const [formData, setFormData] = useState({
    ratingPoint: 5,
    reviewComment: "",
  });

  const createReviewMutation = useMutation({
    mutationFn: (data) => axiosSecure.post("/reviews", data),
    onSuccess: () => {
      toast.success("Review submitted successfully");
      qc.invalidateQueries({ queryKey: ["my-reviews"] });
      qc.invalidateQueries({ queryKey: ["my-applications"] });
      setFormData({ ratingPoint: 5, reviewComment: "" });
      onClose?.();
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "Failed to submit review");
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "ratingPoint" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.reviewComment.trim()) {
      toast.error("Please enter a review comment");
      return;
    }

    createReviewMutation.mutate({
      scholarshipId:
        application?.scholarshipId?._id || application?.scholarshipId,
      universityName: application?.universityName,
      userName: user?.displayName || user?.email,
      userEmail: user?.email,
      ratingPoint: formData.ratingPoint,
      reviewComment: formData.reviewComment,
    });
  };

  if (!isOpen || !application) return null;

  return (
    <dialog className="modal modal-open">
      <div className="modal-box w-full max-w-md">
        <h3 className="font-bold text-lg mb-2">Add Review</h3>
        <p className="text-sm text-gray-600 mb-4">
          {application.universityName}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Rating */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Rating</span>
            </label>
            <div className="flex gap-2 items-center">
              <select
                name="ratingPoint"
                value={formData.ratingPoint}
                onChange={handleChange}
                className="select select-bordered flex-1"
              >
                <option value="1">★ 1 - Poor</option>
                <option value="2">★★ 2 - Fair</option>
                <option value="3">★★★ 3 - Good</option>
                <option value="4">★★★★ 4 - Very Good</option>
                <option value="5">★★★★★ 5 - Excellent</option>
              </select>
              <span className="text-yellow-400 text-xl">
                {"★".repeat(formData.ratingPoint)}
                {"☆".repeat(5 - formData.ratingPoint)}
              </span>
            </div>
          </div>

          {/* Comment */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Review Comment</span>
            </label>
            <textarea
              name="reviewComment"
              value={formData.reviewComment}
              onChange={handleChange}
              placeholder="Share your experience with this scholarship..."
              className="textarea textarea-bordered h-24"
              required
            />
          </div>

          {/* Actions */}
          <div className="modal-action">
            <button type="button" onClick={onClose} className="btn btn-ghost">
              Cancel
            </button>
            <button
              type="submit"
              disabled={createReviewMutation.isPending}
              className="btn btn-primary"
            >
              {createReviewMutation.isPending ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Submit Review"
              )}
            </button>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop" onClick={onClose}>
        <button>Close</button>
      </form>
    </dialog>
  );
};

export default AddReviewModal;
