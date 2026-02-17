import React from "react";
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
  return (
    <div
      className={cn(
        "bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-300",
        hoverEffect && "hover:shadow-2xl hover:-translate-y-2 hover:border-blue-400 cursor-pointer",
        !hoverEffect && "shadow-md",
        className
      )}
      onClick={onClick}
      {...props}
    >
      {image && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={image}
            alt={title}
            className={cn(
              "w-full h-full object-cover",
              hoverEffect && "transition-transform duration-500 group-hover:scale-110"
            )}
          />
          {badge && (
            <div className="absolute top-4 left-4">
              <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                {badge}
              </span>
            </div>
          )}
        </div>
      )}

      <div className="p-6">
        {icon && (
          <div className="mb-4">
            {icon}
          </div>
        )}

        {title && (
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            {title}
          </h3>
        )}

        {description && (
          <p className="text-gray-600 leading-relaxed mb-4">
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
    </div>
  );
};
