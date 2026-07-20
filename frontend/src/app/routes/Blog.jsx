import React from "react";
import { Sparkles } from "lucide-react";
import { Navbar } from "@/shared/ui";
import { Footer } from "@/components/layout/Footer";
import { usePageSeo } from "@/shared/hooks/usePageSeo";
import { BLOG_POSTS } from "@/features/blog/blogData";
import { BlogCard } from "@/features/blog/BlogCard";
import { FeaturedPostCard } from "@/features/blog/FeaturedPostCard";
import { MediumPostCard } from "@/features/blog/MediumPostCard";
import "@/features/blog/Blog.css";

const Blog = () => {
  const pageSeo = usePageSeo({
    title: "Insights & Perspectives | Zentiti Inc",
    description:
      "Perspectives on data governance, enterprise integration, agentic AI, and technology staffing from the Zentiti team.",
    keywords: "Zentiti blog, data strategy, agentic AI, MuleSoft, enterprise integration",
    canonicalPath: "/blog",
    ogImage: "/og-image.svg",
    schema: {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: "Insights & Perspectives | Zentiti Inc",
      url: `${window.location.origin}/blog`,
    },
  });

  const [featured, ...others] = BLOG_POSTS;
  const mediumPosts = others.slice(0, 3);
  const gridPosts = others.slice(3);

  return (
    <>
      {pageSeo}
      <a href="#blog-main" className="skip-link">Skip to content</a>
      <div className="blog-page">
        <div className="blog-page__glow" aria-hidden="true" />
        <Navbar />

        <main id="blog-main" className="blog-page__container">
          <header className="blog-header">
            <span className="z-pill">
              <Sparkles className="w-3.5 h-3.5" />
              Insights & Perspectives
            </span>
            <h1>
              Ideas on data, integration &amp; agentic <em className="ember-accent">AI</em>
            </h1>
          </header>

          {featured && (
            <div className="blog-hero-row">
              <FeaturedPostCard post={featured} />
              {mediumPosts.length > 0 && (
                <div className="medium-post-list">
                  {mediumPosts.map((post, i) => (
                    <MediumPostCard key={post.slug} post={post} delay={0.1 + i * 0.08} />
                  ))}
                </div>
              )}
            </div>
          )}

          {gridPosts.length > 0 && (
            <div className="blog-grid">
              {gridPosts.map((post, i) => (
                <BlogCard key={post.slug} post={post} delay={0.3 + i * 0.05} />
              ))}
            </div>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Blog;
