import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../contexts/useAxiosSecure";
import useThemeContext from "../../../hooks/useThemContext";

const AddScholarship = () => {
  const axiosSecure = useAxiosSecure();


const {theme} = useThemeContext();

   const bgColor = theme === "light" ? "bg-base-100" : "bg-gray-900";
  const textColor = theme === "light" ? "text-gray-800" : "text-white";
  const secondaryText = theme === "light" ? "text-gray-500" : "text-gray-400";
  const cardBg = theme === "light" ? "bg-base-100" : "bg-gray-800";
  const inputBg = theme === "light" ? "bg-white" : "bg-gray-700";
  const borderColor = theme === "light" ? "border-gray-200" : "border-gray-700";
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const qc = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload) => axiosSecure.post("/scholarships", payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["scholarships"] });
      reset();
      alert("Scholarship added successfully!");
    },
    onError: (error) => {
      console.error("Error details:", error.response?.data || error.message);
      alert(
        "Error adding scholarship: " +
          (error.response?.data?.error || error.message),
      );
    },
  });

  const onSubmit = (data) => {
    // Map form field names to schema field names
    const payload = {
      scholarshipName: data.scholarshipName,
      universityName: data.universityName,
      universityImage: data.image || "",
      universityCountry: data.country,
      universityCity: data.city,
      universityWorldRank: data.worldRank ? parseInt(data.worldRank) : 0,
      subjectCategory: data.subjectCategory,
      scholarshipCategory: data.scholarshipCategory,
      degree: data.degree,
      tuitionFees: data.tuitionFees ? parseInt(data.tuitionFees) : null,
      applicationFees: parseInt(data.applicationFees),
      serviceCharge: parseInt(data.serviceCharge),
      applicationDeadline: data.deadline,
      description: data.description || "",
      requirements: data.requirements
        ? data.requirements.split(",").map((r) => r.trim())
        : [],
      // postedUserEmail is auto-set from JWT in controller, don't send from form
    };
    mutation.mutate(payload);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className={`text-3xl md:text-4xl font-bold ${textColor}`}>
          Add New Scholarship
        </h1>
        <p className={`${secondaryText} mt-2`}>
          Create a new scholarship listing
        </p>
      </div>

      <div className={`card ${cardBg} shadow-xl`}>
        <div className="card-body p-4 md:p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className={`label-text ${textColor}`}>
                      Scholarship Name *
                    </span>
                  </label>
                  <input
                    {...register("scholarshipName", { required: "Required" })}
                    placeholder="Enter scholarship name"
                    className={`input input-bordered ${inputBg} ${borderColor} ${textColor}`}
                  />
                  {errors.scholarshipName && (
                    <span className="text-error text-xs mt-1">
                      {errors.scholarshipName.message}
                    </span>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className={`label-text ${textColor}`}>
                      University Name *
                    </span>
                  </label>
                  <input
                    {...register("universityName", { required: "Required" })}
                    placeholder="Enter university name"
                    className={`input input-bordered ${inputBg} ${borderColor} ${textColor}`}
                  />
                  {errors.universityName && (
                    <span className="text-error text-xs mt-1">
                      {errors.universityName.message}
                    </span>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className={`label-text ${textColor}`}>
                      Country *
                    </span>
                  </label>
                  <input
                    {...register("country", { required: "Required" })}
                    placeholder="Enter country"
                    className={`input input-bordered ${inputBg} ${borderColor} ${textColor}`}
                  />
                  {errors.country && (
                    <span className="text-error text-xs mt-1">
                      {errors.country.message}
                    </span>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className={`label-text ${textColor}`}>
                      City *
                    </span>
                  </label>
                  <input
                    {...register("city", { required: "Required" })}
                    placeholder="Enter city"
                    className={`input input-bordered ${inputBg} ${borderColor} ${textColor}`}
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
                    <span className={`label-text ${textColor}`}>
                      Image URL
                    </span>
                  </label>
                  <input
                    {...register("image")}
                    placeholder="Enter image URL"
                    className={`input input-bordered ${inputBg} ${borderColor} ${textColor}`}
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className={`label-text ${textColor}`}>
                      World Rank *
                    </span>
                  </label>
                  <input
                    {...register("worldRank", { required: "Required" })}
                    placeholder="Enter world rank (e.g., 100)"
                    type="number"
                    className={`input input-bordered ${inputBg} ${borderColor} ${textColor}`}
                  />
                  {errors.worldRank && (
                    <span className="text-error text-xs mt-1">
                      {errors.worldRank.message}
                    </span>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className={`label-text ${textColor}`}>
                      Subject Category *
                    </span>
                  </label>
                  <input
                    {...register("subjectCategory", { required: "Required" })}
                    placeholder="e.g., Engineering, Medicine"
                    className={`input input-bordered ${inputBg} ${borderColor} ${textColor}`}
                  />
                  {errors.subjectCategory && (
                    <span className="text-error text-xs mt-1">
                      {errors.subjectCategory.message}
                    </span>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className={`label-text ${textColor}`}>
                      Scholarship Category *
                    </span>
                  </label>
                  <select
                    {...register("scholarshipCategory", {
                      required: "Required",
                    })}
                    className={`select select-bordered ${inputBg} ${borderColor} ${textColor}`}
                  >
                    <option value="">Select a category</option>
                    <option value="Full Fund">Full Fund</option>
                    <option value="Partial">Partial</option>
                    <option value="Self-fund">Self-fund</option>
                  </select>
                  {errors.scholarshipCategory && (
                    <span className="text-error text-xs mt-1">
                      {errors.scholarshipCategory.message}
                    </span>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className={`label-text ${textColor}`}>
                      Degree Level *
                    </span>
                  </label>
                  <select
                    {...register("degree", { required: "Required" })}
                    className={`select select-bordered ${inputBg} ${borderColor} ${textColor}`}
                  >
                    <option value="">Select a degree</option>
                    <option value="Diploma">Diploma</option>
                    <option value="Bachelor">Bachelor</option>
                    <option value="Masters">Masters</option>
                  </select>
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
                    <span className={`label-text ${textColor}`}>
                      Tuition Fees (Optional)
                    </span>
                  </label>
                  <input
                    {...register("tuitionFees")}
                    placeholder="Enter tuition fees"
                    type="number"
                    className={`input input-bordered ${inputBg} ${borderColor} ${textColor}`}
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className={`label-text ${textColor}`}>
                      Application Fees *
                    </span>
                  </label>
                  <input
                    {...register("applicationFees", { required: "Required" })}
                    placeholder="Enter application fees"
                    type="number"
                    className={`input input-bordered ${inputBg} ${borderColor} ${textColor}`}
                  />
                  {errors.applicationFees && (
                    <span className="text-error text-xs mt-1">
                      {errors.applicationFees.message}
                    </span>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className={`label-text ${textColor}`}>
                      Service Charge *
                    </span>
                  </label>
                  <input
                    {...register("serviceCharge", { required: "Required" })}
                    placeholder="Enter service charge"
                    type="number"
                    className={`input input-bordered ${inputBg} ${borderColor} ${textColor}`}
                  />
                  {errors.serviceCharge && (
                    <span className="text-error text-xs mt-1">
                      {errors.serviceCharge.message}
                    </span>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className={`label-text ${textColor}`}>
                      Deadline *
                    </span>
                  </label>
                  <input
                    {...register("deadline", { required: "Required" })}
                    type="date"
                    className={`input input-bordered ${inputBg} ${borderColor} ${textColor}`}
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

            <div className="divider"></div>

            {/* Additional Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Additional Information
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className={`label-text ${textColor}`}>
                      Description (Optional)
                    </span>
                  </label>
                  <textarea
                    {...register("description")}
                    placeholder="Enter scholarship description"
                    className={`textarea textarea-bordered ${inputBg} ${borderColor} ${textColor}`}
                    rows="3"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className={`label-text ${textColor}`}>
                      Requirements (Optional, comma-separated)
                    </span>
                  </label>
                  <textarea
                    {...register("requirements")}
                    placeholder="e.g., GPA > 3.5, TOEFL required, Work experience"
                    className={`textarea textarea-bordered ${inputBg} ${borderColor} ${textColor}`}
                    rows="3"
                  />
                </div>
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
