import React from "react";
import { Button } from "@/components/common/Button";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      data-testid="hero-section"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1638791859274-ff535025f92e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODF8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBkYXRhJTIwY2VudGVyJTIwdGVjaG5vbG9neSUyMGluZnJhc3RydWN0dXJlfGVufDB8fHx8MTc3MDk4MDk5NHww&ixlib=rb-4.1.0&q=85')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 via-blue-800/90 to-cyan-700/85"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        <h1
          data-testid="hero-headline"
          className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          style={{ fontFamily: "'Manrope', sans-serif" }}
        >
          Transforming Business
          <br />
          Through Technology
        </h1>
        <p
          data-testid="hero-subtext"
          className="text-lg sm:text-xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed"
        >
          We deliver world-class IT solutions that drive innovation, efficiency, and growth
          for enterprises across the globe.
        </p>
        <Button
          data-testid="hero-cta-button"
          onClick={scrollToContact}
          size="lg"
          variant="primary"
          icon={<ArrowRight className="h-5 w-5" />}
          iconPosition="right"
          className="bg-white text-blue-600 hover:bg-gray-100 shadow-2xl"
        >
          Get in Touch
        </Button>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white/70 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};
