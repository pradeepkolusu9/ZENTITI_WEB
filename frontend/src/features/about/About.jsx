import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./About.css";

function PinchZoomImage({ src, alt, className, style }) {
  const [isOpen, setIsOpen] = useState(false);

  const open  = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  return (
    <>
      {/* ── Inline preview ── */}
      <div
        className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer group"
        style={{ width: "100%", visibility: isOpen ? "hidden" : "visible" }}
        onClick={open}
      >
        <img
          src={src} alt={alt} className={className}
          style={{ ...style, display: "block", width: "100%", maxWidth: "100%", height: "auto", userSelect: "none" }}
          draggable={false}
        />
        {/* Expand hint — always on mobile, hover-only on desktop */}
        <div  
          className="absolute inset-0 flex items-end justify-center pb-3 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 60%)" }}
        >
          <span className="md:hidden" style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.9)", letterSpacing: "0.06em", background: "rgba(0,0,0,0.45)", borderRadius: 100, padding: "3px 12px", border: "1px solid rgba(255,255,255,0.2)" }}>
            Tap to view
          </span>
          <span className="hidden md:inline" style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.9)", letterSpacing: "0.06em", background: "rgba(0,0,0,0.45)", borderRadius: 100, padding: "3px 12px", border: "1px solid rgba(255,255,255,0.2)" }}>
            Click to view
          </span>
        </div>
      </div>

      {/* ── Lightbox via portal ── */}
      {isOpen && createPortal(
        <div
          style={{
            position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
            zIndex: 99999, background: "#000",
          }}
          onClick={close}
        >
          {/* Close button — large, top-right, always visible */}
          <button
            onClick={(e) => { e.stopPropagation(); close(); }}
            aria-label="Close"
            style={{
              position: "absolute", top: 12, right: 12, zIndex: 10,
              width: 56, height: 56, borderRadius: "50%",
              background: "#fff",
              border: "none",
              color: "#000", display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", boxShadow: "0 2px 12px rgba(0,0,0,0.5)",
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>

          {/* Image — object-fit contain fills the full viewport, centered */}
          <img
            src={src} alt={alt}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "absolute", top: 0, left: 0,
              width: "100%", height: "100%",
              objectFit: "contain",
              userSelect: "none", WebkitUserSelect: "none",
            }}
            draggable={false}
          />
        </div>,
        document.body
      )}
    </>
  );
}

const LOCATIONS = [
  { city: "Austin", country: "Texas, USA", coords: [-97.7431, 30.2672], label: "Headquarters" },
  { city: "Hyderabad", country: "Telangana, India", coords: [78.4867, 17.385], label: "GCC" },
  { city: "London", country: "United Kingdom", coords: [-0.1276, 51.5074] },
  { city: "Chicago", country: "Illinois, USA", coords: [-87.6298, 41.8781] },
  { city: "Ft. Lauderdale", country: "Florida, USA", coords: [-80.1373, 26.1224] },
  { city: "McLean", country: "Virginia, USA", coords: [-77.1773, 38.9339] },
  { city: "Philadelphia", country: "Pennsylvania, USA", coords: [-75.1652, 39.9526] },
  { city: "Morristown", country: "New Jersey, USA", coords: [-74.4815, 40.7968] },
  { city: "New York", country: "New York, USA", coords: [-74.006, 40.7128] },
  { city: "Atlanta", country: "Georgia, USA", coords: [-84.388, 33.749] },
  { city: "Charlotte", country: "N. Carolina, USA", coords: [-80.8431, 35.2271] },
  { city: "Dallas", country: "Texas, USA", coords: [-96.797, 32.7767] },
  { city: "San Francisco", country: "California, USA", coords: [-122.4194, 37.7749] },
];

const CITIES = LOCATIONS.map((l) => l.city);

/* ── Script loader (singleton) ─────────────────────────────── */
let _libsPromise = null;
function loadLibs() {
  if (_libsPromise) return _libsPromise;
  _libsPromise = new Promise((resolve, reject) => {
    if (window.d3 && window.topojson) { resolve(); return; }
    let loaded = 0;
    const done = () => { loaded++; if (loaded === 2) resolve(); };
    const fail = () => reject(new Error("CDN load failed"));
    const s1 = document.createElement("script");
    s1.src = "https://cdnjs.cloudflare.com/ajax/libs/d3/7.9.0/d3.min.js";
    s1.onload = done; s1.onerror = fail;
    const s2 = document.createElement("script");
    s2.src = "https://cdnjs.cloudflare.com/ajax/libs/topojson/3.0.2/topojson.min.js";
    s2.onload = done; s2.onerror = fail;
    document.head.appendChild(s1);
    document.head.appendChild(s2);
  });
  return _libsPromise;
}

/* ── Fade-in on scroll ─────────────────────────────────────── */
function FadeIn({ children, delay = 0, y = 14, className = "" }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : `translateY(${y}px)`,
        transition: `opacity 0.55s cubic-bezier(.22,1,.36,1) ${delay}s, transform 0.55s cubic-bezier(.22,1,.36,1) ${delay}s`,
      }}
    >{children}</div>
  );
}

/* ── Main Export ────────────────────────────────────────────── */
export const About = () => {
  return (
    <>
      <section id="about" className="abt">
        <div className="abt-c">
          <div className="abt-g">
            {/* ── Left ── */}
            <div style={{ minWidth: 0 }}>
              <FadeIn>
                <span className="z-pill mb-6 text-lg font-semibold">About Zentiti</span>
              </FadeIn>

              <FadeIn delay={0.08}>
                <h2 className="ah">
                  Built for Scale. <span className="gr">Ready for Intelligence</span>
                </h2>
              </FadeIn>

              <FadeIn delay={0.14}>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  Zentiti is a specialized Data & AI innovation company dedicated to engineering the next generation of enterprise intelligence.
                </p>
              </FadeIn>

              <FadeIn delay={0.2}>
                <div className="fcard" style={{
                  background: "rgba(37, 99, 235, 0.15)",
                  border: "1px solid rgba(37, 99, 235, 0.40)",
                }}>
                  <p className="flbl" style={{
                    color: "#2563EB",
                  }}>OUR ROOTS</p>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    Zentiti was launched in 2024 as a strategic extension of Synersys Technologies, a trusted name in Networking and Cybersecurity consulting. While Synersys continues to lead in network engineering and Cybersecurity, Zentiti was purpose-built to meet the growing demand for Data Integrations, APIs, and Agentic AI. Together, we are 200+ consultants strong, united by shared foundations in business functions like HR, IT, Finance and Operations. This common fabric gives Zentiti the agility of a startup with the operational maturity of an established organization.
                  </p>
                </div>
              </FadeIn>

              <FadeIn delay={0.28}>
                <div className="vc">
                  <p className="vlbl">Our Vision</p>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    Turning fragmented enterprise data into integrated and
                    agent-powered intelligence.
                  </p>
                </div>
              </FadeIn>

              <FadeIn delay={0.31}>
                <p className="lhdr">Locations</p>
                <div className="ltags">
                  {LOCATIONS.map((l) => (
                    <span key={l.city} className="ltag">
                      {l.city}
                      {l.label && (
                        <span style={{ marginLeft: 5, fontSize: 11, fontWeight: 600, color: "var(--ember)", opacity: 0.85 }}>
                          [{l.label}]
                        </span>
                      )}
                    </span>
                  ))}
                </div>
              </FadeIn>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}
