import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
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

  const isAnimOpen = isOpen && !closing;

  if (!isOpen) return null;

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        onClick={handleClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 60,
          background: isAnimOpen ? "rgba(0,0,0,0.55)" : "rgba(0,0,0,0)",
          backdropFilter: isAnimOpen ? "blur(8px)" : "blur(0px)",
          WebkitBackdropFilter: isAnimOpen ? "blur(8px)" : "blur(0px)",
          transition: "background 0.35s ease, backdrop-filter 0.35s ease",
        }}
      />

      {/* Panel */}
      <div
        data-testid="mobile-menu"
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "88vw",
          maxWidth: "380px",
          zIndex: 70,
          display: "flex",
          flexDirection: "column",
          background: "#0D1526",
          borderLeft: "1px solid rgba(255,255,255,0.06)",
          boxShadow: "-20px 0 60px rgba(0,0,0,0.5)",
          transform: isAnimOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.4s cubic-bezier(0.32, 0.72, 0, 1)",
        }}
      >
        {/* Header */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 20px 16px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          background: "#0D1526",
          flexShrink: 0,
        }}>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#E2E8F0", margin: 0 }}>Menu</h2>
          <button
            onClick={handleClose}
            aria-label="Close menu"
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.06)",
              background: "transparent",
              color: "#64748B",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "transform 0.3s ease",
            }}
          >
            <X style={{ width: 22, height: 22 }} />
          </button>
        </div>

        {/* Nav Items */}
        <nav style={{ flex: 1, overflowY: "auto", padding: "16px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {MOBILE_ITEMS.map((item) => {
              const hasChildren = item.children && item.children.length > 0;
              const isExpanded = expandedSections[item.id];
              const isActive = activeId === item.id;
              const isChildActive = hasChildren && item.children.some((c) => c.id === activeId);

              return (
                <div key={item.id}>
                  <button
                    data-testid={`mobile-nav-${item.id}`}
                    onClick={() => hasChildren ? toggleSection(item.id) : handleNav(item.id)}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "15px 18px",
                      borderRadius: 14,
                      border: isActive
                        ? "1px solid rgba(255,255,255,0.1)"
                        : hasChildren && isExpanded
                          ? "1px solid rgba(255,255,255,0.06)"
                          : "1px solid transparent",
                      background: isActive
                        ? "rgba(255,255,255,0.04)"
                        : hasChildren && isExpanded
                          ? "rgba(255,255,255,0.02)"
                          : "transparent",
                      color: isActive || isChildActive ? "#fff" : "#E2E8F0",
                      cursor: "pointer",
                      textAlign: "left",
                      fontSize: "1rem",
                      fontWeight: 600,
                      fontFamily: "inherit",
                    }}
                  >
                    <span>{item.label}</span>
                    {hasChildren && (
                      <ChevronDown style={{
                        width: 16,
                        height: 16,
                        color: "#64748B",
                        transition: "transform 0.3s cubic-bezier(.4,0,.2,1)",
                        transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                        flexShrink: 0,
                      }} />
                    )}
                  </button>

                  {/* Sub-items */}
                  {hasChildren && (
                    <div style={{
                      overflow: "hidden",
                      maxHeight: isExpanded ? `${item.children.length * 56}px` : "0px",
                      transition: "max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}>
                      <div style={{ display: "flex", flexDirection: "column", gap: 2, paddingLeft: 16, paddingRight: 4, paddingTop: 6, paddingBottom: 2 }}>
                        {item.children.map((child) => {
                          const isSubActive = activeId === child.id;
                          return (
                            <button
                              key={child.id}
                              data-testid={`mobile-nav-${child.id}`}
                              onClick={() => handleNav(child.id)}
                              style={{
                                width: "100%",
                                display: "flex",
                                alignItems: "center",
                                gap: 10,
                                padding: "12px 16px",
                                borderRadius: 10,
                                border: "none",
                                background: isSubActive ? "rgba(255,255,255,0.04)" : "transparent",
                                color: isSubActive ? "#fff" : "#64748B",
                                cursor: "pointer",
                                textAlign: "left",
                                fontSize: "0.9rem",
                                fontWeight: 500,
                                fontFamily: "inherit",
                              }}
                            >
                              <span style={{
                                width: 3,
                                height: 16,
                                borderRadius: 4,
                                background: isSubActive ? "#fff" : "rgba(255,255,255,0.08)",
                                flexShrink: 0,
                                transition: "background 0.2s",
                              }} />
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

        {/* Bottom CTA */}
        <div style={{
          padding: "16px 16px 28px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          flexShrink: 0,
        }}>
          <button
            onClick={() => { handleClose(); if (setIsContactModalOpen) setIsContactModalOpen(true); }}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              padding: "15px 20px",
              borderRadius: 14,
              border: "none",
              background: "#E8521A",
              color: "#fff",
              fontWeight: 700,
              fontSize: "0.95rem",
              fontFamily: "inherit",
              cursor: "pointer",
              boxShadow: "0 4px 20px rgba(232, 82, 26, 0.25)",
              transition: "transform 0.2s ease",
            }}
          >
            Book Consultation
            <ArrowRight style={{ width: 16, height: 16 }} />
          </button>
        </div>
      </div>
    </>,
    document.body
  );
}
