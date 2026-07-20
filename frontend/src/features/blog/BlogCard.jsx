import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { BlogCardVisual } from "./BlogCardVisual";
import { AuthorAvatar } from "./AuthorAvatar";
import { CATEGORY_TONE } from "./categoryTone";
import "./Blog.css";

const emberize = (title) => {
  const words = title.trim().split(/\s+/);
  if (words.length < 2) return { head: title, tail: "" };
  const tail = words.slice(-1).join(" ");
  const head = words.slice(0, -1).join(" ");
  return { head, tail };
};

export const BlogCard = ({ post, delay = 0 }) => {
  const { head, tail } = emberize(post.title);
  const tone = CATEGORY_TONE[post.category] || "ember";

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      className="blog-card"
    >
      <Link
        to={`/blog/${post.slug}`}
        data-testid={`blog-card-${post.slug}`}
        className="blog-card__link"
        aria-label={`Read ${post.title}`}
      >
        <div className="blog-card__visual">
          <BlogCardVisual category={post.category} />
        </div>
        <div className="blog-card__body">
          <div className="blog-card__meta-top">
            <span className={`z-pill blog-pill blog-pill--${tone}`}>{post.category}</span>
            <span className="blog-card__read-time">{post.readTime}</span>
          </div>
          <h3 className="blog-card__title">
            {head} {tail && <em className="ember-accent">{tail}</em>}
          </h3>
          <p className="blog-card__excerpt">{post.excerpt}</p>
          <div className="blog-card__meta-bot">
            <span className="blog-card__read">
              READ <ArrowRight className="blog-card__read-arrow" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};
