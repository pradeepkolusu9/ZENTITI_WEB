import { useEffect, useRef, useState, useCallback, memo } from "react";

const LOCATIONS = [
  { city: "Austin", country: "Texas, USA", coords: [-97.7431, 30.2672] },
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
  { city: "Hyderabad", country: "Telangana, India", coords: [78.4867, 17.385] },
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
      <style>{`
/* About section specific styles using main theme variables */
.abt { padding: 48px 0 64px; background: var(--bg-page); }
.abt-c { max-width: 1200px; margin: 0 auto; padding: 0 28px; }
.abt-g { display: grid; grid-template-columns: 1fr; gap: 32px; align-items: start; max-width: 1000px; }

/* Pill */
.zp { display: inline-block; padding: 6px 18px; border-radius: 100px; font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--pill-text); background: var(--pill-bg); border: 1px solid var(--pill-border); }

/* Heading */
.ah { margin-top: 16px; margin-bottom: 24px; font-size: clamp(24px, 3.5vw, 40px); font-weight: 800; line-height: 1.1; letter-spacing: -0.02em; color: var(--text-primary); }
.ah .gr { background: linear-gradient(135deg, #3B82F6, #60A5FA); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }

/* Body */
.abody { margin-top: 16px; font-size: 15px; line-height: 1.6; color: var(--text-secondary); max-width: 480px; }

/* Vision */
.vc { position: relative; margin-top: 32px; padding: 18px 20px 18px 22px; border-radius: 12px; background: var(--bg-card); border: 1px solid var(--border-default); }
.vc::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px; border-radius: 12px 0 0 12px; background: linear-gradient(180deg, var(--ember), #f97316); }
.vlbl { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: var(--ember); margin-bottom: 4px; }
.vtxt { margin-top: 4px; font-size: 13px; color: var(--text-secondary); line-height: 1.5; }

/* Locations */
.lhdr { margin-top: 32px; font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: var(--text-muted); margin-bottom: 10px; }
.ltags { display: flex; flex-wrap: wrap; gap: 8px; }
.ltag { display: inline-block; padding: 4px 12px; border-radius: 100px; font-size: 11px; font-weight: 500; color: var(--text-secondary); background: var(--bg-card); border: 1px solid var(--border-default); transition: border-color 0.2s, color 0.2s, transform 0.2s; cursor: default; }
.ltag:hover { border-color: var(--border-blue); color: var(--accent-blue); transform: translateY(-1px); }

/* Foundry */
.fcard { margin-top: 24px; padding: 16px 18px; border-radius: 12px; border: 1px solid var(--border-blue); background: var(--pill-bg); }
.flbl { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: var(--ember); margin-bottom: 6px; }
.ftxt { font-size: 12px; line-height: 1.5; color: var(--text-secondary); }

      `}</style>

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
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed whitespace-nowrap">
                  Zentiti is a specialized Data & AI innovation company dedicated to engineering the next generation of enterprise intelligence.
                </p>
              </FadeIn>

              <FadeIn delay={0.2}>
                <div className="fcard" style={{
                  background: "var(--brand-blue)15",
                  border: "1px solid var(--brand-blue)40",
                }}>
                  <p className="flbl" style={{
                    color: "var(--brand-blue)",
                  }}>OUR ROOTS</p>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    Zentiti was launched in 2024 as a strategic extension of Synersys Technologies, a trusted name in Networking and Cybersecurity consulting. While Synersys continues to lead in network engineering and security, Zentiti was purpose-built to meet the growing demand for Data Integrations, APIs, and Agentic AI. Together, we are 300+ consultants strong, united by shared foundations in business functions like HR, IT, Finance and Operations. This common fabric gives Zentiti the agility of a startup with the operational maturity of an established organization.
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
                  {CITIES.map((c) => (
                    <span key={c} className="ltag">{c}</span>
                  ))}
                </div>
              </FadeIn>

              <FadeIn delay={0.34}>
                <div className="fcard">
                  <p className="flbl">AI Agentic Foundry</p>
                  <div className="space-y-4 text-sm text-[var(--text-secondary)]">
                    <p className="leading-relaxed">
                      Part lab, part factory. The Agentic Foundry is where we explore what's next in AI and put it to work. Our team evaluates emerging agentic technologies, testing frameworks, models, and patterns to separate real capability from hype. When a use case is validated, the Foundry shifts into production mode, engineering contextual AI agents tailored to each client's environment. This is our way of ensuring that every agent we deliver is grounded in hands-on experimentation, not just theory.
                    </p>
                    <p className="leading-relaxed">
                      But we don't just build agents for our clients. We run on them. The Foundry also powers intelligent agents across our internal business functions, making us a truly agentic enterprise.
                    </p>
                  </div>
                </div>
                <div className="mt-6 flex justify-center px-6">
                  <img 
                    src="/ai_agentic_foundry.png" 
                    alt="AI Agentic Foundry" 
                    className="rounded-lg shadow-lg max-w-full h-auto"
                    style={{ maxHeight: "400px" }}
                  />
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
