import React from "react";
import { ContactSection } from "@/features/contact/ContactSection";
import { usePageSeo } from "@/shared/hooks/usePageSeo";
import { Navbar } from "@/shared/ui";
import { Footer } from "@/components/layout/Footer";

const Contact = () => {
  const pageSeo = usePageSeo({
    title: "Contact | Zentiti Inc",
    description:
      "Get in touch with Zentiti Inc to discuss enterprise cloud, AI, cybersecurity, and digital product transformation initiatives.",
    keywords:
      "contact Zentiti, enterprise IT consulting, cloud transformation consulting, AI services contact",
    canonicalPath: "/contact",
    ogImage: "/og-image.svg",
    schema: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: "Contact | Zentiti Inc",
      description:
        "Contact Zentiti Inc for enterprise technology consulting, implementation, and support.",
      url: `${window.location.origin}/contact`,
      isPartOf: {
        "@type": "WebSite",
        name: "Zentiti Inc",
        url: window.location.origin,
      },
    },
  });

  return (
    <>
      {pageSeo}
      <div className="min-h-screen bg-white dark:bg-slate-900">
        <Navbar />
        <main className="pt-20">
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Contact;
