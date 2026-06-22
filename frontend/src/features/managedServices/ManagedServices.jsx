import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Database, Network, ClipboardCheck, Layers, ShieldCheck, Bot,
  Shield, Cloud, Code2, Rocket, Sparkles, ArrowRight, ArrowLeftRight,
  CheckCircle2, Zap,
} from "lucide-react";
import { ContactModal } from "@/components/ContactModal";
import "./ManagedServices.css";

const LEFT_CARDS = [
  { Icon: ClipboardCheck, title: "Data & AI Readiness Assessment", desc: "One-week diagnostic across the 8 disciplines. Scorecard, gap map, and a 90-day plan with named first wins." },
  { Icon: Layers, title: "Data Foundation Modernization", desc: "Cataloging, semantic grounding, and data products with contracts and SLOs, built for AI consumption." },
  { Icon: ShieldCheck, title: "Active Governance & Lineage", desc: "Governance from documentation to runtime. End-to-end lineage including the AI hop. Default-deny guardrails." },
  { Icon: Bot, title: "AI Workforce & Orchestration", desc: "Specialist agents from our AI Foundry: catalog, classify, fill lineage gaps, with policy and a human in the loop." },
];

const RIGHT_CARDS = [
  { Icon: Shield, title: "API Strategy & Governance", desc: "End-to-end API operating models: design standards, lifecycle, security, and consumption-ready governance." },
  { Icon: Cloud, title: "Multi-Platform Engineering", desc: "Certified delivery across on-prem and cloud-native platforms, engineered for performance and TCO." },
  { Icon: Code2, title: "API-Led & Event-Driven Architecture", desc: "Composable APIs, event streams, and patterns that enable real-time data flow and decoupling." },
  { Icon: Rocket, title: "Modernization & Accelerators", desc: "Reusable assets and frameworks that accelerate legacy modernization." },
];

/* ── SVG Logo Marks ── */
const CollibraMark = ({ color }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M4 12c0-4.4 3.6-8 8-8 2 0 3.8.7 5.2 1.9" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M20 12c0 4.4-3.6 8-8 8-2 0-3.8-.7-5.2-1.9" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <circle cx="12" cy="12" r="2.2" fill={color} />
  </svg>
);
const AlationMark = ({ color }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M3 19 L9 5 L12 12" stroke={color} strokeWidth="2" strokeLinejoin="round" />
    <path d="M21 19 L15 5 L12 12" stroke={color} strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const AttlanMark = ({ color }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <text x="3" y="19" fontSize="20" fontWeight="800" fill={color} fontFamily="Inter, sans-serif">A</text>
  </svg>
);
const InformaticaMark = ({ color }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M12 3 L20 12 L12 21 L4 12 Z" fill={color} opacity="0.85" />
  </svg>
);
const SnowflakeMark = ({ color }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round">
    <path d="M12 3v18M3 12h18M5.5 5.5l13 13M18.5 5.5l-13 13" />
  </svg>
);
const DatabricksMark = ({ color }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M4 8 L12 4 L20 8 L12 12 Z" fill={color} opacity="0.9" />
    <path d="M4 14 L12 10 L20 14 L12 18 Z" fill={color} opacity="0.6" />
  </svg>
);
const RightDataMark = () => (
  <svg width="22" height="22" viewBox="0 0 16 16" fill="none">
    <path fillRule="evenodd" clipRule="evenodd" d="M4.5874 1.5L7.48783 4.39572V11.6042L4.5874 14.5L3.88169 13.7931L6.48902 11.19V4.80993L3.88169 2.20686L4.5874 1.5ZM9.47868 4.80994L12.086 2.20687L11.3803 1.50001L8.47983 4.39574V11.6043L11.3803 14.5L12.086 13.7931L9.47868 11.1901V4.80994ZM3.18738 2.88068L5.73647 5.26488V10.7213L3.19247 13.1686L2.5 12.4488L4.73764 10.2962V5.69832L2.50509 3.61016L3.18738 2.88068ZM11.2301 5.69832L13.4626 3.61017L12.7803 2.88069L10.2312 5.26491V10.7213L12.7752 13.1686L13.4677 12.4488L11.2301 10.2962V5.69832Z" fill="url(#rdg)" />
    <defs>
      <linearGradient id="rdg" x1="10" y1="16" x2="-4" y2="-5" gradientUnits="userSpaceOnUse">
        <stop stopColor="#DADFF8" />
        <stop offset="0.35" stopColor="#968CFE" />
        <stop offset="1" stopColor="#5A7FD6" />
      </linearGradient>
    </defs>
  </svg>
);
const MuleSoftMark = ({ color }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" />
    <path d="M8 16 V10 L12 14 L16 10 V16" stroke={color} strokeWidth="2" fill="none" strokeLinejoin="round" />
  </svg>
);
const BoomiMark = ({ color }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" fill={color} />
    <text x="7.5" y="17" fontSize="13" fontWeight="800" fill="#fff" fontFamily="Inter, sans-serif">b</text>
  </svg>
);
const ApigeeMark = ({ color }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M5 18 C 7 8, 17 8, 19 18" stroke={color} strokeWidth="2.2" fill="none" strokeLinecap="round" />
    <circle cx="12" cy="13" r="2" fill={color} />
  </svg>
);
const KongMark = ({ color }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M6 20 L12 8 L18 20 Z" stroke={color} strokeWidth="2" strokeLinejoin="round" fill="none" />
    <circle cx="12" cy="6" r="2" fill={color} />
  </svg>
);
const WorkatoMark = ({ color }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
    <path d="M3 8 L7 18 L10 11 L13 18 L16 11 L19 18 L23 8" />
  </svg>
);

const DATA_LOGOS = [
  { name: "Collibra", color: "#2ec27e", Mark: CollibraMark },
  { name: "Alation", color: "#ff6a3a", Mark: AlationMark },
  { name: "Atlan", color: "#3a6cff", Mark: AttlanMark },
  { name: "Informatica", color: "#ff7a2a", Mark: InformaticaMark },
  { name: "Snowflake", color: "#29b5e8", Mark: SnowflakeMark },
  { name: "Databricks", color: "#ff4d2e", Mark: DatabricksMark },
  { name: "RightData", color: "#7B5FFF", Mark: RightDataMark },
];

const INT_LOGOS = [
  { name: "MuleSoft", color: "#3a6cff", Mark: MuleSoftMark },
  { name: "Boomi", color: "#1a1a1a", Mark: BoomiMark },
  { name: "Apigee", color: "#ff5a2c", Mark: ApigeeMark },
  { name: "Kong", color: "#1abc9c", Mark: KongMark },
  { name: "Workato", color: "#7c5cff", Mark: WorkatoMark },
];

/* ── Components ── */

const FeatureCard = React.forwardRef(({ Icon, title, desc, accent }, ref) => {
  const isBlue = accent === "blue";
  return (
    <div ref={ref} className={`tf2-card ${isBlue ? "tf2-card-blue" : "tf2-card-purple"}`}>
      <div className="tf2-card-inner">
        <div className={`tf2-card-icon ${isBlue ? "tf2-icon-blue" : "tf2-icon-purple"}`}>
          <Icon className={`tf2-icon-svg ${isBlue ? "tf2-svg-blue" : "tf2-svg-purple"}`} strokeWidth={1.6} />
        </div>
        <div className="tf2-card-text">
          <h3 className="tf2-card-title">{title}</h3>
          <p className="tf2-card-desc">{desc}</p>
        </div>
      </div>
    </div>
  );
});

const ColumnHeader = ({ Icon, title, subtitle, accent }) => {
  const isBlue = accent === "blue";
  return (
    <div className="tf2-col-header">
      <div className={`tf2-col-icon ${isBlue ? "tf2-colicon-blue" : "tf2-colicon-purple"}`}>
        <Icon className={`tf2-colicon-svg ${isBlue ? "tf2-svg-blue" : "tf2-svg-purple"}`} strokeWidth={1.6} />
      </div>
      <div>
        <h2 className={`tf2-col-title ${isBlue ? "tf2-title-blue" : "tf2-title-purple"}`}>{title}</h2>
        <p className="tf2-col-subtitle">{subtitle}</p>
      </div>
    </div>
  );
};

const CenterCore = React.forwardRef((_, ref) => (
  <div className="tf2-core-wrap">
    <div className="tf2-core-halo" />
    <div className="tf2-core-glow tf2-center-pulse" />
    <div ref={ref} className="tf2-core-ellipse">
      <Sparkles className="tf2-core-sparkle" strokeWidth={1.5} />
      <div className="tf2-core-label">ONE OUTCOME</div>
      <div className="tf2-core-heading">AI-READY<br />ENTERPRISE</div>
      <div className="tf2-core-list">
        {[{ I: CheckCircle2, l: "Trusted Data" }, { I: CheckCircle2, l: "Connected Systems" }, { I: Zap, l: "AI Workforce" }, { I: ShieldCheck, l: "Continuous Innovation" }].map(({ I, l }) => (
          <div key={l} className="tf2-core-row"><I className="tf2-core-row-icon" strokeWidth={2} /><span>{l}</span></div>
        ))}
      </div>
    </div>
  </div>
));

function useDarkMode() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"));
  useEffect(() => {
    const obs = new MutationObserver(() => setDark(document.documentElement.classList.contains("dark")));
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);
  return dark;
}

/* Draws all SVG lines imperatively via createElementNS to bypass browser-extension
   span injection that breaks SVG rendering for React map() output. */
const ConnectionLines = ({ containerRef, leftCardRefs, rightCardRefs, centerRef }) => {
  const svgRef = useRef(null);
  const isDark = useDarkMode();

  useEffect(() => {
    const ns = "http://www.w3.org/2000/svg";
    const mk = (tag, attrs = {}) => {
      const e = document.createElementNS(ns, tag);
      for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, String(v));
      return e;
    };

    const blueColor = isDark ? "#7aa8ff" : "#2E75B6";
    const purpleColor = isDark ? "#c79bff" : "#7C3AED";
    const lineOpacity = isDark ? 0.9 : 0.65;
    const dotOpacity = isDark ? 0.9 : 0.7;

    const draw = () => {
      const svg = svgRef.current;
      const container = containerRef?.current;
      const center = centerRef?.current;
      if (!svg || !container || !center) return;

      while (svg.firstChild) svg.removeChild(svg.firstChild);

      const defs = mk("defs");
      const mkGrad = (id, x1, x2, color) => {
        const g = mk("linearGradient", { id, x1, y1: 0, x2, y2: 0 });
        [[0, 0.05], [0.5, 0.6], [1, 1]].forEach(([off, op]) => {
          g.appendChild(mk("stop", { offset: `${off * 100}%`, "stop-color": color, "stop-opacity": op }));
        });
        return g;
      };
      defs.appendChild(mkGrad("tf2BlueGrad", 0, 1, blueColor));
      defs.appendChild(mkGrad("tf2PurpleGrad", 1, 0, purpleColor));
      svg.appendChild(defs);

      const cR = container.getBoundingClientRect();
      const eR = center.getBoundingClientRect();
      const ecx = eR.left + eR.width / 2 - cR.left;
      const ecy = eR.top + eR.height / 2 - cR.top;
      const erx = eR.width / 2;
      const lh = { x: ecx - erx, y: ecy };
      const rh = { x: ecx + erx, y: ecy };

      const pts = (refs, hub, side) => (refs?.current || []).map((ref) => {
        if (!ref) return null;
        const r = ref.getBoundingClientRect();
        const sx = side === "left" ? r.right - cR.left : r.left - cR.left;
        const sy = r.top + r.height / 2 - cR.top;
        const dist = Math.abs(sx - hub.x);
        return {
          sx, sy,
          cp1x: side === "left" ? sx + dist * 0.4 : sx - dist * 0.4, cp1y: sy,
          cp2x: side === "left" ? hub.x - dist * 0.15 : hub.x + dist * 0.15, cp2y: hub.y,
        };
      }).filter(Boolean);

      const add = (e) => svg.appendChild(e);

      const drawGroup = (points, hub, gradId, color, dashArray, dashDur) => {
        points.forEach(p => {
          const d = `M ${p.sx} ${p.sy} C ${p.cp1x} ${p.cp1y}, ${p.cp2x} ${p.cp2y}, ${hub.x} ${hub.y}`;
          add(mk("path", { d, stroke: `url(#${gradId})`, "stroke-width": 2, fill: "none", opacity: lineOpacity }));
          const dp = mk("path", { d, stroke: color, "stroke-width": 1.2, fill: "none", opacity: lineOpacity * 0.7 });
          dp.style.strokeDasharray = dashArray;
          dp.style.animation = `tf2-dash-flow ${dashDur}s linear infinite`;
          add(dp);
          // Card-side dots: no expensive blur filter
          add(mk("circle", { cx: p.sx, cy: p.sy, r: 3.5, fill: color, opacity: dotOpacity }));
          add(mk("circle", { cx: p.sx, cy: p.sy, r: 8, fill: color, opacity: 0.12 }));
        });
        // Hub dots: layered circles simulate glow without expensive SVG filter
        add(mk("circle", { cx: hub.x, cy: hub.y, r: 18, fill: color, opacity: 0.06 }));
        add(mk("circle", { cx: hub.x, cy: hub.y, r: 11, fill: color, opacity: 0.13 }));
        add(mk("circle", { cx: hub.x, cy: hub.y, r: 4.5, fill: color, opacity: dotOpacity }));
      };

      drawGroup(pts(leftCardRefs, lh, "left"), lh, "tf2BlueGrad", blueColor, "4 6", 6);
      drawGroup(pts(rightCardRefs, rh, "right"), rh, "tf2PurpleGrad", purpleColor, "3 8", 9);
    };

    let resizeTimer;
    const onResize = () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(draw, 150); };

    const t = setTimeout(draw, 120);
    window.addEventListener("resize", onResize);
    return () => { clearTimeout(t); clearTimeout(resizeTimer); window.removeEventListener("resize", onResize); };
  }, [containerRef, leftCardRefs, rightCardRefs, centerRef, isDark]);

  return <svg ref={svgRef} className="tf2-lines-svg" aria-hidden />;
};

const LogoChip = ({ name, color, Mark }) => (
  <div className="tf2-logo-chip">
    <Mark color={color} />
    <span className="tf2-logo-name">{name}</span>
  </div>
);

const EcoPanel = ({ items, label, color, extraChip, className }) => {
  const row1 = items.slice(0, 4);
  const row2 = items.slice(4);
  return (
    <div className={`tf2-eco-panel${className ? ` ${className}` : ''}`}>
      <div className="tf2-eco-items">
        <div className="tf2-eco-items-row">
          {row1.map((it) => <LogoChip key={it.name} {...it} />)}
        </div>
        <div className="tf2-eco-items-row">
          {row2.map((it) => <LogoChip key={it.name} {...it} />)}
          {extraChip}
        </div>
      </div>
      <div className="tf2-eco-divider">
        <span className="tf2-eco-line" style={{ background: `linear-gradient(90deg, transparent, ${color}55, transparent)` }} />
        <span className="tf2-eco-label" style={{ color }}>{label}</span>
        <span className="tf2-eco-line" style={{ background: `linear-gradient(90deg, transparent, ${color}55, transparent)` }} />
      </div>
    </div>
  );
};

export const ManagedServices = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const panelRef = useRef(null);
  const centerRef = useRef(null);
  const leftCardRefs = useRef([]);
  const rightCardRefs = useRef([]);

  return (
    <>
      <section className="tf2-section">
        <div className="tf2-ambient" aria-hidden />
        <div className="tf2-inner">
          <div className="tf2-badge">
            MANAGED SERVICES
          </div>

          <h1 className="tf2-heading">
            Two Foundations. <span className="tf2-heading-accent">One Outcome.</span>
          </h1>
          <p className="tf2-subheading">
            Trusted data and connected systems, engineered so AI agents can put both to work.
          </p>

          <div ref={panelRef} className="tf2-panel">
            <ConnectionLines containerRef={panelRef} leftCardRefs={leftCardRefs} rightCardRefs={rightCardRefs} centerRef={centerRef} />

            <div className="tf2-grid">
              <div className="tf2-col">
                <ColumnHeader Icon={Database} title="DATA MANAGEMENT" subtitle="Data as a product. Governance as runtime control." accent="blue" />
                <div className="tf2-cards">
                  {LEFT_CARDS.map((c, i) => <FeatureCard key={i} ref={(el) => { leftCardRefs.current[i] = el; }} {...c} accent="blue" />)}
                </div>
              </div>

              <div className="tf2-center">
                <div className="tf2-center-spacer" aria-hidden />
                <div className="tf2-center-body">
                  <CenterCore ref={centerRef} />
                </div>
              </div>

              <div className="tf2-col">
                <ColumnHeader Icon={Network} title="INTEGRATION & APIS" subtitle="API-led. Event-driven. Platform-agnostic." accent="purple" />
                <div className="tf2-cards">
                  {RIGHT_CARDS.map((c, i) => <FeatureCard key={i} ref={(el) => { rightCardRefs.current[i] = el; }} {...c} accent="purple" />)}
                </div>
              </div>
            </div>
          </div>

          <div className="tf2-eco-section">
            <h3 className="tf2-eco-title">OUR TECHNOLOGY ECOSYSTEM (REPRESENTATIVE)</h3>
            <div className="tf2-eco-row">
              <EcoPanel items={DATA_LOGOS} label="DATA ECOSYSTEM" color="#5b9bff" />
              <div className="tf2-eco-bridge">
                <div className="tf2-eco-bridge-circle">
                  <ArrowLeftRight className="tf2-eco-bridge-icon" strokeWidth={2} />
                </div>
              </div>
              <EcoPanel
                items={INT_LOGOS}
                label="INTEGRATION ECOSYSTEM"
                color="#b48cff"
                className="tf2-eco-integration"
                extraChip={
                  <div className="tf2-logo-chip tf2-agent-chip">
                    <Bot width={22} height={22} strokeWidth={1.6} style={{ color: "#b48cff" }} />
                    <span className="tf2-logo-name">Custom Agents</span>
                  </div>
                }
              />
            </div>
          </div>

          <div className="tf2-cta-wrap">
            <button type="button" className="tf2-cta" onClick={() => setModalOpen(true)}>
              Learn More
              <ArrowRight className="tf2-cta-arrow" strokeWidth={2.4} />
            </button>
          </div>
        </div>
      </section>

      <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};
