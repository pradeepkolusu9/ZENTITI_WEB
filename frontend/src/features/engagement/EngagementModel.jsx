import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Search, Link, Zap, Bot, RotateCw } from "lucide-react";

const STEPS = [
  { num: "01", title: "Discover", desc: "Assess systems, pain points, and priorities to identify highest-impact opportunities.", icon: Search },
  { num: "02", title: "Connect", desc: "Build integration flows and system APIs to establish secure connectivity across your enterprise.", icon: Link },
  { num: "03", title: "Make Actionable", desc: "Deliver governed Action APIs that transform connectivity into standardized business operations.", icon: Zap },
  { num: "04", title: "Build & Deploy Agents", desc: "Deploy agents with guardrails and monitoring to execute outcomes using governed Action APIs.", icon: Bot },
  { num: "05", title: "Operate & Iterate", desc: "Sustain, scale, and optimize continuously through monitoring, learning, and iterative improvements.", icon: RotateCw },
];

const PHASES = [
  { label: "Discover", cards: [0] },
  { label: "Buildout", cards: [1, 2, 3] },
  { label: "Evolve", cards: [4] },
];

function getPhase(cardIdx) {
  for (let i = 0; i < PHASES.length; i++) {
    if (PHASES[i].cards.includes(cardIdx)) return i;
  }
  return -1;
}

const ShootArrow = () => (
  <svg width="13" height="10" viewBox="0 0 16 12" fill="none">
    <line x1="0" y1="6" x2="9" y2="6" stroke="var(--ember)" strokeWidth="2" strokeLinecap="round" />
    <polyline points="5,1 13,6 5,11" fill="none" stroke="var(--ember)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const KEYFRAMES = `
  @keyframes emShootRight {
    0%   { left: 0%;  opacity: 0; }
    10%  { opacity: 1; }
    80%  { opacity: 1; }
    100% { left: calc(100% - 14px); opacity: 0; }
  }
  @keyframes emPhaseShootRight {
    0%   { left: 0%;  opacity: 0; }
    10%  { opacity: 1; }
    85%  { opacity: 1; }
    100% { left: calc(100% - 16px); opacity: 0; }
  }
  @keyframes emShimmer {
    0%   { left: -80%; }
    100% { left: 180%; }
  }
  @keyframes emPhaseGlow {
    0%   { box-shadow: 0 0 0 0 rgba(232,82,26,0); }
    50%  { box-shadow: 0 0 20px 3px rgba(232,82,26,0.12); }
    100% { box-shadow: 0 0 0 0 rgba(232,82,26,0); }
  }

  /* ── Mobile carousel styles ── */
  .em-cards-desktop { display: flex; align-items: stretch; gap: 0; }
  .em-cards-mobile { display: none; }
  .em-desktop-only { display: block; }
  .em-mobile-only { display: none; }

  @media (max-width: 768px) {
    .em-cards-desktop { display: none !important; }
    .em-cards-mobile {
      display: flex !important;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      -webkit-overflow-scrolling: touch;
      gap: 12px;
      padding: 8px 0 16px;
      scrollbar-width: none;
    }
    .em-cards-mobile::-webkit-scrollbar { display: none; }
    .em-mobile-card {
      flex: 0 0 260px;
      scroll-snap-align: center;
    }
    .em-desktop-only { display: none !important; }
    .em-mobile-only { display: flex !important; }
  }
`;

export const EngagementModel = () => {
  const [autoStep, setAutoStep] = useState(0);
  const [litConnectors, setLitConnectors] = useState([false, false, false, false]);
  const [svgPaths, setSvgPaths] = useState([]);
  const [svgSize, setSvgSize] = useState({ w: 1100, h: 80 });
  const [isMobile, setIsMobile] = useState(false);

  const timerRef = useRef(null);
  const svgAreaRef = useRef(null);
  const cardRefs = useRef([]);
  const pillRefs = useRef([]);
  const mobileScrollRef = useRef(null);

  const activePhase = getPhase(autoStep);
  const litPhaseConnectors = [activePhase >= 1, activePhase >= 2];

  // ── Check mobile ──
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // ── Auto-step timer ──
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

  // ── Auto-scroll mobile carousel to active card ──
  useEffect(() => {
    if (isMobile && mobileScrollRef.current) {
      const container = mobileScrollRef.current;
      const cardWidth = 260 + 12; // card width + gap
      const scrollTo = autoStep * cardWidth - (container.offsetWidth / 2 - 130);
      container.scrollTo({ left: Math.max(0, scrollTo), behavior: "smooth" });
    }
  }, [autoStep, isMobile]);

  // ── Draw SVG connectors ──
  const drawConnectors = useCallback(() => {
    const area = svgAreaRef.current;
    if (!area) return;

    const areaRect = area.getBoundingClientRect();
    const W = areaRect.width;
    const H = areaRect.height;
    setSvgSize({ w: W, h: H });

    const cardCenters = cardRefs.current.map((el) => {
      if (!el) return 0;
      const r = el.getBoundingClientRect();
      return r.left + r.width / 2 - areaRect.left;
    });

    const pillCenters = pillRefs.current.map((el) => {
      if (!el) return 0;
      const r = el.getBoundingClientRect();
      return r.left + r.width / 2 - areaRect.left;
    });

    const topY = 2;
    const botY = H - 2;
    const midY = H * 0.45;

    const paths = [];
    PHASES.forEach((phase, pi) => {
      const targetX = pillCenters[pi] || 0;
      phase.cards.forEach((ci) => {
        const srcX = cardCenters[ci] || 0;
        paths.push({
          cardIdx: ci,
          phaseIdx: pi,
          d: `M${srcX} ${topY} Q${srcX} ${midY}, ${targetX} ${botY}`,
          srcX,
          targetX,
          topY,
          botY,
        });
      });
    });
    setSvgPaths(paths);
  }, []);

  useEffect(() => {
    const timer = setTimeout(drawConnectors, 150);
    window.addEventListener("resize", drawConnectors);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", drawConnectors);
    };
  }, [drawConnectors]);

  const pillCentersByPhase = PHASES.map((_, pi) => {
    const match = svgPaths.find((p) => p.phaseIdx === pi);
    return match ? match.targetX : 0;
  });

  // ── Shared card renderer ──
  const renderCard = (step, i, opts = {}) => {
    const Icon = step.icon;
    const isActive = autoStep === i;
    const { isMobileCard } = opts;

    return (
      <motion.div
        ref={isMobileCard ? undefined : (el) => (cardRefs.current[i] = el)}
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.4, delay: i * 0.08 }}
        style={{
          flex: isMobileCard ? undefined : 1,
          minWidth: isMobileCard ? undefined : 0,
          display: "flex", flexDirection: "column",
          alignItems: "center", textAlign: "center",
          borderRadius: 14, padding: "28px 16px 24px", minHeight: 180,
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
            animation: "emShimmer 2s ease-in-out infinite",
            pointerEvents: "none",
          }} />
        )}

        <div style={{
          width: 42, height: 42, borderRadius: 10,
          display: "flex", alignItems: "center", justifyContent: "center",
          border: isActive ? "1px solid rgba(232,82,26,0.3)" : "1px solid var(--border-default)",
          background: isActive ? "rgba(232,82,26,0.1)" : "var(--icon-bg)",
          color: isActive ? "var(--ember)" : "var(--icon-text)",
          marginBottom: 12, transition: "all 0.4s ease",
        }}>
          <Icon style={{ width: 18, height: 18 }} />
        </div>

        <p style={{
          fontSize: 13, fontWeight: 700,
          fontFamily: "'Manrope', sans-serif",
          color: "var(--text-primary)",
          marginBottom: 6, lineHeight: 1.3,
        }}>
          {step.title}
        </p>
        <p style={{ fontSize: 11, color: "var(--text-secondary)", lineHeight: 1.6 }}>
          {step.desc}
        </p>
      </motion.div>
    );
  };

  return (
    <section
      id="engagement-model"
      data-testid="engagement-model-section"
      className="relative overflow-hidden pt-12 sm:pt-16 pb-24 sm:pb-32"
      style={{ background: "var(--bg-section-alt)" }}
    >
      <style>{KEYFRAMES}</style>

      
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px] rounded-full"
        style={{ background: "var(--ember)", filter: "blur(120px)", opacity: 0.05 }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">

        {/* ═══ Header ═══ */}
        <div className="mb-16 max-w-2xl">
          <motion.span
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4 }}
            className="z-pill mb-6 text-lg font-semibold"
          >
            Our Process
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mt-5 font-extrabold leading-[1.08] tracking-[-0.04em] text-[var(--text-primary)]"
            style={{ fontFamily: "'Manrope', sans-serif", fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)" }}
          >
            Our Engagement{" "}
            <em
              className="not-italic bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(90deg, var(--ember), var(--ember-glow))" }}
            >
              Model
            </em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mt-5 text-lg leading-relaxed text-[var(--text-secondary)]"
          >
            A structured 5-step approach delivering measurable outcomes in 60–90 days.
          </motion.p>
        </div>

        {/* ═══ DESKTOP Cards Row (unchanged) ═══ */}
        <div className="em-cards-desktop">
          {STEPS.map((step, i) => (
            <React.Fragment key={step.title}>
              {renderCard(step, i)}
              {i < 4 && (
                <div style={{
                  width: 36, flexShrink: 0, position: "relative",
                  alignSelf: "center", height: 20,
                  display: "flex", alignItems: "center",
                }}>
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
                      animation: "emShootRight 1s ease-in-out infinite",
                      pointerEvents: "none", lineHeight: 0,
                    }}>
                      <ShootArrow />
                    </div>
                  )}
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* ═══ MOBILE Swipeable Carousel ═══ */}
        <div className="em-cards-mobile" ref={mobileScrollRef}>
          {STEPS.map((step, i) => (
            <div key={`m-${step.title}`} className="em-mobile-card">
              {renderCard(step, i, { isMobileCard: true })}
            </div>
          ))}
        </div>

        {/* ═══ Mobile progress dots ═══ */}
        <div className="em-mobile-only" style={{
          justifyContent: "center", gap: 6, marginTop: 12,
        }}>
          {STEPS.map((_, i) => (
            <div key={`md-${i}`} style={{
              height: 3, borderRadius: 2,
              width: autoStep === i ? 20 : 6,
              background: autoStep === i ? "var(--ember)" : "var(--border-strong)",
              transition: "all 0.3s ease",
            }} />
          ))}
        </div>

        {/* ═══ Mobile phase pills (stacked) ═══ */}
        <div className="em-mobile-only" style={{
          justifyContent: "center", gap: 8, marginTop: 16,
        }}>
          {PHASES.map((phase, pi) => {
            const isActive = activePhase === pi;
            const isPast = activePhase > pi;
            return (
              <React.Fragment key={`mp-${phase.label}`}>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  padding: "8px 16px", borderRadius: 10,
                  border: isActive ? "1.5px solid rgba(232,82,26,0.5)" : isPast ? "1.5px solid rgba(232,82,26,0.25)" : "1.5px solid var(--border-strong)",
                  background: isActive ? "rgba(232,82,26,0.06)" : "var(--bg-card)",
                  transition: "all 0.4s ease",
                }}>
                  <div style={{
                    width: 7, height: 7, borderRadius: "50%",
                    background: isActive || isPast ? "var(--ember)" : "var(--border-strong)",
                    transition: "all 0.4s ease",
                  }} />
                  <span style={{
                    fontSize: 12, fontWeight: 700,
                    fontFamily: "'Manrope', sans-serif",
                    color: isActive ? "var(--ember)" : isPast ? "var(--text-primary)" : "var(--text-secondary)",
                    transition: "color 0.4s ease",
                  }}>
                    {phase.label}
                  </span>
                </div>
                {pi < PHASES.length - 1 && (
                  <svg width="16" height="10" viewBox="0 0 16 10" style={{ flexShrink: 0 }}>
                    <path d="M0 5h12" stroke={isPast ? "var(--ember)" : "var(--border-strong)"} strokeWidth="1.5" strokeLinecap="round" style={{ transition: "stroke 0.4s ease" }} />
                    <path d="M10 1l4 4-4 4" fill="none" stroke={isPast ? "var(--ember)" : "var(--border-strong)"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "stroke 0.4s ease" }} />
                  </svg>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* ═══ DESKTOP: SVG Connector Area ═══ */}
        <div className="em-desktop-only" ref={svgAreaRef} style={{ position: "relative", width: "100%", height: 80, marginTop: 18 }}>
          <svg
            viewBox={`0 0 ${svgSize.w} ${svgSize.h}`}
            width={svgSize.w}
            height={svgSize.h}
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
          >
            {svgPaths.map((p) => {
              const isCardActive = autoStep === p.cardIdx;
              const isPhaseActive = activePhase === p.phaseIdx;
              let stroke = "var(--border-strong)";
              let opacity = 0.4;
              let sw = 1.5;
              if (isCardActive) { stroke = "var(--ember)"; opacity = 1; sw = 2; }
              else if (isPhaseActive) { stroke = "rgba(232,82,26,0.4)"; opacity = 0.7; }

              return (
                <path
                  key={`path-${p.cardIdx}`}
                  d={p.d}
                  fill="none"
                  stroke={stroke}
                  strokeWidth={sw}
                  strokeLinecap="round"
                  opacity={opacity}
                  style={{ transition: "stroke 0.45s ease, opacity 0.45s ease, stroke-width 0.45s ease" }}
                />
              );
            })}

            {svgPaths.map((p) => (
              <circle
                key={`td-${p.cardIdx}`}
                cx={p.srcX} cy={p.topY} r={2.5}
                fill={autoStep === p.cardIdx ? "var(--ember)" : "var(--border-strong)"}
                style={{ transition: "fill 0.4s ease" }}
              />
            ))}

            {pillCentersByPhase.map((cx, pi) => {
              const isAct = activePhase === pi;
              const isPast = activePhase > pi;
              return (
                <React.Fragment key={`bd-${pi}`}>
                  <circle
                    cx={cx} cy={svgSize.h - 2}
                    r={isAct ? 4 : 3}
                    fill={isAct || isPast ? "var(--ember)" : "var(--border-strong)"}
                    style={{ transition: "fill 0.4s ease" }}
                  />
                  {isAct && (
                    <circle cx={cx} cy={svgSize.h - 2} r={4} fill="var(--ember)">
                      <animate attributeName="r" values="4;8;4" dur="1.5s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.6;0;0.6" dur="1.5s" repeatCount="indefinite" />
                    </circle>
                  )}
                </React.Fragment>
              );
            })}
          </svg>
        </div>

        {/* ═══ DESKTOP: Phase Pills ═══ */}
        <div className="em-desktop-only" style={{ display: "flex", alignItems: "center", gap: 0 }}>
          {PHASES.map((phase, pi) => {
            const isActive = activePhase === pi;
            const isPast = activePhase > pi;

            return (
              <React.Fragment key={phase.label}>
                <div style={{ flex: phase.cards.length, minWidth: 0, display: "flex", justifyContent: "center" }}>
                  <div
                    ref={(el) => (pillRefs.current[pi] = el)}
                    style={{
                      display: "inline-flex", alignItems: "center", gap: 8,
                      padding: "10px 22px", borderRadius: 12,
                      whiteSpace: "nowrap", position: "relative", overflow: "hidden",
                      border: isActive
                        ? "1.5px solid rgba(232,82,26,0.5)"
                        : isPast
                          ? "1.5px solid rgba(232,82,26,0.25)"
                          : "1.5px solid var(--border-strong)",
                      background: isActive
                        ? "rgba(232,82,26,0.06)"
                        : isPast
                          ? "rgba(232,82,26,0.03)"
                          : "var(--bg-card)",
                      animation: isActive ? "emPhaseGlow 2.2s ease-in-out infinite" : "none",
                      transition: "all 0.45s cubic-bezier(.4,0,.2,1)",
                    }}
                  >
                    {isActive && (
                      <div style={{
                        position: "absolute", top: 0, left: "-80%",
                        width: "60%", height: "100%",
                        background: "linear-gradient(90deg, transparent, rgba(232,82,26,0.07), transparent)",
                        animation: "emShimmer 2.2s ease-in-out infinite",
                        pointerEvents: "none",
                      }} />
                    )}

                    <div style={{
                      width: 9, height: 9, borderRadius: "50%", flexShrink: 0,
                      background: isActive || isPast ? "var(--ember)" : "var(--border-strong)",
                      boxShadow: isActive ? "0 0 8px rgba(232,82,26,0.5)" : "none",
                      transition: "all 0.4s ease",
                    }} />
                    <span style={{
                      fontSize: 13.5, fontWeight: 700,
                      fontFamily: "'Manrope', sans-serif",
                      letterSpacing: "0.01em",
                      color: isActive ? "var(--ember)" : isPast ? "var(--text-primary)" : "var(--text-secondary)",
                      transition: "color 0.4s ease",
                    }}>
                      {phase.label}
                    </span>
                  </div>
                </div>

                {pi < PHASES.length - 1 && (
                  <div style={{
                    width: 52, flexShrink: 0, position: "relative",
                    height: 20, display: "flex", alignItems: "center",
                    margin: "0 4px",
                  }}>
                    <div style={{
                      position: "absolute", top: "50%", left: 0, right: 0,
                      height: 2, background: "var(--border-strong)",
                      borderRadius: 2, transform: "translateY(-50%)",
                    }} />
                    <div style={{
                      position: "absolute", top: "50%", left: 0, height: 2,
                      width: litPhaseConnectors[pi] ? "100%" : "0%",
                      background: "var(--ember)", borderRadius: 2,
                      transform: "translateY(-50%)",
                      transition: "width 0.6s cubic-bezier(.4,0,.2,1)",
                      boxShadow: "0 0 6px rgba(232,82,26,0.5)",
                    }} />
                    {litPhaseConnectors[pi] && (
                      <div style={{
                        position: "absolute", top: "50%",
                        transform: "translateY(-50%)",
                        animation: "emPhaseShootRight 1.2s ease-in-out infinite",
                        pointerEvents: "none", lineHeight: 0,
                      }}>
                        <ShootArrow />
                      </div>
                    )}
                    <div style={{ position: "absolute", right: -1, top: "50%", transform: "translateY(-50%)" }}>
                      <svg width="9" height="12" viewBox="0 0 9 12">
                        <polyline
                          points="1,1 8,6 1,11"
                          fill="none"
                          stroke={litPhaseConnectors[pi] ? "var(--ember)" : "var(--border-strong)"}
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{ transition: "stroke 0.45s ease" }}
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* ═══ DESKTOP: Progress Dots ═══ */}
        <div className="em-desktop-only" style={{ display: "flex", alignItems: "center", gap: 0, marginTop: 14 }}>
          {PHASES.map((phase, pi) => (
            <React.Fragment key={`dots-${pi}`}>
              <div style={{
                flex: phase.cards.length, minWidth: 0,
                display: "flex", justifyContent: "center", gap: 6,
              }}>
                {phase.cards.map((ci) => (
                  <div
                    key={`dot-${ci}`}
                    style={{
                      height: 3, borderRadius: 2,
                      width: autoStep === ci ? 20 : 6,
                      background: autoStep === ci ? "var(--ember)" : "var(--border-strong)",
                      transition: "all 0.3s ease",
                    }}
                  />
                ))}
              </div>
              {pi < PHASES.length - 1 && <div style={{ width: 60, flexShrink: 0 }} />}
            </React.Fragment>
          ))}
        </div>

      </div>
    </section>
  );
};