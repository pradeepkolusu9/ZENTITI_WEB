import React, { useState } from "react";
import { motion } from "framer-motion";
import { Settings, Zap, RefreshCw, Cloud } from "lucide-react";
import { ContactModal } from "@/components/ContactModal";

const painPoints = [
  {
    title: "Siloed Systems",
    description: "Systems are siloed across teams and vendors",
    icon: Settings,
  },
  {
    title: "Data Drift",
    description: "Data definitions drift and identifiers do not match",
    icon: Zap,
  },
  {
    title: "30–40% Engineering Tax",
    description: "Engineering effort lost to manual system re-wiring",
    icon: RefreshCw,
  },
  {
    title: "Cloud Blockers",
    description: "Cloud efforts stall when legacy systems are unwired",
    icon: Cloud,
  },
];

export const Challenge = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <section
      id="challenge"
      data-testid="challenge-section"
      className="relative py-24 sm:py-32 overflow-hidden"
      style={{ background: "var(--bg-page)" }}
    >
      <div className="relative z-10 mx-auto max-w-7xl px-7">

        {/* ── Header — left-aligned for richness, not centered ── */}
        <div className="mb-16 max-w-2xl">
          <motion.span
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4 }}
            className="z-pill mb-6 text-lg font-semibold"
          >
            <span
              className="inline-block w-[6px] h-[6px] rounded-full"
              style={{ background: "var(--accent-blue)" }}
            />
            The Challenge
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mt-5 font-extrabold leading-[1.08] tracking-[-0.04em]
              text-[var(--text-primary)]"
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: "clamp(1.4rem, 2.8vw, 2.2rem)",
            }}
          >
            Fragmentation{" "}
            <em
              className="not-italic bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(90deg, var(--ember), #f97316)",
              }}
            >
              Slows
            </em>
            <br />AI Execution.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mt-5 text-lg leading-relaxed text-[var(--text-secondary)]"
          >
            Every enterprise AI initiative hits the same wall not strategy, not talent.
            Integration debt.
          </motion.p>
        </div>

        {/* ── Cards — 4 col, featured card taller with ember treatment ── */}
        <motion.div
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 items-stretch"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.08,
              },
            },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {painPoints.map((point) => {
            const Icon = point.icon;
            return (
              <motion.article
                key={point.title}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="relative flex flex-col rounded-2xl overflow-hidden cursor-default h-full"
                style={{
                  background: point.featured
                    ? "var(--ember)"
                    : "var(--bg-card)",
                  border: point.featured
                    ? "none"
                    : "1px solid var(--border-default)",
                  boxShadow: point.featured
                    ? "var(--shadow-ember)"
                    : "var(--shadow-card)",
                  padding: point.featured ? "32px 28px" : "28px 24px",
                }}
              >
                {/* Featured card gets a large faint icon watermark */}
                {point.featured && (
                  <div
                    className="pointer-events-none absolute right-4 bottom-4 opacity-10"
                    style={{ fontSize: 96 }}
                  >
                    <Icon style={{ width: 96, height: 96, color: "#fff" }} />
                  </div>
                )}

                {/* Icon */}
                <div
                  className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{
                    background: point.featured
                      ? "rgba(255,255,255,0.15)"
                      : "var(--icon-bg)",
                    color: point.featured ? "#fff" : "var(--icon-text)",
                    border: point.featured
                      ? "1px solid rgba(255,255,255,0.2)"
                      : "1px solid var(--border-default)",
                  }}
                >
                  <Icon className="h-5 w-5" />
                </div>

                
                {/* Divider */}
                {/* Top accent bar — ember on featured, subtle on others */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{
                    background: point.featured
                      ? "rgba(255,255,255,0.25)"
                      : "var(--border-default)",
                  }}
                />
                <div
                  className="mb-4 h-px w-full"
                  style={{
                    background: point.featured
                      ? "rgba(255,255,255,0.15)"
                      : "var(--border-default)",
                  }}
                />

                <h3
                  className="mb-2 text-base font-bold leading-snug"
                  style={{
                    color: point.featured ? "#fff" : "var(--text-primary)",
                  }}
                >
                  {point.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{
                    color: point.featured
                      ? "rgba(255,255,255,0.65)"
                      : "var(--text-secondary)",
                  }}
                >
                  {point.description}
                </p>
              </motion.article>
            );
          })}
        </motion.div>

        {/* ── Callout — full-width, dark in both modes ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative mt-6 overflow-hidden rounded-2xl px-10 py-8
            flex items-center justify-center"
          style={{
            background: "#0F1826",   /* Deep slate - dark in both modes */
          }}
        >
          {/* Ember glow behind text */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
              w-64 h-32 rounded-full opacity-20"
            style={{ background: "var(--ember)", filter: "blur(60px)" }}
          />

          <p
            className="relative text-lg font-bold leading-snug tracking-tight sm:text-xl text-center"
            style={{ color: "#E8F0FF", fontFamily: "'Manrope', sans-serif" }}
          >
            Integration is the{" "}
            <em className="not-italic" style={{ color: "var(--ember)" }}>
              hidden tax
            </em>{" "}
            slowing AI-enabled acceleration.
          </p>
        </motion.div>

      </div>
      
      {/* Contact Modal */}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </section>
  );
};
