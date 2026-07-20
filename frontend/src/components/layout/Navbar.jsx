import React, { useState, useEffect } from "react";

import { useNavigate, useLocation } from "react-router-dom";

import { Menu, X, ArrowRight } from "lucide-react";

import { Button } from "@/components/common/Button";

import { ThemeToggle } from "@/components/common/ThemeToggle";

import { ZentitiLogo } from "@/components/common/ZentitiLogo";

import { ContactModal } from "@/components/ContactModal";

import MobileMenu from "./MobileMenu";

import "./Navbar.css";

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
    label: "Services",   id: "services",
    children: [
      { label: "Managed Services",  id: "managed-services"       },
      { label: "Agentic Foundry",   id: "agentic-foundry"        },
      { label: "Staffing Services", id: "staffing-services-anchor"},
      { label: "MuleSoft COE",       id: "managed-services-anchor" },
    ],
  },
  { label: "Industries",  id: "industries",       children: [] },
  {
    label: "Company",     id: "about",
    children: [
      { label: "About",           id: "about"           },
      { label: "Your First Week", id: "your-first-week" },
      { label: "Case Studies",    id: "case-studies"    },
      { label: "Careers",         id: "careers"         },
    ],
  },
  { label: "Blog", id: "blog", route: "/blog", children: [] },
];



export const Navbar = React.memo(() => {

  const navigate = useNavigate();
  const location = useLocation();

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

    const close = (e) => {
      if (!e.target.closest('.dropdown-container')) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("click", close);

    return () => document.removeEventListener("click", close);

  }, []);



  const scrollTo = (id) => {
    setOpenDropdown(null);
    window.dispatchEvent(new CustomEvent("zentiti:force-render"));

    // This site drives scroll through Lenis (see useSmoothScroll), which
    // overrides native scroll position every animation frame — a plain
    // scrollIntoView()/window.scrollTo() gets silently fought and reset.
    // Section targets keep their per-element scroll-margin-top (used by the
    // native fallback) and we translate it into Lenis's own offset option.
    const scrollToElement = (el) => {
      if (window.__zentitiLenis) {
        // Lenis measures its scrollable range once and doesn't know the
        // DeferredSection content we just force-rendered made the page
        // taller — re-measure first or it clamps the target back to 0.
        window.__zentitiLenis.resize();
        // Pass a resolved number rather than the element itself — Lenis's
        // own element-target resolution silently no-ops for some sections
        // (multiple nested nodes share the same id, e.g. a wrapper div and
        // its inner <section>), while a plain scroll offset always works.
        const marginTop = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
        const targetY = el.getBoundingClientRect().top + window.scrollY - marginTop;
        window.__zentitiLenis.scrollTo(targetY);
      } else {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    // The home page's sections settle their real height in multiple async
    // jumps (animations/lazy content), not one single moment — so instead of
    // guessing when it's "done", re-issue the scroll a few times, spaced out.
    // Each call re-measures the element's current position, so it
    // self-corrects however many times the layout shifts underneath it.
    // Kept short: each pass calls lenis.resize(), which isn't free, so this
    // isn't a "poll every 400ms for 6s" loop anymore — 4 spaced-out passes
    // easily covers how long DeferredSection chunks actually take to mount.
    const keepScrollingTo = (timestamps) => {
      const el = document.getElementById(id);
      if (el) scrollToElement(el);
      if (timestamps.length > 0) {
        setTimeout(() => keepScrollingTo(timestamps.slice(1)), timestamps[0]);
      }
    };

    if (location.pathname !== "/") {
      // Section only exists on the home page — navigate there first.
      navigate("/");
      setTimeout(() => keepScrollingTo([500, 700, 1000]), 150);
    } else {
      // Keep URL clean — remove hash without adding a history entry
      history.replaceState(null, "", window.location.pathname + window.location.search);
      keepScrollingTo([500]);
    }
  };



  // ─── scrolled state styles ───────────────────────────────────────────────

  const navBg = isScrolled

    ? "bg-[var(--nav-bg)] shadow-md border-b border-[var(--nav-border)]"

    : "bg-transparent";



  // Transparent (unscrolled) state assumes a dark image behind the nav —
  // true on the homepage hero, not on other pages' theme-aware backgrounds.
  const isHome = location.pathname === "/";

  const linkColor = isScrolled || !isHome

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

            <ZentitiLogo white={!isScrolled && isHome} height="36px" />

          </div>



          {/* Desktop nav */}

          <nav className="hidden lg:flex items-center space-x-1">

            {NAV_GROUPS.map((group) => (

              <div key={group.id} className="relative dropdown-container">

                {group.children.length === 0 ? (

                  /* Plain link */

                  <button

                    data-testid={`nav-${group.id}`}

                    onClick={() => (group.route ? navigate(group.route) : scrollTo(group.id))}

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
                      e.preventDefault();
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

                        onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      scrollTo(child.id);
                    }}

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



            <div className="flex items-center gap-2">

              <ThemeToggle />

              {/* Mobile menu button */}
              <div className="lg:hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden p-2 md:p-2.5"
                  onClick={() => setIsMobileMenuOpen(true)}
                  style={{ minHeight: '44px', minWidth: '44px' }}
                >
                  <Menu className={isScrolled || !isHome ? "text-[var(--nav-text)]" : "text-white"} style={{ width: '24px', height: '24px' }} />
                </Button>
              </div>

            </div>

          </div>

        </div>

      </div>



      {/* Mobile Menu Component */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        setIsOpen={setIsMobileMenuOpen}
        scrollTo={scrollTo}
        setIsContactModalOpen={setIsContactModalOpen}
      />

      {/* Contact Modal */}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </header>

  );

});

Navbar.displayName = "Navbar";

