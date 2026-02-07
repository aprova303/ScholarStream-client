import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../services/api";

const fetchScholarships = async () => {
  const res = await api.get("/scholarships");
  return res.data;
};

const ManageScholarships = () => {
  const qc = useQueryClient();
  const { data: scholarships = [] } = useQuery(
    ["scholarships"],
    fetchScholarships,
  );

  const deleteMutation = useMutation(
    (id) => api.delete(`/scholarships/${id}`),
    {
      onSuccess: () => qc.invalidateQueries(["scholarships"]),
    },
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Manage Scholarships</h2>
      <div className="overflow-x-auto mt-4">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>University</th>
              <th>Country</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {scholarships.map((s) => (
              <tr key={s._id || s.id}>
                <td>{s.scholarshipName}</td>
                <td>{s.universityName}</td>
                <td>{s.country}</td>
                <td>
                  <button className="btn btn-sm btn-outline mr-2">
                    Update
                  </button>
                  <button
                    onClick={() => deleteMutation.mutate(s._id || s.id)}
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
  );
};

export default ManageScholarships;
