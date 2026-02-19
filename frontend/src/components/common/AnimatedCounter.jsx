import React from "react";

export const AnimatedCounter = ({ value, suffix = "", prefix = "" }) => {
  return (
    <span className="inline-block font-bold">
      {prefix}
      {value.toLocaleString()}
      {suffix}
    </span>
  );
};
