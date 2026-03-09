import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router";
import useAxiosSecure from "../../../contexts/useAxiosSecure";
import useThemeContext from "../../../hooks/useThemContext";

const UpdateScholarship = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { theme } = useThemeContext();

  const bgColor = theme === "light" ? "bg-base-100" : "bg-gray-900";
  const textColor = theme === "light" ? "text-gray-800" : "text-white";
  const secondaryText = theme === "light" ? "text-gray-500" : "text-gray-400";
  const cardBg = theme === "light" ? "bg-base-100" : "bg-gray-800";
  const inputBg = theme === "light" ? "bg-white" : "bg-gray-700";
  const borderColor = theme === "light" ? "border-gray-200" : "border-gray-700";

  // Fetch scholarship data
  const { data: scholarship, isLoading } = useQuery({
    queryKey: ["scholarship", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/scholarships/${id}`);
      return res.data;
    },
  });

  // Populate form when scholarship data loads
  useEffect(() => {
    if (scholarship) {
      reset({
        scholarshipName: scholarship.scholarshipName || "",
        universityName: scholarship.universityName || "",
        image: scholarship.universityImage || "",
        country: scholarship.universityCountry || "",
        city: scholarship.universityCity || "",
        worldRank: scholarship.universityWorldRank || "",
        subjectCategory: scholarship.subjectCategory || "",
        scholarshipCategory: scholarship.scholarshipCategory || "",
        degree: scholarship.degree || "",
        tuitionFees: scholarship.tuitionFees || "",
        applicationFees: scholarship.applicationFees || "",
        serviceCharge: scholarship.serviceCharge || "",
        deadline: scholarship.applicationDeadline || "",
        description: scholarship.description || "",
        requirements: Array.isArray(scholarship.requirements)
          ? scholarship.requirements.join(", ")
          : scholarship.requirements || "",
      });
    }
  }, [scholarship, reset]);

  const mutation = useMutation({
    mutationFn: (payload) => axiosSecure.patch(`/scholarships/${id}`, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["scholarships"] });
      qc.invalidateQueries({ queryKey: ["scholarship", id] });
      alert("Scholarship updated successfully!");
      navigate("/dashboard/admin/manage-scholarships");
    },
    onError: (error) => {
      console.error("Error details:", error.response?.data || error.message);
      alert(
        "Error updating scholarship: " +
          (error.response?.data?.error || error.message),
      );
    },
  });

  const onSubmit = (data) => {
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
    };
    mutation.mutate(payload);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        {/* <h1 className= {`text-3xl md:text-4xl font-bold ${textColor}`}> */}
         <h1 className={`text-3xl md:text-4xl font-bold ${textColor}`}>
          Update Scholarship
        </h1>
        <p className={`text-gray-500 mt-2 ${textColor}`}>Edit scholarship details</p>
      </div>
      <div className={`card bg-base-100 shadow-xl ${bgColor}`}>
        <div className="card-body p-4 md:p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Information */}
            <div className=''>
              <h3 className
              ={`text-lg font-semibold mb-4 ${textColor}`}>Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className={`label-text ${textColor}`}>Scholarship Name *</span>
                  </label>
                  <input
                    {...register("scholarshipName", { required: "Required" })}
                    placeholder="Enter scholarship name"
                    className={`${inputBg} input input-bordered`}
                  />
                  {errors.scholarshipName && (
                    <span className="text-error text-xs mt-1">
                      {errors.scholarshipName.message}
                    </span>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className={`label-text ${textColor}`}>University Name *</span>
                  </label>
                  <input
                    {...register("universityName", { required: "Required" })}
                    placeholder="Enter university name"
                    className={`${inputBg} input input-bordered`}
                  />
                  {errors.universityName && (
                    <span className="text-error text-xs mt-1">
                      {errors.universityName.message}
                    </span>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className={`label-text ${textColor}`}>University Image URL</span>
                  </label>
                  <input
                    {...register("image")}
                    placeholder="Enter image URL"
                    className={`${inputBg} input input-bordered`}
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className={`label-text ${textColor}`}>Country *</span>
                  </label>
                  <input
                    {...register("country", { required: "Required" })}
                    placeholder="Enter country"
                    className={`${inputBg} input input-bordered`}
                  />
                  {errors.country && (
                    <span className="text-error text-xs mt-1">
                      {errors.country.message}
                    </span>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className={`label-text ${textColor}`}>City *</span>
                  </label>
                  <input
                    {...register("city", { required: "Required" })}
                    placeholder="Enter city"
                    className={`${inputBg} input input-bordered`}
                  />
                  {errors.city && (
                    <span className="text-error text-xs mt-1">
                      {errors.city.message}
                    </span>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className={`label-text ${textColor}`}>World Rank</span>
                  </label>
                  <input
                    {...register("worldRank", { min: 0 })}
                    type="number"
                    placeholder="Enter world rank"
                    className={`${inputBg} input input-bordered`}
                  />
                </div>
              </div>
            </div>

            {/* Scholarship Details */}
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Scholarship Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className={`label-text ${textColor}`}>Subject Category *</span>
                  </label>
                  <input
                    {...register("subjectCategory", { required: "Required" })}
                    placeholder="e.g., Engineering, Medicine"
                    className={`${inputBg} input input-bordered`}
                  />
                  {errors.subjectCategory && (
                    <span className="text-error text-xs mt-1">
                      {errors.subjectCategory.message}
                    </span>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className={`label-text ${textColor}`}>Scholarship Category *</span>
                  </label>
                  <input
                    {...register("scholarshipCategory", {
                      required: "Required",
                    })}
                    placeholder="e.g., Merit-based"
                    className={`input input-bordered ${inputBg} ${borderColor}`}
                  />
                  {errors.scholarshipCategory && (
                    <span className="text-error text-xs mt-1">
                      {errors.scholarshipCategory.message}
                    </span>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className={`label-text ${textColor}`}>Degree *</span>
                  </label>
                  <input
                    {...register("degree", { required: "Required" })}
                    placeholder="e.g., Bachelor, Master"
                    className={`${inputBg} input input-bordered`}
                  />
                  {errors.degree && (
                    <span className="text-error text-xs mt-1">
                      {errors.degree.message}
                    </span>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className={`label-text ${textColor}`}>Application Deadline *</span>
                  </label>
                  <input
                    {...register("deadline", { required: "Required" })}
                    type="date"
                    className={`${inputBg} input input-bordered`}
                  />
                  {errors.deadline && (
                    <span className="text-error text-xs mt-1">
                      {errors.deadline.message}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Financial Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Financial Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className={`label-text ${textColor}`}>Tuition Fees</span>
                  </label>
                  <input
                    {...register("tuitionFees")}
                    type="number"
                    placeholder="Enter tuition fees"
                    className={`${inputBg} input input-bordered`}
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className={`label-text ${textColor}`}>Application Fees *</span>
                  </label>
                  <input
                    {...register("applicationFees", { required: "Required" })}
                    type="number"
                    placeholder="Enter application fees"
                    className={`${inputBg} input input-bordered`}
                  />
                  {errors.applicationFees && (
                    <span className="text-error text-xs mt-1">
                      {errors.applicationFees.message}
                    </span>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className={`label-text ${textColor}`}>Service Charge *</span>
                  </label>
                  <input
                    {...register("serviceCharge", { required: "Required" })}
                    type="number"
                    placeholder="Enter service charge"
                    className={`${inputBg} input input-bordered`}
                  />
                  {errors.serviceCharge && (
                    <span className="text-error text-xs mt-1">
                      {errors.serviceCharge.message}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Description & Requirements */}
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Description & Requirements
              </h3>
              <div className="form-control">
                <label className="label">
                  <span className={`label-text ${textColor}`}>Description</span>
                </label>
                <textarea
                  {...register("description")}
                  placeholder="Enter scholarship description"
                  rows="4"
                  className={`${inputBg} ${textColor} textarea textarea-bordered`}
                ></textarea>
              </div>

              <div className="form-control mt-4">
                <label className="label">
                  <span className={`label-text ${textColor}`}>Requirements</span>
                </label>
                <textarea
                  {...register("requirements")}
                  placeholder="Enter requirements (comma-separated)"
                  rows="3"
                  className={`textarea textarea-bordered ${inputBg} ${textColor}`}
                ></textarea>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={mutation.isLoading}
                className="btn btn-primary flex-1"
              >
                {mutation.isLoading ? "Updating..." : "Update Scholarship"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/dashboard/admin/manage-scholarships")}
                className="btn btn-outline flex-1"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateScholarship;
