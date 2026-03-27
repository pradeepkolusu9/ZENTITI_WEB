import React, { useState } from "react";
import { motion } from "framer-motion";
import { ContactModal } from "@/components/ContactModal";

/* ── component ────────────────────────────────────────────────── */
export const Industries = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const css = `
.industries-section {
  background: var(--bg-section-alt);
  font-family: 'Inter', system-ui, sans-serif;
  color: var(--text-primary);
  padding: 12px 32px 80px;
  position: relative;
  overflow: hidden;
}
.industries-section::before {
  content: '';
  position: absolute; inset: 0; pointer-events: none;
  background-image: linear-gradient(rgba(255,255,255,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.1) 1px,transparent 1px);
  background-size: 64px 64px;
  opacity: 0.03;
}
.industries-section::after {
  content: '';
  position: absolute;
  left: 50%; top: 50%;
  width: 700px; height: 500px;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: var(--ember);
  filter: blur(120px);
  opacity: 0.07;
  pointer-events: none;
}
.industries-inner { max-width: 1160px; margin: 0 auto; position: relative; z-index: 10; }

.ind-header { margin-bottom: 52px; }
.ind-pill {
  display: inline-flex; align-items: center; gap: 7px;
  border: 1px solid var(--border-default); border-radius: 100px;
  padding: 8px 20px; font-size: 12px; font-weight: 700;
  letter-spacing: 0.14em; text-transform: uppercase;
  color: var(--text-secondary); margin-bottom: 22px;
}
.ind-pill-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--ember); }
.ind-heading {
  font-size: clamp(1.4rem, 2.8vw, 2.2rem); font-weight: 800;
  line-height: 1.08; letter-spacing: -0.04em;
  color: var(--text-primary); margin-bottom: 16px;
  font-family: 'Manrope', sans-serif;
}
.ind-heading span { color: var(--ember); }
.ind-subtext { font-size: 15px; font-weight: 400; color: var(--text-secondary); line-height: 1.7; max-width: 520px; }

.ind-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 10px; }
@media (max-width: 900px) { .ind-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 520px) { .ind-grid { grid-template-columns: 1fr; } }

.ind-card {
  background: var(--bg-card); border: 1px solid var(--border-default);
  border-radius: 14px; padding: 28px 26px 26px; position: relative;
  transition: border-color 0.2s ease; cursor: default; box-shadow: var(--shadow-card);
}
.ind-card:hover { border-color: var(--ember); }
.ind-card-top { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 24px; }
.ind-icon {
  width: 42px; height: 42px; background: var(--bg-section-alt);
  border-radius: 9px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.ind-icon svg { width: 20px; height: 20px; stroke: var(--text-secondary); fill: none; stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round; transition: stroke 0.2s; }
.ind-card:hover .ind-icon svg { stroke: var(--ember); }
.ind-stat-wrap { text-align: right; }
.ind-stat-num { display: block; font-size: 32px; font-weight: 900; line-height: 1; letter-spacing: -0.04em; color: var(--text-secondary); transition: color 0.2s; }
.ind-card:hover .ind-stat-num { color: var(--ember); }
.ind-stat-label { display: block; font-size: 10px; font-weight: 600; letter-spacing: 0.09em; text-transform: uppercase; color: var(--text-primary); margin-top: 3px; }
.ind-divider { height: 1px; background: var(--border-default); margin-bottom: 18px; }
.ind-card-name { font-size: 16px; font-weight: 700; color: var(--text-primary); letter-spacing: -0.02em; margin-bottom: 7px; }
.ind-card-desc { font-size: 13px; font-weight: 400; color: var(--text-secondary); line-height: 1.62; }

.ind-cta-bar {
  background: var(--bg-inverse); border-radius: 14px; padding: 26px 32px;
  display: flex; align-items: center; justify-content: center; gap: 20px; flex-wrap: wrap;
}
.ind-cta-btn {
  display: inline-flex; align-items: center; gap: 8px;
  background: var(--ember); color: #fff; font-size: 14px; font-weight: 600;
  font-family: 'Inter', system-ui, sans-serif; border: none; border-radius: 100px;
  padding: 8px 20px; cursor: pointer; white-space: nowrap;
  text-decoration: none; letter-spacing: 0.01em; transition: opacity 0.18s;
}
.ind-cta-btn:hover { opacity: 0.85; }
.ind-cta-btn svg { width: 13px; height: 13px; stroke: #fff; fill: none; stroke-width: 2.5; stroke-linecap: round; transition: transform 0.18s; }
.ind-cta-btn:hover svg { transform: translateX(3px); }
`;

  return (
    <section
      id="industries"
      data-testid="industries-section"
      className="industries-section"
    >
      <style>{css}</style>
      
      <div className="industries-inner">

        {/* HEADER */}
        <motion.div 
          className="ind-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45 }}
        >
          <span className="z-pill mb-6 text-lg font-semibold">Industries</span>
          <h2 className="ind-heading">
            Sectors we <span>Serve</span>
          </h2>
          <p className="ind-subtext">
            Measurable outcomes across regulated and high-growth industries delivered in 60–90 days.
          </p>
        </motion.div>

        {/* GRID */}
        <motion.div 
          className="ind-grid"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, delay: 0.07 }}
        >
          {/* Banking */}
          <div className="ind-card">
            <div className="ind-card-top">
              <div className="ind-icon">
                <svg viewBox="0 0 24 24">
                  <rect x="3" y="10" width="18" height="11" rx="2"/>
                  <path d="M7 10V7a5 5 0 0 1 10 0v3"/>
                </svg>
              </div>
              <div className="ind-stat-wrap">
                <span className="ind-stat-num">35%</span>
                <span className="ind-stat-label">faster processing</span>
              </div>
            </div>
            <div className="ind-divider"></div>
            <p className="ind-card-name">Banking & Finance</p>
            <p className="ind-card-desc">
              API-led connectivity and intelligent workflow automation for loan, payment, and compliance pipelines.
            </p>
          </div>

          {/* Healthcare */}
          <div className="ind-card">
            <div className="ind-card-top">
              <div className="ind-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                </svg>
              </div>
              <div className="ind-stat-wrap">
                <span className="ind-stat-num">30%</span>
                <span className="ind-stat-label">fewer delays</span>
              </div>
            </div>
            <div className="ind-divider"></div>
            <p className="ind-card-name">Healthcare</p>
            <p className="ind-card-desc">
              Streamline clinical workflows, unify patient data, and cut scheduling friction with smart integration.
            </p>
          </div>

          {/* Retail */}
          <div className="ind-card">
            <div className="ind-card-top">
              <div className="ind-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
              </div>
              <div className="ind-stat-wrap">
                <span className="ind-stat-num">51%</span>
                <span className="ind-stat-label">fewer stockouts</span>
              </div>
            </div>
            <div className="ind-divider"></div>
            <p className="ind-card-name">Retail & E-commerce</p>
            <p className="ind-card-desc">
              Eliminate inventory gaps and deployment friction to protect revenue during peak demand.
            </p>
          </div>

          {/* Manufacturing */}
          <div className="ind-card">
            <div className="ind-card-top">
              <div className="ind-icon">
                <svg viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
                </svg>
              </div>
              <div className="ind-stat-wrap">
                <span className="ind-stat-num">40%</span>
                <span className="ind-stat-label">less overhead</span>
              </div>
            </div>
            <div className="ind-divider"></div>
            <p className="ind-card-name">Manufacturing</p>
            <p className="ind-card-desc">
              Connect shop-floor systems, automate order-to-cash, and eliminate manual handoffs at scale.
            </p>
          </div>

          {/* Insurance */}
          <div className="ind-card">
            <div className="ind-card-top">
              <div className="ind-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <div className="ind-stat-wrap">
                <span className="ind-stat-num">25%</span>
                <span className="ind-stat-label">faster claims</span>
              </div>
            </div>
            <div className="ind-divider"></div>
            <p className="ind-card-name">Insurance</p>
            <p className="ind-card-desc">
              Automate intake, routing, and reduce manual intervention across policy lifecycles.
            </p>
          </div>

          <div className="ind-card">
            <div className="ind-card-top">
              <div className="ind-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <div className="ind-stat-wrap">
                <span className="ind-stat-num">3×</span>
                <span className="ind-stat-label">faster enrollment</span>
              </div>
            </div>
            <div className="ind-divider"></div>
            <p className="ind-card-name">Education</p>
            <p className="ind-card-desc">
              Integration of multiple databases with Salesforce, along with automated student lifecycle management.
            </p>
          </div>
        </motion.div>

        <motion.div className="ind-cta-bar" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.45, delay: 0.14 }}>
          <button className="ind-cta-btn" onClick={() => setIsContactModalOpen(true)}>
            Book Consultation
            <svg viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </motion.div>

      {/* Contact Modal */}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
      </div>
    </section>
  );
};
