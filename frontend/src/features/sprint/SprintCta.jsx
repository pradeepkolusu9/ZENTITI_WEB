import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Search, Link2, ShieldCheck, BarChart3, RotateCw } from "lucide-react";
import { ContactModal } from "@/components/ContactModal";
import "./SprintCta.css";

const DELIVERABLES = [
  {
    title: "AI-Readiness Scorecard",
    desc: "Each of the 8 data disciplines scored against your chosen use case.",
  },
  {
    title: "Gap Map & Risk Register",
    desc: "The gaps that matter, ranked, with quick wins identified.",
  },
  {
    title: "Proposed Pilot Plan",
    desc: "A scoped 12 or 16 week pilot with named first wins.",
  },
];

const FLOW_STEPS = [
  { title: "Scope", icon: Search },
  { title: "Integration Discovery", icon: Link2 },
  { title: "Architecture & Governance", icon: ShieldCheck },
  { title: "Risk & Gap Analysis", icon: BarChart3 },
  { title: "Synthesis & Recommendation", icon: RotateCw },
];

const ShootArrow = () => (
  <svg width="13" height="10" viewBox="0 0 16 12" fill="none">
    <line x1="0" y1="6" x2="9" y2="6" stroke="var(--ember)" strokeWidth="2" strokeLinecap="round" />
    <polyline points="5,1 13,6 5,11" fill="none" stroke="var(--ember)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const SprintCta = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [autoStep, setAutoStep] = useState(0);
  const [litConnectors, setLitConnectors] = useState([false, false, false, false]);
  const [isMobile, setIsMobile] = useState(false);
  const timerRef = useRef(null);
  const mobileScrollRef = useRef(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setAutoStep((prev) => {
        const next = (prev + 1) % 5;
        if (next === 0) {
          setLitConnectors([false, false, false, false]);
        } else {
          setLitConnectors((c) => {
            const n = [...c];
            n[next - 1] = true;
            return n;
          });
        }
        return next;
      });
    }, 1100);
    return () => clearInterval(timerRef.current);
  }, []);

  // Auto-scroll mobile carousel to active card
  useEffect(() => {
    if (isMobile && mobileScrollRef.current) {
      const container = mobileScrollRef.current;
      const cardWidth = 260 + 12;
      const scrollTo = autoStep * cardWidth - (container.offsetWidth / 2 - 130);
      container.scrollTo({ left: Math.max(0, scrollTo), behavior: "smooth" });
    }
  }, [autoStep, isMobile]);

  const renderStepCard = (step, i, isMobileCard = false) => {
    const Icon = step.icon;
    const isActive = autoStep === i;
    return (
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.4, delay: i * 0.08 }}
        style={{
          flex: isMobileCard ? undefined : 1,
          minWidth: isMobileCard ? undefined : 0,
          display: "flex", flexDirection: "column",
          alignItems: "center", textAlign: "center",
          borderRadius: 14, padding: "28px 16px 24px", minHeight: 140,
          border: isActive ? "1px solid rgba(232,82,26,0.5)" : "1px solid var(--border-strong)",
          background: "var(--bg-card)",
          position: "relative", overflow: "hidden", cursor: "default",
          transform: isActive ? "translateY(-8px)" : "translateY(0)",
          boxShadow: isActive ? "0 16px 40px rgba(232,82,26,0.15)" : "var(--shadow-card)",
          transition: "all 0.45s cubic-bezier(.4,0,.2,1)",
        }}
      >
        {isActive && (
          <div style={{
            position: "absolute", top: 0, left: "-80%",
            width: "55%", height: "100%",
            background: "linear-gradient(90deg, transparent, rgba(232,82,26,0.06), transparent)",
            animation: "sprintShimmer 2s ease-in-out infinite",
            pointerEvents: "none",
          }} />
        )}
        <div style={{
          width: 42, height: 42, borderRadius: 10,
          display: "flex", alignItems: "center", justifyContent: "center",
          border: isActive ? "1px solid rgba(232,82,26,0.3)" : "1px solid var(--border-default)",
          background: isActive ? "rgba(232,82,26,0.1)" : "var(--bg-section-alt)",
          color: isActive ? "var(--ember)" : "var(--text-secondary)",
          marginBottom: 12, transition: "all 0.4s ease",
        }}>
          <Icon style={{ width: 18, height: 18 }} />
        </div>
        <p style={{
          fontSize: 13, fontWeight: 700,
          fontFamily: "'Manrope', sans-serif",
          color: "var(--text-primary)",
          marginBottom: 0, lineHeight: 1.3,
        }}>
          {step.title}
        </p>
      </motion.div>
    );
  };

  return (
    <>
      <section className="sprint-section">
        <div className="sprint-inner">

          {/* Header */}
          <motion.div
            className="sprint-head"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="sprint-title">
              <span className="accent">One</span> Week.{" "}
              <span className="accent">Three</span> Deliverables.{" "}
              <span className="accent">Zero</span> Cost.
            </h2>
          </motion.div>

          {/* Desktop: horizontal flow with connectors */}
          <div className="sprint-flow-desktop">
            {FLOW_STEPS.map((step, i) => {
              const isActive = autoStep === i;
              return (
                <React.Fragment key={step.title}>
                  {renderStepCard(step, i)}
                  {i < FLOW_STEPS.length - 1 && (
                    <div
                      className="sprint-connector"
                      style={{
                        width: 36, flexShrink: 0, position: "relative",
                        alignSelf: "center", height: 20,
                        display: "flex", alignItems: "center",
                      }}
                    >
                      <div style={{
                        position: "absolute", top: "50%", left: 0, right: 0,
                        height: 1.5, background: "var(--border-strong)",
                        borderRadius: 2, transform: "translateY(-50%)",
                      }} />
                      <div style={{
                        position: "absolute", top: "50%", left: 0,
                        height: 1.5, width: litConnectors[i] ? "100%" : "0%",
                        background: "var(--ember)", borderRadius: 2,
                        transform: "translateY(-50%)",
                        transition: "width 0.55s cubic-bezier(.4,0,.2,1)",
                        boxShadow: litConnectors[i] ? "0 0 6px rgba(232,82,26,0.6)" : "none",
                      }} />
                      {litConnectors[i] && (
                        <div style={{
                          position: "absolute", top: "50%",
                          transform: "translateY(-50%)",
                          animation: "sprintShootArrow 1s ease-in-out infinite",
                          pointerEvents: "none", lineHeight: 0,
                        }}>
                          <ShootArrow />
                        </div>
                      )}
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Mobile: swipeable carousel */}
          <div className="sprint-cards-mobile" ref={mobileScrollRef}>
            {FLOW_STEPS.map((step, i) => (
              <div key={`m-${step.title}`} className="sprint-mobile-card">
                {renderStepCard(step, i, true)}
              </div>
            ))}
          </div>

          {/* Mobile: progress dots */}
          <div className="sprint-mobile-only" style={{ justifyContent: "center", gap: 6, marginTop: 12 }}>
            {FLOW_STEPS.map((_, i) => (
              <div key={i} style={{
                height: 3, borderRadius: 2,
                width: autoStep === i ? 20 : 6,
                background: autoStep === i ? "var(--ember)" : "var(--border-strong)",
                transition: "all 0.3s ease",
              }} />
            ))}
          </div>

          {/* CTA */}
          <motion.div
            className="sprint-foot"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <button className="sprint-cta" onClick={() => setModalOpen(true)}>
              Book Your Free 1-Week Sprint
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </button>
          </motion.div>

        </div>
      </section>

      <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};
