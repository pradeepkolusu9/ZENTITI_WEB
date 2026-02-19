import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CalendarDays } from "lucide-react";
import { Button } from "@/shared/ui";

const CALENDLY_URL = "https://calendly.com/zentiti/strategy-call";

export const FinalCtaSection = () => {
  return (
    <section
      id="final-cta"
      data-testid="final-cta-section"
      className="relative overflow-hidden bg-slate-950 py-20 sm:py-28"
    >
      {/* Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[120px]" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className="mb-4 inline-block rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400"
          >
            Next Step
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            Ready to reduce costs and{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">ship faster</span>?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mx-auto mt-4 max-w-xl text-base text-slate-400"
          >
            Book a 30-minute strategy session and get an actionable roadmap for growth, efficiency, and ROI.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button
              type="button"
              size="lg"
              variant="primary"
              icon={<CalendarDays className="h-5 w-5" />}
              className="bg-white text-slate-900 shadow-xl shadow-white/10 hover:-translate-y-0.5 hover:bg-gray-100"
              onClick={() => window.open(CALENDLY_URL, "_blank", "noopener,noreferrer")}
            >
              Schedule a Call
            </Button>
            <Button
              type="button"
              size="lg"
              variant="outline"
              icon={<ArrowRight className="h-5 w-5" />}
              iconPosition="right"
              className="border border-white/15 text-white hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/5"
              onClick={() => {
                const el = document.getElementById("accelerators");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Explore Accelerators
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
