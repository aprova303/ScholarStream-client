import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { api } from "../../services/api";
import { toast } from "react-toastify";

const TopScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopScholarships = async () => {
      try {
        setLoading(true);
        const response = await api.get("/scholarships");

        // Sort by applicationDeadline (most recent) and get top 6
        const sorted = response.data.data
          .sort(
            (a, b) =>
              new Date(b.scholarshipPostDate) - new Date(a.scholarshipPostDate),
          )
          .slice(0, 6);

        setScholarships(sorted);
      } catch (error) {
        console.error("Error fetching scholarships:", error);
        toast.error("Failed to load scholarships");
      } finally {
        setLoading(false);
      }
    };

    fetchTopScholarships();
  }, []);

  if (loading) {
    return (
      <div className="min-h-96 flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <section className="py-16 bg-base-100">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Top Scholarships
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Browse our most recent scholarship opportunities from top
            universities around the world
          </p>
        </motion.div>

        {/* Scholarships Grid */}
        {scholarships.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scholarships.map((scholarship, index) => (
              <motion.div
                key={scholarship._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card bg-white shadow-lg hover:shadow-2xl transition-shadow"
              >
                {/* Scholarship Image */}
                <figure className="relative h-48 overflow-hidden bg-gray-200">
                  {scholarship.universityImage ? (
                    <img
                      src={scholarship.universityImage}
                      alt={scholarship.universityName}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">
                        {scholarship.universityName?.charAt(0)}
                      </span>
                    </div>
                  )}
                  {/* Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="badge badge-primary">
                      {scholarship.scholarshipCategory}
                    </span>
                  </div>
                </figure>

                {/* Card Content */}
                <div className="card-body">
                  {/* University Info */}
                  <div className="mb-3">
                    <h3 className="card-title text-lg line-clamp-2">
                      {scholarship.scholarshipName}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {scholarship.universityName},{" "}
                      {scholarship.universityCountry}
                    </p>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 gap-3 text-sm my-4 pb-4 border-b border-gray-200">
                    <div>
                      <p className="text-gray-500 text-xs">Degree</p>
                      <p className="font-semibold text-gray-800">
                        {scholarship.degree}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs">Subject</p>
                      <p className="font-semibold text-gray-800 line-clamp-1">
                        {scholarship.subjectCategory}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs">Application Fee</p>
                      <p className="font-semibold text-gray-800">
                        ${scholarship.applicationFees}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs">World Rank</p>
                      <p className="font-semibold text-gray-800">
                        #{scholarship.universityWorldRank}
                      </p>
                    </div>
                  </div>

                  {/* Deadline */}
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-1">
                      Application Deadline
                    </p>
                    <p className="text-sm font-semibold text-red-600">
                      {new Date(
                        scholarship.applicationDeadline,
                      ).toLocaleDateString()}
                    </p>
                  </div>

                  {/* View Details Button */}
                  <button
                    onClick={() => navigate(`/scholarship/${scholarship._id}`)}
                    className="btn btn-primary w-full"
                  >
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No scholarships available at the moment
            </p>
          </div>
        )}

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-12"
        >
          <button
            onClick={() => navigate("/all-scholarships")}
            className="btn btn-outline btn-lg"
          >
            View All Scholarships
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default TopScholarships;
