import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/common/Button";
import { GradientText } from "@/components/common/GradientText";
import { ArrowRight, Sparkles } from "lucide-react";

export const PremiumHero = () => {
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
      {/* Simplified background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-700">
        {/* Subtle animated blobs */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8"
        >
          <Sparkles className="w-4 h-4 text-cyan-300" />
          <span className="text-sm text-white/90 font-medium">Enterprise Solutions Leader</span>
        </motion.div>

        <motion.h1
          data-testid="hero-headline"
          className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          style={{ fontFamily: "'Manrope', sans-serif" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {heroWords.slice(0, 2).join(" ")}
          <br />
          <GradientText gradient="from-cyan-300 via-blue-300 to-purple-300" animate={false}>
            {heroWords.slice(2).join(" ")}
          </GradientText>
        </motion.h1>

        <motion.p
          data-testid="hero-subtext"
          className="text-lg sm:text-xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          We deliver world-class IT solutions that drive innovation, efficiency, and growth
          for enterprises across the globe.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
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
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
          >
            View Portfolio
          </Button>
        </motion.div>
      </div>

      {/* Simplified scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white/70 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};
