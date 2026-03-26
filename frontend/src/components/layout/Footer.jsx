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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Company Logo & Info */}
          <div className="space-y-4">
            <img 
                  src="/logo.png" 
                  alt="Zentiti"
                  className="h-9 w-auto"
                />
            
            <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Transforming enterprise integration challenges into intelligent solutions.
            </p>

            <div className="flex space-x-4 sm:space-x-3">
              <a 
                href="#" 
                className="w-14 h-14 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center transition-all hover:scale-105"
                style={{ 
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-default)"
                }}
              >
                <Linkedin className="w-7 h-7 sm:w-5 sm:h-5" style={{ color: "var(--accent-blue)" }} />
              </a>
              <a 
                href="#" 
                className="w-14 h-14 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center transition-all hover:scale-105"
                style={{ 
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-default)"
                }}
              >
                <Twitter className="w-7 h-7 sm:w-5 sm:h-5" style={{ color: "var(--accent-blue)" }} />
              </a>
              <a 
                href="#" 
                className="w-14 h-14 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center transition-all hover:scale-105"
                style={{ 
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-default)"
                }}
              >
                <Mail className="w-7 h-7 sm:w-5 sm:h-5" style={{ color: "var(--accent-blue)" }} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-primary)" }}>
              Quick Links
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={() => scrollTo("about")} 
                className="text-xs transition-colors hover:text-[var(--accent-blue)] text-left cursor-pointer" 
                style={{ color: "var(--text-secondary)" }}
              >
                About Us
              </button>
              <button 
                onClick={() => scrollTo("industries")} 
                className="text-xs transition-colors hover:text-[var(--accent-blue)] text-left cursor-pointer" 
                style={{ color: "var(--text-secondary)" }}
              >
                Services
              </button>
              <button 
                onClick={() => scrollTo("case-studies")} 
                className="text-xs transition-colors hover:text-[var(--accent-blue)] text-left cursor-pointer" 
                style={{ color: "var(--text-secondary)" }}
              >
                Case Studies
              </button>
              <button 
                onClick={() => scrollTo("careers")} 
                className="text-xs transition-colors hover:text-[var(--accent-blue)] text-left cursor-pointer" 
                style={{ color: "var(--text-secondary)" }}
              >
                Careers
              </button>
              <button 
                onClick={() => scrollTo("contact")} 
                className="text-xs transition-colors hover:text-[var(--accent-blue)] text-left cursor-pointer" 
                style={{ color: "var(--text-secondary)" }}
              >
                Contact
              </button>
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
                  <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                    locations
                  </p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                    1464 E Whitestone Blvd, Ste 1902, Cedar Park, TX 78613
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div 
          className="mt-6 pt-4 border-t flex flex-col md:flex-row justify-between items-center"
          style={{ borderColor: "var(--border-default)" }}
        >
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            © {currentYear} Zentiti Inc. All rights reserved.
          </p>
          
          <div className="flex space-x-4 mt-2 md:mt-0">
            <a href="#" className="text-xs transition-colors hover:text-blue-500" style={{ color: "var(--text-muted)" }}>
              Privacy
            </a>
            <a href="#" className="text-xs transition-colors hover:text-blue-500" style={{ color: "var(--text-muted)" }}>
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

Footer.displayName = "Footer";
