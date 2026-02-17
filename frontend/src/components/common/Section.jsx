import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeInUp, defaultViewport } from "@/utils/animations";

const backgroundVariants = {
  white: "bg-white dark:bg-slate-900",
  gray: "bg-gradient-to-b from-gray-50 to-white dark:from-slate-900 dark:to-slate-800",
  gradient: "bg-gradient-to-b from-white to-gray-50 dark:from-slate-800 dark:to-slate-900",
};

export const Section = ({
  id,
  title,
  subtitle,
  background = "white",
  children,
  animate = true,
  className,
  ...props
}) => {
  return (
    <motion.section
      id={id}
      data-testid={`${id}-section`}
      initial={animate ? "hidden" : "visible"}
      whileInView="visible"
      viewport={defaultViewport}
      variants={fadeInUp}
      className={cn(
        "py-24",
        backgroundVariants[background],
        className
      )}
      {...props}
    >
      <div className="container mx-auto px-6">
        {(title || subtitle) && (
          <motion.div
            className="text-center mb-16"
            initial={animate ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={defaultViewport}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {title && (
              <h2
                data-testid={`${id}-title`}
                className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </motion.div>
        )}

        <motion.div
          initial={animate ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={defaultViewport}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {children}
        </motion.div>
      </div>
    </motion.section>
  );
};
