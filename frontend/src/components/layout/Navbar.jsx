import React, { useState, useEffect } from "react";

import { Menu, X, ArrowRight } from "lucide-react";

import { Button } from "@/components/common/Button";

import { ThemeToggle } from "@/components/common/ThemeToggle";

import { ZentitiLogo } from "@/components/common/ZentitiLogo";

import { ContactModal } from "@/components/ContactModal";



// ─── Nav structure: 5 groups instead of 11 flat items ───────────────────────

const NAV_GROUPS = [

  { label: "Home",        id: "hero",             children: [] },

  {

    label: "Approach",    id: "challenge",

    children: [

      { label: "The Challenge",    id: "challenge"       },

      { label: "Engagement Model", id: "engagement-model" },

    ],

  },

  {

    label: "Solutions",   id: "services",

    children: [

      { label: "MuleSoft COE",    id: "mulesoft-coe"     },

      { label: "Staffing Services",id: "staffing-services"},

      { label: "Accelerators",    id: "accelerators"     },

    ],

  },

  {

    label: "Industries",  id: "industries",       children: [] },

  {

    label: "Company",     id: "about",

    children: [

      { label: "About",        id: "about"       },

      { label: "Case Studies", id: "case-studies" },

    ],

  },

];



// flat list for mobile (all items)

const MOBILE_ITEMS = NAV_GROUPS.flatMap((g) =>

  g.children.length ? g.children : [{ label: g.label, id: g.id }]

);



export const Navbar = React.memo(() => {

  const [isScrolled,       setIsScrolled]       = useState(false);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [openDropdown,     setOpenDropdown]     = useState(null);

  const [isContactModalOpen, setIsContactModalOpen] = useState(false);



  useEffect(() => {

    const onScroll = () => setIsScrolled(window.scrollY > 20);

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);

  }, []);



  // close dropdown on outside click

  useEffect(() => {

    const close = () => setOpenDropdown(null);

    document.addEventListener("click", close);

    return () => document.removeEventListener("click", close);

  }, []);



  const scrollTo = (id) => {

    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

    setIsMobileMenuOpen(false);

    setOpenDropdown(null);

  };



  // ─── scrolled state styles ───────────────────────────────────────────────

  const navBg = isScrolled

    ? "bg-[var(--nav-bg)] shadow-md border-b border-[var(--nav-border)]"

    : "bg-transparent";



  const linkColor = isScrolled

    ? "text-[var(--nav-text)]"

    : "text-white/90";



  return (

    <header

      data-testid="main-header"

      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md ${navBg}`}

    >

      <div className="container mx-auto px-6 py-4">

        <div className="flex items-center justify-between">



          {/* Logo */}

          <div

            data-testid="company-logo"

            className="flex items-center cursor-pointer"

            onClick={() => scrollTo("hero")}

          >

            <ZentitiLogo white={!isScrolled} height="36px" />

          </div>



          {/* Desktop nav */}

          <nav className="hidden lg:flex items-center space-x-1">

            {NAV_GROUPS.map((group) => (

              <div key={group.id} className="relative">

                {group.children.length === 0 ? (

                  /* Plain link */

                  <button

                    data-testid={`nav-${group.id}`}

                    onClick={() => scrollTo(group.id)}

                    className={`group relative px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-md

                      hover:text-[var(--brand-orange)] ${linkColor}`}

                  >

                    {group.label}

                    {/* orange active underline */}

                    <span className="absolute -bottom-0.5 left-3 right-3 h-[2px] w-0 rounded-full

                      bg-[var(--brand-orange)] transition-all duration-200 group-hover:w-[calc(100%-24px)]" />

                  </button>

                ) : (

                  /* Dropdown group */

                  <button

                    data-testid={`nav-${group.id}`}

                    onClick={(e) => {

                      e.stopPropagation();

                      setOpenDropdown(openDropdown === group.id ? null : group.id);

                    }}

                    className={`group relative px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-md

                      hover:text-[var(--brand-orange)] ${linkColor} flex items-center gap-1`}

                  >

                    {group.label}

                    <svg

                      className={`w-3 h-3 transition-transform duration-200

                        ${openDropdown === group.id ? "rotate-180" : ""}`}

                      fill="none" viewBox="0 0 24 24" stroke="currentColor"

                    >

                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />

                    </svg>

                  </button>

                )}



                {/* Dropdown panel */}

                {group.children.length > 0 && openDropdown === group.id && (

                  <div

                    onClick={(e) => e.stopPropagation()}

                    className="absolute top-full left-0 mt-2 w-52 rounded-xl border

                      border-[var(--border-default)] bg-[var(--bg-card)]

                      shadow-[var(--shadow-card-hover)] py-1 z-50"

                  >

                    {group.children.map((child) => (

                      <button

                        key={child.id}

                        onClick={() => scrollTo(child.id)}

                        className="w-full text-left px-4 py-2.5 text-sm

                          text-[var(--text-secondary)] hover:text-[var(--brand-orange)]

                          hover:bg-[var(--bg-card-hover)] transition-colors"

                      >

                        {child.label}

                      </button>

                    ))}

                  </div>

                )}

              </div>

            ))}

          </nav>



          {/* Right controls */}

          <div className="flex items-center gap-3">

            {/* CTA — desktop only */}

            <button

              data-testid="nav-cta"

              onClick={() => setIsContactModalOpen(true)}

              className="hidden lg:flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold

                bg-[var(--brand-orange)] text-white

                hover:bg-[var(--brand-orange-dark)] transition-colors duration-200"

            >

              Book Consultation

              <ArrowRight className="w-4 h-4" />

            </button>



            <ThemeToggle />



            {/* Mobile hamburger */}

            <Button

              data-testid="mobile-menu-toggle"

              variant="ghost"

              size="sm"

              className="lg:hidden p-2"

              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}

            >

              {isMobileMenuOpen ? (

                <X className={isScrolled ? "text-[var(--nav-text)]" : "text-white"} />

              ) : (

                <Menu className={isScrolled ? "text-[var(--nav-text)]" : "text-white"} />

              )}

            </Button>

          </div>

        </div>

      </div>



      {/* ── Mobile menu ────────────────────────────────────────────────────── */}

      {isMobileMenuOpen && (

        <>

          <div

            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"

            onClick={() => setIsMobileMenuOpen(false)}

          />

          <div

            data-testid="mobile-menu"

            className="fixed top-0 right-0 bottom-0 w-80 z-50 lg:hidden overflow-y-auto

              bg-[var(--bg-card)] shadow-2xl"

          >

            {/* Header */}

            <div className="flex items-center justify-between p-6

              border-b border-[var(--border-default)]"

            >

              <ZentitiLogo height="30px" />

              <button

                onClick={() => setIsMobileMenuOpen(false)}

                className="p-2 rounded-lg hover:bg-[var(--bg-card-hover)] transition-colors"

                aria-label="Close menu"

              >

                <X className="h-6 w-6 text-[var(--text-secondary)]" />

              </button>

            </div>



            {/* Items */}

            <nav className="flex flex-col p-4">

              {MOBILE_ITEMS.map((item) => (

                <button

                  key={item.id}

                  data-testid={`mobile-nav-${item.id}`}

                  onClick={() => scrollTo(item.id)}

                  className="text-left py-4 px-4 rounded-lg text-lg font-medium

                    border-b border-[var(--border-default)] last:border-0

                    text-[var(--text-primary)]

                    hover:text-[var(--brand-orange)]

                    hover:bg-[var(--bg-card-hover)]

                    transition-colors"

                >

                  {item.label}

                </button>

              ))}

            </nav>



            {/* Mobile CTA */}

            <div className="p-4 border-t border-[var(--border-default)]">

              <button

                onClick={() => setIsContactModalOpen(true)}

                className="w-full flex items-center justify-center gap-2 px-5 py-3

                  rounded-full font-semibold text-sm text-white

                  bg-[var(--brand-orange)] hover:bg-[var(--brand-orange-dark)]

                  transition-colors"

              >

                Book Consultation

                <ArrowRight className="w-4 h-4" />

              </button>

            </div>

          </div>

        </>

      )}

      {/* Contact Modal */}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </header>

  );

});

Navbar.displayName = "Navbar";

