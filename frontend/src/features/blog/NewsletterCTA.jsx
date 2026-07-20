import React, { useState } from "react";
import { toast } from "sonner";
import { Mail, ArrowRight } from "lucide-react";
import "./Blog.css";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const NewsletterCTA = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email)) {
      toast.error("Enter a valid email address.");
      return;
    }
    toast.success("Subscribed — watch your inbox for our next insight.");
    setEmail("");
  };

  return (
    <section className="newsletter-cta" aria-labelledby="newsletter-heading">
      <div className="newsletter-cta__glow" aria-hidden="true" />
      <div className="newsletter-cta__icon">
        <Mail className="w-5 h-5" />
      </div>
      <h2 id="newsletter-heading">Engineering insights, delivered</h2>
      <p>
        AI trends, integration best practices, and product updates — straight to your inbox.
        No spam, unsubscribe anytime.
      </p>
      <form onSubmit={handleSubmit} className="newsletter-cta__form">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          aria-label="Email address"
          required
        />
        <button type="submit">
          Subscribe
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>
    </section>
  );
};
