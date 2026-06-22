import React, { Suspense, lazy, useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useSmoothScroll } from "@/shared/hooks/useSmoothScroll";

const Home = lazy(() => import("@/app/routes/Home"));
const Careers = lazy(() => import("@/app/routes/Careers"));
const Contact = lazy(() => import("@/app/routes/Contact"));
const Industries = lazy(() => import("@/app/routes/Industries"));

function App() {
  useSmoothScroll();

  // Strip hash from URL on load — keep URL clean, navigation uses scrollIntoView instead
  useEffect(() => {
    if (window.location.hash) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  }, []);

  return (
    <div className="App theme-transition">
      <BrowserRouter>
        <Suspense fallback={<div className="min-h-screen" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/industries" element={<Industries />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
