import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../services/api";

const fetchUsers = async () => {
  const res = await api.get("/users");
  return res.data;
};

const ManageUsers = () => {
  const qc = useQueryClient();
  const { data: users = [] } = useQuery(["users"], fetchUsers);

  const changeRole = useMutation(
    ({ id, role }) => api.patch(`/users/${id}`, { role }),
    {
      onSuccess: () => qc.invalidateQueries(["users"]),
    },
  );

  const deleteUser = useMutation((id) => api.delete(`/users/${id}`), {
    onSuccess: () => qc.invalidateQueries(["users"]),
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Manage Users</h2>
      <div className="mt-4">
        <select
          className="select select-bordered w-64 mb-4"
          onChange={(e) => {
            /* implement filter if needed */
          }}
        >
          <option value="">All Roles</option>
          <option value="Student">Student</option>
          <option value="Moderator">Moderator</option>
          <option value="Admin">Admin</option>
        </select>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id || u.id}>
                  <td>{u.name || "N/A"}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td>
                    <button
                      onClick={() =>
                        changeRole.mutate({
                          id: u._id || u.id,
                          role: u.role === "Student" ? "Moderator" : "Student",
                        })
                      }
                      className="btn btn-sm mr-2"
                    >
                      Change Role
                    </button>
                    <button
                      onClick={() => deleteUser.mutate(u._id || u.id)}
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
  );
};

export default ManageUsers;
