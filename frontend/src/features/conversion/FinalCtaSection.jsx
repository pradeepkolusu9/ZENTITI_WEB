import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/shared/ui";
import { ContactModal } from "@/components/ContactModal";

const CALENDLY_URL = "https://calendly.com/zentiti/strategy-call";

export const FinalCtaSection = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  return (
    <section
      id="final-cta"
      data-testid="final-cta-section"
      className="relative overflow-hidden py-12 sm:py-16 mb-12"
      style={{ background: "var(--bg-section-alt)" }}
    >
      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 
            className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl mb-4"
            style={{ 
              fontFamily: "'Manrope', sans-serif",
              color: "var(--text-primary)",
            }}
          >
            Ready to Accelerate Your AI Journey?
          </h2>
          
          <p 
            className="mx-auto max-w-2xl text-base leading-relaxed mb-8"
            style={{ color: "var(--text-secondary)" }}
          >
            Our team of Data and AI experts are ready to help you accelerate your 
            Data Integration and Agentic automation journey.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
            <Button
              type="button"
              size="lg"
              variant="primary"
              onClick={() => setIsContactModalOpen(true)}
            >
              Book Consultation
            </Button>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </section>
  );
};
