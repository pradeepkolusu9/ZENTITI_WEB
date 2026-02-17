import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeInUp, defaultViewport, shouldReduceMotion } from "@/utils/animations";

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
  const reduceMotion = shouldReduceMotion();
  const shouldAnimate = animate && !reduceMotion;

  return (
    <motion.section
      id={id}
      data-testid={`${id}-section`}
      initial={shouldAnimate ? "hidden" : "visible"}
      whileInView="visible"
      viewport={defaultViewport}
      variants={shouldAnimate ? fadeInUp : {}}
      className={cn(
        "py-16 sm:py-20 md:py-24",
        backgroundVariants[background],
        className
      )}
      {...props}
    >
      <div className="container mx-auto px-4 sm:px-6">
        {(title || subtitle) && (
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={shouldAnimate ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={defaultViewport}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {title && (
              <h2
                data-testid={`${id}-title`}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 px-4"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
                {subtitle}
              </p>
            )}
          </motion.div>
        )}

        <motion.div
          initial={shouldAnimate ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
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
