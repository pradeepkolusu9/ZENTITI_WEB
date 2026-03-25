import React, { useState } from "react";
import { motion } from "framer-motion";
import { Home, BookOpen, Zap, Users, Clock, TrendingUp, Monitor, ArrowRight } from "lucide-react";
import { ApplicationModal } from "@/features/careers/ApplicationModal";

const CHECKLIST = [
  "Remote first culture with flexible work arrangements",
  "Continuous learning with certification support",
  "Work on cutting edge integration and AI projects",
  "Collaborative team of senior specialists",
];

const REASONS = [
  {
    icon: Clock,
    title: "Meaningful work",
    desc: "Solve real problems for Fortune 500 companies and growing enterprises.",
  },
  {
    icon: TrendingUp,
    title: "Growth trajectory",
    desc: "Clear paths from engineer to architect to practice lead.",
  },
  {
    icon: Monitor,
    title: "Cutting-edge tech",
    desc: "Work with MuleSoft, AI agents, and emerging integration patterns.",
  },
];

const CheckIcon = () => (
  <span
    style={{
      width: 20,
      height: 20,
      borderRadius: "50%",
      flexShrink: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "rgba(217,76,26,0.1)",
      border: "1px solid rgba(217,76,26,0.25)",
      color: "var(--ember)",
    }}
  >
    <svg
      width="11" height="11" viewBox="0 0 12 12"
      fill="none" stroke="currentColor"
      strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
    >
      <polyline points="2 6 5 9 10 3" />
    </svg>
  </span>
);

export const CareersSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleJoinTeam = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section
      id="careers"
      data-testid="careers-section"
      className="relative overflow-hidden py-24 sm:py-32"
      style={{ background: "var(--bg-section-alt)" }}
    >
      
      {/* Ember glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2
          -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] rounded-full"
        style={{
          background: "var(--ember)",
          filter: "blur(140px)",
          opacity: 0.05,
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">

        {/* Pill */}
        <motion.span
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4 }}
            className="z-pill mb-6 text-lg font-semibold"
          >
            Careers
        </motion.span>

        {/* Two-column layout — left content heavier, right card pushed to edge */}
        <div className="mt-6 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_auto] lg:gap-20 items-center">

          {/* ── LEFT ── */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="font-extrabold leading-[1.08] tracking-[-0.04em]
                text-[var(--text-primary)] mb-5"
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)",
              }}
            >
              Join our{" "}
              <em
                className="not-italic bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, var(--ember), var(--ember-glow))",
                }}
              >
                specialist
              </em>{" "}
              team
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.08 }}
              className="text-lg leading-relaxed text-[var(--text-secondary)] mb-10 max-w-lg"
            >
              We're always looking for exceptional MuleSoft developers, architects and AI
              specialists who want to work on challenging problems
              with industry leading clients.
            </motion.p>

            {/* Checklist */}
            <ul className="mb-10 flex flex-col gap-3">
              {CHECKLIST.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 + i * 0.07 }}
                  className="flex items-center gap-3 text-base
                    text-[var(--text-primary)]"
                  style={{ listStyle: "none" }}
                >
                  <CheckIcon />
                  {item}
                </motion.li>
              ))}
            </ul>

            {/* CTA button */}
            <motion.button
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.32 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleJoinTeam}
              className="flex items-center gap-2 rounded-xl px-6 py-3
                text-sm font-bold text-[var(--text-primary)]"
              style={{
                background: "transparent",
                border: "1px solid var(--border-strong)",
                fontFamily: "'Manrope', sans-serif",
                cursor: "pointer",
              }}
            >
              Join our team
              <ArrowRight className="h-4 w-4" />
            </motion.button>
          </div>

          {/* ── RIGHT — Why card ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="rounded-2xl p-7 w-full lg:w-[380px] lg:ml-auto"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-strong)",
            }}
          >
            <p
              className="mb-6 text-base font-bold text-[var(--text-primary)]"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              Why engineers choose Zentiti
            </p>

            <div className="flex flex-col">
              {REASONS.map((reason, i) => {
                const Icon = reason.icon;
                return (
                  <motion.div
                    key={reason.title}
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: 0.18 + i * 0.09 }}
                    className="flex items-start gap-4"
                    style={
                      i > 0
                        ? {
                            marginTop: 20,
                            paddingTop: 20,
                            borderTop: "1px solid var(--border-default)",
                          }
                        : {}
                    }
                  >
                    {/* Icon box */}
                    <div
                      className="flex h-9 w-9 flex-shrink-0 items-center
                        justify-center rounded-lg"
                      style={{
                        background: "var(--bg-section-alt)",
                        border: "1px solid var(--border-default)",
                        color: "var(--ember)",
                      }}
                    >
                      <Icon className="h-4 w-4" />
                    </div>

                    <div>
                      <p
                        className="mb-1 text-sm font-bold text-[var(--text-primary)]"
                        style={{ fontFamily: "'Manrope', sans-serif" }}
                      >
                        {reason.title}
                      </p>
                      <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                        {reason.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

        </div>
      </div>

      <ApplicationModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </section>
  );
};
