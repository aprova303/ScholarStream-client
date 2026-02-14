import React, { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../contexts/useAxiosSecure";
import { toast } from "react-toastify";

const ApplicationEditModal = ({ isOpen, application, onClose, onSuccess }) => {
  const axiosSecure = useAxiosSecure();
  const qc = useQueryClient();
  const [loading, setLoading] = useState(false);

  const updateApplicationMutation = useMutation({
    mutationFn: (data) =>
      axiosSecure.patch(`/applications/${application?._id}`, data),
    onSuccess: () => {
      toast.success("Application updated successfully");
      qc.invalidateQueries({ queryKey: ["my-applications"] });
      onClose?.();
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.error || "Failed to update application",
      );
    },
  });

  const handleCancel = () => {
    onClose?.();
  };

  if (!isOpen || !application) return null;

  return (
    <dialog className="modal modal-open">
      <div className="modal-box w-full max-w-md">
        <h3 className="font-bold text-lg mb-4">Edit Application</h3>

        <div className="space-y-4">
          <div>
            <label className="label">
              <span className="label-text font-semibold">
                Application Status
              </span>
            </label>
            <div className="bg-base-200 p-3 rounded">
              <p className="text-sm">{application.applicationStatus}</p>
            </div>
          </div>

          <div>
            <label className="label">
              <span className="label-text font-semibold">Scholarship</span>
            </label>
            <div className="bg-base-200 p-3 rounded">
              <p className="text-sm font-semibold">
                {application.universityName}
              </p>
            </div>
          </div>

          <div className="alert alert-info">
            <span className="text-sm">
              You can view more details about your application in the
              application details modal. Contact support for other
              modifications.
            </span>
          </div>
        </div>

        <div className="modal-action mt-6">
          <button onClick={handleCancel} className="btn btn-ghost">
            Close
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop" onClick={onClose}>
        <button>Close</button>
      </form>
    </dialog>
  );
};

export default ApplicationEditModal;
