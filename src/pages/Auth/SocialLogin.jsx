import React from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate, useLocation } from "react-router";
import { api } from "../../services/api";
import { toast } from "react-toastify";

const SocialLogin = () => {
  const { signInGoogle, getToken } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoogleSignIn = () => {
    signInGoogle()
      .then(async (result) => {
        toast.info("Saving your profile...");

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
              name: result.user.displayName || "User",
              photoURL: result.user.photoURL,
              firebaseUid: result.user.uid,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            },
          );

          toast.success("Successfully logged in!");

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
                (apiError.response?.data?.error || "Internal server error"),
            );
          } else {
            toast.error(
              "Failed to save profile: " +
                (apiError.message || "Unknown error"),
            );
          }

          // Allow user to continue anyway after showing error
          setTimeout(() => {
            const from = location.state?.from?.pathname || "/";
            navigate(from, { replace: true });
          }, 2000);
        }
      })
      .catch((error) => {
        toast.error("Google sign-in failed: " + error.message);
      });
  };

  return (
    <div className="text-center pb-8">
      <p className="mb-2">OR</p>
      {/* Google */}
      <button
        className="btn bg-white text-black border-[#e5e5e5]"
        onClick={handleGoogleSignIn}
        type="button"
      >
        <svg
          aria-label="Google logo"
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <g>
            <path d="m0 0H512V512H0" fill="#fff"></path>
            <path
              fill="#34a853"
              d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
            ></path>
            <path
              fill="#4285f4"
              d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
            ></path>
            <path
              fill="#fbbc02"
              d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
            ></path>
            <path
              fill="#ea4335"
              d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
            ></path>
          </g>
        </svg>
        Login with Google
      </button>
    </div>
  );
};

export default SocialLogin;
