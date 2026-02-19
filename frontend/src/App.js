import React, { Suspense, lazy } from "react";
import "@/App.css";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useSmoothScroll } from "@/shared/hooks/useSmoothScroll";

const Home = lazy(() => import("@/app/routes/Home"));
const Careers = lazy(() => import("@/app/routes/Careers"));
const Contact = lazy(() => import("@/app/routes/Contact"));
const Industries = lazy(() => import("@/app/routes/Industries"));

function App() {
  useSmoothScroll();

  return (
    <div className="App">
      <HelmetProvider>
        <BrowserRouter>
          <Suspense fallback={<div className="min-h-screen" />}>
            <Routes>
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/home" element={<Home />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/industries" element={<Industries />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </HelmetProvider>
    </div>
  );
}

export default App;
