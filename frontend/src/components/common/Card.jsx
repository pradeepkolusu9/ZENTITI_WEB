import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const Card = ({
  icon,
  image,
  title,
  description,
  badge,
  footer,
  hoverEffect = true,
  className,
  onClick,
  children,
  ...props
}) => {
  const MotionDiv = hoverEffect ? motion.div : "div";
  
  const hoverAnimation = hoverEffect ? {
    whileHover: {
      y: -4,
      transition: { duration: 0.2, ease: "easeOut" }
    }
  } : {};

  return (
    <MotionDiv
      className={cn(
        "bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 overflow-hidden shadow-md dark:shadow-slate-900/50",
        hoverEffect && "cursor-pointer hover:shadow-xl hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-200",
        className
      )}
      onClick={onClick}
      {...hoverAnimation}
      {...props}
    >
      {image && (
        <div className="relative h-48 overflow-hidden">
          <motion.img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            whileHover={hoverEffect ? { scale: 1.1 } : {}}
            transition={{ duration: 0.5 }}
          />
          {badge && (
            <div className="absolute top-4 left-4">
              <motion.span
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 200,
                  damping: 15,
                  delay: 0.2
                }}
                className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full"
              >
                {badge}
              </motion.span>
            </div>
          )}
        </div>
      )}

      <div className="p-6">
        {icon && (
          <motion.div 
            className="mb-4"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            {icon}
          </motion.div>
        )}

        {title && (
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 transition-colors duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
            {title}
          </h3>
        )}

        {description && (
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            {description}
          </p>
        )}

        {children}
      </div>

      {footer && (
        <div className="px-6 pb-6 pt-2 border-t border-gray-100">
          {footer}
        </div>
      )}
    </MotionDiv>
  );
};
