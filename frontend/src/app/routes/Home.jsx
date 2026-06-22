import React, { Suspense, lazy, useEffect, useRef, useState } from "react";
import { Hero } from "@/features/hero/Hero";
import { usePageSeo } from "@/shared/hooks/usePageSeo";
import { Navbar } from "@/shared/ui";
import { Footer } from "@/components/layout/Footer";

const Challenge = lazy(() => import("@/features/challenge/Challenge").then((module) => ({ default: module.Challenge })));
const About = lazy(() => import("@/features/about/About").then((module) => ({ default: module.About })));
const CoreValues = lazy(() => import("@/features/coreValues/CoreValues").then((module) => ({ default: module.CoreValues })));
const Industries = lazy(() => import("@/features/industries/Industries").then((module) => ({ default: module.Industries })));
const Services = lazy(() => import("@/features/services/Services").then((module) => ({ default: module.Services })));
const MuleSoftCOE = lazy(() => import("@/features/mulesoft/MuleSoftCOE").then((module) => ({ default: module.MuleSoftCOE })));
const SolutionAccelerators = lazy(() => import("@/features/accelerators/SolutionAccelerators").then((module) => ({ default: module.SolutionAccelerators })));
const ProductVisual = lazy(() => import("@/features/conversion/ProductVisual").then((module) => ({ default: module.ProductVisual })));
const WhatToExpect = lazy(() => import("@/features/conversion/WhatToExpect").then((module) => ({ default: module.WhatToExpect })));
const CaseStudies = lazy(() => import("@/features/caseStudies/CaseStudies").then((module) => ({ default: module.CaseStudies })));
const EngagementModel = lazy(() => import("@/features/engagement/EngagementModel").then((module) => ({ default: module.EngagementModel })));
const ManagedServices = lazy(() => import("@/features/managedServices/ManagedServices").then((module) => ({ default: module.ManagedServices })));
const AgenticFoundry = lazy(() => import("@/features/agenticFoundry/AgenticFoundry").then((module) => ({ default: module.AgenticFoundry })));
const StaffingServices = lazy(() => import("@/features/staffing/StaffingServices").then((module) => ({ default: module.StaffingServices })));
const CareersSection = lazy(() => import("@/features/careers/CareersSection").then((module) => ({ default: module.CareersSection })));
const SprintCta = lazy(() => import("@/features/sprint/SprintCta").then((module) => ({ default: module.SprintCta })));
const FinalCtaSection = lazy(() => import("@/features/conversion/FinalCtaSection").then((module) => ({ default: module.FinalCtaSection })));

const DeferredSection = ({ children, minHeight = 480 }) => {
  const [shouldRender, setShouldRender] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleForce = () => setShouldRender(true);
    window.addEventListener("zentiti:force-render", handleForce);
    return () => window.removeEventListener("zentiti:force-render", handleForce);
  }, []);

  useEffect(() => {
    if (!containerRef.current || shouldRender) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [shouldRender]);

  return (
    <div ref={containerRef}>
      {shouldRender ? (
        <Suspense fallback={<div style={{ minHeight }} />}>
          {children}
        </Suspense>
      ) : (
        <div style={{ minHeight }} />
      )}
    </div>
  );
};

const Home = () => {
  const pageSeo = usePageSeo({
    title: "Zentiti Inc | Data Management, Integration & Agentic AI",
    description:
      "Zentiti helps enterprises become AI-ready: data management and governance, API-led integration, and agentic AI, delivered use-case first.",
    keywords:
      "data management services, data governance, AI readiness assessment, data products, API integration, MuleSoft, agentic AI, technology staffing",
    canonicalPath: "/",
    ogImage: "/og-image.svg",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Zentiti Inc | Data Management, Integration & Agentic AI",
      description:
        "Trusted data, connected systems, and agentic AI for enterprise transformation and growth.",
      url: `${window.location.origin}/`,
      isPartOf: {
        "@type": "WebSite",
        name: "Zentiti Inc",
        url: window.location.origin,
      },
      mainEntityOfPage: `${window.location.origin}/`,
    },
  });

  return (
    <>
      {pageSeo}
      <div className="min-h-screen bg-white dark:bg-slate-900">
        <Navbar />
        <Hero />
        {/* Session 2: Challenge / About Zentiti */}
        <div id="challenge" style={{ scrollMarginTop: "80px" }}>
          <DeferredSection minHeight={300}>
            <Challenge />
          </DeferredSection>
        </div>
        <div id="managed-services" style={{ scrollMarginTop: "80px" }}>
          <DeferredSection minHeight={500}>
            <ManagedServices />
          </DeferredSection>
        </div>
        <div id="agentic-foundry" style={{ scrollMarginTop: "80px" }}>
          <DeferredSection minHeight={400}>
            <AgenticFoundry />
          </DeferredSection>
        </div>
        <div id="about" style={{ scrollMarginTop: "80px" }}>
          <DeferredSection minHeight={300}>
            <About />
          </DeferredSection>
        </div>
        <DeferredSection minHeight={300}>
          <CoreValues />
        </DeferredSection>
        <div id="industries" style={{ scrollMarginTop: "96px" }}>
          <DeferredSection minHeight={300}>
            <Industries />
          </DeferredSection>
        </div>
        <div id="managed-services-anchor" style={{ scrollMarginTop: "80px" }}>
          <DeferredSection minHeight={300}>
            <MuleSoftCOE />
          </DeferredSection>
        </div>
        {/* Solution Accelerators */}
        <DeferredSection minHeight={300}>
          <SolutionAccelerators />
        </DeferredSection>
        <div id="case-studies" style={{ scrollMarginTop: "80px" }}>
          <DeferredSection minHeight={300}>
            <CaseStudies />
          </DeferredSection>
        </div>
        {/* Session 5: Approach */}
        <div id="engagement-model" style={{ scrollMarginTop: "80px" }}>
          <DeferredSection minHeight={300}>
            <EngagementModel />
          </DeferredSection>
        </div>
        <DeferredSection minHeight={300}>
          <WhatToExpect trackKey="data-management" showHeader={true} />
        </DeferredSection>
        {/* One-Week AI-Readiness Sprint CTA */}
        <div id="your-first-week" style={{ scrollMarginTop: "80px" }}>
          <SprintCta />
        </div>
        <DeferredSection minHeight={300}>
          <WhatToExpect trackKey="integration-apis" showHeader={false} />
        </DeferredSection>
        {/* One-Week AI-Readiness Sprint CTA (below Integration & APIs track) */}
        <DeferredSection minHeight={300}>
          <SprintCta />
        </DeferredSection>
        {/* Session 6: Staffing Services */}
        <div id="staffing-services-anchor" style={{ scrollMarginTop: "96px" }}>
          <DeferredSection minHeight={300}>
            <StaffingServices />
          </DeferredSection>
        </div>
        {/* Session 7: Careers */}
        <div id="careers" style={{ scrollMarginTop: "80px" }}>
          <DeferredSection minHeight={300}>
            <CareersSection />
          </DeferredSection>
        </div>
        <DeferredSection minHeight={250}>
          <FinalCtaSection />
        </DeferredSection>
        <Footer />
      </div>
    </>
  );
};

export default Home;
