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
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        toast.error("Please enter a valid email address");
        setIsRegistering(false);
        return;
      }

      // Validate password strength (Firebase requires min 6 characters)
      if (data.password.length < 6) {
        toast.error("Password must be at least 6 characters");
        setIsRegistering(false);
        return;
      }

      console.log("Attempting Firebase registration with:", {
        email: data.email,
        passwordLength: data.password.length,
      });

      // Step 1: Create Firebase user (this creates user in Firebase)
      let firebaseResult;
      try {
        firebaseResult = await registerUser(data.email, data.password);
      } catch (firebaseError) {
        console.error("Firebase registration error:", {
          code: firebaseError.code,
          message: firebaseError.message,
          customData: firebaseError.customData,
        });

        if (firebaseError.code === "auth/email-already-in-use") {
          toast.error(
            "This email is already registered. Please login instead.",
          );
        } else if (firebaseError.code === "auth/weak-password") {
          toast.error(
            "Password is too weak. Use uppercase letters and special characters.",
          );
        } else if (firebaseError.code === "auth/invalid-email") {
          toast.error("Invalid email address.");
        } else if (firebaseError.code === "auth/operation-not-allowed") {
          toast.error(
            "Registration is currently disabled. Please try again later.",
          );
        } else {
          toast.error(
            "Firebase error: " +
              (firebaseError.message || "Could not create account"),
          );
        }
        setIsRegistering(false);
        return;
      }

      if (!firebaseResult.user) {
        toast.error("Failed to create Firebase account");
        setIsRegistering(false);
        return;
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

      // Step 4: Get Firebase token (get it directly from the newly created user)
      let token;
      try {
        // Try to get token from the just-created Firebase user
        token = await firebaseResult.user.getIdToken();
        console.log("Got token from Firebase user:", {
          tokenLength: token.length,
        });
      } catch (tokenError) {
        console.error("Failed to get token from Firebase user:", tokenError);
        // Fallback: try from context (with retry)
        for (let i = 0; i < 3; i++) {
          token = await getToken();
          if (token) break;
          if (i < 2) await new Promise((resolve) => setTimeout(resolve, 500)); // Wait 500ms before retry
        }
      }

      if (!token) {
        toast.error(
          "Failed to get authentication token. Please refresh and try logging in.",
        );
        setIsRegistering(false);
        return;
      }

      // Step 5: Save user to MongoDB (this saves the profile to MongoDB)
      try {
        console.log("Sending user data to MongoDB:", {
          email: firebaseResult.user.email,
          name: data.name,
          hasPhotoURL: !!photoURL,
          firebaseUid: firebaseResult.user.uid,
          tokenLength: token.length,
        });

        const mongoResponse = await api.post(
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

        console.log("MongoDB save successful:", mongoResponse.data);

        if (!mongoResponse.data.success) {
          toast.warning(
            "Profile saved with issues: " +
              (mongoResponse.data.message || "Unknown issue"),
          );
        }
      } catch (mongoError) {
        // MongoDB save failed
        console.error("MongoDB save error:", {
          status: mongoError.response?.status,
          statusText: mongoError.response?.statusText,
          data: mongoError.response?.data,
          message: mongoError.message,
          code: mongoError.code,
        });

        // Check if it's a network error vs API error
        if (mongoError.code === "ERR_NETWORK") {
          toast.error(
            "Cannot connect to server. Make sure it's running on port 3000",
          );
        } else if (mongoError.response?.status === 401) {
          toast.error("Authentication failed. Please try logging in.");
        } else if (mongoError.response?.status === 503) {
          toast.error(
            "Server is unavailable. Make sure the backend is running: node index.js",
          );
        } else {
          toast.error(
            "Failed to save profile to database: " +
              (mongoError.response?.data?.error || mongoError.message),
          );
        }

        // User exists in Firebase but not in MongoDB
        // Let them try again on next login
        setIsRegistering(false);
        return;
      }

      toast.success("✅ Account created successfully!");

      // Redirect to where user came from or to home page
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    } catch (error) {
      setIsRegistering(false);
      console.error("Registration error:", error);

      // Errors are already handled above, this is a fallback
      if (!toast.isActive) {
        toast.error(
          "Registration failed: " + (error.message || "Unknown error"),
        );
      }
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
      <div className="w-full max-w-md">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-3 bg-gradient-to-r from-[#654ea3] to-[#eaafc8] text-transparent bg-clip-text">
            Create Account
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Join ScholarStream and discover your scholarship opportunities
          </p>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit(handleRegistration)}
          className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 border border-gray-100"
        >
          {/* Name Field */}
          <div className="mb-5">
            <label className="block text-gray-700 font-semibold text-sm mb-2">
              Full Name
            </label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9f87e2] focus:border-transparent transition"
              placeholder="John Doe"
              disabled={isRegistering}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                ⚠️ {errors.name.message}
              </p>
            )}
          </div>

          {/* Photo Field */}
          <div className="mb-5">
            <label className="block text-gray-700 font-semibold text-sm mb-2">
              Profile Photo
            </label>
            <div className="relative">
              <input
                type="file"
                {...register("photo", { required: "Photo is required" })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9f87e2] focus:border-transparent transition file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#9f87e2] file:text-white hover:file:bg-[#7d6dac] cursor-pointer"
                disabled={isRegistering}
              />
            </div>
            {errors.photo && (
              <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                ⚠️ {errors.photo.message}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div className="mb-5">
            <label className="block text-gray-700 font-semibold text-sm mb-2">
              Email Address
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email",
                },
              })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9f87e2] focus:border-transparent transition"
              placeholder="you@example.com"
              disabled={isRegistering}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                ⚠️ {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold text-sm mb-2">
              Password
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*[!@#$%^&*])/,
                  message:
                    "Must contain uppercase letter and special character (!@#$%^&*)",
                },
              })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9f87e2] focus:border-transparent transition"
              placeholder="••••••••"
              disabled={isRegistering}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                ⚠️ {errors.password.message}
              </p>
            )}
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={isRegistering}
            className="w-full bg-gradient-to-r from-[#654ea3] to-[#9f87e2] text-white font-bold py-3 rounded-lg hover:shadow-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isRegistering ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-gray-500 text-sm">OR</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Social Login */}
          <SocialLogin />

          {/* Login Link */}
          <p className="text-center text-gray-600 text-sm mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#9f87e2] font-bold hover:underline transition"
            >
              Sign In
            </Link>
          </p>
        </form>

        {/* Footer Message */}
        <p className="text-center text-gray-500 text-xs mt-6">
          By creating an account, you agree to our{" "}
          <Link to="/terms" className="text-[#9f87e2] hover:underline">
            Terms of Service
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
