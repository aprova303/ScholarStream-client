import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import useThemeContext from "../../hooks/useThemContext";

const Partners = () => {
  const { theme } = useThemeContext();
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    // Fetch partner data if available, otherwise use default data
    const partnerData = [
      {
        _id: 1,
        name: "Harvard University",
        category: "Ivy League",
        scholarships: 45,
        image:
          "https://stubard.com/wp-content/uploads/2025/02/Harvard-University-1-1200x812.jpg",
      },
      {
        _id: 2,
        name: "MIT",
        category: "Technology",
        scholarships: 32,
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmxW8h0KZA4wxryJ5l322nZ6mmHVoljOcsKQ&s",
      },
      {
        _id: 3,
        name: "Stanford University",
        category: "Research",
        scholarships: 38,
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPXa6lg9Opwl40nUbsm-yT19R0sZME8KdmKw&s",
      },
      {
        _id: 4,
        name: "Cambridge University",
        category: "International",
        scholarships: 51,
        image:
          "https://i.guim.co.uk/img/media/77916b7cef46b737f9a8f66b38b9cf70e5d4def8/0_242_5247_3148/master/5247.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=7a8bff8ae294d56fc9c89c0a9f5d9c27",
      },
      {
        _id: 5,
        name: "Oxford University",
        category: "International",
        scholarships: 48,
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIyIs_nODLnVDeC7Z8AfSO-QH6kJvrM3yhAg&s",
      },
      {
        _id: 6,
        name: "UC Berkeley",
        category: "Public Research",
        scholarships: 42,
        image:
          "https://www.tclf.org/sites/default/files/thumbnails/image/CA_Berkeley_UniversityOfCaliforniaAtBerkeley_byCharlieNguyen-Flickr_2008_001_Sig.jpg",
      },
      {
        _id: 7,
        name: "Toronto University",
        category: "Canadian",
        scholarships: 35,
        image:
          "https://d3d0lqu00lnqvz.cloudfront.net/media/media/UofT_cmh2315fl.jpg",
      },
      {
        _id: 8,
        name: "National University Singapore",
        category: "Asian",
        scholarships: 40,
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl4lSQmHci7YOTrmrmlBqBKOquGv3WLM9LWw&s",
      },
    ];
    setPartners(partnerData);
  }, []);

  return (
    <section
      className={`py-16 transition-colors duration-300 ${
        theme === "light" ? "bg-base-100" : "bg-gray-900 text-white"
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
          <h2 className="text-4xl font-bold mb-4">Our Partner Universities</h2>
          <p
            className={`text-lg max-w-2xl mx-auto transition-colors duration-300 ${
              theme === "light" ? "text-gray-600" : "text-gray-300"
            }`}
          >
            We partner with leading universities worldwide offering thousands of
            scholarship opportunities for deserving students
          </p>
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        >
          <div className="bg-gradient-to-br from-[#9f87e2] to-[#eaafc8] p-6 rounded-lg text-white text-center shadow-lg">
            <div className="text-4xl font-bold">{partners.length}</div>
            <div className="text-sm opacity-90 mt-2">Partner Universities</div>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-lg text-white text-center shadow-lg">
            <div className="text-4xl font-bold">
              {partners.reduce((sum, p) => sum + p.scholarships, 0)}
            </div>
            <div className="text-sm opacity-90 mt-2">Active Scholarships</div>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-lg text-white text-center shadow-lg">
            <div className="text-4xl font-bold">50+</div>
            <div className="text-sm opacity-90 mt-2">Countries</div>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-lg text-white text-center shadow-lg">
            <div className="text-4xl font-bold">$2B+</div>
            <div className="text-sm opacity-90 mt-2">Total Funding</div>
          </div>
        </motion.div>

        {/* Partners Grid */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ${theme === "dark" ? "dark:bg-gray-900" : ""}`}>
          {partners.map((partner, index) => (
            <motion.div
              key={partner._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer hover:scale-105 transform"
            >
              {/* University Image */}
              <div className="h-32 bg-gradient-to-br from-[#9f87e2] to-[#eaafc8] flex items-center justify-center overflow-hidden">
                <img
                  src={partner.image}
                  alt={partner.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Partner Info */}
              <div className={`p-4 ${theme === "dark" ? "bg-gray-800 text-white" : ""}`}>
                <h3 className="font-bold text-lg mb-1">{partner.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{partner.category}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium">
                    {partner.scholarships} scholarships
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          {/* <button className="btn btn-outline btn-lg border-[#9f87e2] text-[#9f87e2] hover:bg-[#9f87e2] hover:text-white">
            View All Partner Universities
          </button> */}
        </motion.div>
      </div>
    </section>
  );
};

export default Partners;
