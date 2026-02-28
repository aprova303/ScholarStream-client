import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import api from "../../services/api";
import useThemeContext from "../../hooks/useThemContext";

const ContactUs = () => {
  const { theme } = useThemeContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onBlur",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await api.post("/contacts", {
        fullName: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
      });

      if (response.data.success) {
        Swal.fire({
          title: "Success!",
          text:
            response.data.message || "Your message has been sent successfully!",
          icon: "success",
          confirmButtonColor: "#9f87e2",
        });
        reset();
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.messages?.[0] ||
        error.response?.data?.error ||
        "Failed to send message. Please try again.";
      Swal.fire({
        title: "Error!",
        text: errorMessage,
        icon: "error",
        confirmButtonColor: "#9f87e2",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInputClasses = (hasError) => {
    const baseClasses = "input input-bordered w-full transition-all";
    if (hasError) {
      return `${baseClasses} input-error`;
    }
    return `${baseClasses} ${theme === "dark" ? "bg-gray-700 text-white border-gray-600" : ""}`;
  };

  return (
    <section
      className={`py-16 transition-colors duration-300 min-h-screen ${
        theme === "light" ? "bg-base-100" : "bg-gray-900 text-white"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-[#654ea3] to-[#eaafc8] rounded-lg p-4 mb-8 text-white text-center">
          <p className="text-sm md:text-base font-semibold">
            ✓ Student Access Only - This form is limited to registered student
            members
          </p>
        </div>
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Contact Us</h2>
          <p
            className={`max-w-2xl mx-auto transition-colors duration-300 ${
              theme === "light" ? "text-gray-600" : "text-gray-300"
            }`}
          >
            Have questions about scholarships or need assistance? We're here to
            help you on your educational journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Information */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold mb-6">Get in Touch</h3>

            <div className="flex items-start gap-4">
              <div className="bg-[#9f87e2] p-3 rounded-full text-white">
                <FaMapMarkerAlt className="text-xl" />
              </div>
              <div>
                <h4 className="font-semibold">Our Office</h4>
                <p
                  className={`${theme === "light" ? "text-gray-600" : "text-gray-400"}`}
                >
                  123 Education Street, Academic City
                  <br />
                  Dhaka 1000, Bangladesh
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-[#9f87e2] p-3 rounded-full text-white">
                <FaEnvelope className="text-xl" />
              </div>
              <div>
                <h4 className="font-semibold">Email Us</h4>
                <p
                  className={`${theme === "light" ? "text-gray-600" : "text-gray-400"}`}
                >
                  support@scholarstream.com
                </p>
                <p
                  className={`${theme === "light" ? "text-gray-600" : "text-gray-400"}`}
                >
                  info@scholarstream.com
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-[#9f87e2] p-3 rounded-full text-white">
                <FaPhone className="text-xl" />
              </div>
              <div>
                <h4 className="font-semibold">Call Us</h4>
                <p
                  className={`${theme === "light" ? "text-gray-600" : "text-gray-400"}`}
                >
                  +880 1234-567890
                </p>
                <p
                  className={`${theme === "light" ? "text-gray-600" : "text-gray-400"}`}
                >
                  +880 9876-543210
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div
            className={`card shadow-xl ${theme === "dark" ? "bg-gray-800 text-white" : "bg-base-200"}`}
          >
            <div className="card-body">
              <h3 className="text-2xl font-semibold mb-4">Send us a Message</h3>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Name Field */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Your Name *</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    {...register("name", {
                      required: "Name is required",
                      minLength: {
                        value: 2,
                        message: "Name must be at least 2 characters",
                      },
                    })}
                    className={getInputClasses(!!errors.name)}
                  />
                  {errors.name && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {errors.name.message}
                      </span>
                    </label>
                  )}
                </div>

                {/* Email Field */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email Address *</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Please enter a valid email address",
                      },
                    })}
                    className={getInputClasses(!!errors.email)}
                  />
                  {errors.email && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {errors.email.message}
                      </span>
                    </label>
                  )}
                </div>

                {/* Subject Field */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Subject *</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter subject"
                    {...register("subject", {
                      required: "Subject is required",
                      minLength: {
                        value: 3,
                        message: "Subject must be at least 3 characters",
                      },
                    })}
                    className={getInputClasses(!!errors.subject)}
                  />
                  {errors.subject && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {errors.subject.message}
                      </span>
                    </label>
                  )}
                </div>

                {/* Message Field */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Message *</span>
                  </label>
                  <textarea
                    placeholder="Write your message here..."
                    {...register("message", {
                      required: "Message is required",
                      minLength: {
                        value: 10,
                        message: "Message must be at least 10 characters",
                      },
                    })}
                    className={`textarea textarea-bordered h-32 transition-all ${
                      errors.message ? "textarea-error" : ""
                    } ${theme === "dark" ? "bg-gray-700 text-white border-gray-600" : ""}`}
                  ></textarea>
                  {errors.message && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {errors.message.message}
                      </span>
                    </label>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn bg-[#9f87e2] text-white w-full border-none hover:bg-[#8a7cc4] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {isSubmitting ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
