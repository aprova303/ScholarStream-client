import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { FaGraduationCap, FaBook, FaBriefcase, FaUsers } from "react-icons/fa";
import api from "../../services/api";
import useThemeContext from "../../hooks/useThemContext";

const Categories = () => {
  const { theme } = useThemeContext();
  const [categories, setCategories] = useState([]);

  const categoryIcons = {
    "Full Fund": <FaGraduationCap className="text-4xl" />,
    Partial: <FaBook className="text-4xl" />,
    "Self-fund": <FaBriefcase className="text-4xl" />,
  };

  const categoryColors = {
    "Full Fund": "from-blue-500 to-blue-600",
    Partial: "from-purple-500 to-purple-600",
    "Self-fund": "from-green-500 to-green-600",
  };

  // Fetch scholarships data
  const { data: scholarshipsData, isLoading } = useQuery({
    queryKey: ["categories-scholarships"],
    queryFn: async () => {
      const response = await api.get("/scholarships?limit=1000");
      return response.data.data || [];
    },
  });

  // Calculate category statistics
  useEffect(() => {
    if (scholarshipsData) {
      const categoryCounts = {};
      const degreeByCategory = {};

      scholarshipsData.forEach((scholarship) => {
        const cat = scholarship.scholarshipCategory;
        categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;

        if (!degreeByCategory[cat]) {
          degreeByCategory[cat] = new Set();
        }
        degreeByCategory[cat].add(scholarship.degree);
      });

      const categoryList = Object.entries(categoryCounts).map(
        ([name, count]) => ({
          name,
          count,
          degrees: Array.from(degreeByCategory[name] || []),
          icon: categoryIcons[name],
          colors: categoryColors[name],
        }),
      );

      setCategories(categoryList.sort((a, b) => b.count - a.count));
    }
  }, [scholarshipsData]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <span className="loading loading-spinner loading-lg text-[#9f87e2]"></span>
      </div>
    );
  }

  return (
    <section
      className={`py-20 transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Scholarship <span className="text-[#9f87e2]">Categories</span>
          </h2>
          <p
            className={`text-lg max-w-2xl mx-auto ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Explore our diverse range of scholarship opportunities tailored to
            different funding levels and academic needs
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {categories.map((category, index) => (
            <Link to="/all-scholarships" key={index}>
              <div
                className={`group relative h-full p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                  theme === "dark"
                    ? "bg-gray-800 hover:bg-gray-700"
                    : "bg-white hover:bg-gradient-to-br hover:from-gray-50 hover:to-white"
                }`}
              >
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${category.colors} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300`}
                ></div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div
                    className={`inline-block p-4 rounded-lg bg-gradient-to-br ${category.colors} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    {category.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold mb-3">{category.name}</h3>

                  {/* Count */}
                  <div className="mb-4 flex items-baseline gap-2">
                    <span
                      className={`text-4xl font-bold ${
                        theme === "dark" ? "text-[#9f87e2]" : "text-[#654ea3]"
                      }`}
                    >
                      {category.count}
                    </span>
                    <span
                      className={`text-sm ${
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Scholarships Available
                    </span>
                  </div>

                  {/* Degree Types */}
                  <div className="mb-6">
                    <p
                      className={`text-sm font-semibold mb-2 ${
                        theme === "dark" ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Degree Levels:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {category.degrees.map((degree, idx) => (
                        <span
                          key={idx}
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            theme === "dark"
                              ? "bg-gray-700 text-gray-300"
                              : "bg-gray-200 text-gray-700"
                          }`}
                        >
                          {degree}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-[#9f87e2] font-semibold group-hover:gap-3 transition-all duration-300">
                    <span>Explore Scholarships</span>
                    <span className="text-xl">→</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Stats Section */}
        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-8 p-8 rounded-xl ${
            theme === "dark"
              ? "bg-gray-800 border border-gray-700"
              : "bg-white border border-gray-200 shadow-lg"
          }`}
        >
          <div className="text-center">
            <div
              className={`text-4xl font-bold mb-2 ${
                theme === "dark" ? "text-[#eaafc8]" : "text-[#654ea3]"
              }`}
            >
              {scholarshipsData?.length || 0}
            </div>
            <p
              className={`text-sm ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Total Scholarships
            </p>
          </div>

          <div className="text-center">
            <div
              className={`text-4xl font-bold mb-2 ${
                theme === "dark" ? "text-[#eaafc8]" : "text-[#654ea3]"
              }`}
            >
              {categories.length}
            </div>
            <p
              className={`text-sm ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Scholarship Categories
            </p>
          </div>

          <div className="text-center">
            <div
              className={`text-4xl font-bold mb-2 ${
                theme === "dark" ? "text-[#eaafc8]" : "text-[#654ea3]"
              }`}
            >
              100+
            </div>
            <p
              className={`text-sm ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Universities Worldwide
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;
