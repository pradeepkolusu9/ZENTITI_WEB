import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { Upload, X, ArrowRight } from "lucide-react";
import { toast } from "sonner";

export const ApplicationModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    linkedin: "",
    coverLetter: "",
    resumeName: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
      setIsSuccess(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleResumeChange = (e) => {
    const file = e.target.files?.[0];
    setFormData((prev) => ({
      ...prev,
      resumeName: file ? file.name : "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const fileInput = document.getElementById("careers-resume-upload");
      const formDataToSend = new FormData();
      
      // Add form fields
      formDataToSend.append("fullName", formData.fullName);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("linkedin", formData.linkedin);
      formDataToSend.append("coverLetter", formData.coverLetter);
      
      // Add resume file if selected
      if (fileInput.files[0]) {
        formDataToSend.append("resume", fileInput.files[0]);
      }

      const response = await fetch("https://formspree.io/f/xzddbavb", {
        method: "POST",
        body: formDataToSend,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setIsSuccess(true);
        toast.success("Application submitted successfully.");
        setTimeout(() => {
          onClose();
          setIsSuccess(false);
          // Clear file input
          document.getElementById("careers-resume-upload").value = "";
          setFormData({
            fullName: "",
            email: "",
            phone: "",
            linkedin: "",
            coverLetter: "",
            resumeName: "",
          });
        }, 2000);
      } else {
        throw new Error("Failed to submit application");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9998,
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
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              style={{
                width: "min(760px, calc(100vw - 32px))",
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
                    Join the Zentiti Team
                  </h3>
                  <p style={{
                    fontSize: 13, color: "var(--text-secondary, #8890A6)",
                    marginTop: 4, lineHeight: 1.5,
                  }}>
                    Submit your application below and we'll get back to you soon.
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
                    Application received!
                  </p>
                  <p style={{
                    fontSize: 13, color: "var(--text-secondary, #8890A6)",
                    marginTop: 8,
                  }}>
                    Our team will review your profile and reach out soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ padding: "24px 28px 28px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                    <div>
                      <label style={labelStyle}>Full Name *</label>
                      <input
                        name="fullName"
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Your full name"
                        style={inputStyle}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Email Address *</label>
                      <input
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                        style={inputStyle}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                      />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                    <div>
                      <label style={labelStyle}>Phone Number</label>
                      <input
                        name="phone"
                        type="text"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 123-4567"
                        style={inputStyle}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>LinkedIn Profile</label>
                      <input
                        name="linkedin"
                        type="text"
                        value={formData.linkedin}
                        onChange={handleChange}
                        placeholder="linkedin.com/in/yourprofile"
                        style={inputStyle}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <label style={labelStyle}>Resume (PDF or Word)</label>
                    <label
                      htmlFor="careers-resume-upload"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 10,
                        width: "100%",
                        minHeight: 72,
                        padding: "16px 14px",
                        borderRadius: 10,
                        border: "1px dashed var(--border-default, #1e2545)",
                        background: "var(--bg-section-alt, #0B0E17)",
                        color: formData.resumeName ? "var(--text-primary, #E8EAF0)" : "var(--text-secondary, #8890A6)",
                        fontSize: 14,
                        fontFamily: "'Inter', system-ui, sans-serif",
                        cursor: "pointer",
                      }}
                    >
                      <Upload style={{ width: 18, height: 18 }} />
                      <span>{formData.resumeName || "Click to upload or drag and drop"}</span>
                    </label>
                    <input
                      id="careers-resume-upload"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleResumeChange}
                      style={{ display: "none" }}
                    />
                    <p style={{
                      fontSize: 12,
                      color: "var(--text-secondary, #8890A6)",
                      marginTop: 8,
                    }}>
                      PDF or Word documents up to 5MB
                    </p>
                  </div>

                  <div style={{ marginBottom: 24 }}>
                    <label style={labelStyle}>Cover Letter / Message</label>
                    <textarea
                      name="coverLetter"
                      value={formData.coverLetter}
                      onChange={handleChange}
                      placeholder="Tell us about yourself and why you'd be a great fit for Zentiti..."
                      rows={5}
                      style={{
                        ...inputStyle,
                        resize: "vertical",
                        minHeight: 110,
                      }}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                  </div>

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
                    {isSubmitting ? "Submitting..." : "Submit Application"}
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
