import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { X, ArrowRight } from "lucide-react";
import { toast } from "sonner";

const FORMSPREE_URL = "https://formspree.io/f/xlggewnq";

const REGIONS = [
  "North America (ET)",
  "North America (CT)",
  "North America (PT)",
  "Europe (GMT/CET)",
  "Asia Pacific (IST)",
  "Asia Pacific (SGT/JST)",
  "Middle East (GST)",
  "Other",
];

export const ContactModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    region: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          role: formData.role,
          region: formData.region,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        toast.success("Thank you! We'll get back to you within 24 hours.");
        setTimeout(() => {
          onClose();
          setIsSuccess(false);
          setFormData({ name: "", email: "", company: "", role: "", region: "", message: "" });
        }, 2000);
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
      setIsSuccess(false);
    }
  };

  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
            style={{
              position: "fixed", inset: 0, zIndex: 9998,
              background: "rgba(0,0,0,0.7)",
              backdropFilter: "blur(4px)",
            }}
          />

          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 16,
              pointerEvents: "none",
            }}
          >
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            style={{
              width: "min(560px, calc(100vw - 32px))",
              maxHeight: "90vh",
              overflowY: "auto",
              borderRadius: 20,
              background: "var(--bg-card, #111627)",
              border: "1px solid var(--border-strong, #252d50)",
              boxShadow: "0 24px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)",
              padding: "0",
              margin: "0",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              pointerEvents: "auto",
            }}
          >
            {/* Header */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "20px 28px 0",
            }}>
              <div>
                <h3 style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: 20, fontWeight: 800,
                  color: "var(--text-primary, #E8EAF0)",
                  letterSpacing: "-0.02em",
                }}>
                  Get in Touch
                </h3>
                <p style={{
                  fontSize: 13, color: "var(--text-secondary, #8890A6)",
                  marginTop: 4, lineHeight: 1.5,
                }}>
                  Tell us about your goals — we'll map a clear path forward.
                </p>
              </div>
              <button
                onClick={handleClose}
                style={{
                  width: 36, height: 36, borderRadius: 10,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "transparent",
                  border: "1px solid var(--border-default, #1e2545)",
                  color: "var(--text-secondary, #8890A6)",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--ember, #E8521A)";
                  e.currentTarget.style.color = "var(--ember, #E8521A)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-default, #1e2545)";
                  e.currentTarget.style.color = "var(--text-secondary, #8890A6)";
                }}
              >
                <X style={{ width: 18, height: 18 }} />
              </button>
            </div>

            {/* Form */}
            {isSuccess ? (
              <div style={{
                padding: "60px 28px",
                textAlign: "center",
              }}>
                <div style={{
                  width: 56, height: 56, borderRadius: "50%",
                  background: "rgba(232,82,26,0.1)",
                  border: "2px solid rgba(232,82,26,0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 16px",
                  color: "var(--ember, #E8521A)",
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <p style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: 18, fontWeight: 700,
                  color: "var(--text-primary, #E8EAF0)",
                }}>
                  We'll be in touch!
                </p>
                <p style={{
                  fontSize: 13, color: "var(--text-secondary, #8890A6)",
                  marginTop: 8,
                }}>
                  Expect a response within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ padding: "24px 28px 28px" }}>

                {/* Row: Name + Work Email */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                  <div>
                    <label style={labelStyle}>Name *</label>
                    <input
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      style={inputStyle}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Work Email *</label>
                    <input
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@company.com"
                      style={inputStyle}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                  </div>
                </div>

                {/* Row: Company + Role */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                  <div>
                    <label style={labelStyle}>Company *</label>
                    <input
                      name="company"
                      type="text"
                      required
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your company"
                      style={inputStyle}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Role</label>
                    <input
                      name="role"
                      type="text"
                      value={formData.role}
                      onChange={handleChange}
                      placeholder="Your role"
                      style={inputStyle}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                  </div>
                </div>

                {/* Region */}
                <div style={{ marginBottom: 16 }}>
                  <label style={labelStyle}>Region / Time Zone</label>
                  <select
                    name="region"
                    value={formData.region}
                    onChange={handleChange}
                    style={{
                      ...inputStyle,
                      appearance: "none",
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%238890A6' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 14px center",
                      paddingRight: 36,
                      cursor: "pointer",
                    }}
                  >
                    <option value="" style={{ background: "#111627", color: "#8890A6" }}>Select your region</option>
                    {REGIONS.map((r) => (
                      <option key={r} value={r} style={{ background: "#111627", color: "#E8EAF0" }}>{r}</option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div style={{ marginBottom: 24 }}>
                  <label style={labelStyle}>Message *</label>
                  <textarea
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your integration challenges and goals..."
                    rows={4}
                    style={{
                      ...inputStyle,
                      resize: "vertical",
                      minHeight: 100,
                    }}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    width: "100%",
                    padding: "14px 24px",
                    borderRadius: 12,
                    border: "none",
                    background: isSubmitting ? "rgba(232,82,26,0.6)" : "#E8521A",
                    color: "#fff",
                    fontSize: 15,
                    fontWeight: 700,
                    fontFamily: "'Manrope', sans-serif",
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    transition: "all 0.2s ease",
                    boxShadow: "0 4px 20px rgba(232,82,26,0.3)",
                  }}
                  onMouseEnter={(e) => {
                    if (!isSubmitting) e.currentTarget.style.background = "#d44815";
                  }}
                  onMouseLeave={(e) => {
                    if (!isSubmitting) e.currentTarget.style.background = "#E8521A";
                  }}
                >
                  {isSubmitting ? "Sending..." : "Send"}
                  {!isSubmitting && <ArrowRight style={{ width: 16, height: 16 }} />}
                </button>
              </form>
            )}
          </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
};

/* ── Shared styles ── */
const labelStyle = {
  display: "block",
  fontSize: 13,
  fontWeight: 700,
  fontFamily: "'Manrope', sans-serif",
  color: "var(--text-primary, #E8EAF0)",
  marginBottom: 6,
};

const inputStyle = {
  width: "100%",
  padding: "11px 14px",
  borderRadius: 10,
  border: "1px solid var(--border-default, #1e2545)",
  background: "var(--bg-section-alt, #0B0E17)",
  color: "var(--text-primary, #E8EAF0)",
  fontSize: 14,
  fontFamily: "'Inter', system-ui, sans-serif",
  outline: "none",
  transition: "border-color 0.2s ease",
};

const handleFocus = (e) => {
  e.target.style.borderColor = "var(--ember, #E8521A)";
};

const handleBlur = (e) => {
  e.target.style.borderColor = "var(--border-default, #1e2545)";
};
