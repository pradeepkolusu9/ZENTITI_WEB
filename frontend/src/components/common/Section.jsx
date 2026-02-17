import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const backgroundVariants = {
  white: "bg-white",
  gray: "bg-gradient-to-b from-gray-50 to-white",
  gradient: "bg-gradient-to-b from-white to-gray-50",
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
  const [isVisible, setIsVisible] = useState(!animate);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!animate) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [animate]);

  return (
    <section
      id={id}
      data-testid={`${id}-section`}
      ref={sectionRef}
      className={cn(
        "py-24",
        backgroundVariants[background],
        className
      )}
      {...props}
    >
      <div className="container mx-auto px-6">
        {(title || subtitle) && (
          <div
            className={cn(
              "text-center mb-16 transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
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
          </div>
        )}

        <div
          className={cn(
            "transition-all duration-700 delay-150",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          {children}
        </div>
      </div>
    </section>
  );
};
