import React from "react";
import { cn } from "@/lib/utils";

const badgeVariants = {
  primary: "bg-blue-600 text-white",
  secondary: "bg-gray-600 text-white",
  success: "bg-green-600 text-white",
  warning: "bg-amber-600 text-white",
  info: "bg-cyan-600 text-white",
  outline: "border-2 border-blue-600 text-blue-600 bg-transparent",
};

export const Badge = ({
  variant = "primary",
  children,
  className,
  ...props
}) => {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full",
        badgeVariants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
