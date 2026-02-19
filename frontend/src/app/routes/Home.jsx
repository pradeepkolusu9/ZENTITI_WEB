import React, { Suspense, lazy, useEffect, useRef, useState } from "react";
import { Hero } from "@/features/hero/Hero";
import { usePageSeo } from "@/shared/hooks/usePageSeo";
import { Footer, Navbar } from "@/shared/ui";

const About = lazy(() => import("@/features/about/About").then((module) => ({ default: module.About })));
const HowWeHelp = lazy(() => import("@/features/conversion/HowWeHelp").then((module) => ({ default: module.HowWeHelp })));
const Services = lazy(() => import("@/features/services/Services").then((module) => ({ default: module.Services })));
const ProductVisual = lazy(() => import("@/features/conversion/ProductVisual").then((module) => ({ default: module.ProductVisual })));
const SolutionAccelerators = lazy(() => import("@/features/accelerators/SolutionAccelerators").then((module) => ({ default: module.SolutionAccelerators })));
const Industries = lazy(() => import("@/features/industries/Industries").then((module) => ({ default: module.Industries })));
const Testimonials = lazy(() => import("@/features/conversion/Testimonials").then((module) => ({ default: module.Testimonials })));
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
        <DeferredSection minHeight={400}>
          <About />
        </DeferredSection>
        <DeferredSection minHeight={300}>
          <HowWeHelp />
        </DeferredSection>
        <DeferredSection minHeight={400}>
          <Services />
        </DeferredSection>
        <DeferredSection minHeight={500}>
          <ProductVisual />
        </DeferredSection>
        <DeferredSection minHeight={600}>
          <SolutionAccelerators />
        </DeferredSection>
        <DeferredSection minHeight={400}>
          <Industries />
        </DeferredSection>
        <DeferredSection minHeight={320}>
          <Testimonials />
        </DeferredSection>
        <DeferredSection minHeight={280}>
          <FinalCtaSection />
        </DeferredSection>
        <Footer />
      </div>
    </>
  );
};

export default Home;
