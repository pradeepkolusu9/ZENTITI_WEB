// ── ANTI-FLASH SCRIPT ──
// Prevents flash of incorrect theme on page load
// Must run BEFORE React renders
(function() {
  const storageKey = 'zentiti-theme';
  const theme = localStorage.getItem(storageKey) || 
                (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  
  // Apply theme class to html element immediately
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  
  // Store on html element for ThemeToggle to read
  document.documentElement.setAttribute('data-theme', theme);
})();

import React from "react";
import ReactDOM from "react-dom/client";
import "@/index.css";
import App from "@/App";
import { Toaster } from "@/shared/ui";
import { ThemeProvider } from "next-themes";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      storageKey="zentiti-theme"
      disableTransitionOnChange={false}
    >
      <App />
      <Toaster position="top-right" />
    </ThemeProvider>
  </React.StrictMode>,
);
