import React from "react";
import { Industries } from "@/features/industries/Industries";
import { usePageSeo } from "@/shared/hooks/usePageSeo";
import { Navbar } from "@/shared/ui";
import { Footer } from "@/components/layout/Footer";

const IndustriesPage = () => {
  const pageSeo = usePageSeo({
    title: "Industries | Zentiti Inc",
    description:
      "Discover how Zentiti delivers specialized technology solutions for finance, healthcare, retail, manufacturing, insurance, and telecom.",
    keywords:
      "technology solutions by industry, fintech IT solutions, healthcare IT services, retail digital transformation",
    canonicalPath: "/industries",
    ogImage: "/og-image.svg",
    schema: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Industries | Zentiti Inc",
      description:
        "Industry-specific technology services tailored for enterprise outcomes.",
      url: `${window.location.origin}/industries`,
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
          <Industries />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default IndustriesPage;
