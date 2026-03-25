import React from "react";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/shared/animations/scrollReveal";
import { Quote } from "lucide-react";
import { TESTIMONIALS } from "@/shared/utils/constants";

export const Testimonials = () => {
  return (
    <section
      id="testimonials"
      data-testid="testimonials-section"
      className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white py-20 dark:from-slate-900 dark:to-slate-800 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className="mb-4 inline-block rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
          >
            Client Results
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="mt-4 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl lg:text-5xl"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            Trusted by Leaders
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mx-auto mt-4 max-w-xl text-base text-slate-500 dark:text-slate-400"
          >
            Enterprise teams choose Zentiti for measurable outcomes and faster execution.
          </motion.p>
        </div>

        <motion.div
          className="mx-auto grid max-w-5xl grid-cols-1 gap-6 lg:grid-cols-2"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.article
              key={testimonial.author}
              variants={staggerItem}
              whileHover={{ y: -6, transition: { duration: 0.2, ease: "easeOut" } }}
              className="group relative rounded-2xl border border-slate-200 bg-white p-8 shadow-sm cursor-default dark:border-slate-700 dark:bg-slate-800"
              style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
            >
              {/* Hover shadow */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ boxShadow: "0 12px 40px rgba(0,0,0,0.09)" }} />

              <motion.div
                whileHover={{ scale: 1.15, rotate: -8 }}
                transition={{ duration: 0.2 }}
                className="mb-4 inline-block"
              >
                <Quote className="h-8 w-8 text-blue-500/30 dark:text-blue-400/30 group-hover:text-blue-500/50 transition-colors duration-200" />
              </motion.div>

              <p className="text-lg font-medium leading-relaxed text-slate-700 dark:text-slate-200">
                "{testimonial.quote}"
              </p>
              <div className="mt-6 flex items-center gap-3">
                <motion.div
                  className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.15 }}
                >
                  <span className="text-sm font-bold text-white">{testimonial.author.charAt(0)}</span>
                </motion.div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{testimonial.author}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
