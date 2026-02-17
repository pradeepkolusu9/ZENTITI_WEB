import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/common/Button";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { label: "Home", id: "hero" },
    { label: "About Us", id: "about" },
    { label: "Services", id: "services" },
    { label: "Industries", id: "industries" },
    { label: "Insights", id: "insights" },
    { label: "Careers", id: "careers" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <header
      data-testid="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div
            data-testid="company-logo"
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => scrollToSection("hero")}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">Z</span>
            </div>
            <span className={`text-2xl font-bold ${isScrolled ? "text-gray-900" : "text-white"}`}>
              Zentiti Inc
            </span>
          </div>

          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                data-testid={`nav-${item.id}`}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                  isScrolled ? "text-gray-700" : "text-white/90"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <Button
            data-testid="mobile-menu-toggle"
            variant="ghost"
            size="sm"
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className={isScrolled ? "text-gray-900" : "text-white"} />
            ) : (
              <Menu className={isScrolled ? "text-gray-900" : "text-white"} />
            )}
          </Button>
        </div>

        {isMobileMenuOpen && (
          <div data-testid="mobile-menu" className="lg:hidden mt-4 pb-4 bg-white rounded-lg shadow-lg">
            <nav className="flex flex-col space-y-2 p-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  data-testid={`mobile-nav-${item.id}`}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left text-gray-700 hover:text-blue-600 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
