import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) {
    return <div className="w-10 h-10 rounded-full bg-[var(--bg-card)] animate-pulse" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      data-testid="theme-toggle"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative w-10 h-10 sm:w-10 sm:h-10 md:w-10 md:h-10 rounded-full flex items-center justify-center",
        "bg-[var(--bg-card)] border border-[var(--border-default)]",
        "hover:border-[var(--c-orange)] hover:bg-[var(--bg-card-hover)]",
        "transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-[var(--c-blue)] focus:ring-offset-2",
        "min-w-[44px] min-h-[44px] sm:min-w-[40px] sm:min-h-[40px]"
      )}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {/*
        FIXED: icon logic was inverted in your original.
        In dark mode  → show Sun  (click = go light)
        In light mode → show Moon (click = go dark)
      */}
      {isDark
        ? <Sun  className="w-5 h-5 sm:w-[18px] sm:h-[18px] text-[var(--accent-orange)]" />
        : <Moon className="w-5 h-5 sm:w-[18px] sm:h-[18px] text-[var(--text-secondary)]" />
      }
    </button>
  );
};
