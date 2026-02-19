import React, { useState } from "react";
import axios from "axios";
import { CalendarClock, CheckCircle2, Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import { Button, Input, Section, Textarea } from "@/shared/ui";
import { CONTACT_INFO } from "@/shared/utils/constants";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = BACKEND_URL ? `${BACKEND_URL}/api` : "/api";
const CALENDLY_URL = "https://calendly.com/zentiti/strategy-call";

const conversionBullets = [
  "Get a practical 90-day execution plan",
  "Identify high-impact automation opportunities",
  "Estimate ROI before committing budget",
];

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post(`${API}/contact`, formData);
      toast.success("Thank you! We'll get back to you soon.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section
      id="contact"
      title="Start Your Transformation with a Clear ROI Plan"
      subtitle="Book a strategy call or send your requirements. We will map business outcomes, timeline, and investment scope."
      background="white"
    >
      <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        <div>
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Talk to Our Solutions Team</h3>

          <div className="rounded-xl border border-blue-200 bg-blue-50/60 p-6 mb-8 dark:border-blue-800 dark:bg-blue-900/20">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">What You Get in the First Call</h4>
            <ul className="space-y-3">
              {conversionBullets.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 text-blue-600 dark:text-blue-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6 mb-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin className="text-blue-600 dark:text-blue-400 h-6 w-6" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Address</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {CONTACT_INFO.address.line1}
                  <br />
                  {CONTACT_INFO.address.line2}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                <Phone className="text-blue-600 dark:text-blue-400 h-6 w-6" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Phone</h4>
                <p className="text-gray-600 dark:text-gray-300">{CONTACT_INFO.phone}</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="text-blue-600 dark:text-blue-400 h-6 w-6" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Email</h4>
                <p className="text-gray-600 dark:text-gray-300">{CONTACT_INFO.email}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl p-8 text-white shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Business Hours</h3>
            <div className="space-y-2">
              <p>{CONTACT_INFO.businessHours.weekday}</p>
              <p>{CONTACT_INFO.businessHours.saturday}</p>
              <p>{CONTACT_INFO.businessHours.sunday}</p>
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-gray-200 p-6 dark:border-slate-700">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Prefer to book instantly?</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Skip back-and-forth emails and reserve a slot directly with our strategy team.
            </p>
            <Button
              type="button"
              variant="outline"
              icon={<CalendarClock className="h-4 w-4" />}
              className="w-full"
              onClick={() => window.open(CALENDLY_URL, "_blank", "noopener,noreferrer")}
            >
              Open Calendly Scheduler
            </Button>
          </div>
        </div>

        <div>
          <form data-testid="contact-form" onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <Input
                data-testid="contact-name-input"
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <Input
                data-testid="contact-email-input"
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="w-full"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <Input
                data-testid="contact-phone-input"
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 (555) 123-4567"
                className="w-full"
              />
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                Company Name
              </label>
              <Input
                data-testid="contact-company-input"
                id="company"
                name="company"
                type="text"
                value={formData.company}
                onChange={handleChange}
                placeholder="Your Company"
                className="w-full"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message *
              </label>
              <Textarea
                data-testid="contact-message-input"
                id="message"
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your project..."
                rows={5}
                className="w-full"
              />
            </div>

            <Button
              data-testid="contact-submit-button"
              type="submit"
              disabled={isSubmitting}
              loading={isSubmitting}
              variant="primary"
              size="lg"
              className="w-full"
            >
              Send Message
            </Button>
          </form>

          <div className="mt-8 rounded-xl border border-gray-200 p-3 shadow-sm dark:border-slate-700">
            <iframe
              title="Book a strategy call"
              src={`${CALENDLY_URL}?hide_event_type_details=1&hide_gdpr_banner=1`}
              className="h-[620px] w-full rounded-lg"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </Section>
  );
};
