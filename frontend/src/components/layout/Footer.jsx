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
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Company Logo & Info */}
          <div className="space-y-4">
            <img src="/logo.png" alt="Zentiti" className="h-9 w-auto" />
            <p className="text-xs leading-relaxed max-w-xs" style={{ color: "var(--text-secondary)" }}>
              Transforming enterprise integration challenges into intelligent solutions.
            </p>
            <div className="flex space-x-3">
              <a href="https://www.linkedin.com/company/zentiti/" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-70">
                <Linkedin className="w-5 h-5" style={{ color: "var(--text-secondary)" }} />
              </a>
              <a href="mailto:info@zentiti.com" className="transition-opacity hover:opacity-70">
                <Mail className="w-5 h-5" style={{ color: "var(--text-secondary)" }} />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-primary)" }}>
              Contact
            </h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "var(--accent-blue)" }} />
                <div>
                  <p className="text-xs" style={{ color: "var(--text-secondary)" }}>Headquarters</p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                    1464 E Whitestone Blvd, Ste 1902, Cedar Park, TX 78613
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "var(--accent-blue)" }} />
                <div>
                  <p className="text-xs" style={{ color: "var(--text-secondary)" }}>Email</p>
                  <a href="mailto:info@zentiti.com" className="text-xs hover:underline" style={{ color: "var(--text-muted)" }}>info@zentiti.com</a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-6 pt-4 border-t" style={{ borderColor: "var(--border-default)" }}>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            © {currentYear} Zentiti Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

Footer.displayName = "Footer";
