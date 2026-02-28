import React from "react";
import Banner from "./Banner";
import TopScholarships from "./TopScholarships";
import Features from "./Features";
import Services from "./Services";
import HowItWorks from "./HowItWorks";
import Newsletter from "./Newsletter";
import Partners from "./Partners";
import Testimonial from "./Testimonial";
import ContactUs from "./ContactUs";

const Home = () => {
  return (
    <div>
      <Banner />
      <TopScholarships />
      <Features />
      <Services />
      <HowItWorks />
      <Partners />
      <Newsletter />
      <Testimonial />
      <ContactUs />
    </div>
  );
};

export default Home;
