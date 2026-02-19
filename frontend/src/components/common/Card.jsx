import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const toWebpUrl = (url) => {
  if (!url) return url;
  if (url.includes("fm=jpg")) {
    return url.replace("fm=jpg", "fm=webp");
  }

  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}fm=webp`;
};

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
  const imageWebp = toWebpUrl(image);

  return (
    <motion.div
      className={cn(
        "bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 overflow-hidden shadow-md dark:shadow-slate-900/50",
        hoverEffect && "cursor-pointer hover:shadow-xl hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-200",
        className
      )}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      onClick={onClick}
      {...props}
    >
      {image && (
        <div className="relative h-48 overflow-hidden">
          <picture>
            <source srcSet={imageWebp} type="image/webp" />
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </picture>
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
        {icon && <div className="mb-4">{icon}</div>}

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
    </motion.div>
  );
};
