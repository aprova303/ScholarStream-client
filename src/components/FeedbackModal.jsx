import React, { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../contexts/useAxiosSecure";
import { toast } from "react-toastify";
import useThemeContext from "../hooks/useThemContext";

const FeedbackModal = ({ isOpen, application, onClose }) => {
  const axiosSecure = useAxiosSecure();
  const qc = useQueryClient();
  const [feedback, setFeedback] = useState("");
   const {theme} = useThemeContext();
  useEffect(() => {
    if (application && isOpen) {
      setFeedback(application.feedback || "");
    }
  }, [application, isOpen]);


  const bgColor = theme === "light" ? "bg-base-100" : "bg-gray-900";
  const textColor = theme === "light" ? "text-gray-800" : "text-white";
  const secondaryText = theme === "light" ? "text-gray-500" : "text-gray-400";
  const cardBg = theme === "light" ? "bg-base-100" : "bg-gray-800";
  const inputBg = theme === "light" ? "bg-white" : "bg-gray-700";
  const borderColor = theme === "light" ? "border-gray-200" : "border-gray-700";

  const updateFeedbackMutation = useMutation({
    mutationFn: (data) =>
      axiosSecure.patch(`/applications/${application?._id}/feedback`, data),
    onSuccess: () => {
      toast.success("Feedback saved successfully");
      qc.invalidateQueries({ queryKey: ["applications"] });
      onClose();
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "Failed to save feedback");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!feedback.trim()) {
      toast.error("Please enter feedback");
      return;
    }
    updateFeedbackMutation.mutate({
      feedback,
      feedbackDate: new Date(),
    });
  };

  if (!isOpen) return null;

  return (
    <dialog className="modal modal-open">
      <div className={`modal-box w-full max-w-md ${inputBg}`}>
        <h3 className="font-bold text-lg mb-4">
          Submit Feedback for {application?.userName}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Application Info */}
          <div className={`bg-base-200 p-3 rounded-lg ${inputBg}`}>
            <p className="text-sm font-semibold">
              {application?.universityName}
            </p>
            <p className={`text-xs text-gray-600 ${inputBg}`}>{application?.userEmail}</p>
          </div>

          {/* Current Status */}
          <div className="form-control">
            <label className="label">
              <span className={`label-text font-semibold ${textColor}`}>Current Status</span>
            </label>
            <select disabled className={`select select-bordered bg-base-200 ${inputBg} ${textColor}`}>
              <option>{application?.applicationStatus}</option>
            </select>
          </div>

          {/* Feedback Textarea */}
          <div className="form-control">
            <label className="label">
              <span className={`label-text font-semibold ${textColor}`}>Your Feedback</span>
            </label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Provide feedback about this application..."
              className={`textarea textarea-bordered h-24 ${theme === "dark" ? "bg-gray-800 text-white" : ""}`}
              required
            />
            <label className="label">
              <span className="label-text-alt text-gray-500">
                {feedback.length}/500 characters
              </span>
            </label>
          </div>

          {/* Actions */}
          <div className="modal-action">
            <button type="button" onClick={onClose} className="btn btn-ghost">
              Cancel
            </button>
            <button
              type="submit"
              disabled={updateFeedbackMutation.isPending}
              className="btn btn-primary"
            >
              {updateFeedbackMutation.isPending ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Save Feedback"
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

export default FeedbackModal;
