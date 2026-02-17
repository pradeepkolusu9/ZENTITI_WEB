import React from "react";
import ReactDOM from "react-dom/client";
import "@/index.css";
import App from "@/App";
import { Toaster } from "@/components/ui/sonner";
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
