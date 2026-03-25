import { useState, useEffect, useRef } from "react";

// ─── DATA ────────────────────────────────────────────────────────
const STEPS = [
  {
    num: "01", title: "Discover", sub: "Assess systems & priorities",
    desc: "Map your integration landscape and identify the highest-impact opportunities to address first.",
    color: "#4A90D9",
  },
  {
    num: "02", title: "Connect", sub: "Build integration flows & APIs",
    desc: "Wire ERP, CRM, databases, and legacy platforms into a secure, reliable integration layer.",
    color: "#4A8FC8",
  },
  {
    num: "03", title: "Make Actionable", sub: "Deliver governed Action APIs",
    desc: "Create Order · Approve Refund · Check Eligibility · Trigger Notification — standardized, governed, reusable.",
    color: "#D94C1A", highlight: true,
  },
  {
    num: "04", title: "Deploy Agents", sub: "Agents with guardrails & audit",
    desc: "AI agents invoke your Action APIs to execute real business outcomes with approvals and full traceability.",
    color: "#1B8A6B",
  },
  {
    num: "05", title: "Operate & Iterate", sub: "Sustain, scale & optimize",
    desc: "Monitor outcomes, resolve failures fast, and continuously evolve your integration ecosystem.",
    color: "#7C5CBF",
  },
];

// ─── ORANGE PALETTE (single source of truth) ─────────────────────
const O = {
  solid:       "#D94C1A",
  bright:      "#FF6B35",
  trail:       "#B03A12",
  glow10:      "rgba(217,76,26,0.10)",
  glow15:      "rgba(217,76,26,0.15)",
  glow18:      "rgba(217,76,26,0.18)",
  glow22:      "rgba(217,76,26,0.22)",
  glow45:      "rgba(217,76,26,0.45)",
  gradCard:    "linear-gradient(135deg,#D94C1A,#F26230)",
  gradBar:     "linear-gradient(90deg,#D94C1A,#FF8C5A,#D94C1A)",
};

// ─── ARROW ───────────────────────────────────────────────────────
function Arrow({ lit, id }) {
  const W = 88, CY = 20;
  const X1 = 4, X2 = W - 20;
  const LEN = X2 - X1;
  const pathD = `M ${X1},${CY} L ${X2},${CY}`;

  return (
    <svg
      width={W} height={40}
      viewBox={`0 0 ${W} 40`}
      style={{ display:"block", marginTop:"44px", flexShrink:0, overflow:"visible" }}
    >
      <defs>
        {/* line glow */}
        <filter id={`gl${id}`} x="-60%" y="-200%" width="220%" height="500%">
          <feGaussianBlur stdDeviation="2.5" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        {/* dot glow — stronger */}
        <filter id={`gd${id}`} x="-120%" y="-120%" width="340%" height="340%">
          <feGaussianBlur stdDeviation="3.5" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        {/* clip so dots never escape the line bounds */}
        <clipPath id={`cl${id}`}>
          <rect x={X1 - 2} y={CY - 12} width={LEN + 4} height={24}/>
        </clipPath>
        {/* orange gradient for the line fill */}
        <linearGradient id={`lg${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor={O.solid}/>
          <stop offset="100%" stopColor={O.bright}/>
        </linearGradient>
        {/* hidden motion path */}
        <path id={`mp${id}`} d={pathD} fill="none" stroke="none"/>
      </defs>

      {/* ── dim track (always visible) ── */}
      <line
        x1={X1} y1={CY} x2={X2} y2={CY}
        stroke="rgba(255,255,255,0.07)" strokeWidth="1.5" strokeLinecap="round"
      />
      {/* dim arrowhead */}
      <polygon
        points={`${W-2},${CY} ${W-16},${CY-6} ${W-16},${CY+6}`}
        fill="rgba(255,255,255,0.06)"
      />

      {lit && (
        <>
          {/* ── filled gradient line — draws in left→right ── */}
          <line
            x1={X1} y1={CY} x2={X2} y2={CY}
            stroke={`url(#lg${id})`}
            strokeWidth="2.5"
            strokeLinecap="round"
            filter={`url(#gl${id})`}
            style={{
              strokeDasharray:  LEN,
              strokeDashoffset: LEN,
              animation: `drawLine${id} 0.55s cubic-bezier(0.4,0,0.2,1) forwards`,
            }}
          />

          {/* ── arrowhead pops in after line finishes ── */}
          <polygon
            points={`${W-2},${CY} ${W-16},${CY-6} ${W-16},${CY+6}`}
            fill={O.bright}
            filter={`url(#gl${id})`}
            style={{ animation:`arrowPop${id} 0.22s ease 0.5s both` }}
          />

          {/* ── lead dot (brightest, largest) ── */}
          <circle r="5" fill={O.bright} filter={`url(#gd${id})`} clipPath={`url(#cl${id})`}>
            <animateMotion dur="1.2s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1">
              <mpath xlinkHref={`#mp${id}`}/>
            </animateMotion>
          </circle>

          {/* ── mid trail dot ── */}
          <circle r="3" fill={O.solid} opacity="0.75" filter={`url(#gl${id})`} clipPath={`url(#cl${id})`}>
            <animateMotion dur="1.2s" repeatCount="indefinite" begin="0.09s" calcMode="spline" keySplines="0.42 0 0.58 1">
              <mpath xlinkHref={`#mp${id}`}/>
            </animateMotion>
          </circle>

          {/* ── tail dot (faintest) ── */}
          <circle r="1.8" fill={O.trail} opacity="0.38" clipPath={`url(#cl${id})`}>
            <animateMotion dur="1.2s" repeatCount="indefinite" begin="0.18s">
              <mpath xlinkHref={`#mp${id}`}/>
            </animateMotion>
          </circle>
        </>
      )}

      <style>{`
        @keyframes drawLine${id} { to { stroke-dashoffset: 0; } }
        @keyframes arrowPop${id} {
          from { opacity:0; transform:scale(0.3); }
          to   { opacity:1; transform:scale(1); }
        }
      `}</style>
    </svg>
  );
}

// ─── CARD ─────────────────────────────────────────────────────────
function Card({ step, active, onClick, delay }) {
  const hl = !!step.highlight;

  // number bubble
  const bubbleBg     = active || hl ? O.gradCard           : "rgba(255,255,255,0.05)";
  const bubbleBorder = active || hl ? O.solid              : "rgba(255,255,255,0.10)";
  const bubbleShadow = active || hl
    ? `0 0 0 4px ${O.glow18}, 0 0 20px ${O.glow45}` 
    : "none";

  // card body
  const cardBg = active
    ? hl ? O.glow15       : "rgba(255,255,255,0.08)"
    : hl ? O.glow10       : "rgba(255,255,255,0.03)";

  const cardBorder = active
    ? hl ? O.solid        : "rgba(255,255,255,0.20)"
    : hl ? `rgba(217,76,26,0.30)` : "rgba(255,255,255,0.07)";

  const cardShadow = active
    ? hl
      ? `0 20px 52px ${O.glow22}, 0 6px 20px rgba(0,0,0,0.45)` 
      : "0 20px 52px rgba(0,0,0,0.40)"
    : `0 3px 14px rgba(0,0,0,0.22)`;

  // icon swatch
  const swatchBg = hl
    ? O.gradCard
    : `${step.color}1A`;
  const swatchBorder = hl ? O.solid : `${step.color}33`;

  return (
    <div
      onClick={onClick}
      style={{
        flex:1, minWidth:0, cursor:"pointer",
        opacity:0,
        animation:`fadeUp 0.5s ${delay}s ease forwards`,
      }}
    >
      {/* ── number bubble ── */}
      <div style={{ display:"flex", justifyContent:"center", marginBottom:"12px" }}>
        <div style={{
          width:"38px", height:"38px", borderRadius:"50%",
          background:  bubbleBg,
          border:      `2px solid ${bubbleBorder}`,
          display:"flex", alignItems:"center", justifyContent:"center",
          fontSize:"0.7rem", fontWeight:"800", color:"#fff",
          transition:"all 0.4s ease",
          boxShadow:   bubbleShadow,
        }}>
          {step.num}
        </div>
      </div>

      {/* ── card body ── */}
      <div style={{
        borderRadius:"16px", padding:"20px 14px 22px",
        background:  cardBg,
        border:      `1.5px solid ${cardBorder}`,
        boxShadow:   cardShadow,
        transition:  "all 0.38s cubic-bezier(0.4,0,0.2,1)",
        transform:   active ? "translateY(-7px)" : "translateY(0)",
        position:"relative", overflow:"hidden",
        textAlign:"center",
      }}>

        {/* shimmer on active */}
        {active && (
          <div style={{
            position:"absolute", inset:0, pointerEvents:"none",
            background:"linear-gradient(105deg,transparent 35%,rgba(255,255,255,0.04) 50%,transparent 65%)",
            animation:"shimmer 2.4s ease infinite",
          }}/>
        )}

        {/* ── icon swatch ── */}
        <div style={{
          width:"44px", height:"44px", borderRadius:"12px", margin:"0 auto 14px",
          background:  swatchBg,
          border:      `1px solid ${swatchBorder}`,
          display:"flex", alignItems:"center", justifyContent:"center",
          fontSize:"1.3rem",
          boxShadow: hl ? `0 4px 18px ${O.glow22}` : "none",
          transition:"all 0.38s ease",
        }}>
          {hl ? "⚡" : <div style={{ width:18, height:18, borderRadius:4, background:`${step.color}44` }}/>}
        </div>

        {/* ── title ── */}
        <div style={{
          fontSize:"0.92rem", fontWeight:"800", letterSpacing:"-0.02em",
          color: hl ? O.bright : "#fff",
          marginBottom:"5px", lineHeight:1.2,
          transition:"color 0.3s ease",
        }}>
          {step.title}
        </div>

        {/* ── subtitle ── */}
        <div style={{
          fontSize:"0.7rem", color:"rgba(255,255,255,0.38)",
          fontStyle:"italic", lineHeight:1.5,
          marginBottom: active ? "12px" : 0,
          transition:"margin 0.3s ease",
        }}>
          {step.sub}
        </div>

        {/* ── expanded description ── */}
        <div style={{
          fontSize:"0.78rem", color:"rgba(255,255,255,0.58)",
          lineHeight:1.7, overflow:"hidden",
          maxHeight: active ? "90px" : "0",
          opacity:   active ? 1 : 0,
          transition:"max-height 0.42s ease, opacity 0.32s ease",
        }}>
          {step.desc}
        </div>

        {/* ── orange bottom bar (always on highlight, glows on active) ── */}
        {hl && (
          <div style={{
            position:"absolute", bottom:0, left:0, right:0, height:"3px",
            background:     O.gradBar,
            backgroundSize: "200%",
            animation:      "gradShift 2s linear infinite",
            boxShadow:      active ? `0 0 12px ${O.glow45}` : "none",
            transition:     "box-shadow 0.4s ease",
          }}/>
        )}

        {/* ── subtle left-edge accent on active non-highlight ── */}
        {active && !hl && (
          <div style={{
            position:"absolute", top:"15%", left:0, width:"3px", height:"70%",
            background:     O.gradCard,
            borderRadius:   "0 2px 2px 0",
            boxShadow:      `0 0 8px ${O.glow45}`,
          }}/>
        )}
      </div>
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────
export const Services = () => {
  const [active, setActive] = useState(null);
  const [auto,   setAuto]   = useState(0);
  const timer = useRef(null);

  useEffect(() => {
    if (active !== null) return;
    timer.current = setInterval(() => setAuto(p => (p + 1) % 5), 1100);
    return () => clearInterval(timer.current);
  }, [active]);

  const click = (i) => {
    clearInterval(timer.current);
    setAuto(-1);
    setActive(p => p === i ? null : i);
  };

  const isActive = (i) => active !== null ? active === i : auto === i;
  const isLit    = (i) => active !== null ? active >  i : auto  >  i;

  return (
    <section
      id="how-we-work"
      data-testid="how-we-work-section"
      style={{
        background:"linear-gradient(160deg,#060D24 0%,#0B1840 55%,#060D24 100%)",
        minHeight:"100vh", padding:"72px 28px 60px",
        fontFamily:"system-ui,sans-serif",
        position:"relative", overflow:"hidden",
      }}
    >
      <style>{`
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(26px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes gradShift {
          0%   { background-position:0%;   }
          100% { background-position:200%; }
        }
        @keyframes blink {
          0%,100% { opacity:1; }
          50%     { opacity:0.45; }
        }
        @keyframes shimmer {
          0%   { transform:translateX(-100%); }
          100% { transform:translateX(200%); }
        }
        @keyframes orangePulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(217,76,26,0.0); }
          50%     { box-shadow: 0 0 0 8px rgba(217,76,26,0.18); }
        }
      `}</style>

      {/* grid texture */}
      <div style={{
        position:"absolute",inset:0,pointerEvents:"none",
        backgroundImage:"linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)",
        backgroundSize:"52px 52px",
      }}/>

      {/* ambient orange glow behind step 3 */}
      <div style={{
        position:"absolute",top:"8%",left:"50%",
        transform:"translateX(-50%)",
        width:"480px",height:"220px",borderRadius:"50%",
        background:"radial-gradient(ellipse,rgba(217,76,26,0.08),transparent 70%)",
        pointerEvents:"none",
      }}/>

      {/* ── HEADER ── */}
      <div style={{ textAlign:"center", marginBottom:"52px", animation:"fadeUp 0.6s ease both" }}>
        <div style={{
          display:"inline-flex",alignItems:"center",gap:"7px",
          background:"rgba(217,76,26,0.1)",
          border:"1px solid rgba(217,76,26,0.28)",
          borderRadius:"100px", padding:"5px 15px", marginBottom:"18px",
        }}>
          <div style={{
            width:"5px",height:"5px",borderRadius:"50%",
            background:O.solid, animation:"blink 1.8s ease infinite",
          }}/>
          <span style={{
            fontSize:"0.65rem",fontWeight:"700",
            letterSpacing:"0.14em",color:O.solid,textTransform:"uppercase",
          }}>
            Our Process
          </span>
        </div>

        <h2 style={{
          fontSize:"clamp(1.9rem,3.5vw,2.9rem)",fontWeight:"800",
          color:"#fff",letterSpacing:"-0.04em",
          margin:"0 0 12px",lineHeight:1.1,
        }}>
          Our Engagement Model
        </h2>

        <p style={{
          fontSize:"0.92rem",color:"rgba(255,255,255,0.42)",
          maxWidth:"440px",margin:"0 auto",lineHeight:1.75,
        }}>
          A structured 5-step approach delivering measurable outcomes in{" "}
          <strong style={{ color:O.bright }}>60–90 days</strong>.
        </p>
      </div>

      {/* ── FLOW ROW ── */}
      <div style={{
        display:"flex",alignItems:"flex-start",
        maxWidth:"1040px",margin:"0 auto",
      }}>
        {STEPS.map((step, i) => (
          <div
            key={step.num}
            style={{ display:"flex", alignItems:"flex-start", flex:1, minWidth:0 }}
          >
            <Card
              step={step}
              active={isActive(i)}
              onClick={() => click(i)}
              delay={i * 0.09 + 0.15}
            />
            {i < 4 && <Arrow lit={isLit(i)} id={i} />}
          </div>
        ))}
      </div>

      {/* hint */}
      <p style={{
        textAlign:"center",marginTop:"26px",
        fontSize:"0.67rem",color:"rgba(255,255,255,0.16)",
        letterSpacing:"0.07em",
      }}>
        click any step to explore
      </p>

      {/* ── METRICS BAR ── */}
      <div style={{
        maxWidth:"860px",margin:"44px auto 0",
        background:"rgba(217,76,26,0.07)",
        border:`1px solid rgba(217,76,26,0.18)`,
        borderRadius:"16px",padding:"26px 36px",
        display:"flex",alignItems:"center",
        gap:"32px",flexWrap:"wrap",
        animation:"fadeUp 0.7s 0.95s ease both",
        opacity:0,
      }}>
        {[
          ["3–5",  "Systems Connected"],
          ["6–10", "Action APIs Delivered"],
          ["2–3",  "Agents in Production"],
        ].map(([n, l]) => (
          <div key={l} style={{ textAlign:"center" }}>
            <div style={{
              fontSize:"1.85rem",fontWeight:"800",
              color:O.solid,letterSpacing:"-0.05em",lineHeight:1,
            }}>
              {n}
            </div>
            <div style={{
              fontSize:"0.68rem",color:"rgba(255,255,255,0.38)",
              marginTop:"3px",
            }}>
              {l}
            </div>
          </div>
        ))}

        <div style={{
          flex:1,minWidth:"200px",
          borderLeft:"1px solid rgba(255,255,255,0.07)",
          paddingLeft:"32px",
        }}>
          <div style={{ fontWeight:"700",color:"#fff",marginBottom:"4px",fontSize:"0.9rem" }}>
            Delivered in 60–90 days
          </div>
          <div style={{ fontSize:"0.78rem",color:"rgba(255,255,255,0.40)",lineHeight:1.65 }}>
            Measurable outcomes from your first sprint —
            before committing to a full program.
          </div>
        </div>
      </div>
    </section>
  );
};
