import { useEffect, useRef, useState } from "react";
import { AIAgenticFoundry } from "../about/AIAgenticFoundry";
import "../about/About.css";

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

export const AgenticFoundry = () => {
  return (
    <section
      id="agentic-foundry"
      style={{
        background: "var(--bg-page)",
        padding: "64px 0 72px",
        scrollMarginTop: "96px",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 28px" }}>

        <FadeIn>
          <span className="z-pill mb-6 text-lg font-semibold">AI Agentic Foundry</span>
        </FadeIn>

        <FadeIn delay={0.14}>
          <div className="vc">
            <p className="vlbl">What We Do</p>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              Our AI Foundry is your co-development environment for production-ready AI. We work alongside your team to evaluate emerging technologies, validate what's real, and deploy agentic applications built for your business, not generic templates. We test the frameworks, models, and patterns ourselves, so by the time you're in production, every decision is grounded in hands-on experimentation, not theory.
            </p>
          </div>
        </FadeIn>

      </div>

      <div style={{ marginTop: 24 }}>
        <AIAgenticFoundry />
      </div>

    </section>
  );
};
