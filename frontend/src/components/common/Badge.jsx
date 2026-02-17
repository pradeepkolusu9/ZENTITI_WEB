import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const badgeVariants = {
  primary: "bg-blue-600 text-white",
  secondary: "bg-gray-600 text-white",
  success: "bg-green-600 text-white",
  warning: "bg-amber-600 text-white",
  info: "bg-cyan-600 text-white",
  outline: "border-2 border-blue-600 text-blue-600 bg-transparent",
};

const badgeBounceVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { 
      type: "spring", 
      stiffness: 200,
      damping: 15
    }
  }
};

export const Badge = ({
  variant = "primary",
  children,
  className,
  animate = true,
  ...props
}) => {
  const Component = animate ? motion.span : "span";
  
  const animationProps = animate ? {
    initial: "hidden",
    animate: "visible",
    variants: badgeBounceVariants,
  } : {};

  return (
    <Component
      className={cn(
        "inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full",
        badgeVariants[variant],
        className
      )}
      {...animationProps}
      {...props}
    >
      {children}
    </Component>
  );
};
