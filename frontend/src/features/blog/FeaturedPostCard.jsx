import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { BlogCardVisual } from "./BlogCardVisual";
import { AuthorAvatar } from "./AuthorAvatar";
import { CATEGORY_TONE } from "./categoryTone";
import "./Blog.css";

export const FeaturedPostCard = ({ post }) => {
  const tone = CATEGORY_TONE[post.category] || "ember";

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="featured-post"
    >
      <Link
        to={`/blog/${post.slug}`}
        data-testid={`blog-card-${post.slug}`}
        className="featured-post__link"
        aria-label={`Read ${post.title}`}
      >
        <div className="featured-post__visual">
          <span className="featured-post__badge">Latest</span>
          {post.heroImage ? (
            <img
              src={post.heroImage}
              alt={post.title}
              className="featured-post__img"
              loading="eager"
            />
          ) : (
            <div className="featured-post__fallback">
              <BlogCardVisual category={post.category} />
            </div>
          )}
        </div>

        <div className="featured-post__body">
          <div className="featured-post__meta-top">
            <span className={`z-pill blog-pill blog-pill--${tone}`}>{post.category}</span>
          </div>
          <h2 className="featured-post__title">{post.title}</h2>
          <p className="featured-post__excerpt">{post.excerpt}</p>

          <div className="featured-post__footer">
            <span className="featured-post__cta">
              Read Article
              <ArrowRight className="featured-post__cta-arrow" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};
