import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { BlogCardVisual } from "./BlogCardVisual";
import { CATEGORY_TONE } from "./categoryTone";
import "./Blog.css";

export const MediumPostCard = ({ post, delay = 0 }) => {
  const tone = CATEGORY_TONE[post.category] || "ember";

  return (
    <motion.article
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      className="medium-post"
    >
      <Link
        to={`/blog/${post.slug}`}
        data-testid={`blog-card-${post.slug}`}
        className="medium-post__link"
        aria-label={`Read ${post.title}`}
      >
        <div className="medium-post__visual">
          {post.heroImage ? (
            <img src={post.heroImage} alt={post.title} loading="lazy" />
          ) : (
            <BlogCardVisual category={post.category} />
          )}
        </div>
        <div className="medium-post__body">
          <span className={`z-pill blog-pill blog-pill--${tone} medium-post__pill`}>
            {post.category}
          </span>
          <h3 className="medium-post__title">{post.title}</h3>
          <div className="medium-post__meta">
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.readTime}</span>
            <ArrowRight className="medium-post__arrow" />
          </div>
        </div>
      </Link>
    </motion.article>
  );
};
