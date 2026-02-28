import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { FaHeadset, FaEnvelope, FaComments, FaClock } from "react-icons/fa";
import useThemeContext from "../hooks/useThemContext";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const ContactBanner = () => {
  const { theme } = useThemeContext();

  const slides = [
    {
      title: "24/7 Support",
      subtitle: "Get help whenever you need it",
      icon: FaHeadset,
      color: "from-blue-500 to-blue-600",
      description: "Our dedicated support team is always ready to assist you",
    },
    {
      title: "Direct Communication",
      subtitle: "Reach out to us via email",
      icon: FaEnvelope,
      color: "from-purple-500 to-purple-600",
      description: "Send us your queries and get prompt responses",
    },
    {
      title: "Quick Response",
      subtitle: "We reply within 24 hours",
      icon: FaClock,
      color: "from-green-500 to-green-600",
      description: "Fast and helpful responses to all your inquiries",
    },
    {
      title: "Contact Support",
      subtitle: "Multiple ways to get in touch",
      icon: FaComments,
      color: "from-orange-500 to-orange-600",
      description: "Choose the channel that works best for you",
    },
  ];

  return (
    <div
      className={`relative h-96 overflow-hidden transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true, dynamicBullets: true }}
        navigation={true}
        loop={true}
        className="h-full"
      >
        {slides.map((slide, index) => {
          const Icon = slide.icon;
          return (
            <SwiperSlide key={index}>
              <div
                className={`h-full w-full px-6 md:px-12 flex items-center justify-center transition-colors duration-300 ${
                  theme === "dark"
                    ? "bg-gray-800 text-white"
                    : "bg-white text-gray-800"
                }`}
                style={{
                  background:
                    theme === "dark"
                      ? "linear-gradient(135deg, #1f2937 0%, #111827 100%)"
                      : "linear-gradient(135deg, #ffffff 0%, #f3f4f6 100%)",
                }}
              >
                <div className="text-center space-y-4 max-w-2xl">
                  <div className={`flex justify-center mb-6`}>
                    <div
                      className={`bg-gradient-to-br ${slide.color} p-6 rounded-full text-white shadow-lg`}
                    >
                      <Icon className="text-5xl" />
                    </div>
                  </div>

                  <h2 className="text-4xl md:text-5xl font-bold">
                    {slide.title}
                  </h2>

                  <p className="text-xl md:text-2xl font-semibold text-[#9f87e2]">
                    {slide.subtitle}
                  </p>

                  <p
                    className={`text-lg ${
                      theme === "dark" ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {slide.description}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Custom Styling for Navigation and Pagination */}
      <style>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: #9f87e2;
          background: rgba(159, 135, 226, 0.1);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          background: rgba(159, 135, 226, 0.2);
          color: #7c6fb8;
        }

        .swiper-button-next::after,
        .swiper-button-prev::after {
          font-size: 24px;
        }

        .swiper-pagination-bullet {
          background: #9f87e2;
          opacity: 0.5;
          width: 12px;
          height: 12px;
          transition: all 0.3s ease;
        }

        .swiper-pagination-bullet-active {
          opacity: 1;
          background: #9f87e2;
          width: 32px;
          border-radius: 5px;
        }

        .swiper-button-next,
        .swiper-button-prev {
          top: auto;
          bottom: 20%;
        }
      `}</style>
    </div>
  );
};

export default ContactBanner;
