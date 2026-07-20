import React from "react";

const VISUALS = {
  "Agentic AI": (
    <svg viewBox="0 0 400 160" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Orbital agent nodes">
      <title>Orbital agent nodes</title>
      <defs>
        <radialGradient id="bcv-agentic-core"><stop offset="0" stopColor="#FFB07A" /><stop offset="1" stopColor="#E8521A" /></radialGradient>
      </defs>
      <circle cx="200" cy="80" r="24" fill="url(#bcv-agentic-core)" />
      <circle cx="200" cy="80" r="42" fill="none" stroke="#E8521A" strokeOpacity=".35" strokeDasharray="3 4" />
      <circle cx="200" cy="80" r="64" fill="none" stroke="#E8521A" strokeOpacity=".2" strokeDasharray="2 6" />
      <circle cx="200" cy="80" r="86" fill="none" stroke="#E8521A" strokeOpacity=".12" strokeDasharray="2 8" />
      <g fill="#2563EB">
        <circle cx="242" cy="80" r="6" />
        <circle cx="158" cy="80" r="6" />
        <circle cx="264" cy="80" r="4" />
        <circle cx="136" cy="80" r="4" />
      </g>
    </svg>
  ),
  Integration: (
    <svg viewBox="0 0 400 160" preserveAspectRatio="xMidYMid slice" role="img" aria-label="API mesh with central hub">
      <title>API mesh with central hub</title>
      <g stroke="#2563EB" strokeOpacity=".2" strokeWidth="1" fill="none">
        <line x1="80" y1="50" x2="200" y2="80" /><line x1="200" y1="80" x2="320" y2="50" />
        <line x1="80" y1="110" x2="200" y2="80" /><line x1="200" y1="80" x2="320" y2="110" />
      </g>
      <g stroke="#E8521A" strokeWidth="1.5" fill="none" strokeDasharray="5 4">
        <line x1="80" y1="50" x2="200" y2="80" /><line x1="200" y1="80" x2="320" y2="110" />
      </g>
      <g fill="#fff" stroke="#2563EB" strokeWidth="2">
        <rect x="60" y="38" width="40" height="24" rx="4" />
        <rect x="300" y="38" width="40" height="24" rx="4" />
        <rect x="60" y="98" width="40" height="24" rx="4" />
        <rect x="300" y="98" width="40" height="24" rx="4" />
      </g>
      <rect x="176" y="60" width="48" height="40" rx="6" fill="#E8521A" />
      <text x="200" y="85" textAnchor="middle" fill="#fff" fontFamily="Manrope, sans-serif" fontSize="10" fontWeight="800">HUB</text>
    </svg>
  ),
  MuleSoft: (
    <svg viewBox="0 0 400 160" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Hub and spoke integration">
      <title>Hub and spoke integration</title>
      <g stroke="#3D4E6B" strokeOpacity=".25" strokeWidth="1" fill="none">
        <line x1="200" y1="80" x2="120" y2="40" /><line x1="200" y1="80" x2="280" y2="40" />
        <line x1="200" y1="80" x2="120" y2="120" /><line x1="200" y1="80" x2="280" y2="120" />
        <line x1="200" y1="80" x2="80" y2="80" /><line x1="200" y1="80" x2="320" y2="80" />
      </g>
      <g fill="#fff" stroke="#E8521A" strokeWidth="2">
        <circle cx="120" cy="40" r="9" /><circle cx="280" cy="40" r="9" />
        <circle cx="120" cy="120" r="9" /><circle cx="280" cy="120" r="9" />
        <circle cx="80" cy="80" r="9" /><circle cx="320" cy="80" r="9" />
      </g>
      <circle cx="200" cy="80" r="24" fill="#E8521A" />
      <text x="200" y="84" textAnchor="middle" fill="#fff" fontFamily="Manrope, sans-serif" fontSize="9" fontWeight="800">COE</text>
    </svg>
  ),
  "Data Strategy": (
    <svg viewBox="0 0 400 160" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Layered data products">
      <title>Layered data products</title>
      <ellipse cx="200" cy="42" rx="90" ry="12" fill="#2563EB" opacity=".9" />
      <ellipse cx="200" cy="72" rx="90" ry="12" fill="#2563EB" opacity=".65" />
      <ellipse cx="200" cy="102" rx="90" ry="12" fill="#2563EB" opacity=".4" />
      <ellipse cx="200" cy="132" rx="90" ry="12" fill="#2563EB" opacity=".2" />
      <g fill="#E8521A">
        <circle cx="160" cy="20" r="3" /><circle cx="200" cy="14" r="3" /><circle cx="240" cy="20" r="3" />
      </g>
    </svg>
  ),
  Company: (
    <svg viewBox="0 0 400 160" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Zentiti company milestone">
      <title>Zentiti company milestone</title>
      <defs>
        <linearGradient id="bcv-company-glow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#E8521A" stopOpacity=".85" />
          <stop offset="1" stopColor="#B83E10" />
        </linearGradient>
      </defs>
      <g stroke="#2563EB" strokeOpacity=".25" strokeWidth="1.2" fill="none" strokeDasharray="4 4">
        <line x1="60" y1="80" x2="340" y2="80" />
      </g>
      <g>
        <circle cx="90" cy="80" r="8" fill="#2563EB" opacity=".6" />
        <circle cx="160" cy="80" r="10" fill="#2563EB" opacity=".8" />
        <circle cx="240" cy="80" r="12" fill="url(#bcv-company-glow)" />
        <circle cx="310" cy="80" r="14" fill="#E8521A" />
        <circle cx="310" cy="80" r="22" fill="none" stroke="#E8521A" strokeOpacity=".35" />
      </g>
      <g fontFamily="Manrope, sans-serif" fontSize="9" fontWeight="700" fill="#7A8BA8">
        <text x="90" y="108" textAnchor="middle">idea</text>
        <text x="160" y="108" textAnchor="middle">build</text>
        <text x="240" y="108" textAnchor="middle">finale</text>
        <text x="310" y="108" textAnchor="middle" fill="#E8521A">win</text>
      </g>
    </svg>
  ),
  Staffing: (
    <svg viewBox="0 0 400 160" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Team with lead specialist">
      <title>Team with lead specialist</title>
      <circle cx="130" cy="66" r="16" fill="#2563EB" opacity=".7" />
      <path d="M110 118 Q110 84 130 84 Q150 84 150 118 Z" fill="#2563EB" opacity=".7" />
      <circle cx="270" cy="66" r="16" fill="#2563EB" opacity=".7" />
      <path d="M250 118 Q250 84 270 84 Q290 84 290 118 Z" fill="#2563EB" opacity=".7" />
      <circle cx="200" cy="56" r="20" fill="#E8521A" />
      <path d="M175 122 Q175 82 200 82 Q225 82 225 122 Z" fill="#E8521A" />
      <circle cx="200" cy="56" r="30" fill="none" stroke="#E8521A" strokeOpacity=".3" strokeWidth="1.5" />
    </svg>
  ),
};

export const BlogCardVisual = ({ category }) => {
  const visual = VISUALS[category] || VISUALS["Agentic AI"];
  return (
    <div style={{ position: "absolute", inset: 0 }} aria-hidden="true">
      {visual}
    </div>
  );
};
