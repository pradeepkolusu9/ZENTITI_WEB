import React from "react";
import { motion } from "framer-motion";
import "./ProductVisual.css";

const metrics = [
  { 
    icon: "M12 22v-5M9 8V2M15 8V2M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z", 
    label: "Priority Systems Connected", 
    value: "3–5", 
    description: "for read/write access",
    statLabel: "SYSTEMS"
  },
  { 
    icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5", 
    label: "Action APIs Delivered", 
    value: "6–10", 
    description: "fully governed",
    statLabel: "APIS"
  },
  { 
    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", 
    label: "Agents in Production", 
    value: "2–3", 
    description: "with monitoring",
    statLabel: "AGENTS"
  },
  ];


export const ProductVisual = () => {
  return (
    <section id="success-metrics" data-testid="success-metrics-section" className="success-metrics-section">
      <div className="success-metrics-inner">
        {/* HEADER */}
        <motion.div 
          className="pv-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45 }}
        >
          <span className="z-pill mb-6 text-lg font-semibold">Success Metrics</span>
          <h2 className="pv-heading">
            What to Expect in <span>60–90 Days</span>
          </h2>
          <p className="pv-subtext">
            Proven, measurable outcomes delivered in your first engagement sprint.
          </p>
        </motion.div>

        {/* GRID */}
        <motion.div 
          className="pv-grid"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, delay: 0.07 }}
        >
          {metrics.map((metric, index) => (
            <div key={index} className="pv-card">
              <div className="pv-card-top">
                <div className="pv-icon">
                  <svg viewBox="0 0 24 24">
                    <path d={metric.icon} />
                  </svg>
                </div>
                <div className="pv-stat-wrap">
                  <span className="pv-stat-num">{metric.value}</span>
                  <span className="pv-stat-label">{metric.statLabel}</span>
                </div>
              </div>
              <div className="pv-divider"></div>
              <p className="pv-card-name">{metric.label}</p>
              <p className="pv-card-desc">{metric.description}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
