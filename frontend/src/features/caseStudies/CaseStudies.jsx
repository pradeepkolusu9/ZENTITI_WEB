import React, { useState } from "react";
import { motion } from "framer-motion";

const CASES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    industry: "Marketing · Print · Supply Chain",
    stat: "40%",
    statLabel: "reduction in maintenance",
    title: "Integration Migration @ Scale",
    challenge: "300+ point-to-point integrations on legacy IBM middleware with no skill or software support.",
    solution: "Migrated to MuleSoft & converting 300+ legacy connections to API-led architecture.",
    outcome: "Future-ready data tech stack with 40% reduction in integration maintenance costs.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    industry: "Financial Services",
    stat: "2K+",
    statLabel: "requests per second sustained",
    title: "API Modernization @ Scale",
    challenge: "A system with legacy APIs suffering from throttling, weak security, and downtime under heavy transaction loads.",
    solution: "MuleSoft API facade with identity auth, rate limiting, and enterprise CI/CD for zero downtime deploys.",
    outcome: "Sustained 2,000+ request/seconds peak loads. Future-ready open banking architecture established.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
    industry: "Higher Education",
    stat: "1.3M",
    statLabel: "records orchestrated weekly",
    title: "360 View of Student Record",
    challenge: "Data trapped in disconnected systems causing low visibility into student success and frequent errors.",
    solution: "MuleSoft based integrations unified siloed data into Salesforce Student Success Hub with automated daily delta sync.",
    outcome: "Holistic 360° student view for leadership via actionable dashboards driving institutional growth.",
  },
];

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

  .cs-wrap {
    font-family: 'Inter', system-ui, sans-serif;
    padding: 80px 32px 40px;
    background: var(--bg-section-alt);
    --cs-card: var(--bg-card);
    --cs-border: var(--border-default);
    --cs-text-1: var(--text-primary);
    --cs-text-2: var(--text-secondary);
    --cs-text-3: var(--text-muted);
    --cs-icon-bg: var(--icon-bg);
    --cs-stat-color: var(--text-primary);
    position: relative;
    overflow: hidden;
  }

  /* Grid texture */
  .cs-wrap::before {
    content: '';
    position: absolute; inset: 0; pointer-events: none;
    background-image: linear-gradient(rgba(255,255,255,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.1) 1px,transparent 1px);
    background-size: 64px 64px;
    opacity: 0.03;
  }

  /* Orange radial glow */
  .cs-wrap::after {
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

  .cs-inner {
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    z-index: 10;
  }

  /* ── Header ── */
  .cs-header {
    margin-bottom: 48px;
    animation: cs-up 0.45s ease both;
  }

  .cs-pill {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    border: 1px solid var(--cs-border);
    border-radius: 100px;
    padding: 8px 20px;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--cs-text-2);
    margin-bottom: 22px;
    background: var(--cs-card);
  }

  .cs-pill-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #E84E1B;
    flex-shrink: 0;
  }

  .cs-heading {
    font-size: clamp(34px, 4vw, 52px);
    font-weight: 800;
    line-height: 1.06;
    letter-spacing: -0.03em;
    color: var(--cs-text-1);
    margin-bottom: 16px;
  }

  .cs-heading-accent { color: #E84E1B; }

  .cs-subtext {
    font-size: 15px;
    color: var(--cs-text-2);
    line-height: 1.7;
    max-width: 540px;
  }

  /* ── Grid ── */
  .cs-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    animation: cs-up 0.45s 0.07s ease both;
  }
  @media (max-width: 960px) { .cs-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 560px) { .cs-grid { grid-template-columns: 1fr; } }

  /* ── Card ── */
  .cs-card {
    background: var(--cs-card);
    border: 1px solid var(--cs-border);
    border-radius: 16px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: border-color 0.2s, box-shadow 0.2s;
    cursor: default;
  }
  .cs-card:hover {
    border-color: var(--border-strong);
    box-shadow: var(--shadow-card);
  }

  .cs-card-top {
    padding: 22px 22px 0;
    display: flex;
    align-items: flex-start;
    gap: 10px;
    margin-bottom: 20px;
  }

  .cs-icon-box {
    width: 38px; height: 38px;
    background: var(--cs-icon-bg);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: background 0.2s;
  }
  .cs-icon-box svg {
    width: 17px; height: 17px;
    stroke: var(--cs-text-2);
    fill: none;
    transition: stroke 0.2s;
  }
  .cs-card:hover .cs-icon-box svg { stroke: var(--ember); }

  .cs-industry {
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--cs-text-2);
    line-height: 1.4;
    padding-top: 2px;
  }

  /* Stat */
  .cs-stat {
    padding: 0 22px 18px;
    border-bottom: 1px solid var(--cs-border);
  }
  .cs-stat-num {
    font-size: 32px;
    font-weight: 800;
    line-height: 1;
    letter-spacing: -0.03em;
    color: var(--cs-stat-color);
    display: block;
    margin-bottom: 4px;
    transition: color 0.2s;
  }
  .cs-card:hover .cs-stat-num { color: #E84E1B; }
  .cs-stat-label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--cs-text-3);
  }

  /* Title */
  .cs-body { padding: 18px 22px 0; }
  .cs-title {
    font-size: 15px;
    font-weight: 700;
    color: var(--cs-text-1);
    letter-spacing: -0.02em;
    line-height: 1.3;
  }

  /* Blocks */
  .cs-blocks {
    padding: 14px 22px 22px;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  .cs-block {
    border-radius: 8px;
    padding: 13px 14px;
    border: 1px solid transparent;
    min-height: 108px;
  }
  .cs-block-label {
    font-size: 11.5px;
    font-weight: 900;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 7px;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .cs-block-dot {
    width: 5px; height: 5px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .cs-block-text {
    font-size: 12.5px;
    line-height: 1.62;
    color: var(--text-primary);
  }

  /* Block variants — using CSS variables for theme compatibility */
  .cs-block-c { background: rgba(232,113,74,0.08); border-color: rgba(232,113,74,0.15); }
  .cs-block-c .cs-block-label { color: rgba(232,113,74,0.8); }
  .cs-block-c .cs-block-dot   { background: rgba(232,113,74,0.7); }

  .cs-block-s { background: var(--accent-blue, rgba(59,130,246,0.05)); border-color: var(--accent-blue, rgba(59,130,246,0.14)); }
  .cs-block-s .cs-block-label { color: var(--accent-blue, #1A4A8A); }
  .cs-block-s .cs-block-dot   { background: var(--accent-blue, #2E6AC8); }

  .cs-block-o { background: var(--accent-green, rgba(34,197,94,0.15)); border-color: var(--accent-green, rgba(34,197,94,0.25)); }
  .cs-block-o .cs-block-label { color: var(--accent-green, #166534); }
  .cs-block-o .cs-block-dot   { background: var(--accent-green, #22c55e); }

  /* ── Animation ── */
  @keyframes cs-up {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;

function CaseCard({ data }) {
  const [hovered, setHovered] = useState(false);
  void hovered; // used via CSS :hover — state kept for potential JS extensions

  return (
    <div
      className="cs-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top row */}
      <div className="cs-card-top">
        <div className="cs-icon-box">{data.icon}</div>
        <span className="cs-industry">{data.industry}</span>
      </div>

      {/* Stat */}
      <div className="cs-stat">
        <span className="cs-stat-num">{data.stat}</span>
        <span className="cs-stat-label">{data.statLabel}</span>
      </div>

      {/* Title */}
      <div className="cs-body">
        <p className="cs-title">{data.title}</p>
      </div>

      {/* Challenge / Solution / Outcome */}
      <div className="cs-blocks">
        <div className="cs-block cs-block-c">
          <div className="cs-block-label">
            <span className="cs-block-dot" />
            Challenge
          </div>
          <p className="cs-block-text">{data.challenge}</p>
        </div>
        <div className="cs-block cs-block-s">
          <div className="cs-block-label">
            <span className="cs-block-dot" />
            Solution
          </div>
          <p className="cs-block-text">{data.solution}</p>
        </div>
        <div className="cs-block cs-block-o">
          <div className="cs-block-label">
            <span className="cs-block-dot" />
            Outcome
          </div>
          <p className="cs-block-text">{data.outcome}</p>
        </div>
      </div>
    </div>
  );
}

export const CaseStudies = () => {
  return (
    <section id="case-studies" className="cs-wrap">
      <style>{css}</style>
      <div className="cs-inner">

        {/* Header */}
        <div className="cs-header">
          <span className="z-pill mb-6 text-lg font-semibold">Zentiti in action</span>
          <h2 className="cs-heading">
            Case <span className="cs-heading-accent">Studies.</span>
          </h2>
          <p className="cs-subtext whitespace-nowrap">
            Real-world solutions delivering measurable business outcomes across industries.
          </p>
        </div>

        {/* Cards grid */}
        <div className="cs-grid">
          {CASES.map((c) => (
            <CaseCard key={c.title} data={c} />
          ))}
        </div>

      </div>
    </section>
  );
};
