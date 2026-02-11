import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../../contexts/useAxiosSecure";
import { toast } from "react-toastify";

const ManageRoleRequests = () => {
  const axiosSecure = useAxiosSecure();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axiosSecure.get("/role-requests/all");
      setRequests(response.data);
    } catch (error) {
      toast.error("Failed to fetch role requests");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    if (!selectedRequest) return;

    setProcessing(true);
    try {
      await axiosSecure.put(`/role-requests/approve/${selectedRequest._id}`, {
        adminResponse: responseMessage,
      });

      toast.success(
        `Approved ${selectedRequest.userName} as ${selectedRequest.requestedRole}`,
      );
      setSelectedRequest(null);
      setResponseMessage("");
      fetchRequests();
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to approve request");
    } finally {
      setProcessing(false);
    }
  };

  const handleReject = async () => {
    if (!selectedRequest) return;

    setProcessing(true);
    try {
      await axiosSecure.put(`/role-requests/reject/${selectedRequest._id}`, {
        adminResponse: responseMessage,
      });

      toast.success("Role request rejected");
      setSelectedRequest(null);
      setResponseMessage("");
      fetchRequests();
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to reject request");
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-[#9f87e2]"></span>
      </div>
    );
  }

  const pendingRequests = requests.filter((r) => r.status === "Pending");
  const reviewedRequests = requests.filter((r) => r.status !== "Pending");

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Role Requests</h1>

      {/* Pending Requests */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[#9f87e2]">
          Pending Requests ({pendingRequests.length})
        </h2>
        {pendingRequests.length === 0 ? (
          <p className="text-gray-500">No pending role requests</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-[#f5f5f5]">
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Name
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Email
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Requested Role
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Date
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {pendingRequests.map((req) => (
                  <tr key={req._id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">
                      <div className="flex items-center gap-2">
                        {req.userId?.photoURL && (
                          <img
                            src={req.userId.photoURL}
                            alt={req.userName}
                            className="w-8 h-8 rounded-full"
                          />
                        )}
                        {req.userName}
                      </div>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {req.email}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                        {req.requestedRole}
                      </span>
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-sm">
                      {new Date(req.createdAt).toLocaleDateString()}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <button
                        onClick={() => setSelectedRequest(req)}
                        className="bg-[#9f87e2] text-white px-3 py-1 rounded hover:bg-[#8a76c9]"
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Reviewed Requests */}
      {reviewedRequests.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-600">
            Review History
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-[#f5f5f5]">
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Name
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Role
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Status
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Response
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {reviewedRequests.map((req) => (
                  <tr key={req._id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">
                      {req.userName}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {req.requestedRole}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded text-sm ${
                          req.status === "Approved"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {req.status}
                      </span>
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-sm max-w-xs truncate">
                      {req.adminResponse}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-sm">
                      {new Date(req.reviewedAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4">Review Request</h3>

            <div className="mb-4 space-y-2">
              <p>
                <strong>Name:</strong> {selectedRequest.userName}
              </p>
              <p>
                <strong>Email:</strong> {selectedRequest.email}
              </p>
              <p>
                <strong>Requested Role:</strong> {selectedRequest.requestedRole}
              </p>
              <p>
                <strong>Message:</strong>
              </p>
              <p className="p-2 bg-gray-100 rounded text-sm">
                {selectedRequest.message || "(No message provided)"}
              </p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Your Response (Optional)
              </label>
              <textarea
                value={responseMessage}
                onChange={(e) => setResponseMessage(e.target.value)}
                placeholder="E.g., Great contribution! Welcome as Moderator."
                className="w-full border border-gray-300 rounded px-3 py-2 resize-none"
                rows="3"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setSelectedRequest(null);
                  setResponseMessage("");
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
                disabled={processing}
              >
                Close
              </button>
              <button
                onClick={handleReject}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
                disabled={processing}
              >
                {processing ? "..." : "Reject"}
              </button>
              <button
                onClick={handleApprove}
                className="flex-1 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
                disabled={processing}
              >
                {processing ? "..." : "Approve"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageRoleRequests;
