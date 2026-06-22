import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Bot, Zap, Layers } from "lucide-react";
import { LogoLoop } from "@/components/common/LogoLoop";

// Brand logo components
const GartnerLogo = () => (
  <img 
    src="/logos/gartner.svg" 
    alt="Gartner"
    className="h-14 w-auto"
    style={{ maxHeight: '56px' }}
  />
);

const ForresterLogo = () => (
  <div className="h-12 w-auto flex items-center justify-center px-3">
    <svg 
      width="160" 
      height="40" 
      viewBox="0 0 160 40" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ color: 'var(--text-primary)' }}
    >
      <text 
        x="0" 
        y="30" 
        fontFamily="Arial, sans-serif" 
        fontSize="24" 
        fontWeight="bold"
        fill="currentColor"
      >
        Forrester
      </text>
    </svg>
  </div>
);

const IDCLogo = () => (
  <img 
    src="/logos/IDC.svg" 
    alt="IDC"
    className="h-12 w-auto"
    style={{ maxHeight: '48px' }}
  />
);

const EverestGroupLogo = () => (
  <img 
    src="/logos/everest.png" 
    alt="Everest Group"
    className="h-12 w-auto"
    style={{ maxHeight: '48px' }}
  />
);

// Logo data for LogoLoop component
const LOGO_DATA = [
  { node: <GartnerLogo />, alt: "Gartner", title: "Gartner" },
  { node: <ForresterLogo />, alt: "Forrester", title: "Forrester" },
  { node: <IDCLogo />, alt: "IDC", title: "IDC" },
  { node: <EverestGroupLogo />, alt: "Everest Group", title: "Everest Group" },
  { node: <GartnerLogo />, alt: "Gartner", title: "Gartner" },
  { node: <ForresterLogo />, alt: "Forrester", title: "Forrester" },
  { node: <IDCLogo />, alt: "IDC", title: "IDC" },
  { node: <EverestGroupLogo />, alt: "Everest Group", title: "Everest Group" },
];

/* ── animated counter hook ── */
function useCounter(target, inView, duration = 1.6) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / (duration * 1000), 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(ease * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);
  return val;
}

const PLATFORM_PILLS = [
  "MuleSoft", "AWS", "Azure", "GCP",
  "Oracle", "SQL Server", "Snowflake",
  "Custom APIs", "Open-source", "Agentic Frameworks",
  "REST / GraphQL", "Salesforce",
];

const BENTO = [
  { id: "apis", title: "MuleSoft Integrations & APIs", desc: "End-to-end API lifecycle from design to production.", icon: Zap },
  { id: "agents", title: "Custom Agents", desc: "Intelligent agents built on MuleSoft's agent framework.", icon: Bot },
  { id: "fabric", title: "Agent Fabric", desc: "Multi-agent orchestration for complex enterprise workflows.", icon: Layers },
];

/* ── stat counter card ── */
const StatCard = ({ value, suffix, label, delay, inView }) => {
  const count = useCounter(value, inView, 1.8);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col items-center justify-center py-8 px-4 rounded-2xl"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-strong)",
        boxShadow: "var(--shadow-card)",
      }}
    >
      <div
        className="font-extrabold leading-none tracking-[-0.04em] mb-2"
        style={{
          fontFamily: "'Manrope', sans-serif",
          fontSize: "clamp(2.4rem,4vw,3.4rem)",
          color: "var(--text-primary)",
        }}
      >
        {count}
        <em className="not-italic" style={{ color: "var(--ember)" }}>{suffix}</em>
      </div>
      <div
        className="text-xs font-semibold uppercase tracking-[0.12em] text-center"
        style={{ color: "var(--text-muted)" }}
      >
        {label}
      </div>
    </motion.div>
  );
};

export const MuleSoftCOE = () => {
  const [hovered, setHovered] = useState(null);
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="managed-services-anchor"
      data-testid="mulesoft-coe-section"
      ref={sectionRef}
      className="relative overflow-hidden pt-6 sm:pt-8 pb-8 sm:pb-12"
      style={{ background: "var(--bg-section-alt)", scrollMarginTop: "96px" }}
    >
      {/* Ember glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2
          -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full"
        style={{ background: "var(--ember)", filter: "blur(160px)", opacity: 0.055 }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">

        {/* ══════════════════════════════════════════
            MuleSoft Center of Excellence
            ══════════════════════════════════════════ */}
        <div className="mb-10 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45 }}
          >
            <span className="z-pill mb-6 text-lg font-semibold">MuleSoft</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="font-extrabold leading-[1.08] tracking-[-0.04em]
              text-[var(--text-primary)] mt-4"
            style={{ fontFamily: "'Manrope',sans-serif", fontSize: "clamp(1.4rem, 2.8vw, 2.2rem)" }}
          >
            Center of{" "}
            <em
              className="not-italic"
              style={{ color: "var(--ember)" }}
            >
              Excellence
            </em>
          </motion.h2>

                  </div>

        {/* ── Animated stat counters ── */}
        <div className="grid grid-cols-2 gap-4 mb-10">
          <StatCard value={100} suffix="%" label="MuleSoft certified engineers" delay={0} inView={inView} />
          <StatCard value={10} suffix="+" label="MuleSoft implementations" delay={0.1} inView={inView} />
        </div>

        {/* ── Bento grid (3 cards = 3 columns on desktop) ── */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8 auto-rows-fr">
          {BENTO.map((card, i) => {
            const Icon = card.icon;
            const isH = hovered === card.id;

            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: 0.05 * i }}
                onMouseEnter={() => setHovered(card.id)}
                onMouseLeave={() => setHovered(null)}
                className="relative flex flex-col gap-3 rounded-2xl p-6 cursor-default"
                style={{
                  background: "var(--bg-card)",
                  border: isH ? "1px solid var(--border-ember)" : "1px solid var(--border-strong)",
                  boxShadow: isH ? "var(--shadow-card-hover)" : "var(--shadow-card)",
                  transform: isH ? "translateY(-4px)" : "translateY(0)",
                  transition: "all 0.22s ease",
                }}
              >
                <div
                  className="absolute top-0 left-[15%] right-[15%] h-[2px] rounded-b-sm
                    transition-opacity duration-200"
                  style={{ background: "var(--ember)", opacity: isH ? 0.8 : 0 }}
                />

                <div className="z-icon h-10 w-10">
                  <Icon className="h-5 w-5" />
                </div>

                <div>
                  <div
                    className="text-sm font-bold text-[var(--text-primary)] leading-snug mb-1"
                    style={{ fontFamily: "'Manrope',sans-serif" }}
                  >
                    {card.title}
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>


      </div>
    </section>
  );
};