import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/shared/ui";

export const Hero = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      data-testid="hero-section"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900" />

      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 z-[1] h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/15 blur-[100px]" />

      <div className="relative z-10 container mx-auto px-6 py-24 text-center sm:py-28">
        <motion.span
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="mb-6 inline-block rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-blue-300"
        >
          Enterprise Integration &amp; Automation
        </motion.span>

        <motion.h1
          data-testid="hero-headline"
          className="mx-auto mb-6 max-w-4xl text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl"
          style={{ fontFamily: "'Manrope', sans-serif" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05, ease: "easeOut" }}
        >
          Reduce operating costs by{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">up to 30%</span>{" "}
          with workflow automation.
        </motion.h1>

        <motion.p
          data-testid="hero-subtext"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.12, ease: "easeOut" }}
          className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg"
        >
          Automate workflows in weeks. Deploy 2x faster. Lower delivery cost.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.18, ease: "easeOut" }}
          className="flex flex-col justify-center gap-4 sm:flex-row"
        >
          <Button
            data-testid="hero-cta-button"
            onClick={() => scrollToSection("contact")}
            size="lg"
            variant="primary"
            icon={<ArrowRight className="h-5 w-5" />}
            iconPosition="right"
            className="bg-white text-slate-900 shadow-xl shadow-white/10 hover:-translate-y-0.5 hover:bg-gray-100"
          >
            Book Free Consultation
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => scrollToSection("services")}
            className="border border-white/15 text-white hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/5"
          >
            View Solutions
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 cursor-pointer"
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        onClick={() => scrollToSection("about")}
      >
        <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">Scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-5 w-5 text-white/40" />
        </motion.div>
      </motion.div>
    </section>
  );
};
