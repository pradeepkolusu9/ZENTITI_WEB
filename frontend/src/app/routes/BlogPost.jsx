import React from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { Navbar } from "@/shared/ui";
import { Footer } from "@/components/layout/Footer";
import { usePageSeo } from "@/shared/hooks/usePageSeo";
import { getPostBySlug } from "@/features/blog/blogData";
import EditorialHero from "@/features/blog/EditorialHero";
import "@/features/blog/Blog.css";

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: "easeOut", delay },
});

const renderBodySection = (section, i, delay) => {
  const images = Array.isArray(section.image)
    ? section.image
    : section.image
      ? [{ src: section.image, caption: section.imageCaption }]
      : [];

  if (images.length === 0) {
    return (
      <motion.section key={section.heading} {...reveal(delay)} className="article-body article-section-plain">
        <h2 className="section-heading-accent">{section.heading}</h2>
        {section.paragraphs.map((p, pIdx) =>
          typeof p === "object" && p !== null ? (
            <p key={pIdx} className="testimonial-para">
              {p.quote}
              <span className="testimonial-attrib">
                <strong className="ember-accent">{p.name}</strong>
                {p.role ? `, ${p.role}` : ""}
              </span>
            </p>
          ) : (
            <p key={pIdx}>{p}</p>
          )
        )}
      </motion.section>
    );
  }

  if (section.imagePosition === "bottom") {
    return (
      <motion.section key={section.heading} {...reveal(delay)} className="article-body article-section-plain">
        <span className="split-header__index">{String(i + 1).padStart(2, "0")}</span>
        <h2 className="section-heading-accent">{section.heading}</h2>
        {section.paragraphs.map((p, pIdx) => (
          <p key={pIdx}>{p}</p>
        ))}
        <figure className="article-section__media" style={{ marginTop: "32px" }}>
          {Array.isArray(images) && images.length > 0 ? (
            images.map((img, idx) => (
              <div key={idx}>
                <img src={img.src} alt={img.caption || section.heading} loading="lazy" style={{ maxWidth: "100%", height: "auto" }} />
                {img.caption && <figcaption style={{ textAlign: "center" }}>{img.caption}</figcaption>}
              </div>
            ))
          ) : (
            <>
              <img src={images[0].src} alt={images[0].caption || section.heading} loading="lazy" style={{ maxWidth: "100%", height: "auto" }} />
              {images[0].caption && <figcaption style={{ textAlign: "center" }}>{images[0].caption}</figcaption>}
            </>
          )}
        </figure>
      </motion.section>
    );
  }

  const isPair = images.length > 1;
  const variant = isPair ? "pair" : i % 2 === 0 ? "default" : "reverse";
  const hasTestimonials = section.paragraphs.some((p) => typeof p === "object" && p !== null);
  const [lede, ...rest] = section.paragraphs;

  return (
    <motion.div key={section.heading} {...reveal(delay)} className={`split-header ${variant === "reverse" ? "split-header--reverse" : ""} ${isPair ? "split-header--pair" : ""}`}>
      <div className="split-header__text">
        <span className="split-header__index">{String(i + 1).padStart(2, "0")}</span>
        <h2 className="section-heading-accent">{section.heading}</h2>
        {hasTestimonials ? (
          section.paragraphs.map((p, pIdx) => (
            <p key={pIdx} className="split-header__lede testimonial-para">
              {p.quote}
              <span className="testimonial-attrib">
                <strong className="ember-accent">{p.name}</strong>
                {p.role ? `, ${p.role}` : ""}
              </span>
            </p>
          ))
        ) : (
          <>
            <p className="split-header__lede">{lede}</p>
            {rest.map((p, pIdx) => (
              <p key={pIdx} className="split-header__lede split-header__lede--rest">{p}</p>
            ))}
          </>
        )}
      </div>
      <figure className={`split-header__media ${isPair ? "split-header__media--pair" : ""}`}>
        {isPair ? (
          <>
            <div style={{ display: "flex", gap: "16px", width: "100%" }}>
              {images.map((img, idx) => (
                <div className="split-pair-item" key={idx}>
                  <img src={img.src} alt={img.caption || section.heading} loading="lazy" />
                  {img.caption && <figcaption>{img.caption}</figcaption>}
                </div>
              ))}
            </div>
            {section.imageCaption && (
              <figcaption style={{ textAlign: "center", marginTop: "12px", fontSize: "12px", fontStyle: "italic", color: "var(--text-muted)" }}>
                {section.imageCaption}
              </figcaption>
            )}
          </>
        ) : (
          <>
            <img src={images[0].src} alt={images[0].caption || section.heading} loading="lazy" />
            {images[0].caption && <figcaption>{images[0].caption}</figcaption>}
          </>
        )}
      </figure>
    </motion.div>
  );
};

const BlogPost = () => {
  const { slug } = useParams();
  const post = getPostBySlug(slug);

  const { scrollYProgress } = useScroll();
  const progressScaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.4,
  });

  const pageSeo = usePageSeo({
    title: post ? `${post.title} | Zentiti Inc` : "Insights | Zentiti Inc",
    description: post ? post.excerpt : "Perspectives from the Zentiti team.",
    canonicalPath: post ? `/blog/${post.slug}` : "/blog",
    ogImage: "/og-image.svg",
    schema: post
      ? {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          author: { "@type": "Person", name: post.author },
          datePublished: post.date,
          url: `${window.location.origin}/blog/${post.slug}`,
        }
      : null,
  });

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const bodySections = post.content.body || [];

  const emberizeTitle = (title) => {
    const words = title.trim().split(/\s+/);
    if (words.length < 2) return { head: title, tail: "" };
    return {
      head: words.slice(0, -1).join(" "),
      tail: words.slice(-1).join(" "),
    };
  };
  const { head, tail } = emberizeTitle(post.title);

  return (
    <>
      {pageSeo}
      <a href="#article-main" className="skip-link">Skip to content</a>
      <div className="article-page">
        <div className="article-page__glow" aria-hidden="true" />
        <Navbar />

        <motion.div
          role="progressbar"
          aria-label="Reading progress"
          aria-valuemin={0}
          aria-valuemax={100}
          className="reading-progress"
          style={{ scaleX: progressScaleX }}
        />

        <main id="article-main" className="article-container">
          <motion.div {...reveal(0)} className="article-back-wrap">
            <Link to="/blog" className="article-back">
              <ArrowLeft className="w-4 h-4" />
              Back to Insights
            </Link>
          </motion.div>

          <motion.header {...reveal(0.05)} className="article-hero">
            <span className="z-pill">{post.category}</span>
            <h1>
              {head} {tail && <em className="ember-accent">{tail}</em>}
            </h1>
            <div className="article-hero__meta">
              <span className="article-hero__meta-item">
                <Calendar /> {post.date}
              </span>
              <span className="article-hero__meta-item">
                <Clock /> {post.readTime}
              </span>
            </div>
          </motion.header>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
            className="article-visual"
          >
            <EditorialHero
              category={post.category}
              slug={post.slug}
              heroImage={post.heroImage}
              title={post.title}
            />
          </motion.div>

          <div className="article-body">
            <motion.section {...reveal(0.2)}>
              {post.content.intro.map((paragraph, idx) => (
                <p
                  key={idx}
                  className={idx === 0 ? "article-lead" : undefined}
                  style={idx === 0 ? undefined : { fontSize: 17 }}
                >
                  {paragraph}
                </p>
              ))}
            </motion.section>
          </div>

          {bodySections.map((section, i) => renderBodySection(section, i, 0.25 + i * 0.08))}

          <div className="article-body">
            <motion.section {...reveal(0.4)} className="article-takeaways">
              <div className="article-divider">
                <div className="article-divider__rule" />
                <h2>Key Takeaways</h2>
                <div className="article-divider__rule" />
              </div>
              <div className="takeaways-card">
                {post.content.takeaways.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.45 + i * 0.08, ease: "easeOut" }}
                    className="takeaways-card__row"
                  >
                    <div className="takeaways-card__num">{item.label}</div>
                    <p className="takeaways-card__text">{item.text}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            <motion.section {...reveal(0.65)} className="article-stats">
              <div className="article-divider">
                <div className="article-divider__rule" />
                <h2>By the Numbers</h2>
                <div className="article-divider__rule" />
              </div>
              <div className="stats-card">
                {post.content.stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.7 + i * 0.08, ease: "easeOut" }}
                    className="stats-card__col"
                  >
                    <div className="stats-card__num">{stat.value}</div>
                    <div className="stats-card__label">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default BlogPost;
