import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../services/api";

const fetchScholarships = async () => {
  const res = await api.get("/scholarships");
  return res.data;
};

const ManageScholarships = () => {
  const qc = useQueryClient();
  const { data: scholarships = [], isLoading } = useQuery({
    queryKey: ["scholarships"],
    queryFn: fetchScholarships,
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/scholarships/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["scholarships"] }),
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Manage Scholarships
        </h1>
        <p className="text-gray-500 mt-2">
          Edit or delete scholarship listings
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : scholarships.length === 0 ? (
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body text-center py-12">
            <p className="text-gray-500 text-lg">No scholarships added yet</p>
            <a
              href="/dashboard/admin/add-scholarship"
              className="btn btn-primary mt-4 w-40 mx-auto"
            >
              Add Scholarship
            </a>
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
                      <th>University</th>
                      <th>Country</th>
                      <th>Deadline</th>
                      <th>Application Fees</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scholarships.map((s) => (
                      <tr key={s._id || s.id} className="hover:bg-base-200">
                        <td>
                          <div className="font-semibold">
                            {s.scholarshipName}
                          </div>
                          <div className="text-xs text-gray-500">
                            {s.subjectCategory}
                          </div>
                        </td>
                        <td>
                          <div className="font-semibold">
                            {s.universityName}
                          </div>
                          <div className="text-xs text-gray-500">
                            {s.city}, {s.country}
                          </div>
                        </td>
                        <td>{s.country}</td>
                        <td>
                          {s.deadline
                            ? new Date(s.deadline).toLocaleDateString()
                            : "N/A"}
                        </td>
                        <td>
                          <span className="badge badge-lg">
                            ${s.applicationFees}
                          </span>
                        </td>
                        <td className="space-x-2">
                          <button className="btn btn-sm btn-outline">
                            Update
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm("Are you sure?")) {
                                deleteMutation.mutate(s._id || s.id);
                              }
                            }}
                            disabled={deleteMutation.isLoading}
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
          <div className="md:hidden space-y-4">
            {scholarships.map((s) => (
              <div key={s._id || s.id} className="card bg-base-100 shadow-md">
                <div className="card-body gap-3">
                  <h3 className="card-title text-lg">{s.scholarshipName}</h3>

                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-semibold">University:</span>{" "}
                      {s.universityName}
                    </div>
                    <div>
                      <span className="font-semibold">Location:</span> {s.city},{" "}
                      {s.country}
                    </div>
                    <div>
                      <span className="font-semibold">Subject:</span>{" "}
                      {s.subjectCategory}
                    </div>
                    <div>
                      <span className="font-semibold">Deadline:</span>{" "}
                      {s.deadline
                        ? new Date(s.deadline).toLocaleDateString()
                        : "N/A"}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">Fees:</span>
                      <span className="badge badge-lg">
                        ${s.applicationFees}
                      </span>
                    </div>
                  </div>

                  <div className="card-actions justify-end pt-2 gap-2">
                    <button className="btn btn-sm btn-outline flex-1">
                      Update
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm("Are you sure?")) {
                          deleteMutation.mutate(s._id || s.id);
                        }
                      }}
                      disabled={deleteMutation.isLoading}
                      className="btn btn-sm btn-error flex-1"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ManageScholarships;
