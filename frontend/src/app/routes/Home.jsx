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
const CaseStudies = lazy(() => import("@/features/caseStudies/CaseStudies").then((module) => ({ default: module.CaseStudies })));
const EngagementModel = lazy(() => import("@/features/engagement/EngagementModel").then((module) => ({ default: module.EngagementModel })));
const StaffingServices = lazy(() => import("@/features/staffing/StaffingServices").then((module) => ({ default: module.StaffingServices })));
const CareersSection = lazy(() => import("@/features/careers/CareersSection").then((module) => ({ default: module.CareersSection })));
const FinalCtaSection = lazy(() => import("@/features/conversion/FinalCtaSection").then((module) => ({ default: module.FinalCtaSection })));

const DeferredSection = ({ children, minHeight = 480 }) => {
  const [shouldRender, setShouldRender] = useState(false);
  const containerRef = useRef(null);

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
    title: "Home | Zentiti Inc",
    description:
      "Zentiti Inc helps enterprises accelerate digital transformation with cloud, AI, data, cybersecurity, and product engineering services.",
    keywords:
      "enterprise IT solutions, digital transformation, cloud services, AI consulting, cybersecurity, software engineering",
    canonicalPath: "/home",
    ogImage: "/og-image.svg",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Home | Zentiti Inc",
      description:
        "Enterprise technology solutions for transformation, modernization, and growth.",
      url: `${window.location.origin}/home`,
      isPartOf: {
        "@type": "WebSite",
        name: "Zentiti Inc",
        url: window.location.origin,
      },
      mainEntityOfPage: `${window.location.origin}/home`,
    },
  });

  return (
    <>
      {pageSeo}
      <div className="min-h-screen bg-white dark:bg-slate-900">
        <Navbar />
        <Hero />
        {/* Session 2: Challenge / About Zentiti */}
        <DeferredSection minHeight={300}>
          <Challenge />
        </DeferredSection>
        <DeferredSection minHeight={300}>
          <About />
        </DeferredSection>
        <DeferredSection minHeight={300}>
          <CoreValues />
        </DeferredSection>
        <DeferredSection minHeight={300}>
          <Industries />
        </DeferredSection>
        {/* Session 5: Solution Accelerators */}
        <DeferredSection minHeight={300}>
          <SolutionAccelerators />
        </DeferredSection>
        {/* Session 5b: MuleSoft COE */}
        <div id="managed-services-anchor" style={{ scrollMarginTop: "96px" }}>
          <DeferredSection minHeight={300}>
            <MuleSoftCOE />
          </DeferredSection>
        </div>
        <DeferredSection minHeight={300}>
          <CaseStudies />
        </DeferredSection>
        {/* Session 5: Approach */}
        <DeferredSection minHeight={300}>
          <EngagementModel />
        </DeferredSection>
        <DeferredSection minHeight={300}>
          <ProductVisual />
        </DeferredSection>
        {/* Session 6: Staffing Services */}
        <div id="staffing-services-anchor" style={{ scrollMarginTop: "96px" }}>
          <DeferredSection minHeight={300}>
            <StaffingServices />
          </DeferredSection>
        </div>
        {/* Session 7: Careers */}
        <DeferredSection minHeight={300}>
          <CareersSection />
        </DeferredSection>
        <DeferredSection minHeight={250}>
          <FinalCtaSection />
        </DeferredSection>
        <Footer />
      </div>
    </>
  );
};

export default Home;
