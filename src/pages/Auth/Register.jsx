import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router";
import SocialLogin from "./SocialLogin";
import axios from "axios";
import { api } from "../../services/api";
import { toast } from "react-toastify";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { registerUser, updateUserProfile, getToken } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isRegistering, setIsRegistering] = useState(false);

  const handleRegistration = async (data) => {
    setIsRegistering(true);

    try {
      // Step 1: Create Firebase user (this creates user in Firebase)
      const firebaseResult = await registerUser(data.email, data.password);

      if (!firebaseResult.user) {
        throw new Error("Failed to create Firebase account");
      }

      // Step 2: Upload image to ImgBB
      const formData = new FormData();
      formData.append("image", data.photo[0]);
      const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;

      let photoURL = null;
      try {
        const imageRes = await axios.post(image_API_URL, formData);
        photoURL = imageRes.data.data.display_url;
      } catch (imgError) {
        // Image upload failed, but continue with registration using null photo
        toast.warning("Image upload failed, but account created without photo");
      }

      // Step 3: Update Firebase profile
      const userProfile = {
        displayName: data.name,
        photoURL: photoURL,
      };

      try {
        await updateUserProfile(userProfile);
      } catch (profileError) {
        // Profile update failed, but continue
        toast.warning("Profile update partially failed");
      }

      // Step 4: Get Firebase token
      const token = await getToken();

      if (!token) {
        throw new Error(
          "Failed to get authentication token. Please login manually.",
        );
      }

      // Step 5: Save user to MongoDB (this saves the profile to MongoDB)
      try {
        await api.post(
          "/users/create-or-update",
          {
            email: firebaseResult.user.email,
            name: data.name,
            photoURL: photoURL,
            firebaseUid: firebaseResult.user.uid,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );
      } catch (mongoError) {
        // MongoDB save failed - but user exists in Firebase
        toast.error(
          "Server error saving profile: " +
            (mongoError.response?.data?.error || mongoError.message),
        );
        // Still redirect - user can login and try again
        throw mongoError;
      }

      toast.success("✅ Account created successfully!");

      // Redirect to where user came from or to home page
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    } catch (error) {
      setIsRegistering(false);

      if (error.code === "auth/email-already-in-use") {
        toast.error("This email is already registered. Please login instead.");
      } else if (error.code === "auth/weak-password") {
        toast.error(
          "Password is too weak. Use uppercase letters and special characters.",
        );
      } else if (error.code === "auth/invalid-email") {
        toast.error("Invalid email address.");
      } else if (error.response?.status === 503) {
        toast.error(
          "Server is unavailable. Make sure the backend is running: node index.js",
        );
      } else if (error.code === "ECONNREFUSED") {
        toast.error(
          "Cannot connect to server. Make sure it's running on port 3000",
        );
      } else {
        toast.error(
          "Registration failed: " + (error.message || "Unknown error"),
        );
      }
    }
  };

  return (
    <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl mt-10">
      <h3 className="text-3xl text-center font-semibold bg-gradient-to-r from-[#654ea3] to-[#eaafc8] text-transparent bg-clip-text">
        Create an Account
      </h3>
      <form className="card-body" onSubmit={handleSubmit(handleRegistration)}>
        <fieldset className="fieldset">
          {/* Name */}
          <label className="label">Your name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="input"
            placeholder="Name"
            disabled={isRegistering}
          />
          {errors.name?.type === "required" && (
            <p className="text-red-500">Name is required</p>
          )}

          {/* Photo field */}
          <label className="label">Photo</label>
          <input
            type="file"
            {...register("photo", { required: true })}
            className="file-input"
            placeholder="Your Photo"
            disabled={isRegistering}
          />
          {errors.photo && <p className="text-red-500">Photo is required</p>}

          {/* email  */}
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input"
            placeholder="Email"
            disabled={isRegistering}
          />
          {errors.email?.type === "required" && (
            <p className="text-red-500">Email is required</p>
          )}

          {/* password */}
          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", {
              required: true,
              minLength: 6,
              pattern: /^(?=.*[A-Z])(?=.*[!@#$%^&*])/,
            })}
            className="input"
            placeholder="Password"
            disabled={isRegistering}
          />
          {errors.password?.type === "required" && (
            <p className="text-red-500">Password is required</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-500">
              Password must be 6 characters or longer
            </p>
          )}
          {errors.password?.type === "pattern" && (
            <p className="text-red-500">
              Must contain one uppercase letter and one special character.
            </p>
          )}
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button
            className="btn bg-[#9f87e2] text-white mt-4 disabled:opacity-50"
            disabled={isRegistering}
          >
            {isRegistering ? "Registering..." : "Register"}
          </button>
        </fieldset>
        <p className="text-center">
          Already have an account?{" "}
          <Link className="text-[#9f87e2] underline" to="/login">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
