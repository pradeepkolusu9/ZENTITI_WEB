import React from "react";

/**
 * ZentitiLogo — uses the actual brand PNG image.
 *
 * Props:
 *   white     — applies CSS filter to render white version on dark backgrounds
 *   height    — CSS height string (default "36px")
 *   className — extra classes
 */
export const ZentitiLogo = ({ white = false, height = "36px", className = "" }) => (
  <img
    src="/logo.png"
    alt="Zentiti"
    style={{ height, width: "auto" }}
    className={className}
  />
);

