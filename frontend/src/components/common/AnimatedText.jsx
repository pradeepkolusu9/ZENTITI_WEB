import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export const AnimatedText = ({
  as: Component = "p",
  children,
  delay = 0,
  className,
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      { threshold: 0.1 }
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => {
      if (textRef.current) {
        observer.unobserve(textRef.current);
      }
    };
  }, [delay]);

  return (
    <Component
      ref={textRef}
      className={cn(
        "transition-all duration-700",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};
