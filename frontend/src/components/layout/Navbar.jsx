import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/common/Button";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { slideDown } from "@/utils/animations";

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
    <motion.header
      data-testid="main-header"
      initial="hidden"
      animate="visible"
      variants={slideDown}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            data-testid="company-logo"
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => scrollToSection("hero")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div 
              className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-white font-bold text-xl">Z</span>
            </motion.div>
            <span className={`text-2xl font-bold ${isScrolled ? "text-gray-900 dark:text-white" : "text-white"}`}>
              Zentiti Inc
            </span>
          </motion.div>

          <div className="flex items-center space-x-4">
            <nav className="hidden lg:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  data-testid={`nav-${item.id}`}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${
                    isScrolled ? "text-gray-700 dark:text-gray-300" : "text-white/90"
                  }`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                </motion.button>
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

        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Dark overlay backdrop */}
              <motion.div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setIsMobileMenuOpen(false)}
              />

              {/* Slide-in menu from right */}
              <motion.div 
                data-testid="mobile-menu" 
                className="fixed top-0 right-0 bottom-0 w-80 bg-white dark:bg-slate-800 shadow-2xl z-50 lg:hidden overflow-y-auto"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
              >
                {/* Menu header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-slate-700">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">Z</span>
                    </div>
                    <span className="text-lg font-bold text-gray-900 dark:text-white">Menu</span>
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
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      data-testid={`mobile-nav-${item.id}`}
                      onClick={() => scrollToSection(item.id)}
                      className="text-left text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 py-4 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors text-lg font-medium border-b border-gray-100 dark:border-slate-700 last:border-0"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {item.label}
                    </motion.button>
                  ))}
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};
