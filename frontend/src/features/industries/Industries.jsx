import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { INDUSTRIES } from "@/shared/utils/constants";
import { staggerContainer, staggerItem } from "@/shared/animations/scrollReveal";

const gradients = [
  "from-blue-500 to-cyan-400",
  "from-rose-500 to-pink-400",
  "from-amber-500 to-orange-400",
  "from-emerald-500 to-teal-400",
  "from-violet-500 to-purple-400",
  "from-indigo-500 to-blue-400",
];

export const Industries = () => {
  return (
    <section
      id="industries"
      data-testid="industries-section"
      className="relative bg-white py-20 dark:bg-slate-900 sm:py-28"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className="mb-4 inline-block rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
          >
            Sectors
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="mt-4 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl lg:text-5xl"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            Industries We Serve
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mx-auto mt-4 max-w-xl text-base text-slate-500 dark:text-slate-400"
          >
            Delivering measurable results across regulated and high-growth sectors.
          </motion.p>
        </div>

        <motion.div
          className="mx-auto grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
        >
          {INDUSTRIES.map((industry, index) => {
            const Icon = industry.icon;
            const gradient = gradients[index % gradients.length];

            return (
              <motion.article
                key={index}
                data-testid={`industry-card-${index}`}
                variants={staggerItem}
                whileHover={{ y: -5, transition: { duration: 0.2, ease: "easeOut" } }}
                className="group relative flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm cursor-pointer dark:border-slate-700 dark:bg-slate-800"
                style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
              >
                {/* Hover glow */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ boxShadow: "0 10px 36px rgba(0,0,0,0.09)" }} />

                <motion.div
                  className={`flex-shrink-0 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} shadow-md`}
                  whileHover={{ scale: 1.12, rotate: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Icon className="h-5 w-5 text-white" />
                </motion.div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">{industry.title}</h3>
                    <ArrowUpRight className="h-4 w-4 text-slate-300 opacity-0 group-hover:opacity-100 group-hover:text-blue-500 transition-all duration-200 flex-shrink-0" />
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{industry.description}</p>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
