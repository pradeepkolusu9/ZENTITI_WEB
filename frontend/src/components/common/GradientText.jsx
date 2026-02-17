import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const GradientText = ({ 
  children, 
  className,
  animate = true,
  gradient = "from-blue-600 via-purple-600 to-pink-600"
}) => {
  return (
    <motion.span
      className={cn(
        "inline-block bg-gradient-to-r bg-clip-text text-transparent",
        gradient,
        animate && "animate-gradient-shift",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.span>
  );
};
