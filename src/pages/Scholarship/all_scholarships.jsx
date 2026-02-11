import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import {
  FiSearch,
  FiFilter,
  FiX,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { api } from "../../services/api";
import { toast } from "react-toastify";

const AllScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [sortBy, setSortBy] = useState("postDate");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [paginationData, setPaginationData] = useState({
    current: 1,
    limit: 12,
    total: 0,
    pages: 0,
  });
  const [availableCountries, setAvailableCountries] = useState([]);
  const [availableCategories, setAvailableCategories] = useState([]);

  // Fetch scholarships with filters and pagination
  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        setLoading(true);

        // Build query parameters
        const params = new URLSearchParams();
        if (searchTerm) params.append("search", searchTerm);
        if (selectedCategory) params.append("category", selectedCategory);
        if (selectedCountry) params.append("country", selectedCountry);
        params.append("sortBy", sortBy);
        params.append("sortOrder", sortOrder);
        params.append("page", currentPage);
        params.append("limit", 12);

        const response = await api.get(`/scholarships?${params.toString()}`);

        setScholarships(response.data.data);
        setPaginationData(response.data.pagination);
      } catch (error) {
        console.error("Error loading scholarships:", error);
        toast.error("Failed to load scholarships");
      } finally {
        setLoading(false);
      }
    };

    fetchScholarships();
  }, [
    searchTerm,
    selectedCategory,
    selectedCountry,
    sortBy,
    sortOrder,
    currentPage,
  ]);

  // Fetch available countries and categories for filters
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        // Fetch all scholarships to get unique countries and categories
        const response = await api.get("/scholarships?limit=1000");

        if (response.data.data && Array.isArray(response.data.data)) {
          const countries = [
            ...new Set(response.data.data.map((s) => s.universityCountry)),
          ]
            .filter(Boolean)
            .sort();
          const categories = [
            ...new Set(response.data.data.map((s) => s.scholarshipCategory)),
          ]
            .filter(Boolean)
            .sort();

          setAvailableCountries(countries);
          setAvailableCategories(categories);
        }
      } catch (error) {
        console.error("Error fetching filter options:", error);
      }
    };

    fetchFilterOptions();
  }, []);

  // Reset filters
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSelectedCountry("");
    setSortBy("postDate");
    setSortOrder("desc");
    setCurrentPage(1);
    toast.info("Filters reset");
  };

  // Handle pagination
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNextPage = () => {
    if (currentPage < paginationData.pages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxPages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPages / 2));
    let endPage = Math.min(paginationData.pages, startPage + maxPages - 1);

    if (endPage - startPage < maxPages - 1) {
      startPage = Math.max(1, endPage - maxPages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="min-h-screen bg-base-50">
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
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 ${!showFilters && "hidden md:grid"}`}
          >
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setCurrentPage(1);
                }}
                className="select select-bordered w-full select-sm"
              >
                <option value="">All Categories</option>
                {availableCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Country Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Country
              </label>
              <select
                value={selectedCountry}
                onChange={(e) => {
                  setSelectedCountry(e.target.value);
                  setCurrentPage(1);
                }}
                className="select select-bordered w-full select-sm"
              >
                <option value="">All Countries</option>
                {availableCountries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setCurrentPage(1);
                }}
                className="select select-bordered w-full select-sm"
              >
                <option value="postDate">Latest Posted</option>
                <option value="applicationFees">Application Fees</option>
              </select>
            </div>

            {/* Sort Order */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Order
              </label>
              <select
                value={sortOrder}
                onChange={(e) => {
                  setSortOrder(e.target.value);
                  setCurrentPage(1);
                }}
                className="select select-bordered w-full select-sm"
              >
                <option value="desc">Descending</option>
                <option value="asc">Ascending</option>
              </select>
            </div>

            {/* Reset Button */}
            <div className="flex items-end">
              <button
                onClick={resetFilters}
                className="btn btn-outline btn-sm w-full"
              >
                <FiX /> Reset
              </button>
            </div>
          </div>
        </motion.div>

        {/* Results Count and Loading */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-gray-600 font-semibold">
            Showing{" "}
            {paginationData.limit * (paginationData.current - 1) +
              (scholarships.length > 0 ? 1 : 0)}{" "}
            -{" "}
            {paginationData.limit * (paginationData.current - 1) +
              scholarships.length}{" "}
            of {paginationData.total} scholarships
          </p>
          {loading && (
            <span className="loading loading-spinner loading-sm text-[#9f87e2]"></span>
          )}
        </div>

        {/* Scholarships Grid */}
        {!loading && scholarships.length > 0 ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
            >
              {scholarships.map((scholarship, index) => (
                <motion.div
                  key={scholarship._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
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
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <span className="badge badge-primary bg-[#9f87e2] text-white border-none">
                        {scholarship.scholarshipCategory}
                      </span>
                      <span className="badge badge-ghost">
                        {scholarship.degree}
                      </span>
                    </div>

                    {/* University Name */}
                    <h2 className="card-title text-lg">
                      {scholarship.universityName}
                    </h2>

                    {/* Scholarship Name */}
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {scholarship.scholarshipName}
                    </p>

                    {/* Location */}
                    <p className="text-sm text-gray-500 flex items-center gap-2">
                      📍 {scholarship.universityCity},
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

            {/* Pagination */}
            {paginationData.pages > 1 && (
              <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className="btn btn-sm btn-outline"
                >
                  <FiChevronLeft /> Prev
                </button>

                {getPageNumbers().map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`btn btn-sm ${
                      page === currentPage
                        ? "btn-primary bg-[#9f87e2] border-none"
                        : "btn-outline"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={handleNextPage}
                  disabled={currentPage === paginationData.pages}
                  className="btn btn-sm btn-outline"
                >
                  Next <FiChevronRight />
                </button>
              </div>
            )}
          </>
        ) : loading ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg text-[#9f87e2]"></span>
          </div>
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
