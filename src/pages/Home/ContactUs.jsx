import React from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const ContactUs = () => {
  return (
    <section className="py-16 bg-base-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Contact Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions about scholarships or need assistance? We're here to
            help you on your educational journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Information */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold mb-6">Get in Touch</h3>

            <div className="flex items-start gap-4">
              <div className="bg-primary p-3 rounded-full text-white">
                <FaMapMarkerAlt className="text-xl" />
              </div>
              <div>
                <h4 className="font-semibold">Our Office</h4>
                <p className="text-gray-600">
                  123 Education Street, Academic City
                  <br />
                  Dhaka 1000, Bangladesh
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-primary p-3 rounded-full text-white">
                <FaEnvelope className="text-xl" />
              </div>
              <div>
                <h4 className="font-semibold">Email Us</h4>
                <p className="text-gray-600">support@scholarstream.com</p>
                <p className="text-gray-600">info@scholarstream.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-primary p-3 rounded-full text-white">
                <FaPhone className="text-xl" />
              </div>
              <div>
                <h4 className="font-semibold">Call Us</h4>
                <p className="text-gray-600">+880 1234-567890</p>
                <p className="text-gray-600">+880 9876-543210</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h3 className="text-2xl font-semibold mb-4">Send us a Message</h3>
              <form className="space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Your Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="input input-bordered w-full"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email Address</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="input input-bordered w-full"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Subject</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter subject"
                    className="input input-bordered w-full"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Message</span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered h-32"
                    placeholder="Write your message here..."
                  ></textarea>
                </div>

                <button type="submit" className="btn bg-[#654ea3] text-white w-full">
                  Send Message
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
