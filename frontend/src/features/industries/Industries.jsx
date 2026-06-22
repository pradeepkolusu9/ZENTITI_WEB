import React, { useState } from "react";
import { motion } from "framer-motion";
import { ContactModal } from "@/components/ContactModal";
import "./Industries.css";

/* ── component ────────────────────────────────────────────────── */
export const Industries = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <section
      id="industries"
      data-testid="industries-section"
      className="industries-section"
    >
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
          viewport={{ once: true, amount: 0.1 }}
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
