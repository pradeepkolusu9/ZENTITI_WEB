import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap, ShieldCheck, Mail,
  RotateCcw, Bell, CheckCircle2,
  Eye, Activity, Filter, ArrowRight,
  Play,
} from "lucide-react";
import VideoModal from "@/components/common/VideoModal";

/* ── Hex opacity helper ──
   Converts "#E8521A" + 0.15 → "rgba(232,82,26,0.15)"
   Works with any hex color, avoids the broken "var(--x)44" pattern */
function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

const CARDS = [
  {
    id: "sequencing",
    badge: "Connector",
    accentColor: "#10B981",
    accentLight: "#34D399",
    title: "Event Sequencing Connector",
    description: "Guarantees correct ordering of dependent events across distributed systems.",
    highlight: "50% faster implementation",
    features: ["Built-in retry logic", "Sequence validation", "Parent/child ordering"],
    icon: Zap,
    videoUrl: "/videos/Zentiti Event Sequencing Connector Demo.mp4",
  },
  {
    id: "handler",
    badge: "Connector",
    accentColor: "#3B82F6",
    accentLight: "#60A5FA",
    title: "Failed Event Handler",
    description: "Comprehensive dead-letter queue management with automated classification, alerting, and replay.",
    highlight: "Zero lost transactions",
    features: ["Automated error classification", "One-click replay", "Full audit trails"],
    icon: ShieldCheck,
    videoUrl: "/videos/FailedEventManager.mp4",
  },
  {
    id: "email",
    badge: "Connector",
    accentColor: "#10B981",
    accentLight: "#34D399",
    title: "Custom Email Connector",
    description: "Excessive alerts overwhelm support teams. When alerts become noise, critical issues get missed.",
    highlight: "Zero alert fatigue",
    features: ["Bridge Mule flows & email server", "Rule-based suppression logic", "Centralized alert governance"],
    icon: Mail,
    videoUrl: "/videos/Zentiti Event Sequencing Connector Demo.mp4", // Fallback video
  },
];

/* ── Card 1: Animated event sequence flow ── */
const SequencingVisual = React.memo(({ active }) => {
  const events = ["E-001", "E-002", "E-003", "E-004", "E-005"];
  const ordered = [0, 1, 2, 3, 4];
  const shuffled = [2, 0, 4, 1, 3];
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!active) { setPhase(0); return; }
    const t1 = setTimeout(() => setPhase(1), 400);
    const t2 = setTimeout(() => setPhase(2), 1400);
    const t3 = setTimeout(() => setPhase(0), 3200);
    const loop = setInterval(() => {
      setPhase(0);
      setTimeout(() => setPhase(1), 400);
      setTimeout(() => setPhase(2), 1400);
    }, 3600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearInterval(loop); };
  }, [active]);

  const positions = phase === 0 ? shuffled : ordered;

  return (
    <div style={{ padding: "16px 0", height: 90, position: "relative" }}>
      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em",
        color: "var(--text-muted)", textTransform: "uppercase", marginBottom: 8 }}>
        {phase < 2 ? "Incoming (unordered)" : "✓ Ordered & validated"}
      </div>
      <div style={{ position: "relative", height: 44, display: "flex", alignItems: "center" }}>
        {events.map((e, i) => {
          const targetX = positions.indexOf(i) * 52;
          return (
            <motion.div
              key={e}
              animate={{ x: targetX, opacity: 1 }}
              initial={{ x: shuffled[i] * 52, opacity: 0.6 }}
              transition={{ duration: 0.7, delay: i * 0.06, ease: "easeInOut" }}
              style={{
                position: "absolute",
                width: 44, height: 28,
                borderRadius: 6,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 10, fontWeight: 700,
                background: phase === 2
                  ? "rgba(232,82,26,0.12)"
                  : "var(--bg-section-alt)",
                border: `1px solid ${phase === 2 ? "rgba(232,82,26,0.3)" : "var(--border-default)"}`,
                color: phase === 2 ? "var(--ember)" : "var(--text-secondary)",
                transition: "background 0.4s, border 0.4s, color 0.4s",
              }}
            >
              {e}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
});

/* ── Card 2: Static error log display ── */
const EventHandlerVisual = React.memo(({ active }) => {
  const staticLogs = [
    { msg: "ORDER_CREATED failed", type: "error" },
    { msg: "PAYMENT_PROC timeout", type: "error" },
    { msg: "INV_UPDATE missing", type: "warn" },
    { msg: "NOTIFY_USER failed", type: "error" },
  ];

  return (
    <div style={{ height: 100, overflow: "hidden", padding: "8px 0" }}>
      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em",
        color: "var(--text-muted)", textTransform: "uppercase", marginBottom: 6 }}>
        Dead-letter queue
      </div>
      {staticLogs.map((log, index) => (
        <div
          key={index}
          style={{
            display: "flex", alignItems: "center", gap: 7,
            marginBottom: 5,
          }}
        >
          <div style={{
            width: 6, height: 6, borderRadius: "50%", flexShrink: 0,
            background: log.type === "error" ? "#E8521A" : "#3B82F6",
            boxShadow: log.type === "error"
              ? "0 0 5px rgba(232,82,26,0.6)"
              : "0 0 5px rgba(59,130,246,0.6)",
          }} />
          <span style={{
            fontSize: 10, color: "var(--text-secondary)",
            fontFamily: "monospace",
          }}>
            {log.msg}
          </span>
          <span style={{
            marginLeft: "auto",
            fontSize: 9, fontWeight: 700, padding: "1px 5px", borderRadius: 4,
            background: log.type === "error" ? "rgba(232,82,26,0.1)" : "rgba(59,130,246,0.1)",
            color: log.type === "error" ? "#E8521A" : "#3B82F6",
          }}>
            {log.type}
          </span>
        </div>
      ))}
    </div>
  );
});

/* ── Card 3: Alert suppression counter ── */
const EmailVisual = React.memo(({ active }) => {
  const [count, setCount] = useState(247);
  const [suppressed, setSuppressed] = useState(0);

  useEffect(() => {
    if (!active) { setCount(247); setSuppressed(0); return; }
    let c = 247, s = 0;
    const t = setInterval(() => {
      const drop = Math.floor(Math.random() * 8) + 3;
      c = Math.max(0, c - drop);
      s += drop;
      setCount(c);
      setSuppressed(s);
      if (c <= 0) {
        clearInterval(t);
        setTimeout(() => { setCount(247); setSuppressed(0); }, 1200);
      }
    }, 120);
    return () => clearInterval(t);
  }, [active]);

  const pct = Math.round((suppressed / (suppressed + count || 1)) * 100);

  return (
    <div style={{ padding: "8px 0", height: 100 }}>
      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em",
        color: "var(--text-muted)", textTransform: "uppercase", marginBottom: 10 }}>
        Alert suppression — live
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 20, marginBottom: 10 }}>
        <div>
          <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-0.04em",
            color: "var(--text-primary)", fontFamily: "'Manrope',sans-serif", lineHeight: 1 }}>
            {count}
          </div>
          <div style={{ fontSize: 9, color: "var(--text-muted)", marginTop: 2 }}>
            alerts remaining
          </div>
        </div>
        <div>
          <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-0.04em",
            color: "#E8521A", fontFamily: "'Manrope',sans-serif", lineHeight: 1 }}>
            {suppressed}
          </div>
          <div style={{ fontSize: 9, color: "var(--text-muted)", marginTop: 2 }}>
            suppressed
          </div>
        </div>
      </div>
      <div style={{ height: 4, background: "var(--border-default)", borderRadius: 2, overflow: "hidden" }}>
        <motion.div
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.1 }}
          style={{
            height: "100%", borderRadius: 2,
            background: "linear-gradient(90deg, #3B82F6, #E8521A)",
            boxShadow: "0 0 8px rgba(232,82,26,0.4)",
          }}
        />
      </div>
      <div style={{ fontSize: 9, color: "var(--text-muted)", marginTop: 4, textAlign: "right" }}>
        {pct}% suppression rate
      </div>
    </div>
  );
});

const VISUALS = [SequencingVisual, EventHandlerVisual, EmailVisual];

/* ── Main component ── */
export const SolutionAccelerators = () => {
  const [active, setActive] = useState(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape' && isVideoModalOpen) {
        setIsVideoModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isVideoModalOpen]);

  return (
    <section
      id="accelerators"
      data-testid="accelerators-section"
      className="relative overflow-hidden py-24 sm:py-32 pb-6 sm:pb-8"
      style={{ background: "var(--bg-section-alt)" }}
    >
      {/* Ghost number */}
      
      {/* Dual glow */}
      <div className="pointer-events-none absolute left-[15%] top-1/2 -translate-y-1/2
        w-[400px] h-[300px] rounded-full"
        style={{ background: "#E8521A", filter: "blur(140px)", opacity: 0.05 }} />
      <div className="pointer-events-none absolute right-[15%] top-1/2 -translate-y-1/2
        w-[400px] h-[300px] rounded-full"
        style={{ background: "#3B82F6", filter: "blur(140px)", opacity: 0.05 }} />

      <div className="relative z-10 mx-auto max-w-7xl px-6">

        {/* ── Header ── */}
        <div className="mb-16 max-w-2xl">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mt-5 font-extrabold leading-[1.08] tracking-[-0.04em]
              text-[var(--text-primary)] whitespace-nowrap"
            style={{ fontFamily: "'Manrope',sans-serif",
              fontSize: "clamp(1.6rem,3.5vw,2.4rem)" }}
          >
            MuleSoft Custom{" "}
            <em className="not-italic bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(90deg,var(--ember),var(--ember-glow))" }}>
              Accelerators
            </em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mt-5 text-lg leading-relaxed text-[var(--text-secondary)]"
          >
            Pre-built components that extend MuleSoft where the platform falls short delivered as complimentary value-adds to every engagement.
          </motion.p>
        </div>

        {/* ── Cards ── */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 items-stretch">
          {CARDS.map((card, i) => {
            const Icon = card.icon;
            const Visual = VISUALS[i];
            const isActive = active === card.id;
            const accent = card.accentColor;
            const accentLight = card.accentLight;

            return (
              <motion.article
                key={card.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                onMouseEnter={() => setActive(card.id)}
                onMouseLeave={() => setActive(null)}
                className="relative overflow-hidden rounded-2xl flex flex-col cursor-default"
                style={{
                  background: "var(--bg-card)",
                  border: isActive
                    ? `1px solid ${hexToRgba(accent, 0.27)}`
                    : "1px solid var(--border-strong)",
                  boxShadow: isActive
                    ? `0 12px 40px ${hexToRgba(accent, 0.13)}, 0 0 0 1px ${hexToRgba(accent, 0.13)}`
                    : "var(--shadow-card)",
                  transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                }}
              >
                {/* Top accent bar */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-[3px]"
                  style={{
                    background: `linear-gradient(90deg, ${accent}, ${accentLight})`,
                    transformOrigin: "left",
                  }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isActive ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />

                {/* Card body */}
                <div className="p-7 flex flex-col flex-1">

                  {/* Badge + Icon row */}
                  <div className="flex items-center justify-between mb-5">
                    <span
                      className="rounded-full px-3 py-0.5 text-[10px] font-bold
                        uppercase tracking-[0.12em]"
                      style={{
                        background: hexToRgba(accent, 0.06),
                        border: `1px solid ${hexToRgba(accent, 0.16)}`,
                        color: accent,
                      }}
                    >
                      {card.badge}
                    </span>

                    <motion.div
                      className="h-11 w-11 rounded-xl flex items-center justify-center"
                      style={{
                        background: isActive ? hexToRgba(accent, 0.08) : "var(--icon-bg)",
                        border: isActive
                          ? `1px solid ${hexToRgba(accent, 0.18)}`
                          : "1px solid var(--border-default)",
                        color: isActive ? accent : "var(--icon-text)",
                        transition: "all 0.3s ease",
                      }}
                      animate={{
                        rotate: isActive ? [0, -8, 8, 0] : 0,
                      }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                      <Icon className="h-5 w-5" />
                    </motion.div>
                  </div>

                  {/* Title */}
                  <h3
                    className="mb-2 text-lg font-extrabold leading-snug tracking-tight
                      text-[var(--text-primary)]"
                    style={{ fontFamily: "'Manrope',sans-serif" }}
                  >
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="mb-4 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {card.description}
                  </p>

                  {/* Unique live visual */}
                  <div
                    className="rounded-xl overflow-hidden mb-4"
                    style={{
                      background: "var(--bg-section-alt)",
                      border: "1px solid var(--border-default)",
                      padding: "10px 14px",
                      minHeight: 116,
                    }}
                  >
                    <Visual active={isActive} />
                  </div>

                  {/* Highlight stat */}
                  <div
                    className="mb-4 rounded-xl px-4 py-2.5 flex items-center gap-2"
                    style={{
                      background: hexToRgba(accent, 0.05),
                      border: `1px solid ${hexToRgba(accent, 0.13)}`,
                    }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: accent }} />
                    <p className="text-sm font-bold tracking-tight"
                      style={{ color: accent, fontFamily: "'Manrope',sans-serif" }}>
                      {card.highlight}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="mb-6 flex flex-col gap-2">
                    {card.features.map((f, fi) => (
                      <motion.div
                        key={f}
                        className="flex items-center gap-2.5"
                        initial={{ opacity: 0, x: -8 }}
                        animate={isActive
                          ? { opacity: 1, x: 0 }
                          : { opacity: 0.7, x: 0 }}
                        transition={{ duration: 0.25, delay: fi * 0.06 }}
                      >
                        <div
                          className="w-1 h-1 rounded-full flex-shrink-0"
                          style={{ background: isActive ? accent : "var(--text-muted)" }}
                        />
                        <span className="text-sm text-[var(--text-secondary)]">{f}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA */}
                  <motion.button
                    className="mt-auto flex items-center justify-center gap-2
                      rounded-xl px-5 py-3 text-sm font-bold w-full"
                    style={{
                      background: isActive ? hexToRgba(accent, 0.07) : "var(--bg-section-alt)",
                      border: isActive
                        ? `1px solid ${hexToRgba(accent, 0.18)}`
                        : "1px solid var(--border-strong)",
                      color: isActive ? accent : "var(--text-secondary)",
                      transition: "all 0.25s ease",
                    }}
                    onClick={() => {
                      if (videoUrl) {
                        window.open(videoUrl, "_blank");
                      }
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Play className="w-4 h-4" />
                    Watch Demo
                  </motion.button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* Video Modal */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoUrl={active ? CARDS.find(card => card.id === active)?.videoUrl : "/videos/Zentiti Event Sequencing Connector Demo.mp4"}
      />
    </section>
  );
};