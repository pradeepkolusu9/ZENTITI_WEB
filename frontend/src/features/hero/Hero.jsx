import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/shared/ui";
import { ContactModal } from "@/components/ContactModal";

const INNER_NODES = [
  { icon: "🔒", label: "Security" },
  { icon: "🔌", label: "Connect"  },
  { icon: "🔬", label: "Research" },
  { icon: "🔗", label: "APIs"     },
];

const OUTER_NODES = [
  { icon: "⚡", label: "Automate",  orange: false },
  { icon: "🤖", label: "Agents",    orange: true  },
  { icon: "📊", label: "Analytics", orange: false },
  { icon: "📦", label: "Deploy",    orange: false },
  { icon: "🧠", label: "AI/ML",     orange: true  },
  { icon: "☁️", label: "Cloud",     orange: false },
];

const ORBIT_KEYFRAMES = `
  @keyframes spinCW    { 
    from { transform: translate(-50%,-50%) rotate(0deg);   }
    to   { transform: translate(-50%,-50%) rotate(360deg); } 
  }
  @keyframes spinCCW   { 
    from { transform: translate(-50%,-50%) rotate(0deg);    }
    to   { transform: translate(-50%,-50%) rotate(-360deg); } 
  }
  @keyframes counterCW  { 
    from { transform: translate(-50%,-50%) rotate(0deg);    }
    to   { transform: translate(-50%,-50%) rotate(-360deg); } 
  }
  @keyframes counterCCW { 
    from { transform: translate(-50%,-50%) rotate(0deg);   }
    to   { transform: translate(-50%,-50%) rotate(360deg); } 
  }
  @keyframes bob { 
    0%,100% { margin-top: 0px;  } 
    50%     { margin-top: -7px; } 
  }
  @keyframes centerPulse {
    0%   { box-shadow: 0 0 0 0   rgba(214,78,26,.35), 0 0 0 0   rgba(214,78,26,.15), 0 20px 60px rgba(214,78,26,.4); }
    100% { box-shadow: 0 0 0 30px rgba(214,78,26,0),  0 0 0 60px rgba(214,78,26,0),  0 20px 60px rgba(214,78,26,.4); }
  }
  @keyframes haloBreath {
    0%,100% { opacity:.7;  transform: translate(-50%,-50%) scale(1);    }
    50%     { opacity:1;   transform: translate(-50%,-50%) scale(1.05); }
  }
  @keyframes tooltipIn {
    from { opacity:0; transform: translateX(-50%) translateY(4px); }
    to   { opacity:1; transform: translateX(-50%) translateY(0);   }
  }
`;

function getNodePosition(index, total) {
  const angleDeg = (360 / total) * index;
  const angleRad = (angleDeg * Math.PI) / 180;
  const cx = 50 + 50 * Math.sin(angleRad);
  const cy = 50 - 50 * Math.cos(angleRad);
  return { left: `${cx}%`, top: `${cy}%` };
}

const HeroOrbit = () => {
  const [hovNode, setHovNode] = React.useState(null);

  React.useEffect(() => {
    const style = document.createElement("style");
    style.textContent = ORBIT_KEYFRAMES;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const INNER_DUR = 22;
  const OUTER_DUR = 32;

  return (
    <div style={{
      position: "relative",
      width: "100%",
      maxWidth: 480,
      height: "auto",
      aspectRatio: "1",
      flexShrink: 0,
    }}>
      {[
        { size: "87.5%", opacity: 0.018 },
        { size: "64.5%", opacity: 0.04  },
        { size: "41.5%", opacity: 0.08  },
      ].map(({ size, opacity }) => (
        <div key={size} style={{
          position: "absolute", top: "50%", left: "50%",
          width: size, height: size,
          borderRadius: "50%",
          background: `rgba(214,78,26,${opacity})`,
          animation: `haloBreath ${3 + parseInt(size) * 0.03}s ease-in-out infinite`,
          pointerEvents: "none",
          transform: "translate(-50%, -50%)",
        }}/>
      ))}

      {["50%", "81%"].map((size) => (
        <div key={size} style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          width: size, height: size,
          borderRadius: "50%",
          border: "1.5px dashed rgba(255,255,255,0.1)",
          background: "transparent",
          pointerEvents: "none",
        }}/>
      ))}

      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%,-50%)",
        width: "23%", height: "23%",
        borderRadius: "50%",
        background: "linear-gradient(145deg, #e05a20, #b83a0e)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "clamp(24px, 5vw, 40px)",
        zIndex: 20,
        animation: "centerPulse 2.6s ease-out infinite",
      }}>
        ⚙️
      </div>

      <div style={{
        position: "absolute",
        top: "50%", left: "50%",
        width: "50%", height: "50%",
        borderRadius: "50%",
        animation: `spinCW ${INNER_DUR}s linear infinite`,
      }}>
        {INNER_NODES.map((node, i) => {
          const pos = getNodePosition(i, INNER_NODES.length);
          const id  = `inner-${i}`;
          const isHov = hovNode === id;

          return (
            <div
              key={i}
              onMouseEnter={() => setHovNode(id)}
              onMouseLeave={() => setHovNode(null)}
              style={{
                position: "absolute",
                left: pos.left,
                top:  pos.top,
                width: "10.5%", height: "10.5%",
                borderRadius: 14,
                background: isHov
                  ? "rgba(255,255,255,0.14)"
                  : "rgba(255,255,255,0.07)",
                border: `1px solid rgba(255,255,255,${isHov ? 0.22 : 0.1})`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "clamp(16px, 3.5vw, 22px)",
                cursor: "pointer",
                backdropFilter: "blur(10px)",
                boxShadow: isHov
                  ? "0 0 0 2px rgba(255,255,255,0.2), 0 8px 28px rgba(0,0,0,0.5)"
                  : "0 4px 18px rgba(0,0,0,0.4)",
                zIndex: 10,
                transition: "background .2s, border .2s, box-shadow .2s",
                animation: `counterCW ${INNER_DUR}s linear infinite,
                            bob 3s ${i * 0.75}s ease-in-out infinite`,
                transform: "translate(-50%,-50%)",
              }}
            >
              <span style={{ lineHeight: 1, userSelect: "none" }}>{node.icon}</span>

              {isHov && (
                <div style={{
                  position: "absolute",
                  bottom: "calc(100% + 10px)",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "#0d1322",
                  color: "rgba(255,255,255,0.9)",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  padding: "5px 12px",
                  borderRadius: 6,
                  whiteSpace: "nowrap",
                  border: "1px solid rgba(255,255,255,0.1)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.6)",
                  pointerEvents: "none",
                  zIndex: 50,
                  animation: "tooltipIn .15s ease",
                }}>
                  {node.label}
                  <div style={{
                    position: "absolute", top: "100%", left: "50%",
                    transform: "translateX(-50%)",
                    width: 0, height: 0,
                    borderLeft: "4px solid transparent",
                    borderRight: "4px solid transparent",
                    borderTop: "4px solid rgba(255,255,255,0.1)",
                  }}/>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{
        position: "absolute",
        top: "50%", left: "50%",
        width: "81%", height: "81%",
        borderRadius: "50%",
        animation: `spinCCW ${OUTER_DUR}s linear infinite`,
      }}>
        {OUTER_NODES.map((node, i) => {
          const pos = getNodePosition(i, OUTER_NODES.length);
          const id  = `outer-${i}`;
          const isHov = hovNode === id;

          return (
            <div
              key={i}
              onMouseEnter={() => setHovNode(id)}
              onMouseLeave={() => setHovNode(null)}
              style={{
                position: "absolute",
                left: pos.left,
                top:  pos.top,
                width:  node.orange ? "12%" : "10.5%",
                height: node.orange ? "12%" : "10.5%",
                borderRadius: 16,
                background: node.orange
                  ? isHov
                    ? "linear-gradient(145deg, #f06030, #c23a0a)"
                    : "linear-gradient(145deg, #e05a20, #b83a0e)"
                  : isHov
                    ? "rgba(255,255,255,0.13)"
                    : "rgba(255,255,255,0.07)",
                border: node.orange
                  ? `1px solid rgba(255,120,60,${isHov ? 0.5 : 0.3})` 
                  : `1px solid rgba(255,255,255,${isHov ? 0.22 : 0.1})`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "clamp(16px, 3.5vw, 22px)",
                cursor: "pointer",
                backdropFilter: "blur(10px)",
                boxShadow: node.orange
                  ? isHov
                    ? "0 0 0 3px rgba(214,78,26,0.4), 0 8px 32px rgba(214,78,26,0.6)"
                    : "0 4px 24px rgba(214,78,26,0.4), 0 2px 8px rgba(0,0,0,0.4)"
                  : isHov
                    ? "0 0 0 2px rgba(255,255,255,0.2), 0 8px 28px rgba(0,0,0,0.5)"
                    : "0 4px 18px rgba(0,0,0,0.4)",
                zIndex: 10,
                transition: "background .2s, border .2s, box-shadow .2s, width .2s, height .2s",
                animation: `counterCCW ${OUTER_DUR}s linear infinite,
                            bob 3.5s ${i * 0.55}s ease-in-out infinite`,
                transform: "translate(-50%,-50%)",
              }}
            >
              <span style={{ lineHeight: 1, userSelect: "none" }}>{node.icon}</span>

              {isHov && (
                <div style={{
                  position: "absolute",
                  bottom: "calc(100% + 10px)",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: node.orange ? "#2a0f05" : "#0d1322",
                  color: "rgba(255,255,255,0.9)",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  padding: "5px 12px",
                  borderRadius: 6,
                  whiteSpace: "nowrap",
                  border: `1px solid ${node.orange ? "rgba(214,78,26,0.4)" : "rgba(255,255,255,0.1)"}`,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.6)",
                  pointerEvents: "none",
                  zIndex: 50,
                  animation: "tooltipIn .15s ease",
                }}>
                  {node.label}
                  <div style={{
                    position: "absolute", top: "100%", left: "50%",
                    transform: "translateX(-50%)",
                    width: 0, height: 0,
                    borderLeft: "4px solid transparent",
                    borderRight: "4px solid transparent",
                    borderTop: `4px solid ${node.orange ? "rgba(214,78,26,0.4)" : "rgba(255,255,255,0.1)"}`,
                  }}/>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{
        position: "absolute",
        bottom: -20,
        left: "50%",
        transform: "translateX(-50%)",
        whiteSpace: "nowrap",
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        color: "rgba(255,255,255,0.3)",
      }}>
        Smart Integration &amp; AI Ecosystem
      </div>
    </div>
  );
};

export const Hero = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      data-testid="hero-section"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900" />

      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 z-[1] h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-600/15 blur-[100px]" />

      <div className="relative z-10 w-full px-4 sm:px-6 py-16 sm:py-20 md:py-24">
        <div className="grid items-center gap-8 lg:gap-14 lg:grid-cols-[60fr_40fr] max-w-7xl mx-auto">
          <div className="text-left">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mb-4 sm:mb-6 inline-block rounded-full border border-orange-500/30 bg-gradient-to-r from-orange-500/20 to-orange-600/10 px-3 sm:px-5 py-1.5 sm:py-2 text-xs font-bold uppercase tracking-[0.15em] sm:tracking-[0.25em] text-orange-300 shadow-lg shadow-orange-500/20"
            >
              ✨ Unlock AI Power
            </motion.span>

            <motion.h1
              data-testid="hero-headline"
              className="mb-4 sm:mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-[1.1] sm:leading-[1.05] tracking-tight"
              style={{ fontFamily: "'Manrope', sans-serif" }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            >
              <span className="bg-gradient-to-r from-white via-slate-100 to-white bg-clip-text text-transparent drop-shadow-2xl">
                Smart Integration &{" "}
              </span>
              <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(217,76,26,0.5)]">
                AI for Enterprise
              </span>
            </motion.h1>

            <motion.p
              data-testid="hero-subtext"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              className="mb-4 sm:mb-6 max-w-lg text-base sm:text-lg font-semibold leading-relaxed text-slate-300"
            >
              Built for Scale. Ready for Intelligence.
            </motion.p>

            
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.18, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8 sm:mt-10"
            >
              <Button
                data-testid="hero-cta-button"
                onClick={() => setIsContactModalOpen(true)}
                size="lg"
                variant="primary"
                icon={<ArrowRight className="h-5 w-5" />}
                iconPosition="right"
                className="bg-white text-slate-900 shadow-xl shadow-white/10 hover:-translate-y-0.5 hover:bg-gray-100"
              >
                Book Consultation
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection("case-studies")}
                className="border border-white/15 text-white bg-[var(--brand-blue)] hover:bg-[var(--brand-blue-dark)] hover:-translate-y-0.5 hover:border-white/30"
              >
                See Our Work
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22, ease: "easeOut" }}
            className="block"
          >
            <HeroOrbit />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 cursor-pointer"
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        onClick={() => scrollToSection("about")}
      >
        <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">Scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-5 w-5 text-white/40" />
        </motion.div>
      </motion.div>

      {/* Contact Modal */}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </section>
  );
};
