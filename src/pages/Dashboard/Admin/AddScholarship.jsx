import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../services/api";

const AddScholarship = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const qc = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload) => api.post("/scholarships", payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["scholarships"] });
      reset();
      alert('Scholarship added successfully!');
    },
    onError: () => alert('Error adding scholarship'),
  });

  const onSubmit = (data) => {
    mutation.mutate({ ...data, postDate: new Date().toISOString() });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Add New Scholarship
        </h1>
        <p className="text-gray-500 mt-2">Create a new scholarship listing</p>
      </div>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body p-4 md:p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Scholarship Name *</span>
                  </label>
                  <input
                    {...register("scholarshipName", { required: "Required" })}
                    placeholder="Enter scholarship name"
                    className="input input-bordered"
                  />
                  {errors.scholarshipName && (
                    <span className="text-error text-xs mt-1">
                      {errors.scholarshipName.message}
                    </span>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">University Name *</span>
                  </label>
                  <input
                    {...register("universityName", { required: "Required" })}
                    placeholder="Enter university name"
                    className="input input-bordered"
                  />
                  {errors.universityName && (
                    <span className="text-error text-xs mt-1">
                      {errors.universityName.message}
                    </span>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Country *</span>
                  </label>
                  <input
                    {...register("country", { required: "Required" })}
                    placeholder="Enter country"
                    className="input input-bordered"
                  />
                  {errors.country && (
                    <span className="text-error text-xs mt-1">
                      {errors.country.message}
                    </span>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">City *</span>
                  </label>
                  <input
                    {...register("city", { required: "Required" })}
                    placeholder="Enter city"
                    className="input input-bordered"
                  />
                  {errors.city && (
                    <span className="text-error text-xs mt-1">
                      {errors.city.message}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="divider"></div>

            {/* Scholarship Details */}
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Scholarship Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Image URL</span>
                  </label>
                  <input
                    {...register("image")}
                    placeholder="Enter image URL"
                    className="input input-bordered"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">World Rank</span>
                  </label>
                  <input
                    {...register("worldRank")}
                    placeholder="Enter world rank"
                    className="input input-bordered"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Subject Category *</span>
                  </label>
                  <input
                    {...register("subjectCategory", { required: "Required" })}
                    placeholder="e.g., Engineering, Medicine"
                    className="input input-bordered"
                  />
                  {errors.subjectCategory && (
                    <span className="text-error text-xs mt-1">
                      {errors.subjectCategory.message}
                    </span>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Scholarship Category *</span>
                  </label>
                  <input
                    {...register("scholarshipCategory", {
                      required: "Required",
                    })}
                    placeholder="e.g., Merit-based, Need-based"
                    className="input input-bordered"
                  />
                  {errors.scholarshipCategory && (
                    <span className="text-error text-xs mt-1">
                      {errors.scholarshipCategory.message}
                    </span>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Degree Level *</span>
                  </label>
                  <input
                    {...register("degree", { required: "Required" })}
                    placeholder="e.g., Bachelor, Master"
                    className="input input-bordered"
                  />
                  {errors.degree && (
                    <span className="text-error text-xs mt-1">
                      {errors.degree.message}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="divider"></div>

            {/* Financial Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Financial Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Tuition Fees (Optional)</span>
                  </label>
                  <input
                    {...register("tuitionFees")}
                    placeholder="Enter tuition fees"
                    type="number"
                    className="input input-bordered"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Application Fees *</span>
                  </label>
                  <input
                    {...register("applicationFees", { required: "Required" })}
                    placeholder="Enter application fees"
                    type="number"
                    className="input input-bordered"
                  />
                  {errors.applicationFees && (
                    <span className="text-error text-xs mt-1">
                      {errors.applicationFees.message}
                    </span>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Service Charge *</span>
                  </label>
                  <input
                    {...register("serviceCharge", { required: "Required" })}
                    placeholder="Enter service charge"
                    type="number"
                    className="input input-bordered"
                  />
                  {errors.serviceCharge && (
                    <span className="text-error text-xs mt-1">
                      {errors.serviceCharge.message}
                    </span>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Deadline *</span>
                  </label>
                  <input
                    {...register("deadline", { required: "Required" })}
                    type="date"
                    className="input input-bordered"
                  />
                  {errors.deadline && (
                    <span className="text-error text-xs mt-1">
                      {errors.deadline.message}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="divider"></div>

            {/* Admin Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Admin Information</h3>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Your Email *</span>
                </label>
                <input
                  {...register("userEmail", { required: "Required" })}
                  placeholder="Enter your email"
                  type="email"
                  className="input input-bordered"
                />
                {errors.userEmail && (
                  <span className="text-error text-xs mt-1">
                    {errors.userEmail.message}
                  </span>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="card-actions justify-end">
              <button
                type="button"
                onClick={() => reset()}
                className="btn btn-outline"
              >
                Reset
              </button>
              <button
                type="submit"
                disabled={mutation.isLoading}
                className="btn btn-primary"
              >
                {mutation.isLoading ? "Adding..." : "Add Scholarship"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddScholarship;
