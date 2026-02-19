import React from "react";
import { motion } from "framer-motion";
import { Eye, Target, Cpu, Users } from "lucide-react";

const ABOUT_IMAGE_JPG =
  "https://images.unsplash.com/photo-1698047682129-c3e217ac08b7?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NDh8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBvZmZpY2UlMjBtb2Rlcm4lMjB0ZWNobm9sb2d5JTIwdGVhbXxlbnwwfHx8fDE3NzA5ODA5ODN8MA&ixlib=rb-4.1.0&q=85";
const ABOUT_IMAGE_WEBP = ABOUT_IMAGE_JPG.replace("fm=jpg", "fm=webp");

const pillars = [
  {
    icon: Cpu,
    label: "Engineering-First",
    description: "We are engineers who treat integration with the precision it deserves.",
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    icon: Users,
    label: "Customer-Obsessed",
    description: "Long-term partnerships built on measurable outcomes, not promises.",
    gradient: "from-violet-500 to-purple-400",
  },
  {
    icon: Eye,
    label: "Our Vision",
    description: "Future-Ready Agentic AI, Legacy-Aware by Design.",
    gradient: "from-emerald-500 to-teal-400",
  },
  {
    icon: Target,
    label: "Our Mission",
    description: "Turn fragmented integration landscapes into intelligent platforms.",
    gradient: "from-amber-500 to-orange-400",
  },
];

export const About = () => {
  return (
    <section
      id="about"
      data-testid="about-section"
      className="relative bg-gradient-to-b from-slate-50 to-white py-20 dark:from-slate-900 dark:to-slate-800 sm:py-28"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">

          {/* Left — content */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35 }}
              className="mb-4 inline-block rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
            >
              About Zentiti
            </motion.span>

            <motion.h2
              data-testid="about-title"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="mt-4 text-3xl font-bold leading-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              Engineering-First,{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Customer-Obsessed
              </span>
            </motion.h2>

            <motion.p
              data-testid="about-description"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="mt-5 text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg"
            >
              Zentiti Inc is not just another integration consultancy. We are engineers who
              understand that enterprise integration is the circulatory system of modern
              business—and we treat it with the respect and precision it deserves.
            </motion.p>

            {/* Vision & Mission cards */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.15 }}
              className="mt-8 space-y-4"
            >
              <motion.div
                whileHover={{ y: -4, transition: { duration: 0.2, ease: "easeOut" } }}
                className="rounded-2xl border border-blue-100 bg-blue-50 p-5 cursor-default dark:border-blue-900/30 dark:bg-blue-900/10"
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">Our Vision</p>
                <p className="mt-1.5 text-base font-semibold text-slate-900 dark:text-white">
                  "Future-Ready Agentic AI, Legacy-Aware by Design."
                </p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  The path to intelligent automation runs through, not around, your existing systems.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -4, transition: { duration: 0.2, ease: "easeOut" } }}
                className="rounded-2xl border border-violet-100 bg-violet-50 p-5 cursor-default dark:border-violet-900/30 dark:bg-violet-900/10"
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400">Our Mission</p>
                <p className="mt-1.5 text-base font-semibold text-slate-900 dark:text-white">
                  Turn fragmented integration landscapes into intelligent platforms.
                </p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  We combine deep integrations expertise with an agentic mindset—respecting what
                  works while modernizing what doesn't.
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* Right — image + stat */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-2xl group/img">
              <picture>
                <source srcSet={ABOUT_IMAGE_WEBP} type="image/webp" />
                <img
                  src={ABOUT_IMAGE_JPG}
                  alt="Zentiti engineering team"
                  width="1280"
                  height="960"
                  className="aspect-[4/3] h-auto w-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </picture>
            </div>

            {/* Floating stat card */}
            <div className="absolute -bottom-6 -left-6 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 p-6 text-white shadow-xl">
              <div className="text-4xl font-extrabold">10+</div>
              <div className="mt-1 text-sm font-medium opacity-90">Years of Excellence</div>
            </div>

            {/* Pillars grid — bottom right overlay */}
            <div className="absolute -right-4 -top-4 grid grid-cols-2 gap-2">
              {pillars.slice(0, 2).map((p) => {
                const Icon = p.icon;
                return (
                  <div
                    key={p.label}
                    className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${p.gradient} shadow-lg`}
                  >
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
