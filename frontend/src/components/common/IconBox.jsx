import React from "react";
import { cn } from "@/lib/utils";

const sizeVariants = {
  sm: "w-10 h-10",
  md: "w-14 h-14",
  lg: "w-16 h-16",
};

const gradientVariants = {
  blue: "bg-gradient-to-br from-blue-500 to-cyan-400",
  purple: "bg-gradient-to-br from-purple-500 to-pink-400",
  green: "bg-gradient-to-br from-green-500 to-emerald-400",
  orange: "bg-gradient-to-br from-orange-500 to-amber-400",
};

export const IconBox = ({
  icon,
  size = "md",
  gradient = "blue",
  className,
  ...props
}) => {
  const IconComponent = icon;

  return (
    <div
      className={cn(
        "rounded-xl flex items-center justify-center transition-transform duration-300 hover:scale-110",
        sizeVariants[size],
        gradientVariants[gradient],
        className
      )}
      {...props}
    >
      {IconComponent && <IconComponent className="text-white h-7 w-7" />}
    </div>
  );
};
