import React from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import ServicesSection from "../components/ServicesSection";
import IndustriesSection from "../components/IndustriesSection";
import InsightsSection from "../components/InsightsSection";
import CareersSection from "../components/CareersSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <IndustriesSection />
      <InsightsSection />
      <CareersSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default HomePage;
