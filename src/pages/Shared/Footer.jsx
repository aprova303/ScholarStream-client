import React from "react";
import { Link } from "react-router";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import useThemeContext from "../../hooks/useThemContext";
import Logo from "../../components/Logo";

const Footer = () => {
  const { theme } = useThemeContext();

  const bgColor =
    theme === "light"
      ? "bg-gradient-to-r from-[#654ea3] to-[#eaafc8]"
      : "bg-gradient-to-r from-gray-800 to-gray-900";

  const textColor = theme === "light" ? "text-white" : "text-gray-300";
  const linkHoverColor = "hover:text-white transition-colors duration-200";

  return (
    <footer
      className={`${bgColor} transition-colors duration-300 ${textColor}`}
    >
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-8 justify-center items-center">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <Logo />
            </div>
            <p className="font-bold text-white mb-2">ScholarStream</p>
            <p className="text-sm opacity-90 mb-4">
              Providing educational resources and scholarship opportunities
              since 2008
            </p>
            <p className="text-xs opacity-75">
              © {new Date().getFullYear()} ScholarStream. All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          {/* <div>
            <h6 className="font-bold text-white mb-4 text-lg">Quick Links</h6>
            <nav className="space-y-3">
              <Link to="/" className={`block ${linkHoverColor}`}>
                Home
              </Link>
              <Link
                to="/all-scholarships"
                className={`block ${linkHoverColor}`}
              >
                All Scholarships
              </Link>
              <Link to="/about" className={`block ${linkHoverColor}`}>
                About Us
              </Link>
              <Link to="/terms" className={`block ${linkHoverColor}`}>
                Terms & Conditions
              </Link>
            </nav>
          </div> */}

          {/* Resources */}
          {/* <div>
            <h6 className="font-bold text-white mb-4 text-lg">Resources</h6>
            <nav className="space-y-3">
              <Link
                to="/all-scholarships"
                className={`block ${linkHoverColor}`}
              >
                Browse Scholarships
              </Link>
              <Link
                to="/all-scholarships"
                className={`block ${linkHoverColor}`}
              >
                How It Works
              </Link>
              <a href="#" className={`block ${linkHoverColor}`}>
                FAQ
              </a>
              <a href="#" className={`block ${linkHoverColor}`}>
                Blog
              </a>
            </nav>
          </div> */}

          {/* Support */}
          <div className="ml-10">
            <h6 className="font-bold text-white mb-4 text-lg">Support</h6>
            <nav className="space-y-3">
               <Link to="/about" className={`block ${linkHoverColor}`}>
                About Us
              </Link>
              <Link to="/contact-us" className={`block ${linkHoverColor}`}>
                Contact Us
              </Link>
                <Link to="/terms" className={`block ${linkHoverColor}`}>
                Terms & Conditions
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h6 className="font-bold text-white mb-4 text-lg">Contact Info</h6>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-white mt-1 flex-shrink-0" />
                <p className="text-sm opacity-90">
                  123 Education Street, Dhaka 1000, Bangladesh
                </p>
              </div>
              <div className="flex items-center gap-3">
                <FaPhone className="text-white flex-shrink-0" />
                <a href="tel:+880-1234-567890" className={linkHoverColor}>
                  +880 1234-567890
                </a>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-white flex-shrink-0" />
                <a
                  href="mailto:support@scholarstream.com"
                  className={linkHoverColor}
                >
                  support@scholarstream.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          className={`border-t ${theme === "light" ? "border-white/30" : "border-gray-700"} my-8`}
        ></div>

        {/* Social & Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm opacity-75 text-center md:text-left mb-4 md:mb-0">
            ScholarStream - Empowering Students Worldwide
          </p>

          {/* Social Links */}
          <div className="flex gap-6 items-center">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-white text-xl hover:scale-110 transition-transform ${linkHoverColor}`}
              aria-label="Facebook"
            >
              <FaFacebook />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-white text-xl hover:scale-110 transition-transform ${linkHoverColor}`}
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-white text-xl hover:scale-110 transition-transform ${linkHoverColor}`}
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-white text-xl hover:scale-110 transition-transform ${linkHoverColor}`}
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
