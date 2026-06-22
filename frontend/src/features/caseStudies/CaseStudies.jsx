import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "./CaseStudies.css";

const CASES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
        <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" />
      </svg>
    ),
    industry: "Banking & Financial Services",
    stat: "1.7M",
    statLabel: "columns cataloged in 30 days",
    pillar: "Data Management",
    title: "Enterprise Data Catalog & Runtime Governance",
    challenge: "Siloed data across 28 applications with no enterprise catalog, forcing manual stewardship and blocking governed AI use cases.",
    solution: "Deployed an enterprise data catalog with runtime governance (RBAC, ABAC, PBAC, dynamic masking, row-level security) and agent-based data quality rules under human-in-the-loop review.",
    outcome: "1.7M columns cataloged in 30 days, steward effort cut by 70%. Dozens of governed data products live in 2 weeks; confident, data-driven decisions across all 28 applications.",
    featured: true,
  },
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
    pillar: "Integration",
    title: "Integration Migration @ Scale",
    challenge: "300+ point-to-point integrations on legacy IBM middleware with limited skills and no software support.",
    solution: "Migration to MuleSoft & converting 300+ legacy connections to API-led architecture.",
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
    pillar: "Integration",
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
    pillar: "Integration",
    title: "360 View of Student Record",
    challenge: "Data trapped in disconnected systems causing low visibility into student success and frequent errors.",
    solution: "MuleSoft based integrations unified siloed data into Salesforce Student Success Hub with automated daily delta sync.",
    outcome: "Holistic 360° student view for leadership via actionable dashboards driving institutional growth.",
  },
];


const PILLAR_STYLES = {
  "Data Management": { color: "var(--ember)", bg: "rgba(232,82,26,0.10)", border: "rgba(232,82,26,0.30)" },
  "Integration":     { color: "#60A5FA",      bg: "rgba(59,130,246,0.10)", border: "rgba(59,130,246,0.30)" },
  "Agentic AI":      { color: "#34D399",      bg: "rgba(52,211,153,0.10)", border: "rgba(52,211,153,0.30)" },
};

function PillarBadge({ pillar }) {
  if (!pillar) return null;
  const s = PILLAR_STYLES[pillar] || {};
  return (
    <span className="cs-pillar-badge" style={{ color: s.color, background: s.bg, borderColor: s.border }}>
      {pillar}
    </span>
  );
}

function CaseCard({ data }) {
  return (
    <div className={`cs-card${data.featured ? " cs-card-featured" : ""}`}>
      {/* Top row */}
      <div className="cs-card-top">
        <div className="cs-icon-box">{data.icon}</div>
        <span className="cs-industry">{data.industry}</span>
        <PillarBadge pillar={data.pillar} />
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
          <div className="cs-block-label"><span className="cs-block-dot" />Challenge</div>
          <p className="cs-block-text">{data.challenge}</p>
        </div>
        <div className="cs-block cs-block-s">
          <div className="cs-block-label"><span className="cs-block-dot" />Solution</div>
          <p className="cs-block-text">{data.solution}</p>
        </div>
        <div className="cs-block cs-block-o">
          <div className="cs-block-label"><span className="cs-block-dot" />Outcome</div>
          <p className="cs-block-text">{data.outcome}</p>
        </div>
      </div>
    </div>
  );
}

export const CaseStudies = ({ studies = CASES }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsPerView = 3;

  // Calculate the starting index for the current view
  const startIndex = Math.min(currentIndex, Math.max(0, studies.length - cardsPerView));
  const displayedCards = studies.slice(startIndex, startIndex + cardsPerView);

  const handleNext = () => {
    const newIndex = currentIndex + cardsPerView;
    if (newIndex >= studies.length) {
      setCurrentIndex(0); // Loop back to start
    } else {
      setCurrentIndex(newIndex);
    }
  };

  const handlePrev = () => {
    const newIndex = currentIndex - cardsPerView;
    if (newIndex < 0) {
      setCurrentIndex(Math.max(0, studies.length - cardsPerView)); // Go to last set
    } else {
      setCurrentIndex(newIndex);
    }
  };

  return (
    <section className="cs-wrap" id="case-studies">
      <div className="cs-pin">
        <div className="cs-inner">

          {/* Header */}
          <div className="cs-header">
            <span className="z-pill mb-6 text-lg font-semibold">Zentiti in action</span>
            <h2 className="cs-heading">
              Case <span className="cs-heading-accent">Studies</span>
            </h2>
            <p className="cs-subtext">
              Real-world solutions delivering tangible business outcomes across industries.
            </p>
          </div>

          {/* 1x3 Grid Layout */}
          <div className="cs-grid-container">
            <div className="cs-grid">
              {displayedCards.map((c) => (
                <div key={c.title} className="cs-grid-item">
                  <CaseCard data={c} />
                </div>
              ))}
            </div>

            {/* Navigation Controls */}
            <div className="cs-nav-controls">
              <button
                onClick={handlePrev}
                className="cs-nav-btn cs-nav-prev"
                aria-label="Previous cases"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </button>
              <button
                onClick={handleNext}
                className="cs-nav-btn cs-nav-next"
                aria-label="Next cases"
              >
                Next
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
