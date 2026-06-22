import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const W = 1432, H = 913;

const item = (text, fontSize = 20) => (
  <div key={text} style={{
    width: 330, height: 56, margin: "18px auto 0",
    background: "#08213d", border: "1px solid rgba(255,255,255,.06)", borderRadius: 14,
    display: "flex", justifyContent: "center", alignItems: "center",
    color: "#dce5ee", fontSize,
  }}>{text}</div>
);

function DiagramCanvas({ scale }) {
  return (
    <div style={{ width: W * scale, height: H * scale, position: "relative", flexShrink: 0 }}>
      <div style={{
        position: "absolute", top: 0, left: 0,
        width: W, height: H,
        transformOrigin: "top left",
        transform: `scale(${scale})`,
        fontFamily: '"Segoe UI", sans-serif',
      }}>
        {/* SVG deploy arrows */}
        <svg style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
          width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
          <path d="M716 550 L716 610" fill="none" stroke="#f49a15" strokeWidth="2.5" strokeDasharray="8 6" />
          <text x="735" y="585" fill="#f49a15" fontSize="18">Deploy</text>
          <path d="M716 610 L260 610 L260 690" fill="none" stroke="#f49a15" strokeWidth="2.5" strokeDasharray="8 6" />
          <polygon points="254,679 266,679 260,692" fill="#f49a15" />
          <path d="M716 610 L1172 610 L1172 690" fill="none" stroke="#f49a15" strokeWidth="2.5" strokeDasharray="8 6" />
          <polygon points="1166,679 1178,679 1172,692" fill="#f49a15" />
        </svg>

        {/* Main foundry box */}
        <div style={{
          position: "absolute", left: 226, top: 45, width: 980, height: 505,
          background: "#203549", borderRadius: 28,
        }}>
          <div style={{ position: "absolute", top: 0, left: 260, width: 460, height: 2, background: "#f49a15" }} />
          <div style={{
            position: "absolute", width: "100%", top: 30,
            textAlign: "center", color: "#f49a15", fontSize: 38, fontWeight: 700, letterSpacing: 6,
          }}>AI AGENTIC FOUNDRY</div>

          {/* The Lab */}
          <div style={{
            position: "absolute", top: 105, left: 48, width: 405, height: 365,
            background: "#021326", borderRadius: 22, border: "1px solid rgba(69,123,196,.35)",
          }}>
            <div style={{ position: "absolute", top: 0, left: 37, width: 330, height: 2, background: "#467bc4" }} />
            <div style={{ textAlign: "center", marginTop: 22, fontSize: 30, fontWeight: 700, color: "#467bc4" }}>The Lab</div>
            <div style={{ textAlign: "center", marginTop: 4, color: "#8092a8", fontSize: 18, fontStyle: "italic" }}>Explore what's next</div>
            {["Evaluate frameworks", "Test agentic patterns", "Separate signal from hype"].map(t => item(t))}
          </div>

          {/* Validated arrow */}
          <div style={{ position: "absolute", left: 454, top: 240, width: 90, textAlign: "center", color: "#8b9aad", fontSize: 14 }}>
            <div>Validated</div>
            <svg width="80" height="20">
              <line x1="0" y1="10" x2="50" y2="10" stroke="#8b9aad" strokeWidth="3" />
              <polygon points="50,3 70,10 50,17" fill="#8b9aad" />
            </svg>
          </div>

          {/* The Factory */}
          <div style={{
            position: "absolute", top: 105, right: 48, width: 405, height: 365,
            background: "#06111d", borderRadius: 22, border: "1px solid rgba(244,154,21,.35)",
          }}>
            <div style={{ position: "absolute", top: 0, left: 37, width: 330, height: 2, background: "#f49a15" }} />
            <div style={{ textAlign: "center", marginTop: 22, fontSize: 30, fontWeight: 700, color: "#f49a15" }}>The Factory</div>
            <div style={{ textAlign: "center", marginTop: 4, color: "#8092a8", fontSize: 18, fontStyle: "italic" }}>Put it to work</div>
            {["Engineer agents", "Contextualise to client", "Ship production-ready"].map(t => item(t))}
          </div>
        </div>

        {/* Internal box */}
        <div style={{
          position: "absolute", left: 110, top: 690, width: 300, height: 100,
          background: "#203549", border: "1px solid rgba(244,154,21,.35)", borderRadius: 18,
          display: "flex", flexDirection: "column", justifyContent: "center",
        }}>
          <div style={{ textAlign: "center", color: "#f49a15", fontSize: 18, fontWeight: 700 }}>INTERNAL</div>
          <div style={{ textAlign: "center", marginTop: 8, color: "#8fa2b7", fontSize: 15, lineHeight: 1.4 }}>HR | Finance | IT | Operations</div>
        </div>

        {/* External clients box */}
        <div style={{
          position: "absolute", left: 1022, top: 690, width: 300, height: 100,
          background: "#203549", border: "1px solid rgba(244,154,21,.35)", borderRadius: 18,
          display: "flex", flexDirection: "column", justifyContent: "center",
        }}>
          <div style={{ textAlign: "center", color: "#f49a15", fontSize: 18, fontWeight: 700 }}>EXTERNAL CLIENTS</div>
          <div style={{ textAlign: "center", marginTop: 8, color: "#8fa2b7", fontSize: 15, lineHeight: 1.4 }}>Customer Solutions | Agents | APIs | AI</div>
        </div>

        {/* Tagline */}
        <div style={{
          position: "absolute", width: "100%", bottom: 40,
          textAlign: "center", color: "#d18a14", fontSize: 30, fontStyle: "italic",
        }}>
          We don't just build intelligent agents. We run on them.
        </div>
      </div>
    </div>
  );
}

function DetailModal({ onClose }) {
  const headerH = 52;
  const availableW = window.innerWidth;
  const availableH = window.innerHeight - headerH;
  // Portrait canvas — designed to fit phone screens
  const CW = 500, CH = 860;
  const scale = Math.min(availableW / CW, availableH / CH);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const chip = (text) => (
    <div key={text} style={{
      width: 178, height: 90, margin: "16px auto 0",
      background: "#08213d", border: "1px solid rgba(255,255,255,.08)", borderRadius: 12,
      display: "flex", justifyContent: "center", alignItems: "center",
      color: "#dce5ee", fontSize: 14, textAlign: "center", padding: "0 10px",
      lineHeight: 1.4,
    }}>{text}</div>
  );

  return createPortal(
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "#06111d",
      display: "flex", flexDirection: "column",
    }}>
      {/* Header */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "8px 16px", borderBottom: "1px solid rgba(244,154,21,.25)",
        flexShrink: 0, height: headerH,
      }}>
        <span style={{ color: "#f49a15", fontWeight: 700, fontSize: 14, letterSpacing: 2, fontFamily: '"Segoe UI", sans-serif' }}>
          AI AGENTIC FOUNDRY
        </span>
        <button onClick={onClose} style={{
          width: 36, height: 36, borderRadius: 10,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "#2e3a55", border: "1.5px solid #4a5a80",
          color: "#fff", cursor: "pointer", fontSize: 16,
        }}>✕</button>
      </div>

      {/* Portrait diagram — centered, no scroll */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <div style={{ width: CW * scale, height: CH * scale, position: "relative" }}>
          <div style={{
            position: "absolute", top: 0, left: 0, width: CW, height: CH,
            transformOrigin: "top left", transform: `scale(${scale})`,
            fontFamily: '"Segoe UI", sans-serif',
          }}>

            {/* Deploy SVG arrows */}
            <svg style={{ position: "absolute", inset: 0, pointerEvents: "none" }} width={CW} height={CH} viewBox={`0 0 ${CW} ${CH}`}>
              <path d="M250 548 L250 592" fill="none" stroke="#f49a15" strokeWidth="2" strokeDasharray="6 5" />
              <text x="258" y="576" fill="#f49a15" fontSize="13">Deploy</text>
              <path d="M250 592 L120 592 L120 628" fill="none" stroke="#f49a15" strokeWidth="2" strokeDasharray="6 5" />
              <polygon points="114,618 126,618 120,630" fill="#f49a15" />
              <path d="M250 592 L380 592 L380 628" fill="none" stroke="#f49a15" strokeWidth="2" strokeDasharray="6 5" />
              <polygon points="374,618 386,618 380,630" fill="#f49a15" />
            </svg>

            {/* Title */}
            <div style={{ position: "absolute", top: 0, left: 50, width: 400, height: 2, background: "#f49a15" }} />
            <div style={{ textAlign: "center", paddingTop: 14, color: "#f49a15", fontSize: 20, fontWeight: 700, letterSpacing: 4 }}>
              AI AGENTIC FOUNDRY
            </div>

            {/* Main foundry box */}
            <div style={{
              position: "absolute", left: 10, top: 52, width: 480, height: 496,
              background: "#203549", borderRadius: 20,
            }}>

              {/* The Lab */}
              <div style={{
                position: "absolute", top: 18, left: 12, width: 204, height: 450,
                background: "#021326", borderRadius: 16, border: "1px solid rgba(69,123,196,.35)",
              }}>
                <div style={{ position: "absolute", top: 0, left: 22, width: 160, height: 2, background: "#467bc4" }} />
                <div style={{ textAlign: "center", marginTop: 18, fontSize: 18, fontWeight: 700, color: "#467bc4" }}>The Lab</div>
                <div style={{ textAlign: "center", marginTop: 3, color: "#8092a8", fontSize: 12, fontStyle: "italic" }}>Explore what's next</div>
                {["Evaluate frameworks", "Test agentic patterns", "Separate signal from hype"].map(chip)}
              </div>

              {/* Validated arrow */}
              <div style={{ position: "absolute", left: 216, top: 205, width: 54, textAlign: "center", color: "#8b9aad", fontSize: 11 }}>
                <div>Validated</div>
                <svg width="48" height="16">
                  <line x1="0" y1="8" x2="30" y2="8" stroke="#8b9aad" strokeWidth="2" />
                  <polygon points="30,3 44,8 30,13" fill="#8b9aad" />
                </svg>
              </div>

              {/* The Factory */}
              <div style={{
                position: "absolute", top: 18, right: 12, width: 204, height: 450,
                background: "#06111d", borderRadius: 16, border: "1px solid rgba(244,154,21,.35)",
              }}>
                <div style={{ position: "absolute", top: 0, left: 22, width: 160, height: 2, background: "#f49a15" }} />
                <div style={{ textAlign: "center", marginTop: 18, fontSize: 18, fontWeight: 700, color: "#f49a15" }}>The Factory</div>
                <div style={{ textAlign: "center", marginTop: 3, color: "#8092a8", fontSize: 12, fontStyle: "italic" }}>Put it to work</div>
                {["Engineer agents", "Contextualise to client", "Ship production-ready"].map(chip)}
              </div>
            </div>

            {/* INTERNAL */}
            <div style={{
              position: "absolute", left: 10, top: 628, width: 220, height: 72,
              background: "#203549", border: "1px solid rgba(244,154,21,.35)", borderRadius: 14,
              display: "flex", flexDirection: "column", justifyContent: "center",
            }}>
              <div style={{ textAlign: "center", color: "#f49a15", fontSize: 13, fontWeight: 700 }}>INTERNAL</div>
              <div style={{ textAlign: "center", marginTop: 5, color: "#8fa2b7", fontSize: 11 }}>HR | Finance | IT | Operations</div>
            </div>

            {/* EXTERNAL */}
            <div style={{
              position: "absolute", right: 10, top: 628, width: 220, height: 72,
              background: "#203549", border: "1px solid rgba(244,154,21,.35)", borderRadius: 14,
              display: "flex", flexDirection: "column", justifyContent: "center",
            }}>
              <div style={{ textAlign: "center", color: "#f49a15", fontSize: 13, fontWeight: 700 }}>EXTERNAL CLIENTS</div>
              <div style={{ textAlign: "center", marginTop: 5, color: "#8fa2b7", fontSize: 11 }}>Solutions | Agents | APIs | AI</div>
            </div>

            {/* Tagline */}
            <div style={{
              position: "absolute", bottom: 18, width: "100%",
              textAlign: "center", color: "#d18a14", fontSize: 14, fontStyle: "italic",
            }}>
              We don't just build intelligent agents. We run on them.
            </div>

          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export function AIAgenticFoundry() {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(() => window.innerWidth / W);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 700);
  const [detailOpen, setDetailOpen] = useState(false);

  useEffect(() => {
    const update = () => {
      const w = containerRef.current ? containerRef.current.offsetWidth : window.innerWidth;
      setScale(w / W);
      setIsMobile(w < 700);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <>
      <div ref={containerRef} style={{ width: "100%", overflow: "hidden", maxWidth: 900, margin: "0 auto" }}>
        <DiagramCanvas scale={scale} />
      </div>

      {/* Mobile "view in detail" button — below the diagram, no overlap */}
      {isMobile && (
        <div style={{ display: "flex", justifyContent: "center", marginTop: 14 }}>
          <button
            onClick={() => setDetailOpen(true)}
            style={{
              padding: "9px 22px",
              background: "transparent",
              border: "1px solid #f49a15",
              borderRadius: 20,
              color: "#f49a15",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              whiteSpace: "nowrap",
              letterSpacing: 0.5,
            }}
          >
            ⊕ &nbsp;Tap to view in detail
          </button>
        </div>
      )}

      {detailOpen && <DetailModal onClose={() => setDetailOpen(false)} />}
    </>
  );
}
