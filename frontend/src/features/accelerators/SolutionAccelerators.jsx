import React from "react";
import { motion } from "framer-motion";
import { Play, Zap, ShieldCheck, Search, RotateCcw, Bell, CheckCircle2, Eye, Activity, Wrench } from "lucide-react";
import { Button } from "@/shared/ui";

const accelerators = [
  {
    badge: "Connector",
    title: "Event Sequencing Connector",
    description:
      "Guarantees correct ordering of dependent events across distributed systems. Handles parent/child relationships, retry logic, and sequence validation out of the box.",
    highlight: "50% faster implementation",
    features: ["Built-in retry logic", "Sequence validation", "Parent/child ordering"],
    icon: Zap,
    gradient: "from-blue-500 to-cyan-400",
    glowColor: "blue",
  },
  {
    badge: "Connector",
    title: "Failed Event Handler Connector",
    description:
      "Comprehensive dead-letter queue management with automated classification, alerting, and replay capabilities. Never lose a transaction again.",
    highlight: "Zero lost transactions",
    features: ["Automated error classification", "One-click replay", "Full audit trails"],
    icon: ShieldCheck,
    gradient: "from-violet-500 to-purple-400",
    glowColor: "violet",
  },
  {
    badge: "Portal",
    title: "Debugging & Traceability Portal",
    description:
      "Web-based interface for end-to-end transaction visibility. Search, filter, and replay events across your entire integration landscape.",
    highlight: "Full observability",
    features: ["Real-time monitoring", "Cross-system tracing", "Self-service debugging"],
    icon: Search,
    gradient: "from-emerald-500 to-teal-400",
    glowColor: "emerald",
  },
];

const featureIcons = {
  "Built-in retry logic": RotateCcw,
  "Sequence validation": CheckCircle2,
  "Parent/child ordering": Activity,
  "Automated error classification": Bell,
  "One-click replay": Play,
  "Full audit trails": Eye,
  "Real-time monitoring": Activity,
  "Cross-system tracing": Search,
  "Self-service debugging": Wrench,
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export const SolutionAccelerators = () => {
  return (
    <section
      id="accelerators"
      data-testid="accelerators-section"
      className="relative overflow-hidden bg-slate-950 py-20 sm:py-28"
    >
      {/* Background grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[120px]" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="mx-auto mb-6 max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-4 inline-block rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-blue-400"
          >
            Proprietary IP
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            Solution Accelerators
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="mx-auto mt-4 max-w-2xl text-base text-slate-400 sm:text-lg"
          >
            Pre-built components and tools that reduce implementation time and improve
            reliability—differentiating Zentiti from generic integration providers.
          </motion.p>
        </div>

        {/* Cards grid */}
        <div className="mx-auto mt-14 grid max-w-7xl grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
          {accelerators.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.article
                key={item.title}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                whileHover={{ y: -8, transition: { duration: 0.22, ease: "easeOut" } }}
                className="group relative flex flex-col rounded-2xl border border-white/[0.06] bg-white/[0.03] p-[1px] backdrop-blur-sm cursor-pointer"
              >
                {/* Gradient top border accent */}
                <div className={`h-[2px] rounded-t-2xl bg-gradient-to-r ${item.gradient}`} />

                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  {/* Badge + Icon row */}
                  <div className="mb-5 flex items-center justify-between">
                    <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      {item.badge}
                    </span>
                    <motion.div
                      className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${item.gradient} shadow-lg`}
                      whileHover={{ scale: 1.15, rotate: -6 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Icon className="h-5 w-5 text-white" />
                    </motion.div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold leading-snug text-white sm:text-[22px]">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">
                    {item.description}
                  </p>

                  {/* Highlight stat */}
                  <div className="mt-5 rounded-lg border border-white/[0.06] bg-white/[0.03] px-4 py-3">
                    <p className={`text-sm font-bold bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent`}>
                      {item.highlight}
                    </p>
                  </div>

                  {/* Feature list */}
                  <ul className="mt-5 space-y-2.5">
                    {item.features.map((feature) => {
                      const FeatureIcon = featureIcons[feature] || CheckCircle2;
                      return (
                        <li key={feature} className="flex items-center gap-2.5 group/item">
                          <FeatureIcon className="h-3.5 w-3.5 flex-shrink-0 text-slate-500 group-hover/item:text-slate-300 transition-colors duration-150" />
                          <span className="text-sm text-slate-400 group-hover/item:text-slate-200 transition-colors duration-150">{feature}</span>
                        </li>
                      );
                    })}
                  </ul>

                  {/* Watch Demo button */}
                  <div className="mt-7">
                    <Button
                      variant="outline"
                      size="sm"
                      icon={<Play className="h-3.5 w-3.5" />}
                      className={`w-full border-white/10 text-white hover:border-white/25 hover:bg-white/5`}
                    >
                      Watch Demo
                    </Button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
