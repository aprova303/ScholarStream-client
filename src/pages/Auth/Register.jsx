import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router";
import SocialLogin from "./SocialLogin";
import axios from "axios";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { registerUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleRegistration = (data) => {
    //  console.log(data)
    const profileImg = data.photo[0];
    registerUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        //  store the image and get photo url
        const formData = new FormData();
        formData.append("image", profileImg);
        const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;

        axios
          .post(image_API_URL, formData)
          .then((res) => {
            console.log("image url", res.data.data.display_url);
            //  update user profile
            const userProfile = {
              displayName: data.name,
              photoURL: res.data.data.display_url,
            };
            updateUserProfile(userProfile)
              .then(() => {
                console.log("user profile updated");
                // Redirect to where user came from or to home page
                const from = location.state?.from?.pathname || "/";
                navigate(from, { replace: true });
              })
              .catch((error) => {
                console.log("Profile update error:", error);
              });
          })
          .catch((error) => {
            console.log("Image upload error:", error);
          });
      })
      .catch((error) => {
        console.log("Registration error:", error.message);
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
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Register;
