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
      id="mulesoft-coe"
      data-testid="mulesoft-coe-section"
      ref={sectionRef}
      className="relative overflow-hidden pt-6 sm:pt-8 pb-8 sm:pb-12"
      style={{ background: "var(--bg-section-alt)" }}
    >
      {/* Ember glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2
          -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full"
        style={{ background: "var(--ember)", filter: "blur(160px)", opacity: 0.055 }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">

        {/* ══════════════════════════════════════════
            PILL BADGE
            ══════════════════════════════════════════ */}
        <motion.span
            className="z-pill mb-6 text-lg font-semibold"
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4 }}
          >
          MANAGED SERVICES
        </motion.span>

        {/* ══════════════════════════════════════════
            SUB-SECTION 1: Platform Agnostic Integration Services
            ══════════════════════════════════════════ */}
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mt-2 font-extrabold leading-[1.08] tracking-[-0.04em]"
          style={{ 
            fontFamily: "'Manrope',sans-serif", 
            fontSize: "clamp(1.4rem, 2.8vw, 2.2rem)",
            color: "var(--text-primary)"
          }}
        >
          Platform-Agnostic{" "}
          <em
            className="not-italic"
            style={{ color: "var(--ember)" }}
          >
            Integration Services
          </em>
        </motion.h2>

        {/* Platform pills — OUTSIDE max-w-2xl, full width, left-aligned */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
          className="flex flex-wrap gap-2.5 mt-6 mb-14"
        >
          {PLATFORM_PILLS.map((pill) => (
            <motion.div
              key={pill}
              variants={{
                hidden: { opacity: 0, scale: 0.85, y: 8 },
                visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.35 } },
              }}
              whileHover={{ scale: 1.05, transition: { duration: 0.15 } }}
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 cursor-default
                text-xs font-semibold transition-colors duration-200"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-strong)",
                color: "var(--text-secondary)",
                boxShadow: "var(--shadow-card)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--ember)";
                e.currentTarget.style.color = "var(--accent-ember)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border-strong)";
                e.currentTarget.style.color = "var(--text-secondary)";
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: "var(--ember)", opacity: 0.7 }}
              />
              {pill}
            </motion.div>
          ))}
        </motion.div>

        {/* ══════════════════════════════════════════
            SUB-SECTION 2: MuleSoft Center of Excellence
            ══════════════════════════════════════════ */}
        <div className="mb-10 max-w-2xl">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="font-extrabold leading-[1.08] tracking-[-0.04em]
              text-[var(--text-primary)]"
            style={{ fontFamily: "'Manrope',sans-serif", fontSize: "clamp(1.4rem, 2.8vw, 2.2rem)" }}
          >
            MuleSoft{" "}
            <em
              className="not-italic"
              style={{ color: "var(--ember)" }}
            >
              Center of Excellence
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

        {/* ── Scrolling recognition marquee ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-2xl overflow-hidden"
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-strong)",
            boxShadow: "var(--shadow-card)",
          }}
        >
          <div className="flex items-center gap-4 mb-4" style={{ marginTop: "0.5cm" }}>
            <div className="h-px flex-1" style={{ background: "var(--border-default)" }} />
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--text-secondary)] whitespace-nowrap text-center">
              MuleSoft Industry Recognition
            </span>
            <div className="h-px flex-1" style={{ background: "var(--border-default)" }} />
          </div>

          <div className="py-6">
            <LogoLoop
              logos={LOGO_DATA}
              speed={80}
              direction="left"
              logoHeight={32}
              gap={40}
              fadeOut={true}
              fadeOutColor="var(--bg-card)"
              pauseOnHover={true}
              ariaLabel="Analyst firm logos"
              renderItem={(item, key) => {
                const descriptions = {
                  "Gartner": "Leader in Gartner® Magic Quadrant™ for API Management — 10 years running.",
                  "Forrester": "Leader in The Forrester Wave™: API Management Software, Q3 2024.",
                  "IDC": "Leader in IDC MarketScape: Worldwide B2B Middleware, 2024.",
                  "Everest Group": "Recognized for enterprise integration and API-led transformation."
                };

                return (
                  <div
                    className="flex flex-col gap-3 px-6 py-4 rounded-xl"
                    style={{
                      background: "var(--bg-section-alt)",
                      border: "1px solid var(--border-default)",
                      minWidth: "280px",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div style={{ filter: "none", transition: "filter 0.2s ease" }}>
                        {item.node}
                      </div>
                      {item.title === "Everest Group" && (
                        <div
                          className="text-base font-extrabold text-[var(--text-primary)] tracking-tight"
                          style={{ fontFamily: "Manrope, sans-serif" }}
                        >
                          Everest Group
                        </div>
                      )}
                    </div>
                    <div
                      className="text-xs text-[var(--text-secondary)] leading-relaxed"
                      style={{ fontFamily: "Manrope, sans-serif" }}
                    >
                      {descriptions[item.title]}
                    </div>
                  </div>
                );
              }}
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
};