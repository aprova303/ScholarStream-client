import React from "react";
import { motion } from "framer-motion";
import {
  FaFileAlt,
  FaGraduationCap,
  FaHandshake,
  FaVideo,
} from "react-icons/fa";

const Services = () => {
  const services = [
    {
      icon: FaFileAlt,
      title: "Application Assistance",
      description:
        "Get help with essay writing, document preparation, and application form submission. Our experts review your materials to maximize approval chances.",
      features: ["Essay Review", "Document Guidance", "Form Assistance"],
    },
    {
      icon: FaGraduationCap,
      title: "Scholarship Matching",
      description:
        "Based on your profile, education goals, and preferences, we match you with scholarships you're most likely to qualify for.",
      features: ["Profile Analysis", "Smart Matching", "Personalized List"],
    },
    {
      icon: FaVideo,
      title: "Interview Training",
      description:
        "Prepare for scholarship interviews with mock sessions, tips from successful applicants, and personalized coaching.",
      features: ["Mock Interviews", "Coaching", "Success Tips"],
    },
    {
      icon: FaHandshake,
      title: "Mentorship Program",
      description:
        "Connect with current scholarship holders and university mentors who guide you through your academic journey.",
      features: ["Expert Mentors", "Peer Support", "Ongoing Guidance"],
    },
  ];

  return (
    <section className="py-16 bg-base-100">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Comprehensive support throughout your scholarship journey - from
            application to success
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white border-l-4 border-[#9f87e2] p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-6">
                  <div className="bg-[#9f87e2] p-4 rounded-lg flex-shrink-0">
                    <IconComponent className="text-3xl text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {service.features.map((feature, i) => (
                        <span
                          key={i}
                          className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
