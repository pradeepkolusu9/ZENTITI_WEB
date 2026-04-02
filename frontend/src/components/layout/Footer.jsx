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
      <div className="mx-auto max-w-7xl px-6 pt-10 pb-4">

        {/* Main grid — stacked on mobile, side-by-side on md+ */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">

          {/* Brand column */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left gap-4">
            <img src="/logo.png" alt="Zentiti" className="h-9 w-auto" />
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: "var(--text-secondary)" }}>
              Turning fragmented enterprise data into integrated and agent-powered intelligence.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://www.linkedin.com/company/zentiti/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex items-center justify-center w-14 h-14 md:w-11 md:h-11 rounded-full transition-all hover:opacity-80"
                style={{
                  background: "rgba(59,130,246,0.12)",
                  border: "1px solid rgba(59,130,246,0.3)"
                }}
              >
                <Linkedin className="w-7 h-7 md:w-5 md:h-5" style={{ color: "#60A5FA" }} />
              </a>
              <a
                href="mailto:info@zentiti.com"
                aria-label="Email"
                className="flex items-center justify-center w-14 h-14 md:w-11 md:h-11 rounded-full transition-all hover:opacity-80"
                style={{
                  background: "rgba(232,82,26,0.12)",
                  border: "1px solid rgba(232,82,26,0.3)"
                }}
              >
                <Mail className="w-7 h-7 md:w-5 md:h-5" style={{ color: "#F97316" }} />
              </a>
            </div>
          </div>

          {/* Contact column */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left gap-4">
            <h4
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: "var(--text-primary)" }}
            >
              Contact
            </h4>
            <a
              href="mailto:info@zentiti.com"
              className="flex items-center gap-3 group w-full justify-center md:justify-start"
            >
              <span
                className="flex items-center justify-center w-8 h-8 rounded-lg flex-shrink-0"
                style={{
                  background: "rgba(59,130,246,0.12)",
                  border: "1px solid rgba(59,130,246,0.3)"
                }}
              >
                <Mail size={20} style={{ color: "#60A5FA" }} />
              </span>
              <span
                className="text-sm group-hover:underline"
                style={{ color: "var(--text-secondary)" }}
              >
                info@zentiti.com
              </span>
            </a>
          </div>

        </div>

        {/* Bottom bar */}
        <div
          className="mt-8 pt-5 border-t flex flex-col items-center md:flex-row md:justify-between gap-2"
          style={{ borderColor: "var(--border-default)" }}
        >
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            © {currentYear} Zentiti Inc. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

Footer.displayName = "Footer";
