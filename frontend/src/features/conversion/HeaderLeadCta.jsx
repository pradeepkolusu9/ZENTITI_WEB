import React, { useState } from "react";
import axios from "axios";
import { X } from "lucide-react";
import { toast } from "sonner";
import { Button, Input, Textarea } from "@/shared/ui";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = BACKEND_URL ? `${BACKEND_URL}/api` : "/api";

const initialForm = {
  name: "",
  email: "",
  company: "",
  problem: "",
};

export const HeaderLeadCta = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState(initialForm);

  const handleChange = (event) => {
    setFormData((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsSubmitted(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post(`${API}/contact`, {
        name: formData.name,
        email: formData.email,
        company: formData.company,
        message: formData.problem,
      });

      setIsSubmitted(true);
      setFormData(initialForm);
      toast.success("Thanks! Our team will contact you shortly.");
    } catch (error) {
      console.error("Error submitting lead form:", error);
      toast.error("Could not submit your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="fixed right-4 top-4 z-[60] sm:right-6">
        <Button
          type="button"
          size="sm"
          variant="primary"
          className="bg-cyan-500 text-slate-900 shadow-lg hover:bg-cyan-400"
          onClick={() => setIsOpen(true)}
        >
          <span className="sm:hidden">Expert</span>
          <span className="hidden sm:inline">Talk to an Expert</span>
        </Button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900 dark:text-white">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">Talk to an Expert</h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                  Share your challenge and we will send a practical next-step plan.
                </p>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                aria-label="Close lead form"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {isSubmitted ? (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800 dark:border-emerald-900 dark:bg-emerald-900/20 dark:text-emerald-200">
                Thank you. Your request has been submitted successfully. Our team will reach out soon.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="lead-name" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
                    Name *
                  </label>
                  <Input
                    id="lead-name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="lead-email" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
                    Email *
                  </label>
                  <Input
                    id="lead-email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@company.com"
                  />
                </div>

                <div>
                  <label htmlFor="lead-company" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
                    Company *
                  </label>
                  <Input
                    id="lead-company"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Company name"
                  />
                </div>

                <div>
                  <label htmlFor="lead-problem" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
                    Problem *
                  </label>
                  <Textarea
                    id="lead-problem"
                    name="problem"
                    required
                    rows="4"
                    value={formData.problem}
                    onChange={handleChange}
                    placeholder="Tell us your biggest operational challenge..."
                  />
                </div>

                <Button type="submit" loading={isSubmitting} disabled={isSubmitting} className="w-full">
                  Submit Request
                </Button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};
