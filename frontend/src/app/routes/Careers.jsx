import React from "react";
import { CareersSection } from "@/features/careers/CareersSection";
import { usePageSeo } from "@/shared/hooks/usePageSeo";
import { Footer, Navbar } from "@/shared/ui";

const Careers = () => {
  const pageSeo = usePageSeo({
    title: "Careers | Zentiti Inc",
    description:
      "Explore careers at Zentiti Inc and join teams building high-impact enterprise products across cloud, AI, and data platforms.",
    keywords:
      "IT careers, cloud jobs, AI jobs, software engineer jobs, enterprise technology careers",
    canonicalPath: "/careers",
    ogImage: "/og-image.svg",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Careers | Zentiti Inc",
      description:
        "Career opportunities for engineers, architects, and innovation leaders at Zentiti Inc.",
      url: `${window.location.origin}/careers`,
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
          <CareersSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Careers;
