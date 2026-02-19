import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/common/Button";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { ZentitiLogo } from "@/components/common/ZentitiLogo";

export const Navbar = React.memo(() => {
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
    { label: "About", id: "about" },
    { label: "Solutions", id: "services" },
    { label: "Accelerators", id: "accelerators" },
    { label: "Industries", id: "industries" },
    { label: "Testimonials", id: "testimonials" },
  ];

  return (
    <header
      data-testid="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div
            data-testid="company-logo"
            className="flex items-center cursor-pointer"
            onClick={() => scrollToSection("hero")}
          >
            <ZentitiLogo white={!isScrolled} height="36px" />
          </div>

          <div className="flex items-center space-x-4">
            <nav className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  data-testid={`nav-${item.id}`}
                  onClick={() => scrollToSection(item.id)}
                  className={`group relative text-sm font-medium transition-colors duration-200 hover:text-blue-600 dark:hover:text-blue-400 ${
                    isScrolled ? "text-gray-700 dark:text-gray-300" : "text-white/90"
                  }`}
                >
                  {item.label}
                  <span className="absolute -bottom-0.5 left-0 h-[2px] w-0 rounded-full bg-blue-600 transition-all duration-200 group-hover:w-full dark:bg-blue-400" />
                </button>
              ))}
            </nav>

            {/* Theme Toggle */}
            <ThemeToggle />

            <Button
              data-testid="mobile-menu-toggle"
              variant="ghost"
              size="sm"
              className="lg:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className={isScrolled ? "text-gray-900 dark:text-white" : "text-white"} />
              ) : (
                <Menu className={isScrolled ? "text-gray-900 dark:text-white" : "text-white"} />
              )}
            </Button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            <div
              data-testid="mobile-menu"
              className="fixed top-0 right-0 bottom-0 w-80 bg-white dark:bg-slate-800 shadow-2xl z-50 lg:hidden overflow-y-auto"
            >
                {/* Menu header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-slate-700">
                  <div className="flex items-center">
                    <ZentitiLogo height="30px" />
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                    aria-label="Close menu"
                  >
                    <X className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                  </button>
                </div>

                {/* Menu items */}
                <nav className="flex flex-col p-4">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      data-testid={`mobile-nav-${item.id}`}
                      onClick={() => scrollToSection(item.id)}
                      className="text-left text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 py-4 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors text-lg font-medium border-b border-gray-100 dark:border-slate-700 last:border-0"
                    >
                      {item.label}
                    </button>
                  ))}
                </nav>
              </div>
            </>
          )}
      </div>
    </header>
  );
});

Navbar.displayName = "Navbar";
