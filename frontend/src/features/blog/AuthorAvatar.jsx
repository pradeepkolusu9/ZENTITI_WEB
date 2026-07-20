import React from "react";

export const AuthorAvatar = ({ name, size = 64 }) => {
  const seed = name.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  const uid = `av-${seed}`;
  const hue = (seed * 37) % 360;

  return (
    <svg width={size} height={size} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`${uid}-g`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={`hsl(${hue}, 70%, 55%)`} />
          <stop offset="100%" stopColor="var(--brand-orange)" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="32" fill={`url(#${uid}-g)`} />
      <text
        x="32"
        y="40"
        textAnchor="middle"
        fill="#fff"
        fontSize="22"
        fontWeight="700"
        fontFamily="Inter, sans-serif"
      >
        {initials}
      </text>
    </svg>
  );
};

export default AuthorAvatar;
