import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SERVICES } from "@/shared/utils/constants";
import { staggerContainer, staggerItem } from "@/shared/animations/scrollReveal";

const gradients = [
  "from-blue-500 to-cyan-400",
  "from-violet-500 to-purple-400",
  "from-emerald-500 to-teal-400",
  "from-amber-500 to-orange-400",
  "from-rose-500 to-pink-400",
  "from-indigo-500 to-blue-400",
];

const metrics = ["28%", "40%", "30%", "45%", "2x", "real time"];

export const Services = () => {
  return (
    <section
      id="services"
      data-testid="services-section"
      className="relative bg-gradient-to-b from-slate-50 to-white py-20 dark:from-slate-900 dark:to-slate-800 sm:py-28"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className="mb-4 inline-block rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
          >
            What We Do
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="mt-4 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl lg:text-5xl"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            Solutions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mx-auto mt-4 max-w-xl text-base text-slate-500 dark:text-slate-400"
          >
            Targeted execution plans to reduce costs, automate workflows, and deploy faster.
          </motion.p>
        </div>

        <motion.div
          className="mx-auto grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
        >
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            const gradient = gradients[index % gradients.length];
            const metric = metrics[index];

            return (
              <motion.article
                key={index}
                data-testid={`service-card-${index}`}
                variants={staggerItem}
                whileHover={{ y: -6, transition: { duration: 0.2, ease: "easeOut" } }}
                className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm cursor-pointer dark:border-slate-700 dark:bg-slate-800 sm:p-7"
                style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
              >
                {/* Hover shadow overlay via motion */}
                <motion.div
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ boxShadow: "0 12px 40px rgba(0,0,0,0.10)" }}
                />

                {/* Top row: icon + metric chip */}
                <div className="mb-5 flex items-start justify-between">
                  <motion.div
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} shadow-md`}
                    whileHover={{ scale: 1.1, rotate: -4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </motion.div>
                  <span className={`rounded-full bg-gradient-to-r ${gradient} px-2.5 py-1 text-[11px] font-bold text-white shadow-sm`}>
                    {metric}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                  {service.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                  {service.description}
                </p>

                {/* Arrow indicator */}
                <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  <span>Learn more</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
