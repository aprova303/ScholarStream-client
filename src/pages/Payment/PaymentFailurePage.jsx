import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { FiXCircle, FiArrowRight, FiRefreshCw } from "react-icons/fi";
import { api } from "../../services/api";

const PaymentFailurePage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const scholarshipId = searchParams.get("scholarship_id");
  const errorMessage = searchParams.get("error_message");

  const [scholarship, setScholarship] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScholarship = async () => {
      try {
        if (scholarshipId) {
          const response = await api.get(`/scholarships/${scholarshipId}`);
          setScholarship(response.data);
        }
      } catch (error) {
        console.error("Error fetching scholarship:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchScholarship();
  }, [scholarshipId]);

  const handleRetry = () => {
    if (scholarshipId) {
      navigate(`/checkout/${scholarshipId}`);
    } else {
      navigate("/all-scholarships");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-[#9f87e2]"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100">
      {/* Error Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-gradient-to-r from-red-500 to-rose-500 text-white py-8"
      >
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-block mb-4"
          >
            <FiXCircle className="text-6xl" />
          </motion.div>
          <h1 className="text-4xl font-bold mb-2">Payment Failed</h1>
          <p className="text-red-50">
            Unfortunately, your payment could not be processed. Please try
            again.
          </p>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Error Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-red-500">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                What Happened?
              </h2>

              <div className="space-y-4 mb-8">
                <div className="pb-4 border-b">
                  <p className="text-sm text-gray-600 font-semibold">
                    Payment Status
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="inline-block w-3 h-3 bg-red-500 rounded-full"></span>
                    <span className="font-semibold text-red-600">Failed</span>
                  </div>
                </div>

                {errorMessage && (
                  <div className="pb-4 border-b">
                    <p className="text-sm text-gray-600 font-semibold">
                      Error Details
                    </p>
                    <p className="text-base text-red-600 mt-2 bg-red-50 p-3 rounded">
                      {decodeURIComponent(errorMessage)}
                    </p>
                  </div>
                )}

                <div>
                  <p className="text-sm text-gray-600 font-semibold mb-2">
                    Common Reasons for Payment Failure:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Incorrect card information</li>
                    <li>Insufficient funds in your account</li>
                    <li>Card declined by issuer</li>
                    <li>Expired card or CVV</li>
                    <li>Network connectivity issues</li>
                  </ul>
                </div>
              </div>

              {/* Helpful Info */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-xs text-yellow-800">
                  <strong>Tip:</strong> Your application is still saved in your
                  dashboard. Try again with a different payment method or
                  contact your bank for assistance.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Scholarship Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {scholarship && (
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
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

                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600 font-semibold">
                        Application Fee
                      </p>
                      <p className="text-2xl font-bold text-[#9f87e2] mt-1">
                        ${scholarship.applicationFees}
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

                  {/* Retry Button within Card */}
                  <button
                    onClick={handleRetry}
                    className="w-full mt-6 btn bg-gradient-to-r from-[#654ea3] to-[#eaafc8] text-white border-none hover:shadow-lg"
                  >
                    <FiRefreshCw /> Retry Payment
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleRetry}
              className="btn btn-lg bg-gradient-to-r from-[#654ea3] to-[#eaafc8] text-white border-none hover:shadow-lg"
            >
              <FiRefreshCw /> Try Payment Again
            </button>

            <button
              onClick={() => navigate("/dashboard/student/applications")}
              className="btn btn-lg btn-outline border-2 border-[#9f87e2] text-[#9f87e2] hover:bg-[#9f87e2] hover:text-white"
            >
              <FiArrowRight /> Go to Dashboard
            </button>

            <button
              onClick={() => navigate("/all-scholarships")}
              className="btn btn-lg btn-ghost text-[#9f87e2] hover:bg-gray-200"
            >
              Back to Scholarships
            </button>
          </div>
        </motion.div>

        {/* Support Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-4">Need Help?</h3>
          <p className="text-gray-700 mb-4">
            If you continue to experience issues with payment, please reach out
            to our support team. We're here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() =>
                (window.location.href = "mailto:support@scholarstream.com")
              }
              className="btn btn-outline border-2 border-[#9f87e2] text-[#9f87e2]"
            >
              Contact Support
            </button>
            <button
              onClick={() => navigate("/")}
              className="btn btn-outline border-2 border-gray-400 text-gray-600"
            >
              Go Home
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentFailurePage;
