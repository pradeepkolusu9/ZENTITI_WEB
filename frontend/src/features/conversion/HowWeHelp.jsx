import React from "react";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/shared/animations/scrollReveal";
import { Link, Zap, Bot, ArrowRight } from "lucide-react";

const steps = [
  {
    title: "CONNECT",
    subtitle: "Read and write across sources reliably",
    description: "Establish secure, reliable connections to all your enterprise systems.",
    bullets: [
      "Integrate systems using flows suited to each source",
      "Expose System APIs for consistent secure access",
      "Enforce security and access controls",
      "Engineer reliability and operational monitoring"
    ],
    tags: ["ERP/CRM", "Databases", "Files & Events", "Third-Party APIs", "Legacy Systems"],
    icon: Link,
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    title: "MAKE ACTIONABLE",
    subtitle: "Turn connectivity into governed business actions",
    description: "Transform raw connectivity into standardized, governed business operations.",
    bullets: [
      "Standardize data and align identifiers",
      "Apply quality checks and enrichment",
      "Compose reusable Action APIs",
      "Govern with policy versioning documentation observability"
    ],
    tags: ["Create Order", "Approve Refund", "Create Return", "Check Eligibility", "Update Customer", "Trigger Notification"],
    icon: Zap,
    gradient: "from-orange-500 to-red-400",
    highlighted: true,
  },
  {
    title: "DEPLOY AGENTS",
    subtitle: "Agents execute outcomes by calling Action APIs",
    description: "Deploy intelligent agents that execute business outcomes using governed APIs.",
    bullets: [
      "Build agents that use Action APIs as tools",
      "Add orchestration routing and fallbacks",
      "Implement guardrails approvals and limits",
      "Monitor outcomes and maintain auditability"
    ],
    tags: ["Guardrails", "Approvals", "Audit Trail"],
    icon: Bot,
    gradient: "from-emerald-500 to-teal-400",
  },
];

export const HowWeHelp = () => {
  return (
    <section id="how-we-help" data-testid="how-we-help-section" className="relative bg-white py-20 dark:bg-slate-900 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.35 }}
            className="mb-4 inline-block rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
          >
            Our Solution
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="mt-4 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl lg:text-5xl"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            A 3-Step Approach That Scales
          </motion.h2>
        </div>

        <motion.div
          className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-10 lg:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.article
                key={step.title}
                variants={staggerItem}
                whileHover={{ y: -6, transition: { duration: 0.2, ease: "easeOut" } }}
                className={`group relative flex flex-col items-start text-start lg:px-6 cursor-default rounded-2xl border p-6 shadow-sm ${
                  step.highlighted 
                    ? 'border-orange-200 bg-orange-50/50 dark:border-orange-800/30 dark:bg-orange-950/20' 
                    : 'border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800'
                }`}
              >
                {/* Connecting arrow (desktop only) */}
                {index < steps.length - 1 && (
                  <div className="pointer-events-none absolute right-0 top-1/2 hidden h-[2px] w-full translate-x-1/2 bg-gradient-to-r from-slate-200 to-transparent dark:from-slate-700 lg:block" />
                )}

                {/* Step header */}
                <div className="flex items-start gap-4">
                  <motion.div
                    className={`relative flex-shrink-0 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${step.gradient} shadow-lg`}
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </motion.div>
                  <div className="flex-1">
                    <h3 className={`text-lg font-bold ${
                      step.highlighted 
                        ? 'text-orange-600 dark:text-orange-400' 
                        : 'text-slate-900 dark:text-white'
                    }`}>{step.title}</h3>
                    <p className="mt-1 text-sm font-medium text-slate-600 dark:text-slate-400">
                      {step.subtitle}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {step.description}
                </p>

                {/* Bullets */}
                <ul className="mt-4 space-y-2">
                  {step.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <div className="mt-0.5 h-1.5 w-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      {bullet}
                    </li>
                  ))}
                </ul>

                {/* Tags */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {step.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`inline-block rounded-full px-2.5 py-1 text-xs font-medium ${
                        step.highlighted 
                          ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300' 
                          : 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Arrow indicator */}
                <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  <span>Learn more</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
