import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../services/api";

const AddScholarship = () => {
  const { register, handleSubmit } = useForm();
  const qc = useQueryClient();

  const mutation = useMutation(
    (payload) => api.post("/scholarships", payload),
    {
      onSuccess: () => qc.invalidateQueries(["scholarships"]),
    },
  );

  const onSubmit = (data) => {
    mutation.mutate({ ...data, postDate: new Date().toISOString() });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Add Scholarship</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-2 max-w-xl mt-4"
      >
        <input
          {...register("scholarshipName")}
          placeholder="Scholarship Name"
          className="input"
        />
        <input
          {...register("universityName")}
          placeholder="University Name"
          className="input"
        />
        <input
          {...register("image")}
          placeholder="Image URL"
          className="input"
        />
        <input
          {...register("country")}
          placeholder="Country"
          className="input"
        />
        <input {...register("city")} placeholder="City" className="input" />
        <input
          {...register("worldRank")}
          placeholder="World Rank"
          className="input"
        />
        <input
          {...register("subjectCategory")}
          placeholder="Subject Category"
          className="input"
        />
        <input
          {...register("scholarshipCategory")}
          placeholder="Scholarship Category"
          className="input"
        />
        <input {...register("degree")} placeholder="Degree" className="input" />
        <input
          {...register("tuitionFees")}
          placeholder="Tuition Fees (optional)"
          className="input"
        />
        <input
          {...register("applicationFees")}
          placeholder="Application Fees"
          className="input"
        />
        <input
          {...register("serviceCharge")}
          placeholder="Service Charge"
          className="input"
        />
        <input
          {...register("deadline")}
          placeholder="Deadline"
          className="input"
        />
        <input
          {...register("userEmail")}
          placeholder="User Email"
          className="input"
        />
        <button type="submit" className="btn btn-neutral mt-2">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddScholarship;
