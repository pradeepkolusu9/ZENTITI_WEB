import React from "react";
import { motion } from "framer-motion";

const metrics = [
  { 
    icon: "M12 22v-5M9 8V2M15 8V2M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z", 
    label: "Priority Systems Connected", 
    value: "3–5", 
    description: "for read/write access",
    statLabel: "SYSTEMS"
  },
  { 
    icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5", 
    label: "Action APIs Delivered", 
    value: "6–10", 
    description: "fully governed",
    statLabel: "APIS"
  },
  { 
    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", 
    label: "Agents in Production", 
    value: "2–3", 
    description: "with monitoring",
    statLabel: "AGENTS"
  },
  ];

const css = `
  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

  .success-metrics-section {
    background: var(--bg-section-alt);
    font-family: 'Inter', system-ui, sans-serif;
    color: var(--text-primary);
    padding: 88px 32px 40px;
    position: relative;
    overflow: hidden;
  }

  /* Grid texture */
  .success-metrics-section::before {
    content: '';
    position: absolute; inset: 0; pointer-events: none;
    background-image: linear-gradient(rgba(255,255,255,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.1) 1px,transparent 1px);
    background-size: 64px 64px;
    opacity: 0.03;
  }

  /* Orange radial glow */
  .success-metrics-section::after {
    content: '';
    position: absolute;
    left: 50%; top: 50%;
    width: 700px; height: 500px;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    background: var(--ember);
    filter: blur(120px);
    opacity: 0.07;
    pointer-events: none;
  }

  .success-metrics-inner {
    max-width: 1160px;
    margin: 0 auto;
    position: relative;
    z-index: 10;
  }

  /* ── HEADER ── */
  .pv-header { margin-bottom: 52px; }

  .pv-pill {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    border: 1px solid var(--border-default);
    border-radius: 100px;
    padding: 8px 20px;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--text-secondary);
    margin-bottom: 22px;
  }
  .pv-pill-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--ember);
  }

  .pv-heading {
    font-size: clamp(34px, 4vw, 52px);
    font-weight: 800;
    line-height: 1.06;
    letter-spacing: -0.03em;
    color: var(--text-primary);
    margin-bottom: 16px;
  }
  .pv-heading span { color: var(--ember); }

  .pv-subtext {
    font-size: 15px;
    font-weight: 400;
    color: var(--text-secondary);
    line-height: 1.7;
    max-width: 520px;
  }

  /* ── GRID ── */
  .pv-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    margin-bottom: 10px;
  }
  @media (max-width: 1024px) { .pv-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 520px) { .pv-grid { grid-template-columns: 1fr; } }

  /* ── CARD ── */
  .pv-card {
    background: var(--bg-card);
    border: 1px solid var(--border-default);
    border-radius: 14px;
    padding: 28px 26px 26px;
    position: relative;
    transition: border-color 0.2s ease;
    cursor: default;
    box-shadow: var(--shadow-card);
  }
  .pv-card:hover { border-color: var(--ember); }

  /* ── CARD TOP ── */
  .pv-card-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 24px;
  }

  /* icon */
  .pv-icon {
    width: 42px; height: 42px;
    background: var(--bg-section-alt);
    border-radius: 9px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .pv-icon svg {
    width: 20px; height: 20px;
    stroke: var(--text-secondary);
    fill: none;
    stroke-width: 1.7;
    stroke-linecap: round;
    stroke-linejoin: round;
    transition: stroke 0.2s;
  }
  .pv-card:hover .pv-icon svg { stroke: var(--ember); }

  /* stat */
  .pv-stat-wrap { text-align: right; }
  .pv-stat-num {
    display: block;
    font-size: 32px;
    font-weight: 900;
    line-height: 1;
    letter-spacing: -0.04em;
    color: var(--text-secondary);
    transition: color 0.2s;
  }
  .pv-card:hover .pv-stat-num { color: var(--ember); }

  .pv-stat-label {
    display: block;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.09em;
    text-transform: uppercase;
    color: var(--text-primary);
    margin-top: 3px;
  }

  /* divider */
  .pv-divider {
    height: 1px;
    background: var(--border-default);
    margin-bottom: 18px;
  }

  /* card text */
  .pv-card-name {
    font-size: 16px;
    font-weight: 700;
    color: var(--text-primary);
    letter-spacing: -0.02em;
    margin-bottom: 7px;
    text-align: center;
  }
  .pv-card-desc {
    font-size: 13px;
    font-weight: 400;
    color: var(--text-secondary);
    text-align: center;
    line-height: 1.62;
  }
`;

export const ProductVisual = () => {
  return (
    <section id="success-metrics" data-testid="success-metrics-section" className="success-metrics-section">
      <style>{css}</style>
      <div className="success-metrics-inner">
        {/* HEADER */}
        <motion.div 
          className="pv-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45 }}
        >
          <span className="z-pill mb-6 text-lg font-semibold">Success Metrics</span>
          <h2 className="pv-heading">
            What to Expect in <span>60–90 Days</span>
          </h2>
          <p className="pv-subtext">
            Proven, measurable outcomes delivered in your first engagement sprint.
          </p>
        </motion.div>

        {/* GRID */}
        <motion.div 
          className="pv-grid"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, delay: 0.07 }}
        >
          {metrics.map((metric, index) => (
            <div key={index} className="pv-card">
              <div className="pv-card-top">
                <div className="pv-icon">
                  <svg viewBox="0 0 24 24">
                    <path d={metric.icon} />
                  </svg>
                </div>
                <div className="pv-stat-wrap">
                  <span className="pv-stat-num">{metric.value}</span>
                  <span className="pv-stat-label">{metric.statLabel}</span>
                </div>
              </div>
              <div className="pv-divider"></div>
              <p className="pv-card-name">{metric.label}</p>
              <p className="pv-card-desc">{metric.description}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
