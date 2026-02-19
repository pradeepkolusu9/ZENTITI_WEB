import React from "react";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/shared/animations/scrollReveal";
import { Bot, Search, Rocket } from "lucide-react";

const steps = [
  {
    title: "Analyze",
    description: "Map your current workflows and identify the highest-impact automation opportunities.",
    icon: Search,
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    title: "Build",
    description: "Design automation workflows that cut manual effort by 30% using our accelerator toolkit.",
    icon: Bot,
    gradient: "from-violet-500 to-purple-400",
  },
  {
    title: "Scale",
    description: "Deploy across teams 2x faster with governed rollout plans and real-time monitoring.",
    icon: Rocket,
    gradient: "from-emerald-500 to-teal-400",
  },
];

export const HowWeHelp = () => {
  return (
    <section id="how-we-help" data-testid="how-we-help-section" className="relative bg-white py-20 dark:bg-slate-900 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className="mb-4 inline-block rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
          >
            Our Process
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="mt-4 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl lg:text-5xl"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            How We Help
          </motion.h2>
        </div>

        <motion.div
          className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-10 lg:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
        >
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.article
                key={step.title}
                variants={staggerItem}
                whileHover={{ y: -6, transition: { duration: 0.2, ease: "easeOut" } }}
                className="group relative flex flex-col items-center text-center lg:px-8 cursor-default"
              >
                {/* Connecting line (desktop only) */}
                {index < steps.length - 1 && (
                  <div className="pointer-events-none absolute right-0 top-8 hidden h-[2px] w-full translate-x-1/2 bg-gradient-to-r from-slate-200 to-transparent dark:from-slate-700 lg:block" />
                )}

                {/* Step icon with hover scale */}
                <motion.div
                  className={`relative mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${step.gradient} shadow-lg`}
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Icon className="h-7 w-7 text-white" />
                  <motion.span
                    className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-[11px] font-bold text-white dark:bg-white dark:text-slate-900"
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 0.15 }}
                  >
                    {index + 1}
                  </motion.span>
                </motion.div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">{step.title}</h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-slate-500 dark:text-slate-400">{step.description}</p>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
