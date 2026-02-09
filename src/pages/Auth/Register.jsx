import React from "react";
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

  const handleRegistration = (data) => {
    const profileImg = data.photo[0];
    registerUser(data.email, data.password)
      .then((result) => {
        // Store the image and get photo url
        const formData = new FormData();
        formData.append("image", profileImg);
        const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;

        axios
          .post(image_API_URL, formData)
          .then((res) => {
            const userProfile = {
              displayName: data.name,
              photoURL: res.data.data.display_url,
            };
            updateUserProfile(userProfile)
              .then(async () => {
                try {
                  // Get Firebase token
                  const token = await getToken();

                  if (!token) {
                    throw new Error("Failed to get authentication token");
                  }

                  // Save user to MongoDB via backend API
                  const saveResponse = await api.post(
                    "/users/create-or-update",
                    {
                      email: result.user.email,
                      name: data.name,
                      photoURL: res.data.data.display_url,
                      firebaseUid: result.user.uid,
                    },
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                      },
                    },
                  );

                  toast.success("Account created successfully!");

                  // Redirect to where user came from or to home page
                  const from = location.state?.from?.pathname || "/";
                  navigate(from, { replace: true });
                } catch (apiError) {
                  // Check if server is down
                  if (apiError.response?.status === 503) {
                    toast.error(
                      "Server is unavailable. Make sure the backend is running: node index.js",
                    );
                  } else if (apiError.code === "ECONNREFUSED") {
                    toast.error(
                      "Cannot connect to server. Make sure it's running on port 3000",
                    );
                  } else if (apiError.response?.status === 500) {
                    toast.error(
                      "Server error: " +
                        (apiError.response?.data?.error ||
                          "Internal server error"),
                    );
                  } else {
                    toast.error(
                      "Failed to save profile: " +
                        (apiError.message || "Unknown error"),
                    );
                  }
                  // Still allow user to proceed but warn them
                  setTimeout(() => {
                    const from = location.state?.from?.pathname || "/";
                    navigate(from, { replace: true });
                  }, 2000);
                }
              })
              .catch((error) => {
                toast.error("Profile update failed");
              });
          })
          .catch((error) => {
            toast.error("Image upload failed");
          });
      })
      .catch((error) => {
        toast.error("Registration failed: " + error.message);
      });
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
          />
          {errors.photo && <p className="text-red-500">Photo is required</p>}

          {/* email  */}
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input"
            placeholder="Email"
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
          <button className="btn bg-[#9f87e2] text-white mt-4">Register</button>
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
