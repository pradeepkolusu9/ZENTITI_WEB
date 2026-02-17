import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/common/Button";
import { ArrowRight } from "lucide-react";
import { heroTextContainer, wordReveal } from "@/utils/animations";

export const Hero = () => {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const heroWords = ["Transforming", "Business", "Through", "Technology"];

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
        <motion.h1
          data-testid="hero-headline"
          className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          style={{ fontFamily: "'Manrope', sans-serif" }}
          initial="hidden"
          animate="visible"
          variants={heroTextContainer}
        >
          {heroWords.slice(0, 2).map((word, i) => (
            <motion.span
              key={i}
              variants={wordReveal}
              className="inline-block mr-4"
            >
              {word}
            </motion.span>
          ))}
          <br />
          {heroWords.slice(2).map((word, i) => (
            <motion.span
              key={i + 2}
              variants={wordReveal}
              className="inline-block mr-4"
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          data-testid="hero-subtext"
          className="text-lg sm:text-xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          We deliver world-class IT solutions that drive innovation, efficiency, and growth
          for enterprises across the globe.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
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
        </motion.div>
      </div>

      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <motion.div 
            className="w-1 h-3 bg-white/70 rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>
    </section>
  );
};
