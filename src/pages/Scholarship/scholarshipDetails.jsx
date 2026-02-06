import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { motion } from "framer-motion";
import {
  FiArrowLeft,
  FiCalendar,
  FiMapPin,
  FiDollarSign,
} from "react-icons/fi";
import { AiOutlineStar } from "react-icons/ai";

const ScholarshipDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [scholarship, setScholarship] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/scholarships.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((s) => s._id === id);
        setScholarship(found);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error loading scholarship:", error);
        setLoading(false);
      });
  }, [id]);

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

  // Calculate average rating
  const averageRating =
    scholarship.reviews.length > 0
      ? (
          scholarship.reviews.reduce((sum, review) => sum + review.rating, 0) /
          scholarship.reviews.length
        ).toFixed(1)
      : 0;

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
          onClick={() => navigate("/all-scholarships")}
          className="btn btn-ghost btn-sm"
        >
          <FiArrowLeft /> Back to Scholarships
        </button>
      </motion.div>

      {/* Hero Section with University Image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative h-96 overflow-hidden"
      >
        <img
          src={scholarship.universityImage}
          alt={scholarship.universityName}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex flex-col justify-end container mx-auto px-4 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              {scholarship.scholarshipName}
            </h1>
            <p className="text-white text-xl">{scholarship.universityName}</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2"
          >
            {/* Key Information Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-base-200 p-4 rounded-lg text-center">
                <p className="text-gray-600 text-sm font-semibold mb-2">
                  World Rank
                </p>
                <p className="text-3xl font-bold text-[#9f87e2]">
                  #{scholarship.universityWorldRank}
                </p>
              </div>
              <div className="bg-base-200 p-4 rounded-lg text-center">
                <p className="text-gray-600 text-sm font-semibold mb-2">
                  Category
                </p>
                <p className="text-lg font-bold text-gray-800">
                  {scholarship.scholarshipCategory}
                </p>
              </div>
              <div className="bg-base-200 p-4 rounded-lg text-center">
                <p className="text-gray-600 text-sm font-semibold mb-2">
                  Subject
                </p>
                <p className="text-lg font-bold text-gray-800">
                  {scholarship.subjectCategory}
                </p>
              </div>
              <div className="bg-base-200 p-4 rounded-lg text-center">
                <p className="text-gray-600 text-sm font-semibold mb-2">
                  Deadline
                </p>
                <p className="text-lg font-bold text-gray-800">
                  {new Date(scholarship.deadline).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Details Section */}
            <div className="bg-base-100 rounded-lg p-6 mb-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Scholarship Details
              </h2>

              {/* Location */}
              <div className="mb-6 pb-6 border-b">
                <div className="flex items-center gap-4">
                  <FiMapPin className="text-[#9f87e2] text-2xl" />
                  <div>
                    <p className="text-gray-600 text-sm font-semibold">
                      Location
                    </p>
                    <p className="text-lg font-semibold text-gray-800">
                      {scholarship.location}
                    </p>
                  </div>
                </div>
              </div>

              {/* Application Fee */}
              <div className="mb-6 pb-6 border-b">
                <div className="flex items-center gap-4">
                  <FiDollarSign className="text-[#9f87e2] text-2xl" />
                  <div>
                    <p className="text-gray-600 text-sm font-semibold">
                      Application Fee
                    </p>
                    <p className="text-lg font-semibold text-gray-800">
                      {scholarship.applicationFees === 0
                        ? "Free"
                        : `$${scholarship.applicationFees}`}
                    </p>
                  </div>
                </div>
              </div>

              {/* Deadline */}
              <div className="mb-6 pb-6 border-b">
                <div className="flex items-center gap-4">
                  <FiCalendar className="text-[#9f87e2] text-2xl" />
                  <div>
                    <p className="text-gray-600 text-sm font-semibold">
                      Application Deadline
                    </p>
                    <p className="text-lg font-semibold text-gray-800">
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

              {/* Stipend */}
              <div>
                <p className="text-gray-600 text-sm font-semibold mb-2">
                  Stipend/Coverage
                </p>
                <p className="text-lg font-semibold text-[#9f87e2]">
                  {scholarship.stipend}
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="bg-base-100 rounded-lg p-6 mb-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                About This Scholarship
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                {scholarship.description}
              </p>

              <h4 className="text-xl font-bold text-gray-800 mb-3 mt-6">
                Eligibility Criteria
              </h4>
              <p className="text-gray-700 leading-relaxed">
                {scholarship.eligibility}
              </p>
            </div>

            {/* Reviews Section */}
            <div className="bg-base-100 rounded-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800">
                  Reviews & Ratings
                </h3>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <AiOutlineStar
                        key={i}
                        className={`text-xl ${
                          i < Math.round(averageRating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-lg font-bold text-gray-800">
                    {averageRating}
                  </span>
                </div>
              </div>

              {scholarship.reviews.length > 0 ? (
                <div className="space-y-6">
                  {scholarship.reviews.map((review, index) => (
                    <motion.div
                      key={review._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="border-l-4 border-[#9f87e2] pl-6 pb-6"
                    >
                      {/* Reviewer Info */}
                      <div className="flex items-center gap-4 mb-4">
                        <img
                          src={review.reviewerImage}
                          alt={review.reviewerName}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800">
                            {review.reviewerName}
                          </p>
                          <p className="text-sm text-gray-500">
                            {new Date(review.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <AiOutlineStar
                            key={i}
                            className={`text-lg ${
                              i < review.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>

                      {/* Comment */}
                      <p className="text-gray-700 italic">"{review.comment}"</p>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 text-center py-8">
                  No reviews yet. Be the first to review this scholarship!
                </p>
              )}
            </div>
          </motion.div>

          {/* Right Column - Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-24">
              {/* Apply Button */}
              <button
                onClick={() => navigate(`/checkout/${scholarship._id}`)}
                className="btn btn-lg w-full bg-gradient-to-r from-[#654ea3] to-[#eaafc8] text-white border-none mb-6 hover:shadow-lg"
              >
                Apply for Scholarship
              </button>

              {/* Quick Info Card */}
              <div className="card bg-base-200 shadow-lg">
                <div className="card-body">
                  <h3 className="card-title text-lg mb-4">Quick Info</h3>

                  <div className="divider my-2"></div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-600 font-semibold mb-1">
                      Application Fee
                    </p>
                    <p className="text-lg font-bold text-[#9f87e2]">
                      {scholarship.applicationFees === 0
                        ? "Free"
                        : `$${scholarship.applicationFees}`}
                    </p>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-600 font-semibold mb-1">
                      Deadline
                    </p>
                    <p className="text-sm font-bold text-gray-800">
                      {new Date(scholarship.deadline).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        },
                      )}
                    </p>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-600 font-semibold mb-1">
                      Award Amount
                    </p>
                    <p className="text-sm font-bold text-gray-800">
                      {scholarship.stipend}
                    </p>
                  </div>

                  <div className="divider my-2"></div>

                  <div className="flex items-center gap-2">
                    <AiOutlineStar className="text-2xl fill-yellow-400 text-yellow-400" />
                    <span className="text-lg font-bold text-gray-800">
                      {averageRating}
                      <span className="text-sm text-gray-600 ml-2">
                        ({scholarship.reviews.length} reviews)
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Share Section */}
              <div className="mt-6 card bg-base-100 shadow-md">
                <div className="card-body">
                  <p className="text-sm text-gray-600 font-semibold mb-3">
                    Share This Opportunity
                  </p>
                  <div className="flex gap-2">
                    <button className="btn btn-xs btn-outline flex-1">
                      📧 Email
                    </button>
                    <button className="btn btn-xs btn-outline flex-1">
                      🔗 Copy Link
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipDetails;
