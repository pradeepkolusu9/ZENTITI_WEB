import React from "react";
import { motion } from "framer-motion";
import {
  Building2,
  Target,
  MessageSquare,
  TrendingUp,
  Users,
} from "lucide-react";

const VALUES = [
  {
    title: "Professionalism With Purpose",
    desc: "We conduct ourselves with respect, integrity, and professionalism at all times. Whether engaging with customers or collaborating with colleagues, we value clear communication, mutual respect, and accountability in every interaction.",
    icon: Building2,
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=320&fit=crop&crop=faces",
  },
  {
    title: "Work Hard, Play Hard",
    desc: "We are committed to achieving excellence in our projects while cultivating a healthy, collaborative, and engaging work environment where people can thrive.",
    icon: Target,
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=320&fit=crop&crop=faces",
  },
  {
    title: "Open Communication",
    desc: "We always value communication as a foundation for healthy and professional relationships among teams and for achieving all business objectives.",
    icon: MessageSquare,
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=320&fit=crop&crop=faces",
  },
  {
    title: "Grow Together",
    desc: "We truly believe in the growth of our workforce and the expansion of our company, which is why we support both personal and professional growth.",
    icon: TrendingUp,
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=320&fit=crop&crop=faces",
  },
  {
    title: "Team Before Me",
    desc: "We pride ourselves on the success of the team as a whole, rather than focusing on individual achievements, with a strong emphasis on overall objectives.",
    icon: Users,
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=320&fit=crop&crop=faces",
  },
];

const STYLES = `
  @keyframes cvReveal {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* Responsive grid for core values */
  .cv-grid-top {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
  .cv-grid-bottom {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 20px;
  }
  .cv-grid-bottom-item {
    flex: 0 1 calc(33.333% - 14px);
    max-width: calc(33.333% - 14px);
  }

  @media (max-width: 900px) {
    .cv-grid-top {
      grid-template-columns: repeat(2, 1fr);
    }
    .cv-grid-bottom-item {
      flex: 0 1 calc(50% - 10px);
      max-width: calc(50% - 10px);
    }
  }

  @media (max-width: 560px) {
    .cv-grid-top {
      grid-template-columns: 1fr;
    }
    .cv-grid-bottom {
      flex-direction: column;
      align-items: stretch;
    }
    .cv-grid-bottom-item {
      flex: 1;
      max-width: 100%;
    }
  }
`;

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.1,
      ease: [0.4, 0, 0.2, 1],
    },
  }),
};

const ValueCard = ({ value, index }) => {
  const Icon = value.icon;

  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={cardVariants}
      style={{
        position: "relative",
        borderRadius: 16,
        background: "var(--bg-card)",
        border: "1px solid var(--border-default)",
        overflow: "hidden",
        cursor: "default",
        boxShadow: "var(--shadow-card, 0 2px 8px rgba(0,0,0,0.1))",
        transition:
          "transform 0.35s cubic-bezier(.4,0,.2,1), background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease",
      }}
      whileHover={{
        y: -4,
        transition: { duration: 0.3 },
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "var(--bg-card-hover, var(--bg-card))";
        e.currentTarget.style.borderColor = "var(--border-strong)";
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.15)";
        const divider = e.currentTarget.querySelector(".cv-divider");
        if (divider) divider.style.width = "44px";
        const icon = e.currentTarget.querySelector(".cv-icon");
        if (icon) icon.style.transform = "scale(1.06)";
        const img = e.currentTarget.querySelector(".cv-img");
        if (img) img.style.transform = "scale(1.04)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "var(--bg-card)";
        e.currentTarget.style.borderColor = "var(--border-default)";
        e.currentTarget.style.boxShadow = "var(--shadow-card, 0 2px 8px rgba(0,0,0,0.1))";
        const divider = e.currentTarget.querySelector(".cv-divider");
        if (divider) divider.style.width = "28px";
        const icon = e.currentTarget.querySelector(".cv-icon");
        if (icon) icon.style.transform = "scale(1)";
        const img = e.currentTarget.querySelector(".cv-img");
        if (img) img.style.transform = "scale(1)";
      }}
    >
      {/* Image */}
      <div
        style={{
          width: "100%",
          height: 160,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <img
          className="cv-img"
          src={value.image}
          alt={value.title}
          loading="lazy"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transition: "transform 0.5s cubic-bezier(.4,0,.2,1)",
          }}
        />
        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "60%",
            background:
              "linear-gradient(to top, var(--bg-card) 0%, transparent 100%)",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Content */}
      <div style={{ padding: "20px 24px 28px", position: "relative" }}>
        {/* Floating icon */}
        <div
          className="cv-icon"
          style={{
            width: 44,
            height: 44,
            borderRadius: 11,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            top: -22,
            left: 24,
            zIndex: 2,
            background: "rgba(232, 82, 26, 0.1)",
            color: "var(--ember)",
            border: "2px solid var(--bg-card)",
            transition:
              "transform 0.3s ease, border-color 0.35s ease, background 0.35s ease",
          }}
        >
          <Icon style={{ width: 20, height: 20 }} />
        </div>

        <p
          style={{
            fontSize: 16,
            fontWeight: 700,
            fontFamily: "'Manrope', sans-serif",
            color: "var(--text-primary)",
            margin: "8px 0 10px",
            lineHeight: 1.3,
            letterSpacing: "-0.01em",
          }}
        >
          {value.title}
        </p>

        {/* Divider */}
        <div
          className="cv-divider"
          style={{
            width: 28,
            height: 2,
            borderRadius: 2,
            background: "rgba(232, 82, 26, 0.45)",
            marginBottom: 10,
            transition: "width 0.35s ease",
          }}
        />

        <p
          style={{
            fontSize: 13,
            color: "var(--text-secondary)",
            lineHeight: 1.7,
          }}
        >
          {value.desc}
        </p>
      </div>
    </motion.div>
  );
};

export const CoreValues = () => {
  const topRow = VALUES.slice(0, 3);
  const bottomRow = VALUES.slice(3);

  return (
    <section
      id="core-values"
      data-testid="core-values-section"
      className="relative overflow-hidden py-24 sm:py-32 pb-12 sm:pb-16"
      style={{ background: "var(--bg-section-alt)" }}
    >
      <style>{STYLES}</style>

      
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px] rounded-full"
        style={{
          background: "var(--ember)",
          filter: "blur(120px)",
          opacity: 0.04,
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* ── Header ── */}
        <div
          style={{
            textAlign: "center",
            marginBottom: 60,
          }}
        >
          <motion.span
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4 }}
            className="z-pill mb-6 text-lg font-semibold"
            style={{ 
              display: "inline-flex",
              padding: "0.5rem 1rem",
              gap: "0.5rem"
            }}
          >
                        Our Core Values
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mt-5 font-extrabold leading-[1.08] tracking-[-0.04em] text-[var(--text-primary)]"
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: "clamp(1.4rem, 2.8vw, 2.2rem)",
              textAlign: "center",
            }}
          >
            The Principles That{" "}
            <em
              className="not-italic bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, var(--ember), var(--ember-glow))",
              }}
            >
              Guide Us
            </em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            style={{
              marginTop: 20,
              fontSize: 16,
              color: "var(--text-secondary)",
              lineHeight: 1.7,
              maxWidth: 620,
              marginLeft: "auto",
              marginRight: "auto",
              textAlign: "center",
            }}
          >
            Our core values define our identity, guide our approach, and underpin how we enable enterprises to transform integration challenges into opportunities.
          </motion.p>
        </div>

        {/* ── Top Row (3 cards → 2 on tablet → 1 on mobile) ── */}
        <div className="cv-grid-top">
          {topRow.map((value, i) => (
            <ValueCard key={value.title} value={value} index={i} />
          ))}
        </div>

        {/* ── Bottom Row (2 cards centered → stacked on mobile) ── */}
        <div className="cv-grid-bottom">
          {bottomRow.map((value, i) => (
            <div key={value.title} className="cv-grid-bottom-item">
              <ValueCard value={value} index={i + 3} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};