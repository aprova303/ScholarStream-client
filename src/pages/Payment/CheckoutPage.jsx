import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { FiArrowLeft, FiDollarSign, FiLock } from "react-icons/fi";
import { toast } from "react-toastify";
import { api } from "../../services/api";
import { createCheckoutSession } from "../../services/paymentService";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../contexts/useAxiosSecure";

const CheckoutPage = () => {
  const { scholarshipId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [scholarship, setScholarship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  const [formData, setFormData] = useState({
    userName: user?.displayName || "",
    userEmail: user?.email || "",
    universityName: "",
    scholarshipCategory: "Partial",
    degree: "Bachelor",
    serviceCharge: 10,
  });

  useEffect(() => {
    const fetchScholarship = async () => {
      try {
        const response = await api.get(`/scholarships/${scholarshipId}`);
        setScholarship(response.data);
        setFormData((prev) => ({
          ...prev,
          universityName: response.data.universityName,
        }));
      } catch (error) {
        console.error("Error fetching scholarship:", error);
        toast.error("Failed to load scholarship details");
        navigate("/all-scholarships");
      } finally {
        setLoading(false);
      }
    };

    fetchScholarship();
  }, [scholarshipId, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    setProcessing(true);

    try {
      // Step 1: Create checkout session
      const applicationData = {
        ...formData,
        applicationFees: scholarship.applicationFees,
      };

      const checkoutData = await createCheckoutSession(
        scholarshipId,
        applicationData,
        axiosSecure,
      );

      console.log("Checkout data received:", {
        success: checkoutData.success,
        hasSessionId: !!checkoutData.sessionId,
        sessionId: checkoutData.sessionId?.substring(0, 20),
        hasPublishableKey: !!checkoutData.publishableKey,
      });

      if (checkoutData.sessionId) {
        // Store application data in localStorage before Stripe redirect
        localStorage.setItem(
          "pendingApplicationData",
          JSON.stringify(applicationData),
        );

        // Step 2: Load Stripe from global window and redirect to Checkout
        const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
        if (!publishableKey) {
          toast.error(
            "Stripe configuration missing. Please add VITE_STRIPE_PUBLISHABLE_KEY to .env.local",
          );
          console.error("Missing Stripe publishable key");
          setProcessing(false);
          return;
        }

        const stripe = window.Stripe(publishableKey);
        console.log(
          "Redirecting to Stripe checkout with session:",
          checkoutData.sessionId,
        );

        const result = await stripe.redirectToCheckout({
          sessionId: checkoutData.sessionId,
        });

        if (result.error) {
          console.error("Stripe error:", result.error);
          toast.error(result.error.message);
          setProcessing(false);
        }
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      toast.error(error.error || "Failed to process checkout");
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-[#9f87e2]"></span>
      </div>
    );
  }

  if (!scholarship) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            Scholarship not found
          </h2>
          <button
            onClick={() => navigate("/all-scholarships")}
            className="btn bg-[#9f87e2] text-white border-none"
          >
            Back to Scholarships
          </button>
        </div>
      </div>
    );
  }

  const totalAmount =
    scholarship.applicationFees + (formData.serviceCharge || 0);

  return (
    <div className="min-h-screen bg-base-100">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="container mx-auto px-4 py-4"
      >
        <button
          onClick={() => navigate(`/scholarship-details/${scholarshipId}`)}
          className="btn btn-ghost btn-sm"
        >
          <FiArrowLeft /> Back to Scholarship
        </button>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Checkout Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="bg-base-200 rounded-lg p-6 border border-gray-300">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Application Details
              </h2>

              <form onSubmit={handleCheckout} className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Personal Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="userName"
                        value={formData.userName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9f87e2]"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="userEmail"
                        value={formData.userEmail}
                        onChange={handleInputChange}
                        required
                        disabled
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none"
                        placeholder="Your email"
                      />
                    </div>
                  </div>
                </div>

                {/* Application Details */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Application Details
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        University Name
                      </label>
                      <input
                        type="text"
                        name="universityName"
                        value={formData.universityName}
                        disabled
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Scholarship Category
                        </label>
                        <select
                          name="scholarshipCategory"
                          value={formData.scholarshipCategory}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9f87e2]"
                        >
                          <option value="Full Fund">Full Fund</option>
                          <option value="Partial">Partial</option>
                          <option value="Self-fund">Self-fund</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Degree Level
                        </label>
                        <select
                          name="degree"
                          value={formData.degree}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9f87e2]"
                        >
                          <option value="Diploma">Diploma</option>
                          <option value="Bachelor">Bachelor</option>
                          <option value="Masters">Masters</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Info Message */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> You will be redirected to Stripe to
                    complete your payment securely.
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={processing}
                  className="w-full btn bg-gradient-to-r from-[#654ea3] to-[#eaafc8] text-white border-none hover:shadow-lg disabled:opacity-50"
                >
                  {processing ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    <>
                      <FiLock /> Proceed to Payment
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Right Column - Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-24">
              <div className="card bg-base-200 shadow-lg">
                <div className="card-body">
                  <h3 className="card-title text-lg mb-4">Order Summary</h3>

                  <div className="divider my-2"></div>

                  {/* Scholarship Info */}
                  <div className="mb-4">
                    <img
                      src={scholarship.universityImage}
                      alt={scholarship.scholarshipName}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                    <p className="text-sm font-semibold text-gray-700">
                      {scholarship.scholarshipName}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      {scholarship.universityName}
                    </p>
                  </div>

                  <div className="divider my-2"></div>

                  {/* Cost Breakdown */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Application Fee</span>
                      <span className="font-semibold text-gray-800">
                        ${scholarship.applicationFees}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Service Charge</span>
                      <span className="font-semibold text-gray-800">
                        ${formData.serviceCharge}
                      </span>
                    </div>

                    <div className="divider my-2"></div>

                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-800">
                        Total
                      </span>
                      <span className="text-lg font-bold text-[#9f87e2]">
                        ${totalAmount.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="divider my-2"></div>

                  {/* Security Badge */}
                  <div className="flex items-center justify-center gap-2 text-xs text-gray-600">
                    <FiLock className="text-[#9f87e2]" />
                    <span>Secured by Stripe</span>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-xs text-blue-800">
                  <strong>Note:</strong> Your application will be saved and
                  marked as unpaid if you don't complete the payment. You can
                  retry payment from your dashboard.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
