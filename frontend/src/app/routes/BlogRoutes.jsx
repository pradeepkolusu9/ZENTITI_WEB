import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

const Blog = lazy(() => import("./Blog"));
const BlogPost = lazy(() => import("./BlogPost"));

const BlogRoutes = () => {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <Routes>
        <Route path="/" element={<Blog />} />
        <Route path=":slug" element={<BlogPost />} />
      </Routes>
    </Suspense>
  );
};

export default BlogRoutes;
