import React from "react";
import { Link } from "react-router";
import banner1 from "../../assets/banner1.jpeg";
import banner2 from "../../assets/banner2.jpeg";
import banner3 from "../../assets/banner3.jpeg";
import { FaSun, FaMoon } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import useThemeContext from "../../hooks/useThemContext";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Banner = () => {
  const { theme, toggleTheme } = useThemeContext();

  const banners = [
    {
      image: banner1,
      title: "Unlock Your Future",
      highlight: "with ScholarStream",
      description:
        "Discover thousands of scholarship opportunities tailored just for you. Start your journey to academic excellence today.",
    },
    {
      image: banner2,
      title: "Empower Your Dreams",
      highlight: "with Financial Aid",
      description:
        "Access comprehensive scholarship programs designed for undergraduates, graduates, and doctoral students worldwide.",
    },
    {
      image: banner3,
      title: "Transform Your Life",
      highlight: "through Education",
      description:
        "Connect with the best scholarship opportunities and achieve your educational goals without financial barriers.",
    },
  ];

  return (
    <Swiper
      modules={[Autoplay, Navigation, Pagination]}
      autoplay={{ delay: 6000, disableOnInteraction: false }}
      pagination={{ clickable: true, dynamicBullets: true }}
      navigation={true}
      loop={true}
      className="w-full"
    >
      {banners.map((banner, index) => (
        <SwiperSlide key={index}>
          <div
            className="hero min-h-[600px]"
            style={{
              backgroundImage: `url(${banner.image})`,
            }}
          >
            <div className="hero-overlay bg-opacity-70 bg-black/60"></div>
            <div className="hero-content text-center text-neutral-content">
              <div className="max-w-2xl">
                <h1 className="mb-5 text-5xl font-bold text-white">
                  {banner.title}{" "}
                  <span className="bg-gradient-to-r from-[#654ea3] to-[#eaafc8] text-transparent bg-clip-text">
                    {banner.highlight}
                  </span>
                </h1>
                <p className="mb-8 text-lg text-gray-200 font-semibold">
                  {banner.description}
                </p>
                <Link
                  to="/all-scholarships"
                  className="btn bg-gradient-to-r from-[#654ea3] to-[#eaafc8] border-none btn-lg"
                >
                  Search Scholarships
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}

      <style>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: #9f87e2;
          width: 50px;
          height: 50px;
          background: rgba(159, 135, 226, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          top: 50%;
        }

        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          background: rgba(159, 135, 226, 0.3);
          color: #eaafc8;
        }

        .swiper-button-next::after,
        .swiper-button-prev::after {
          font-size: 24px;
        }

        .swiper-pagination-bullet {
          background: #9f87e2;
          opacity: 0.5;
        }

        .swiper-pagination-bullet-active {
          background: #eaafc8;
          opacity: 1;
        }
      `}</style>
    </Swiper>
  );
};

export default Banner;
