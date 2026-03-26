import React from "react";
import { Linkedin, Twitter, Mail, MapPin, Phone } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <footer 
      data-testid="footer" 
      className="relative"
      style={{ 
        background: "var(--bg-page)",
        borderTop: "1px solid var(--border-default)"
      }}
    >
      <div className="container mx-auto px-6 py-10 max-w-4xl">

        {/* Top row: brand left, contact right */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">

          {/* Left — brand */}
          <div className="flex flex-col gap-3">
            <img src="/logo.png" alt="Zentiti" className="h-8 w-auto" />
            <p className="text-xs leading-relaxed max-w-[220px]" style={{ color: "var(--text-secondary)" }}>
              Transforming enterprise integration challenges into intelligent solutions.
            </p>
            <div className="flex gap-4 mt-1">
              <a
                href="#"
                className="transition-opacity hover:opacity-70"
              >
                <Linkedin className="w-5 h-5" style={{ color: "var(--text-muted)" }} />
              </a>
              <a
                href="mailto:info@zentiti.com"
                className="transition-opacity hover:opacity-70"
              >
                <Mail className="w-5 h-5" style={{ color: "var(--text-muted)" }} />
              </a>
            </div>
          </div>

          {/* Right — contact */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-primary)" }}>
              Contact
            </p>
            <div className="flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: "var(--accent-blue)" }} />
              <div>
                <p className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>Headquarters</p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                  1464 E Whitestone Blvd, Ste 1902<br />Cedar Park, TX 78613
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "var(--accent-blue)" }} />
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>info@zentiti.com</p>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-4 border-t" style={{ borderColor: "var(--border-default)" }}>
          <p className="text-xs text-center" style={{ color: "var(--text-muted)" }}>
            © {currentYear} Zentiti Inc. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

Footer.displayName = "Footer";
