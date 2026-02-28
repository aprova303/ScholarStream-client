import React from "react";
import { motion } from "framer-motion";
import useThemeContext from "../../hooks/useThemContext";
import { FaUserPlus, FaSearch, FaFileAlt, FaTrophy } from "react-icons/fa";

const HowItWorks = () => {
  const { theme } = useThemeContext();
  const steps = [
    {
      number: 1,
      icon: FaUserPlus,
      title: "Create Your Profile",
      description:
        "Sign up and complete your comprehensive profile with academic details, goals, preferences, and document uploads",
    },
    {
      number: 2,
      icon: FaSearch,
      title: "Discover Scholarships",
      description:
        "Browse thousands of scholarships or let our smart algorithm recommend personalized matches based on your profile",
    },
    {
      number: 3,
      icon: FaFileAlt,
      title: "Prepare & Apply",
      description:
        "Use our application assistance tools, submit your application, and track status in real-time dashboard",
    },
    {
      number: 4,
      icon: FaTrophy,
      title: "Celebrate Success",
      description:
        "Receive acceptance notifications and join our community of successful scholars to mentor future applicants",
    },
  ];

  return (
    <section
      className={`py-16 transition-colors duration-300 ${
        theme === "light"
          ? "bg-gradient-to-b from-gray-50 to-base-100"
          : "bg-gray-900 to-gray-800 text-white"
      }`}
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">How It Works</h2>
          <p
            className={`text-lg max-w-2xl mx-auto transition-colors duration-300 ${
              theme === "light" ? "text-gray-600" : "text-gray-300"
            }`}
          >
            Simple, straightforward process to secure your scholarship in just 4
            easy steps
          </p>
        </motion.div>

        {/* Steps Timeline */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-20 left-0 right-0 h-1 bg-gradient-to-r from-[#9f87e2] to-[#eaafc8]"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  {/* Step Card */}
                  <div
                    className={`rounded-lg p-8 text-center shadow-lg transition-colors duration-300 ${
                      theme === "light" ? "bg-white" : "bg-gray-800"
                    }`}
                  >
                    {/* Number Badge */}
                    <div className="flex justify-center mb-6">
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{
                          duration: 0.5,
                          delay: index * 0.1 + 0.2,
                        }}
                        className="relative"
                      >
                        <div className="bg-gradient-to-br from-[#9f87e2] to-[#eaafc8] rounded-full w-16 h-16 flex items-center justify-center">
                          <span className="text-3xl font-bold text-white">
                            {step.number}
                          </span>
                        </div>
                      </motion.div>
                    </div>

                    {/* Icon */}
                    <IconComponent className="text-4xl text-[#9f87e2] mx-auto mb-4" />

                    {/* Title */}
                    <h3 className="text-xl font-bold mb-3">{step.title}</h3>

                    {/* Description */}
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          {/* <button className="btn bg-gradient-to-r from-[#9f87e2] to-[#eaafc8] text-white border-none px-8 py-3 rounded-lg text-lg font-semibold hover:shadow-lg transition-all">
            Get Started Now
          </button> */}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
