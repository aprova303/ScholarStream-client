import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { FiSearch, FiFilter, FiX } from "react-icons/fi";
import { api } from "../../services/api";
import { toast } from "react-toastify";

const AllScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [filteredScholarships, setFilteredScholarships] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  // Fetch scholarships from API
  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        setLoading(true);
        const response = await api.get("/scholarships");
        setScholarships(response.data);
        setFilteredScholarships(response.data);
      } catch (error) {
        console.error("Error loading scholarships:", error);
        toast.error("Failed to load scholarships");
      } finally {
        setLoading(false);
      }
    };

    fetchScholarships();
  }, []);

  // Function to filter scholarships
  const filterScholarships = () => {
    let filtered = scholarships;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (scholarship) =>
          scholarship.scholarshipName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          scholarship.universityName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          scholarship.subjectCategory
            .toLowerCase()
            .includes(searchTerm.toLowerCase()),
      );
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter(
        (scholarship) => scholarship.scholarshipCategory === selectedCategory,
      );
    }

    // Subject filter
    if (selectedSubject) {
      filtered = filtered.filter(
        (scholarship) => scholarship.subjectCategory === selectedSubject,
      );
    }

    setFilteredScholarships(filtered);
  };

  // Call filter function when any filter changes
  useEffect(() => {
    filterScholarships();
  }, [searchTerm, selectedCategory, selectedSubject, scholarships]);

  // Reset filters
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSelectedSubject("");
  };

  // Get unique values for filter dropdowns
  const categories = [
    ...new Set(scholarships.map((s) => s.scholarshipCategory)),
  ];
  const subjects = [...new Set(scholarships.map((s) => s.subjectCategory))];

  return (
    <div className="min-h-screen bg-base-fifty">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-[#654ea3] to-[#eaafc8] py-12 px-4"
      >
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            All Scholarships
          </h1>
          <p className="text-white text-lg opacity-90">
            Discover incredible scholarship opportunities from top universities
            around the world
          </p>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-lg shadow-md p-6 mb-8"
        >
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <FiSearch className="absolute left-4 top-3.5 text-gray-400 text-xl" />
              <input
                type="text"
                placeholder="Search by scholarship name, university, or degree..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9f87e2]"
              />
            </div>
          </div>

          {/* Filter Toggle Button (Mobile) */}
          <div className="md:hidden mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn btn-sm bg-[#9f87e2] text-white border-none w-full"
            >
              <FiFilter /> {showFilters ? "Hide" : "Show"} Filters
            </button>
          </div>

          {/* Filters Section */}
          <div
            className={`grid grid-cols-1 md:grid-cols-4 gap-4 ${!showFilters && "hidden md:grid"}`}
          >
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Scholarship Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="select select-bordered w-full"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Subject Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Subject Category
              </label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="select select-bordered w-full"
              >
                <option value="">All Subjects</option>
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>

            {/* Reset Button */}
            <div className="flex items-end">
              <button
                onClick={resetFilters}
                className="btn btn-outline btn-sm w-full"
              >
                <FiX /> Reset Filters
              </button>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-gray-600 font-semibold">
            Showing {filteredScholarships.length} of {scholarships.length}{" "}
            scholarships
          </p>
        </div>

        {/* Scholarships Grid */}
        {filteredScholarships.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredScholarships.map((scholarship, index) => (
              <motion.div
                key={scholarship._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="card bg-base-100 shadow-lg hover:shadow-xl transition-all"
              >
                {/* University Image */}
                <figure className="h-48 overflow-hidden">
                  <img
                    src={scholarship.universityImage}
                    alt={scholarship.universityName}
                    className="w-full h-full object-cover"
                  />
                </figure>

                <div className="card-body">
                  {/* Badge */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="badge badge-primary bg-[#9f87e2] text-white border-none">
                      {scholarship.scholarshipCategory}
                    </span>
                    <span className="badge badge-ghost">
                      {scholarship.subjectCategory}
                    </span>
                  </div>

                  {/* University Name */}
                  <h2 className="card-title text-lg">
                    {scholarship.universityName}
                  </h2>

                  {/* Scholarship Name */}
                  <p className="text-sm text-gray-600 mb-2">
                    {scholarship.scholarshipName}
                  </p>

                  {/* Location */}
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    📍 {scholarship.universityCity},{" "}
                    {scholarship.universityCountry}
                  </p>

                  {/* Application Fees */}
                  <p className="text-sm font-semibold text-gray-700 mt-2">
                    Application Fee:{" "}
                    <span className="text-[#9f87e2]">
                      {scholarship.applicationFees === 0
                        ? "Free"
                        : `$${scholarship.applicationFees}`}
                    </span>
                  </p>

                  {/* View Details Button */}
                  <div className="card-actions justify-end mt-4">
                    <Link
                      to={`/scholarship-details/${scholarship._id}`}
                      className="btn btn-sm bg-[#9f87e2] text-white border-none hover:bg-[#8b76d4]"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-12"
          >
            <h3 className="text-2xl font-bold text-gray-700 mb-4">
              No scholarships found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={resetFilters}
              className="btn bg-[#9f87e2] text-white border-none"
            >
              Reset Filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AllScholarships;
