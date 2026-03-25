import React from "react";
import { motion } from "framer-motion";

const KEY_POINTS = [
  {
    num: "01",
    title: "Enterprise-caliber talent",
    desc: "Screened for depth, communication, and delivery track record",
  },
  {
    num: "02",
    title: "Technology-agnostic breadth",
    desc: "From integration specialists to Java, cloud, data, Salesforce, SAP, Oracle, and more",
  },
  {
    num: "03",
    title: "Flexible engagement models",
    desc: "Contract, contract-to-hire, or direct placement scaled to your pipeline",
  },
];

const VALUE_PROPS = [
  {
    title: "Integrated",
    desc: "Staffing + Managed Services under one roof",
  },
  {
    title: "Broad",
    desc: "Coverage across the full enterprise tech stack",
  },
  {
    title: "Flexible",
    desc: "Contract · Contract-to-hire · Direct",
  },
];

const TECH_BOXES = [
  {
    title: "Integration & APIs",
    techs: "MuleSoft · Boomi · Kafka · REST · GraphQL · gRPC",
    accent: true,
  },
  {
    title: "AI & Agents",
    techs: "LLM integration · Agent frameworks · RAG · Prompt engineering",
    accent: false,
  },
  {
    title: "Cloud & DevOps",
    techs: "AWS · Azure · GCP · Kubernetes · Terraform · CI/CD",
    accent: true,
  },
  {
    title: "Data Engineering",
    techs: "Pipelines · Spark · dbt · Snowflake · Databricks · Warehouses",
    accent: false,
  },
  {
    title: "Enterprise Platforms",
    techs: "Salesforce · SAP · Oracle · ServiceNow · Workday",
    accent: true,
  },
  {
    title: "App Dev & Architecture",
    techs: "Java · Python · React · Node · Solution architects · QA · DBAs",
    accent: false,
  },
];

export const StaffingServices = () => {
  return (
    <section
      id="staffing-services"
      data-testid="staffing-services-section"
      className="relative overflow-hidden py-24 sm:py-32"
      style={{ background: "var(--bg-page)" }}
    >
      {/* Ember glow */}
      <div
        className="pointer-events-none absolute right-1/4 top-1/2
          -translate-y-1/2 w-[400px] h-[400px] rounded-full"
        style={{
          background: "var(--ember)",
          filter: "blur(140px)",
          opacity: 0.06,
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">

        {/* ── SECTION 1: The right talent ── */}
        <div className="mb-24">
          {/* Pill */}
          <motion.span
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4 }}
            className="z-pill mb-6 text-lg font-semibold"
          >
            Staffing Services
          </motion.span>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[45fr_55fr] gap-12 lg:gap-20 items-start">

            {/* Left - Headline + Key Points */}
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="font-extrabold leading-[1.08] tracking-[-0.04em]
                  text-[var(--text-primary)] mb-4"
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                }}
              >
                The right talent, when you need it.
              </motion.h2>

              {/* Orange underline */}
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 60 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="h-1 rounded-full mb-8"
                style={{ background: "var(--ember)" }}
              />

              <motion.p
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: 0.12 }}
                className="text-lg leading-relaxed text-[var(--text-secondary)] mb-10 max-w-lg"
              >
                Zentiti offers pre-vetted engineers, architects, and specialists directly
                into client teams across a wide range of technologies.
              </motion.p>

              {/* Key Points */}
              <div className="flex flex-col gap-6">
                {KEY_POINTS.map((point, i) => (
                  <motion.div
                    key={point.num}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
                    className="flex items-start gap-4"
                  >
                    <div
                      className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center
                        text-sm font-bold"
                      style={{
                        background: "var(--bg-section-alt)",
                        color: "var(--ember)",
                        border: "1px solid var(--border-default)",
                      }}
                    >
                      {point.num}
                    </div>
                    <div>
                      <p
                        className="text-base font-bold text-[var(--text-primary)] mb-1"
                        style={{ fontFamily: "'Manrope', sans-serif" }}
                      >
                        {point.title}
                      </p>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                        {point.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right - Value Props Cards */}
            <div className="flex flex-col gap-4 lg:mt-12">
              {VALUE_PROPS.map((prop, i) => (
                <motion.div
                  key={prop.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
                  className="rounded-xl p-6"
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-strong)",
                    borderTop: "3px solid var(--ember)",
                  }}
                >
                  <p
                    className="text-2xl font-extrabold text-[var(--ember)] mb-2"
                    style={{ fontFamily: "'Manrope', sans-serif" }}
                  >
                    {prop.title}
                  </p>
                  <p className="text-sm text-[var(--text-secondary)]">
                    {prop.desc}
                  </p>
                </motion.div>
              ))}
            </div>

          </div>
        </div>

        {/* ── SECTION 2: Technology Spectrum ── */}
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="font-extrabold leading-[1.1] tracking-[-0.03em]
              text-[var(--text-primary)] mb-10"
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
            }}
          >
            Talent across the full technology spectrum
          </motion.h3>

          {/* 6-box grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TECH_BOXES.map((box, i) => (
              <motion.div
                key={box.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="rounded-xl overflow-hidden"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-default)",
                }}
              >
                {/* Header */}
                <div
                  className="px-5 py-3 text-center"
                  style={{
                    background: box.accent ? "rgba(232, 82, 26, 0.85)" : "rgba(37, 99, 235, 0.85)",
                    color: "#fff",
                    borderBottom: "none",
                  }}
                >
                  <p
                    className="text-sm font-bold"
                    style={{ fontFamily: "'Manrope', sans-serif" }}
                  >
                    {box.title}
                  </p>
                </div>
                {/* Body */}
                <div className="px-4 py-5 flex flex-wrap justify-center gap-2">
                  {box.techs.split(" · ").map((tech) => (
                    <span
                      key={tech}
                      className="inline-block px-2.5 py-1 rounded-md text-xs font-medium"
                      style={{
                        background: "var(--bg-section-alt)",
                        border: "1px solid var(--border-default)",
                        color: "var(--text-secondary)",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
