import React, { useState } from "react";
import { api } from "../services/api";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";

const RequestRoleModal = ({ isOpen, onClose, onSuccess, userName }) => {
  const [role, setRole] = useState("Moderator");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { getToken } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const token = await getToken();
      const response = await api.post(
        "/role-requests/create",
        {
          requestedRole: role,
          message,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      toast.success("Role request submitted! Admins will review it soon.");
      onSuccess();
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to submit request");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold mb-4 text-[#654ea3]">Request Role</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="Moderator">Moderator</option>
              <option value="Admin">Admin</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Moderators review applications. Admins manage users and content.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Why do you want this role?
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell admins why you'd be good for this role..."
              className="w-full border border-gray-300 rounded px-3 py-2 resize-none"
              rows="3"
            />
          </div>

          <div className="flex gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-[#9f87e2] text-white rounded hover:bg-[#8a76c9] disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit Request"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestRoleModal;
