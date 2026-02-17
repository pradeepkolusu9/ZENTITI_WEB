import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PremiumHero } from "@/sections/PremiumHero";
import { About } from "@/sections/About";
import { StatsSection } from "@/sections/StatsSection";
import { Services } from "@/sections/Services";
import { Industries } from "@/sections/Industries";
import { Insights } from "@/sections/Insights";
import { Careers } from "@/sections/Careers";
import { Contact } from "@/sections/Contact";
import { ScrollProgress } from "@/components/common/ScrollProgress";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <ScrollProgress />
      <Navbar />
      <PremiumHero />
      <StatsSection />
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
