import React from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const buttonVariants = {
  primary: "bg-orange-600 text-white hover:bg-orange-700 shadow-lg hover:shadow-xl",
  secondary: "bg-gray-600 text-white hover:bg-gray-700 shadow-md hover:shadow-lg",
  outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950",
  ghost: "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800",
};

const buttonSizes = {
  sm: "px-4 py-2 text-sm min-h-[44px] min-w-[44px]",
  md: "px-6 py-3 text-base min-h-[44px]",
  lg: "px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg min-h-[48px]",
};

export const Button = ({
  variant = "primary",
  size = "md",
  loading = false,
  icon,
  iconPosition = "left",
  children,
  className,
  disabled,
  ...props
}) => {
  const isDisabled = disabled || loading;

  return (
    <motion.button
      className={cn(
        "inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
        buttonVariants[variant],
        buttonSizes[size],
        className
      )}
      whileHover={!isDisabled ? { scale: 1.02 } : undefined}
      whileTap={!isDisabled ? { scale: 0.99 } : undefined}
      transition={{ duration: 0.15, ease: "easeOut" }}
      disabled={isDisabled}
      {...props}
    >
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {!loading && icon && iconPosition === "left" && (
        <span className="mr-2">{icon}</span>
      )}
      {children}
      {!loading && icon && iconPosition === "right" && (
        <span className="ml-2">{icon}</span>
      )}
    </motion.button>
  );
};
