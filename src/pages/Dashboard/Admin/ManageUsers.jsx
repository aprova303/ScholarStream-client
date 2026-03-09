import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../contexts/useAxiosSecure";
import useThemeContext from "../../../hooks/useThemContext";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [filterRole, setFilterRole] = useState("");
  const qc = useQueryClient();

const {theme} = useThemeContext();
    
  const bgColor = theme === "light" ? "bg-base-100" : "bg-gray-900";
  const textColor = theme === "light" ? "text-gray-800" : "text-white";
  const secondaryText = theme === "light" ? "text-gray-500" : "text-gray-400";
  const cardBg = theme === "light" ? "bg-base-100" : "bg-gray-800";
  const inputBg = theme === "light" ? "bg-white" : "bg-gray-700";
  const borderColor = theme === "light" ? "border-gray-200" : "border-gray-700";

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const changeRole = useMutation({
    mutationFn: ({ id, role }) =>
      axiosSecure.patch(`/users/${id}/role`, { role }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] }),
  });

  const deleteUser = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/users/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] }),
  });

  const filteredUsers = filterRole
    ? users.filter((u) => u.role === filterRole)
    : users;

  const getRoleBadgeColor = (role) => {
    const colors = {
      Admin: "badge-error",
      Moderator: "badge-info",
      Student: "badge-warning",
    };
    return colors[role] || "badge-ghost";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold">
          Manage Users
        </h1>
        <p className={`text-sm ${secondaryText} mt-2`}>
          View, filter, and manage platform users
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <>
          {/* Filter Section */}
          <div className={`card ${cardBg} shadow-lg`}>
            <div className="card-body">
              <h3 className="card-title">Filter by Role</h3>
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className={`select select-bordered w-full md:max-w-xs ${inputBg} ${borderColor}`}
              >
                <option value="">All Roles</option>
                <option value="Student">Student</option>
                <option value="Moderator">Moderator</option>
                <option value="Admin">Admin</option>
              </select>
              <p className={`text-sm ${secondaryText} mt-2`}>
                Showing {filteredUsers.length} of {users.length} users
              </p>
            </div>
          </div>

          {filteredUsers.length === 0 ? (
            <div className={`card ${cardBg} shadow-lg`}>
              <div className="card-body text-center py-12">
                <p className={`text-${secondaryText} text-lg`}>No users found</p>
              </div>
            </div>
          ) : (
            <>
              {/* Desktop Table View */}
              <div className={`hidden md:block card bg-base-100 shadow-xl ${cardBg}`}>
                <div className="card-body p-4 md:p-6">
                  <div className="overflow-x-auto">
                    <table className="table w-full">
                      <thead>
                        <tr className={`bg-base-200 ${cardBg} ${textColor}`}>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Current Role</th>
                          <th>Join Date</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers.map((u) => (
                          <tr key={u._id || u.id} className={`hover:${cardBg}`}>
                            <td>
                              <div className="flex items-center space-x-3">
                                <div className="avatar placeholder">
                                  <div className={`bg-base-300 text-base-content rounded-full w-10 ${cardBg}`}>
                                    <span>{u.name?.charAt(0) || "?"}</span>
                                  </div>
                                </div>
                                <div>
                                  <div className="font-bold">
                                    {u.name || "N/A"}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td>{u.email}</td>
                            <td>
                              <span
                                className={`badge ${getRoleBadgeColor(u.role)}`}
                              >
                                {u.role}
                              </span>
                            </td>
                            <td>
                              {u.joinDate
                                ? new Date(u.joinDate).toLocaleDateString()
                                : "N/A"}
                            </td>
                            <td className="space-x-2">
                              <select
                                defaultValue={u.role}
                                onChange={(e) =>
                                  changeRole.mutate({
                                    id: u._id || u.id,
                                    role: e.target.value,
                                  })
                                }
                                className={`select select-sm select-bordered ${inputBg} ${borderColor}`}
                              >
                                <option value="Student">Student</option>
                                <option value="Moderator">Moderator</option>
                                <option value="Admin">Admin</option>
                              </select>
                              <button
                                onClick={() => {
                                  if (window.confirm("Are you sure?")) {
                                    deleteUser.mutate(u._id || u.id);
                                  }
                                }}
                                disabled={deleteUser.isLoading}
                                className="btn btn-sm btn-error"
                              >
                                Delete
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
              <div className={`md:hidden space-y-4`}>
                {filteredUsers.map((u) => (
                  <div
                    key={u._id || u.id}
                    className={`card ${cardBg} border-amber-300 shadow-lg`}
                  >
                    <div className="card-body gap-3">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="avatar placeholder">
                          <div className={`bg-base-300 text-base-content rounded-full w-12 ${cardBg}`}>
                            <span className="font-bold">
                              {u.name?.charAt(0) || "?"}
                            </span>
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold">{u.name || "N/A"}</h3>
                          <p className={`text-sm ${secondaryText}`}>{u.email}</p>
                        </div>
                      </div>

                      <div className="divider my-2"></div>

                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="font-semibold">Role:</span>
                          <span
                            className={`badge ${getRoleBadgeColor(u.role)}`}
                          >
                            {u.role}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-semibold">Join Date:</span>
                          <span>
                            {u.joinDate
                              ? new Date(u.joinDate).toLocaleDateString()
                              : "N/A"}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2 pt-2">
                        <label className="block">
                          <span className="text-sm font-semibold mb-1 block">
                            Change Role
                          </span>
                          <select
                            defaultValue={u.role}
                            onChange={(e) =>
                              changeRole.mutate({
                                id: u._id || u.id,
                                role: e.target.value,
                              })
                            }
                            className={`select select-sm select-bordered w-full ${inputBg} ${borderColor}`}
                          >
                            <option value={`Student`}>Student</option>
                            <option value={`Moderator`}>Moderator</option>
                            <option value={`Admin`}>Admin</option>
                          </select>
                        </label>
                      </div>

                      <button
                        onClick={() => {
                          if (window.confirm("Are you sure?")) {
                            deleteUser.mutate(u._id || u.id);
                          }
                        }}
                        disabled={deleteUser.isLoading}
                        className="btn btn-sm btn-error w-full mt-2"
                      >
                        Delete User
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ManageUsers;
