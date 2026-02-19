import React from "react";
import { motion } from "framer-motion";
import { Activity, BarChart3, CheckCircle2, Clock3, TrendingUp } from "lucide-react";

const metrics = [
  { icon: Clock3, label: "Cycle Time", value: "-31%", gradient: "from-blue-500 to-cyan-400" },
  { icon: Activity, label: "Automation Rate", value: "83%", gradient: "from-violet-500 to-purple-400" },
  { icon: BarChart3, label: "Deploy Speed", value: "2x", gradient: "from-emerald-500 to-teal-400" },
  { icon: TrendingUp, label: "Cost Savings", value: "$1.2M", gradient: "from-amber-500 to-orange-400" },
];

export const ProductVisual = () => {
  return (
    <section
      id="product-visual"
      data-testid="product-visual-section"
      className="relative overflow-hidden bg-slate-950 py-20 sm:py-28"
    >
      {/* Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/10 blur-[120px]" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className="mb-4 inline-block rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-violet-400"
          >
            Live Dashboard
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="mt-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            Real-Time Operations Console
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mx-auto mt-4 max-w-xl text-base text-slate-400"
          >
            Track automation health, SLA trends, and cost-efficiency indicators across your entire integration landscape.
          </motion.p>
        </div>

        {/* Dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mx-auto max-w-4xl"
        >
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-[1px] backdrop-blur-sm">
            <div className="rounded-2xl bg-slate-900/80 p-6 sm:p-8">
              {/* Top bar */}
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-emerald-400" />
                  <h3 className="text-base font-semibold text-white">AI Operations Console</h3>
                </div>
                <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
                  Live
                </span>
              </div>

              {/* Metrics grid */}
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {metrics.map((metric, index) => {
                  const Icon = metric.icon;
                  return (
                    <motion.div
                      key={metric.label}
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.4 }}
                      whileHover={{ scale: 1.05, y: -6, transition: { duration: 0.2, ease: "easeOut" } }}
                      className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4 cursor-default"
                    >
                      <div className={`mb-3 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${metric.gradient}`}>
                        <Icon className="h-4 w-4 text-white" />
                      </div>
                      <p className="text-xs text-slate-500">{metric.label}</p>
                      <p className="mt-1 text-2xl font-bold text-white">{metric.value}</p>
                    </motion.div>
                  );
                })}
              </div>

              {/* Activity feed */}
              <div className="mt-6 space-y-3">
                {[
                  { text: "Event Sequencing: 1,247 events processed", time: "2s ago" },
                  { text: "Failed Event Handler: 3 events auto-replayed", time: "14s ago" },
                  { text: "Deployment pipeline completed successfully", time: "1m ago" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: i * 0.08 }}
                    whileHover={{ x: 4, transition: { duration: 0.15 } }}
                    className="flex items-center justify-between rounded-lg border border-white/[0.04] bg-white/[0.02] px-4 py-2.5 cursor-default"
                  >
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                      <span className="text-sm text-slate-300">{item.text}</span>
                    </div>
                    <span className="text-xs text-slate-600">{item.time}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
