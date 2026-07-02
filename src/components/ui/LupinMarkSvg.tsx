"use client";

import { useId } from "react";

/** Inline Lupin mark — vector paths for crisp edges on dark UI (no PNG matte halos). */
export function LupinMarkSvg({
  size = 48,
  className = "",
  glow = true,
}: {
  size?: number;
  className?: string;
  glow?: boolean;
}) {
  const uid = useId().replace(/:/g, "");
  const petalId = `lupin-petal-${uid}`;
  const growthId = `lupin-growth-${uid}`;
  const glowId = `lupin-glow-${uid}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
      shapeRendering="geometricPrecision"
    >
      <defs>
        <linearGradient id={petalId} x1="18" y1="6" x2="18" y2="34" gradientUnits="userSpaceOnUse">
          <stop stopColor="#B794F6" />
          <stop offset="0.45" stopColor="#8B6CF8" />
          <stop offset="1" stopColor="#5B3FE0" />
        </linearGradient>
        <linearGradient id={growthId} x1="8" y1="40" x2="44" y2="14" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1A5C3E" />
          <stop offset="0.55" stopColor="#2A7A52" />
          <stop offset="1" stopColor="#3DAA72" />
        </linearGradient>
        {glow ? (
          <filter id={glowId} x="-35%" y="-35%" width="170%" height="170%" colorInterpolationFilters="sRGB">
            <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#000000" floodOpacity="0.4" />
            <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#52B788" floodOpacity="0.38" />
          </filter>
        ) : null}
      </defs>
      <g filter={glow ? `url(#${glowId})` : undefined}>
        <path d="M7 40H27V34H13V8H7V40Z" fill={`url(#${growthId})`} />
        <path d="M27 34L41 20" stroke="#3DAA72" strokeWidth="3.25" strokeLinecap="round" />
        <path
          d="M35 20H41V26"
          stroke="#3DAA72"
          strokeWidth="3.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M15.5 31L19 27.5L22.5 31L19 34.5L15.5 31Z" fill={`url(#${petalId})`} fillOpacity="0.9" />
        <path d="M15.5 25.5L19 22L22.5 25.5L19 29L15.5 25.5Z" fill={`url(#${petalId})`} fillOpacity="0.94" />
        <path d="M15.5 20L19 16.5L22.5 20L19 23.5L15.5 20Z" fill={`url(#${petalId})`} />
        <path d="M15.5 14.5L19 11L22.5 14.5L19 18L15.5 14.5Z" fill={`url(#${petalId})`} fillOpacity="0.92" />
        <path d="M15.5 9L19 5.5L22.5 9L19 12.5L15.5 9Z" fill={`url(#${petalId})`} fillOpacity="0.82" />
      </g>
    </svg>
  );
}
