import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Services } from "@/sections/Services";
import { Industries } from "@/sections/Industries";
import { Insights } from "@/sections/Insights";
import { Careers } from "@/sections/Careers";
import { Contact } from "@/sections/Contact";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Industries />
      <Insights />
      <Careers />
      <Contact />
      <Footer />
    </div>
  );
};

export default HomePage;
