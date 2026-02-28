import React from "react";
import {
  FaBullseye,
  FaLightbulb,
  FaAward,
  FaUsers,
  FaHandsHelping,
  FaGlobeAmericas,
  FaChartLine,
  FaUserTie,
} from "react-icons/fa";
import { Link } from "react-router";
import useThemeContext from "../../hooks/useThemContext";

const About = () => {
  const { theme } = useThemeContext();

  const bgColor = theme === "light" ? "bg-base-100" : "bg-gray-900";
  const textColor = theme === "light" ? "text-gray-900" : "text-white";
  const cardBg = theme === "light" ? "bg-white" : "bg-gray-800";
  const accentBg = theme === "light" ? "bg-blue-50" : "bg-blue-900/20";

  return (
    <div className={`${bgColor} transition-colors duration-300`}>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#654ea3] to-[#eaafc8] py-20">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-4xl font-bold mb-4">
            About ScholarStream
          </h1>
          <p className="text-l max-w-xl mx-auto opacity-90">
            Empowering students worldwide to achieve their educational dreams
            through accessible scholarship opportunities and comprehensive
            support
          </p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Mission */}
          <div
            className={`${cardBg} p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-gradient-to-br from-[#9f87e2] to-[#7c6fb8] p-4 rounded-full text-white text-2xl">
                <FaBullseye />
              </div>
              <h2 className={`text-3xl font-bold ${textColor}`}>Our Mission</h2>
            </div>
            <p className={`${textColor} opacity-80 leading-relaxed text-lg`}>
              At ScholarStream, our mission is to make quality education
              accessible to every deserving student, regardless of their
              financial background. We believe that financial constraints should
              never be a barrier to achieving academic excellence. Through our
              comprehensive platform, we connect students with thousands of
              scholarship opportunities that match their academic profile,
              goals, and aspirations.
            </p>
          </div>

          {/* Vision */}
          <div
            className={`${cardBg} p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-gradient-to-br from-[#eaafc8] to-[#d696b0] p-4 rounded-full text-white text-2xl">
                <FaLightbulb />
              </div>
              <h2 className={`text-3xl font-bold ${textColor}`}>Our Vision</h2>
            </div>
            <p className={`${textColor} opacity-80 leading-relaxed text-lg`}>
              We envision a world where every student has equal access to
              educational opportunities without financial barriers. Our vision
              is to create a global community of scholars who are equipped with
              the knowledge, skills, and support they need to transform their
              lives and contribute meaningfully to society. We aim to be the
              leading scholarship portal empowering millions of students.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2
            className={`text-4xl md:text-5xl font-bold text-center mb-4 ${textColor}`}
          >
            Our <span className="text-[#9f87e2]">Core Values</span>
          </h2>
          <p
            className={`text-center mb-12 max-w-2xl mx-auto ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
          >
            These principles guide everything we do and define our commitment to
            our community
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <FaAward />,
                title: "Excellence",
                description:
                  "We strive for the highest standards in everything we do",
                color: "from-blue-500 to-blue-600",
              },
              {
                icon: <FaUsers />,
                title: "Accessibility",
                description:
                  "Making opportunities available to students from all backgrounds",
                color: "from-purple-500 to-purple-600",
              },
              {
                icon: <FaLightbulb />,
                title: "Innovation",
                description: "Continuously improving our platform and services",
                color: "from-yellow-500 to-yellow-600",
              },
              {
                icon: <FaHandsHelping />,
                title: "Integrity",
                description:
                  "Operating with transparency and honesty in all our dealings",
                color: "from-green-500 to-green-600",
              },
            ].map((value, index) => (
              <div
                key={index}
                className={`${cardBg} p-6 rounded-xl text-center shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
              >
                <div
                  className={`bg-gradient-to-br ${value.color} p-4 rounded-full text-white text-4xl mb-4 inline-block`}
                >
                  {value.icon}
                </div>
                <h3 className={`text-xl font-bold mb-3 ${textColor}`}>
                  {value.title}
                </h3>
                <p className={`${textColor} opacity-80 text-sm`}>
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className={`${cardBg} p-12 rounded-lg shadow-lg`}>
          <h2 className={`text-4xl font-bold mb-8 ${textColor}`}>
            Why Choose ScholarStream?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className={`text-xl font-bold mb-3 ${textColor}`}>
                ✓ Extensive Scholarship Database
              </h3>
              <p className={`${textColor} opacity-80`}>
                Access thousands of scholarships from universities and
                organizations worldwide
              </p>
            </div>
            <div>
              <h3 className={`text-xl font-bold mb-3 ${textColor}`}>
                ✓ Personalized Recommendations
              </h3>
              <p className={`${textColor} opacity-80`}>
                Smart matching algorithm finds opportunities tailored to your
                profile
              </p>
            </div>
            <div>
              <h3 className={`text-xl font-bold mb-3 ${textColor}`}>
                ✓ Expert Support
              </h3>
              <p className={`${textColor} opacity-80`}>
                Get guidance and assistance throughout your scholarship
                application journey
              </p>
            </div>
            <div>
              <h3 className={`text-xl font-bold mb-3 ${textColor}`}>
                ✓ Community & Resources
              </h3>
              <p className={`${textColor} opacity-80`}>
                Join a vibrant community of students and access valuable
                resources
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div
          className="my-16 py-12 rounded-xl"
          style={{
            background:
              theme === "dark"
                ? "linear-gradient(135deg, #1f2937 0%, #111827 100%)"
                : "linear-gradient(135deg, #f0f4ff 0%, #e0e7ff 100%)",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center px-8">
            {[
              {
                number: "10,000+",
                label: "Scholarships Listed",
                icon: <FaGlobeAmericas className="text-4xl" />,
              },
              {
                number: "50,000+",
                label: "Students Helped",
                icon: <FaUsers className="text-4xl" />,
              },
              {
                number: "150+",
                label: "Countries Covered",
                icon: <FaChartLine className="text-4xl" />,
              },
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-[#9f87e2] mb-3 flex justify-center">
                  {stat.icon}
                </div>
                <div
                  className={`text-5xl font-bold bg-gradient-to-r from-[#654ea3] to-[#eaafc8] text-transparent bg-clip-text mb-2`}
                >
                  {stat.number}
                </div>
                <p className={`font-semibold text-lg ${textColor}`}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      {/* <div className={`${accentBg} py-16 border-t-2 border-[#9f87e2]`}>
        <div className="container mx-auto px-4">
          <h2
            className={`text-4xl md:text-5xl font-bold text-center mb-12 ${textColor}`}
          >
            Why Choose <span className="text-[#9f87e2]">ScholarStream?</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Expert Support",
                description:
                  "Dedicated team to help you find the right scholarships",
              },
              {
                title: "Verified Opportunities",
                description: "All scholarships are verified and up-to-date",
              },
              {
                title: "Fast Application",
                description:
                  "Streamlined process for quick and easy applications",
              },
              {
                title: "Success Stories",
                description:
                  "Join thousands of successful scholarship recipients",
              },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="text-[#9f87e2] text-2xl flex-shrink-0">
                  <FaUserTie />
                </div>
                <div>
                  <h3 className={`font-bold text-lg mb-2 ${textColor}`}>
                    {item.title}
                  </h3>
                  <p className={`${textColor} opacity-75`}>
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}

      {/* CTA Section */}
      {/* <div className="bg-gradient-to-r from-[#654ea3] to-[#eaafc8] py-16">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Ready to Transform Your Future?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Start exploring thousands of scholarship opportunities today and
            take the first step towards your dreams
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              to="/all-scholarships"
              className="btn bg-white text-[#654ea3] border-none btn-lg font-bold hover:bg-gray-100"
            >
              Explore Scholarships
            </Link>
            <Link
              to="/contact-us"
              className="btn border-white border-2 text-white btn-lg font-bold hover:bg-white hover:text-[#654ea3]"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default About;
