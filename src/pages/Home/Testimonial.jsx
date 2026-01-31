import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetch("/testimonial.json")
      .then((res) => res.json())
      .then((data) => setTestimonials(data));
  }, []);

  return (
    <section className="py-16 bg-base-200">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">What Our Scholars Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from students who have successfully secured scholarships
            through ScholarStream and transformed their academic journeys.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-12"
          >
            {testimonials.map((item) => (
              <SwiperSlide key={item._id}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="card bg-base-100 shadow-xl h-full"
                >
                  <div className="card-body">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="avatar placeholder">
                        <div className="bg-primary text-primary-content rounded-full w-12">
                          <span className="text-xl">{item.name.charAt(0)}</span>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold">{item.name}</h3>
                        <p className="text-sm text-gray-500">{item.role}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 italic">"{item.testimonial}"</p>
                    <div className="mt-4 pt-4 border-t">
                      <p className="text-sm">
                        <span className="font-semibold">Scholarship:</span>{" "}
                        {item.scholarship}
                      </p>
                      <p className="text-sm text-gray-500">
                        {item.university} • {item.year}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonial;
