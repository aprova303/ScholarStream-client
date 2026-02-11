import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { FiCheckCircle, FiArrowRight } from "react-icons/fi";
import { toast } from "react-toastify";
import { confirmPayment } from "../../services/paymentService";
import { getApplicationById } from "../../services/paymentService";
import { api } from "../../services/api";

const PaymentSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get("session_id");

  const [loading, setLoading] = useState(true);
  const [application, setApplication] = useState(null);
  const [scholarship, setScholarship] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        if (!sessionId) {
          setError("No session ID found");
          setLoading(false);
          return;
        }

        // Extract application data from the page or API
        // For now, we'll get it from the confirm payment endpoint
        const result = await confirmPayment(sessionId, {});

        if (result.success && result.application) {
          setApplication(result.application);

          // Fetch scholarship details
          if (result.application.scholarshipId) {
            try {
              const scholarshipData = await api.get(
                `/scholarships/${result.application.scholarshipId}`,
              );
              setScholarship(scholarshipData.data);
            } catch (err) {
              console.error("Error fetching scholarship:", err);
            }
          }

          toast.success("Payment completed successfully!");
        } else {
          setError("Payment verification failed");
        }
      } catch (error) {
        console.error("Error verifying payment:", error);
        setError(
          error.error || "An error occurred during payment verification",
        );
        toast.error(error.error || "Payment verification failed");
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [sessionId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-[#9f87e2]"></span>
      </div>
    );
  }

  if (error || !application) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="max-w-md bg-white rounded-lg shadow-xl p-8 text-center"
        >
          <div className="text-5xl text-red-500 mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            {error || "Error Loading Payment Details"}
          </h1>
          <p className="text-gray-600 mb-6">
            We encountered an issue while processing your payment. Please try
            again or contact support.
          </p>
          <button
            onClick={() => navigate("/dashboard/student/applications")}
            className="btn bg-[#9f87e2] text-white border-none w-full"
          >
            Go to My Applications
          </button>
        </motion.div>
      </div>
    );
  }

  const totalAmount = (
    (application.applicationFees || 0) + (application.serviceCharge || 0)
  ).toFixed(2);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Success Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-gradient-to-r from-green-500 to-emerald-500 text-white py-8"
      >
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-block mb-4"
          >
            <FiCheckCircle className="text-6xl" />
          </motion.div>
          <h1 className="text-4xl font-bold mb-2">Payment Successful!</h1>
          <p className="text-green-50">
            Your scholarship application payment has been completed
            successfully.
          </p>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Success Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-green-500">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Payment Details
              </h2>

              <div className="space-y-4 mb-6">
                <div className="pb-4 border-b">
                  <p className="text-sm text-gray-600 font-semibold">
                    Application Status
                  </p>
                  <p className="text-lg font-bold text-green-600 mt-1">
                    ✓ Paid
                  </p>
                </div>

                <div className="pb-4 border-b">
                  <p className="text-sm text-gray-600 font-semibold">
                    Amount Paid
                  </p>
                  <p className="text-2xl font-bold text-[#9f87e2] mt-1">
                    ${totalAmount}
                  </p>
                </div>

                <div className="pb-4 border-b">
                  <p className="text-sm text-gray-600 font-semibold">
                    Application Fee
                  </p>
                  <p className="text-lg font-semibold text-gray-800 mt-1">
                    ${application.applicationFees?.toFixed(2) || "0.00"}
                  </p>
                </div>

                {application.serviceCharge && (
                  <div className="pb-4 border-b">
                    <p className="text-sm text-gray-600 font-semibold">
                      Service Charge
                    </p>
                    <p className="text-lg font-semibold text-gray-800 mt-1">
                      ${application.serviceCharge?.toFixed(2) || "0.00"}
                    </p>
                  </div>
                )}

                <div>
                  <p className="text-sm text-gray-600 font-semibold">
                    Payment Status
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="inline-block w-3 h-3 bg-green-500 rounded-full"></span>
                    <span className="font-semibold text-green-600">
                      Completed
                    </span>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-xs text-blue-800">
                  <strong>Note:</strong> Your application has been successfully
                  submitted. You will receive a confirmation email shortly.
                  Check your dashboard for application status updates.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Scholarship Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {scholarship && (
                <>
                  {/* Scholarship Image */}
                  <img
                    src={scholarship.universityImage}
                    alt={scholarship.scholarshipName}
                    className="w-full h-48 object-cover"
                  />

                  {/* Scholarship Details */}
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      {scholarship.scholarshipName}
                    </h3>
                    <p className="text-lg text-gray-600 mb-6">
                      {scholarship.universityName}
                    </p>

                    <div className="space-y-4 mb-6">
                      <div>
                        <p className="text-sm text-gray-600 font-semibold">
                          Scholarship Category
                        </p>
                        <p className="text-lg font-semibold text-[#9f87e2] mt-1">
                          {application.scholarshipCategory}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-600 font-semibold">
                          Degree Level
                        </p>
                        <p className="text-lg font-semibold text-gray-800 mt-1">
                          {application.degree}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-600 font-semibold">
                          Award Amount (Stipend)
                        </p>
                        <p className="text-lg font-semibold text-green-600 mt-1">
                          {scholarship.stipend}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-600 font-semibold">
                          Application Deadline
                        </p>
                        <p className="text-lg font-semibold text-gray-800 mt-1">
                          {new Date(scholarship.deadline).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            },
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <button
            onClick={() => navigate("/dashboard/student/applications")}
            className="btn btn-lg bg-gradient-to-r from-[#654ea3] to-[#eaafc8] text-white border-none hover:shadow-lg"
          >
            <FiArrowRight /> Go to My Applications
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
