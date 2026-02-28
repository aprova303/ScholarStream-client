import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaBell } from "react-icons/fa";
import { toast } from "react-toastify";
import useThemeContext from "../../hooks/useThemContext";

const Newsletter = () => {
  const { theme } = useThemeContext();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (subscribed) return;

    // Simulate API call
    setSubscribed(true);
    toast.success("Successfully subscribed to our newsletter!");
    setEmail("");

    // Reset after 3 seconds
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <section
      className={`py-16 transition-colors duration-300 ${
        theme === "light"
          ? "bg-gradient-to-r from-[#9f87e2] to-[#eaafc8] text-white"
          : "bg-gradient-to-r from-gray-800 to-gray-900 text-white"
      }`}
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-6"
          >
            <FaBell className="text-5xl text-white opacity-80" />
          </motion.div>

          {/* Heading */}
          <h2 className="text-4xl font-bold mb-4">
            Stay Updated on New Scholarships
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Get notified about exclusive scholarship opportunities, deadline
            reminders, and success stories delivered directly to your inbox
          </p>

          {/* Subscription Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <div className="flex-1 relative">
              <FaEnvelope className="absolute left-4 top-3.5 text-gray-400" />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full pl-12 pr-4 py-3 rounded-lg border-white focus:outline-none focus:ring-2 focus:ring-white text-gray-900 ${theme === "dark" ? "bg-gray-700 text-white" : ""}`}
                disabled={subscribed}
              />
            </div>
            <button
              type="submit"
              className={`px-8 py-3 font-semibold rounded-lg transition-all ${
                subscribed
                  ? "bg-green-500 text-white cursor-default"
                  : "bg-white text-[#9f87e2] hover:bg-gray-100 cursor-pointer"
              }`}
              disabled={subscribed}
            >
              {subscribed ? "✓ Subscribed" : "Subscribe"}
            </button>
          </motion.form>

          {/* Benefits */}
          {/* <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex flex-col sm:flex-row justify-center gap-4 text-sm"
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">✓</span>
              <span>Latest scholarship listings</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">✓</span>
              <span>Deadline reminders</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">✓</span>
              <span>Exclusive tips & updates</span>
            </div>
          </motion.div> */}
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
