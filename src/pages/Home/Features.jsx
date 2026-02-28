import React from "react";
import { motion } from "framer-motion";
import useThemeContext from "../../hooks/useThemContext";
import {
  FaSearch,
  FaClipboardList,
  FaBell,
  FaChartLine,
  FaShieldAlt,
  FaUsers,
} from "react-icons/fa";

const Features = () => {
  const { theme } = useThemeContext();
  const features = [
    {
      icon: FaSearch,
      title: "Smart Search",
      description:
        "Advanced filtering by country, degree, subject, and funding amount to find perfect matches",
    },
    {
      icon: FaClipboardList,
      title: "Application Tracking",
      description:
        "Keep track of all your scholarship applications with detailed status updates and timelines",
    },
    {
      icon: FaBell,
      title: "Deadline Alerts",
      description:
        "Receive notifications before application deadlines so you never miss an opportunity",
    },
    {
      icon: FaChartLine,
      title: "Success Analytics",
      description:
        "View scholarship success rates by university and track your application statistics",
    },
    {
      icon: FaShieldAlt,
      title: "Secure Platform",
      description:
        "Bank-level security to protect your personal information and application details",
    },
    {
      icon: FaUsers,
      title: "Expert Guidance",
      description:
        "Connect with scholarship experts and mentors for personalized application support",
    },
  ];

  return (
    <section className={`py-16 bg-base-100  ${theme === "dark" ? "bg-gray-800 text-white" : ""}`}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Why Choose ScholarStream</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Powerful features designed to help you find and secure the best
            scholarships for your academic goals
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow ${theme === "dark" ? "bg-bg text-white" : ""}`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="bg-gradient-to-br from-[#9f87e2] to-[#eaafc8] p-4 rounded-full mb-4">
                    <IconComponent className="text-3xl text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
