import React from "react";

const AgenticAIHero = () => (
  <svg
    viewBox="0 0 1200 480"
    preserveAspectRatio="xMidYMid meet"
    role="img"
    aria-label="Six fragmented systems consolidated into one governed data product with contract, SLA, and owner"
    style={{ display: "block", width: "100%", height: "auto", background: "linear-gradient(135deg, #EEF3FC 0%, #F7EEE8 100%)" }}
  >
    <title>From fragmented systems to a governed data product</title>
    <defs>
      <linearGradient id="ehSky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#2563EB" stopOpacity=".08" />
        <stop offset="1" stopColor="#E8521A" stopOpacity=".05" />
      </linearGradient>
      <radialGradient id="ehAgent" cx=".3" cy=".3" r=".8">
        <stop offset="0" stopColor="#FFF6EC" />
        <stop offset=".5" stopColor="#FF8A3D" />
        <stop offset="1" stopColor="#B83E10" />
      </radialGradient>
      <pattern id="ehDots" width="24" height="24" patternUnits="userSpaceOnUse">
        <circle cx="1.5" cy="1.5" r="1.5" fill="#3D4E6B" fillOpacity=".08" />
      </pattern>
    </defs>
    <rect width="1200" height="480" fill="url(#ehSky)" />
    <rect width="1200" height="480" fill="url(#ehDots)" />

    <g transform="translate(90,90)">
      <text x="0" y="-14" fontFamily="Manrope,sans-serif" fontSize="11" fontWeight="800" letterSpacing="2" fill="#7A8BA8">BEFORE — 6 SYSTEMS OF TRUTH</text>
      <g fontFamily="Manrope,sans-serif" fontSize="11" fontWeight="700">
        <g><rect x="0" y="0" width="120" height="60" rx="10" fill="#fff" stroke="#DCE3EF" strokeWidth="1.5"/><text x="60" y="26" textAnchor="middle" fill="#3D4E6B">Salesforce</text><circle cx="60" cy="42" r="4" fill="#E8521A"/></g>
        <g><rect x="140" y="0" width="120" height="60" rx="10" fill="#fff" stroke="#DCE3EF" strokeWidth="1.5"/><text x="200" y="26" textAnchor="middle" fill="#3D4E6B">SAP</text><circle cx="200" cy="42" r="4" fill="#2563EB"/></g>
        <g><rect x="280" y="0" width="120" height="60" rx="10" fill="#fff" stroke="#DCE3EF" strokeWidth="1.5"/><text x="340" y="26" textAnchor="middle" fill="#3D4E6B">Snowflake</text><circle cx="340" cy="42" r="4" fill="#10b981"/></g>
        <g><rect x="0" y="90" width="120" height="60" rx="10" fill="#fff" stroke="#DCE3EF" strokeWidth="1.5"/><text x="60" y="116" textAnchor="middle" fill="#3D4E6B">Legacy DB</text><circle cx="60" cy="132" r="4" fill="#8B5CF6"/></g>
        <g><rect x="140" y="90" width="120" height="60" rx="10" fill="#fff" stroke="#DCE3EF" strokeWidth="1.5"/><text x="200" y="116" textAnchor="middle" fill="#3D4E6B">Marketing</text><circle cx="200" cy="132" r="4" fill="#F59E0B"/></g>
        <g><rect x="280" y="90" width="120" height="60" rx="10" fill="#fff" stroke="#DCE3EF" strokeWidth="1.5"/><text x="340" y="116" textAnchor="middle" fill="#3D4E6B">Finance</text><circle cx="340" cy="132" r="4" fill="#EC4899"/></g>
      </g>
      <g stroke="#B83E10" strokeWidth="1.2" fill="none" opacity=".35" strokeDasharray="4 3">
        <path d="M60 60 Q100 80 200 60"/>
        <path d="M200 60 Q260 40 340 60"/>
        <path d="M60 90 Q30 60 60 60"/>
        <path d="M340 60 Q380 100 340 90"/>
        <path d="M200 90 Q120 120 60 90"/>
        <path d="M200 90 Q280 120 340 90"/>
      </g>
    </g>

    <g transform="translate(510,230)">
      <line x1="0" y1="0" x2="80" y2="0" stroke="#E8521A" strokeWidth="3" strokeLinecap="round"/>
      <path d="M78 -6 L90 0 L78 6 Z" fill="#E8521A"/>
      <text x="45" y="-14" textAnchor="middle" fontFamily="Manrope,sans-serif" fontSize="10" fontWeight="800" fill="#E8521A" letterSpacing="2">GOVERNANCE</text>
    </g>

    <g transform="translate(700,90)">
      <text x="200" y="-14" textAnchor="middle" fontFamily="Manrope,sans-serif" fontSize="11" fontWeight="800" letterSpacing="2" fill="#7A8BA8">AFTER — 1 CONTRACT, 1 OWNER</text>
      <rect x="0" y="0" width="400" height="240" rx="16" fill="#fff" stroke="#E8521A" strokeOpacity=".25" strokeWidth="2"/>
      <rect x="20" y="20" width="360" height="30" rx="8" fill="#E8521A" fillOpacity=".08"/>
      <text x="200" y="40" textAnchor="middle" fontFamily="Manrope,sans-serif" fontSize="11" fontWeight="800" fill="#B83E10" letterSpacing="1.5">CUSTOMER · DATA PRODUCT · v2.1</text>
      <g fontFamily="Manrope,sans-serif" fontSize="11" fontWeight="600" fill="#3D4E6B">
        <rect x="20" y="66" width="170" height="34" rx="6" fill="#F7FAFF"/><text x="30" y="87">customer_id : uuid</text>
        <rect x="210" y="66" width="170" height="34" rx="6" fill="#F7FAFF"/><text x="220" y="87">email : string</text>
        <rect x="20" y="106" width="170" height="34" rx="6" fill="#F7FAFF"/><text x="30" y="127">segment : enum</text>
        <rect x="210" y="106" width="170" height="34" rx="6" fill="#F7FAFF"/><text x="220" y="127">lifetime_value : $</text>
      </g>
      <g fontFamily="Manrope,sans-serif" fontSize="10" fontWeight="800">
        <rect x="20" y="160" width="80" height="24" rx="12" fill="#10b981" fillOpacity=".15"/><text x="60" y="176" textAnchor="middle" fill="#059669">SLA 99.9%</text>
        <rect x="108" y="160" width="80" height="24" rx="12" fill="#2563EB" fillOpacity=".15"/><text x="148" y="176" textAnchor="middle" fill="#1E40AF">OWNER · P.N.</text>
        <rect x="196" y="160" width="106" height="24" rx="12" fill="#E8521A" fillOpacity=".15"/><text x="249" y="176" textAnchor="middle" fill="#B83E10">AUDITABLE ✓</text>
      </g>
      <g transform="translate(150,200)">
        <line x1="50" y1="0" x2="50" y2="-16" stroke="#E8521A" strokeWidth="1.5" strokeDasharray="3 3"/>
        <circle cx="50" cy="20" r="20" fill="url(#ehAgent)"/>
        <text x="50" y="24" textAnchor="middle" fontFamily="Manrope,sans-serif" fontSize="10" fontWeight="900" fill="#fff">AGENT</text>
      </g>
    </g>

    <g transform="translate(0,420)">
      <rect width="1200" height="60" fill="rgba(8,13,24,0.03)"/>
      <text x="600" y="38" textAnchor="middle" fontFamily="Manrope,sans-serif" fontSize="13" fontWeight="500" fontStyle="italic" fill="#3D4E6B">Fragmented systems → one governed data product → an agent that can be trusted</text>
    </g>
  </svg>
);

const FallbackHero = ({ category }) => (
  <svg viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid meet" role="img" aria-label={`${category} concept illustration`}
       style={{ display: "block", width: "100%", height: "auto", background: "linear-gradient(135deg, #EEF3FC 0%, #F7EEE8 100%)" }}>
    <title>{category}</title>
    <defs>
      <pattern id="fbdot" width="24" height="24" patternUnits="userSpaceOnUse">
        <circle cx="1.5" cy="1.5" r="1.5" fill="#3D4E6B" fillOpacity=".08" />
      </pattern>
    </defs>
    <rect width="1200" height="400" fill="url(#fbdot)" />
    <g transform="translate(600, 200)">
      <circle r="70" fill="#E8521A" />
      <circle r="110" fill="none" stroke="#E8521A" strokeOpacity=".35" strokeDasharray="4 6" />
      <circle r="160" fill="none" stroke="#E8521A" strokeOpacity=".2" strokeDasharray="3 8" />
      <text y="8" textAnchor="middle" fontFamily="Manrope,sans-serif" fontSize="20" fontWeight="900" fill="#fff" letterSpacing="1">
        {category.toUpperCase()}
      </text>
    </g>
  </svg>
);

const EditorialHero = ({ category, slug, heroImage, title }) => {
  if (heroImage) {
    return (
      <img
        src={heroImage}
        alt={title || category}
        className="article-visual__img"
        style={{ display: "block", width: "100%", height: "auto" }}
        loading="eager"
      />
    );
  }
  if (slug === "agentic-ai-needs-data-governance-first") {
    return <AgenticAIHero />;
  }
  return <FallbackHero category={category} />;
};

export default EditorialHero;
