import React from "react";
import { motion } from "framer-motion";
import "./WhatToExpect.css";

const TRACKS = [
  {
    key: "data-management",
    accent: "ember",
    label: "Data Management Track",
    subtitle: "Your one-week sprint hands over:",
    items: [
      {
        icon: "M9 14l2 2 4-4M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2M9 2h6a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z",
        stat: "8",
        statLabel: "disciplines scored",
        name: "AI-Readiness Scorecard",
        desc: "All 8 data disciplines scored for your use case",
      },
      {
        icon: "M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4zM8 2v16M16 6v16",
        stat: "1 wk",
        statLabel: "sprint output",
        name: "Gap Map & Risk Register",
        desc: "The gaps that matter, ranked, with quick wins named",
      },
      {
        icon: "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
        stat: "12–16",
        statLabel: "weeks scoped",
        name: "Proposed Pilot Plan",
        desc: "A scoped 12 or 16 week pilot, ready to mobilize",
      },
    ],
    chip: "Sprint: 1 week · First use-case value: 2–4 months",
  },
  {
    key: "integration-apis",
    accent: "blue",
    label: "Integration & APIs Track",
    subtitle: "Your first engagement delivers:",
    items: [
      {
        icon: "M12 22v-5M9 8V2M15 8V2M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z",
        stat: "3–5",
        statLabel: "systems",
        name: "Systems Connected",
        desc: "ERP, CRM, databases, and legacy platforms wired in",
      },
      {
        icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
        stat: "6–10",
        statLabel: "APIs",
        name: "Action APIs Delivered",
        desc: "Standardized, governed, reusable",
      },
      {
        icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
        stat: "2–3",
        statLabel: "agents",
        name: "Agents in Production",
        desc: "With guardrails, approvals, and full traceability",
      },
    ],
    chip: "Measurable outcomes in 60–90 days",
  },
];

export const WhatToExpect = ({ trackKey = null, showHeader = true }) => {
  const visibleTracks = trackKey ? TRACKS.filter(t => t.key === trackKey) : TRACKS;

  return (
    <section
      id="what-to-expect"
      data-testid="what-to-expect-section"
      className="wte-section"
    >
      <div className="wte-inner">
        {/* HEADER — same style as the Success Metrics version */}
        {showHeader && (
          <motion.div
            className="wte-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45 }}
          >
            <span className="z-pill mb-6 text-lg font-semibold">Measurable Success</span>
            <h2 className="wte-heading">
              What to <span>Expect</span>
            </h2>
            <p className="wte-subtext">
              Proven, measurable outcomes delivered in your first engagement sprint.
            </p>
          </motion.div>
        )}

        {/* TWO TRACK COLUMNS */}
        <div className="wte-grid">
          {visibleTracks.map((track, ti) => (
            <motion.div
              key={track.key}
              className={`wte-track wte-track-${track.accent}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.08 + ti * 0.08 }}
            >
              <span className="wte-track-label">
                <span className="wte-track-dot" />
                {track.label}
              </span>
              <span className={`wte-chip wte-chip-${track.accent}`}>
                {track.chip}
              </span>
              <div className="wte-cards">
                {track.items.map((item) => (
                  <div key={item.name} className="wte-card">
                    <div className="wte-card-top">
                      <div className="wte-icon">
                        <svg viewBox="0 0 24 24">
                          <path d={item.icon} />
                        </svg>
                      </div>
                      <div className="wte-stat-wrap">
                        <span className="wte-stat-num">{item.stat}</span>
                        <span className="wte-stat-label">{item.statLabel}</span>
                      </div>
                    </div>
                    <div className="wte-divider"></div>
                    <p className="wte-card-name">{item.name}</p>
                    <p className="wte-card-desc">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
