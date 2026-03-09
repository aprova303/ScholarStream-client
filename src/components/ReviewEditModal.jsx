import React, { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../contexts/useAxiosSecure";
import { toast } from "react-toastify";
import useThemeContext from "../hooks/useThemContext";

const ReviewEditModal = ({ isOpen, review, onClose, onSuccess }) => {
  const axiosSecure = useAxiosSecure();
  const qc = useQueryClient();
  const [formData, setFormData] = useState({
    reviewComment: "",
    ratingPoint: 5,
  });

  const {theme} = useThemeContext();

   const bgColor = theme === "light" ? "bg-base-100" : "bg-gray-900";
  const textColor = theme === "light" ? "text-gray-800" : "text-white";
  const secondaryText = theme === "light" ? "text-gray-500" : "text-gray-400";
  const cardBg = theme === "light" ? "bg-base-100" : "bg-gray-800";
  const inputBg = theme === "light" ? "bg-white" : "bg-gray-700";
  const borderColor = theme === "light" ? "border-gray-200" : "border-gray-700";

  useEffect(() => {
    if (review) {
      setFormData({
        reviewComment: review.reviewComment || "",
        ratingPoint: review.ratingPoint || 5,
      });
    }
  }, [review, isOpen]);

  const updateReviewMutation = useMutation({
    mutationFn: (data) => axiosSecure.patch(`/reviews/${review?._id}`, data),
    onSuccess: () => {
      toast.success("Review updated successfully");
      qc.invalidateQueries({ queryKey: ["my-reviews"] });
      qc.invalidateQueries({ queryKey: ["all-reviews"] });
      onClose();
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "Failed to update review");
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
    updateReviewMutation.mutate(formData);
  };

  if (!isOpen) return null;

  return (
    <dialog className={`modal modal-open `}>
      <div className={`modal-box w-full max-w-md ${bgColor}`}>
        <h3 className={`font-bold text-lg mb-4 ${textColor}`}>Edit Review</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Rating */}
          <div className="form-control">
            <label className="label">
              <span className={`label-text font-semibold ${textColor}`}>Rating</span>
            </label>
            <div className="flex gap-2 items-center">
              <select
                name="ratingPoint"
                value={formData.ratingPoint}
                onChange={handleChange}
                className={`select select-bordered flex-1 ${inputBg} ${textColor}`}
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
              <span className={`label-text font-semibold ${textColor}`}>Review Comment</span>
            </label>
            <textarea
              name="reviewComment"
              value={formData.reviewComment}
              onChange={handleChange}
              placeholder="Share your experience with this scholarship..."
              className={`textarea textarea-bordered h-24 ${inputBg} ${textColor}`}
              required
            />
          </div>

          {/* Actions */}
          <div className="modal-action">
            <button type="button" onClick={onClose} className={`btn btn-ghost ${textColor} ${bgColor}`}>
              Cancel
            </button>
            <button
              type="submit"
              disabled={updateReviewMutation.isPending}
              className="btn btn-primary"
            >
              {updateReviewMutation.isPending ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Update Review"
              )}
            </button>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default ReviewEditModal;
