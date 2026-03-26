import { useState, useEffect } from "react";
import { X, ChevronDown, ArrowRight } from "lucide-react";

/* ─── Nav structure ─── */
const MOBILE_ITEMS = [
  { id: "hero", label: "Home" },
  { id: "managed-services-anchor", label: "Managed Services" },
  {
    id: "approach",
    label: "Approach",
    children: [
      { id: "challenge", label: "The Challenge" },
      { id: "engagement-model", label: "Engagement Model" },
    ],
  },
  { id: "industries", label: "Industries" },
  {
    id: "company",
    label: "Company",
    children: [
      { id: "about", label: "About" },
      { id: "case-studies", label: "Case Studies" },
      { id: "careers", label: "Careers" },
    ],
  },
];

export default function MobileMenu({ isOpen, setIsOpen, scrollTo, setIsContactModalOpen }) {
  const [activeId, setActiveId] = useState("hero");
  const [closing, setClosing] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});

  /* Lock body scroll */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setClosing(false);
      setExpandedSections({});
    }, 350);
  };

  const handleNav = (id) => {
    setActiveId(id);
    handleClose();
    if (scrollTo) scrollTo(id);
  };

  const toggleSection = (id) => {
    setExpandedSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const animState = isOpen && !closing ? "open" : "closed";

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="menu-backdrop fixed inset-0 z-[60] lg:hidden"
        data-state={animState}
        onClick={handleClose}
      />

      {/* Panel */}
      <div
        className="menu-panel fixed top-0 right-0 bottom-0 w-[88vw] max-w-[380px] z-[70] flex flex-col bg-[var(--menu-bg)] border-l border-[var(--menu-border)] lg:hidden"
        data-state={animState}
        data-testid="mobile-menu"
      >
        {/* ── Header ── */}
        <div
          className="sticky top-0 z-10 flex items-center justify-between p-5
            border-b border-[var(--menu-border)] bg-[var(--menu-bg)]"
        >
          <h2 className="text-lg font-semibold text-[var(--menu-text)]">Menu</h2>
          <button
            onClick={handleClose}
            className="close-btn w-10 h-10 rounded-xl border border-[var(--menu-border)]
              bg-transparent text-[var(--menu-text-dim)] flex items-center justify-center cursor-pointer"
            aria-label="Close menu"
          >
            <X className="h-[22px] w-[22px]" />
          </button>
        </div>

        {/* ── Nav Items ── */}
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="flex flex-col gap-1">
            {MOBILE_ITEMS.map((item) => {
              const hasChildren = item.children && item.children.length > 0;
              const isExpanded = expandedSections[item.id];
              const isActive = activeId === item.id;
              const isChildActive = hasChildren && item.children.some((c) => c.id === activeId);

              return (
                <div key={item.id} className="nav-item">
                  {/* Main button */}
                  <button
                    data-testid={`mobile-nav-${item.id}`}
                    onClick={() => {
                      if (hasChildren) {
                        toggleSection(item.id);
                      } else {
                        handleNav(item.id);
                      }
                    }}
                    className="w-full flex items-center justify-between py-[15px] px-[18px]
                      rounded-[14px] text-base font-semibold cursor-pointer text-left"
                    style={{
                      border: isActive
                        ? "1px solid rgba(255,255,255,0.1)"
                        : hasChildren && isExpanded
                          ? "1px solid var(--menu-border)"
                          : "1px solid transparent",
                      background: isActive
                        ? "rgba(255,255,255,0.04)"
                        : hasChildren && isExpanded
                          ? "rgba(255,255,255,0.02)"
                          : "transparent",
                      color: isActive || isChildActive
                        ? "#fff"
                        : "var(--menu-text)",
                      fontFamily: "inherit",
                    }}
                  >
                    <span>{item.label}</span>
                    {hasChildren && (
                      <ChevronDown
                        className="h-4 w-4 text-[var(--menu-text-dim)]"
                        style={{
                          transition: "transform 0.3s cubic-bezier(.4,0,.2,1)",
                          transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                        }}
                      />
                    )}
                  </button>

                  {/* Sub-items accordion */}
                  {hasChildren && (
                    <div
                      className={`sub-items-wrap ${
                        isExpanded ? `expanded-${item.children.length}` : ""
                      }`}
                    >
                      <div className="flex flex-col gap-0.5 pl-4 pr-1 pt-1.5 pb-0.5">
                        {item.children.map((child) => {
                          const isSubActive = activeId === child.id;
                          return (
                            <button
                              key={child.id}
                              data-testid={`mobile-nav-${child.id}`}
                              onClick={() => handleNav(child.id)}
                              className="sub-item w-full flex items-center gap-2.5
                                py-3 px-4 rounded-[10px] text-left text-[0.9rem]
                                font-medium cursor-pointer border-none"
                              style={{
                                background: isSubActive
                                  ? "rgba(255,255,255,0.04)"
                                  : "transparent",
                                color: isSubActive ? "#fff" : "var(--menu-text-dim)",
                                fontFamily: "inherit",
                              }}
                            >
                              {/* Accent bar */}
                              <span
                                className="w-[3px] h-4 rounded-sm flex-shrink-0"
                                style={{
                                  background: isSubActive
                                    ? "#fff"
                                    : "rgba(255,255,255,0.08)",
                                  transition: "background 0.2s",
                                }}
                              />
                              {child.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </nav>

        {/* ── Bottom CTA ── */}
        <div className="menu-cta p-4 pb-7 border-t border-[var(--menu-border)]">
          <button
            onClick={() => {
              handleClose();
              if (setIsContactModalOpen) setIsContactModalOpen(true);
            }}
            className="w-full flex items-center justify-center gap-2.5 px-5 py-[15px]
              rounded-[14px] border-none font-bold text-[0.95rem] text-white
              cursor-pointer active:scale-[0.97]"
            style={{
              background: "var(--menu-orange)",
              boxShadow: "0 4px 20px var(--menu-orange-glow-strong)",
              transition: "transform 0.2s ease",
              fontFamily: "inherit",
            }}
          >
            Book Consultation
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
}
