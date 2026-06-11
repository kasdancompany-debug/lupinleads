"use client";

import { useId } from "react";

interface WolfWatermarkProps {
  className?: string;
}

export function WolfWatermark({ className = "" }: WolfWatermarkProps) {
  const uid = useId().replace(/:/g, "");
  const wmGrad = `wm-grad-${uid}`;

  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={wmGrad} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#2d6a4f" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#0a0a0a" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="200" cy="200" r="180" fill={`url(#${wmGrad})`} />

      <g stroke="#52b788" strokeWidth="1.2" strokeOpacity="0.22" fill="none">
        <path d="M120 240C100 200 110 160 140 130C160 112 190 105 220 115" />
        <path d="M220 115C250 105 280 115 300 140C320 165 325 195 315 220" />
        <path d="M315 220C305 245 280 260 250 265C220 270 190 260 170 240" />
        <path d="M170 240C150 220 135 195 130 170" />
        <path d="M140 130L125 95L145 110" />
        <path d="M220 115L235 80L250 105" />
        <path d="M300 140L320 110L330 135" />
      </g>

      <g fill="#52b788" fillOpacity="0.35">
        <circle cx="200" cy="175" r="5" />
        <circle cx="175" cy="195" r="3" />
        <circle cx="225" cy="195" r="3" />
      </g>

      <path
        d="M200 40L340 120V280L200 360L60 280V120L200 40Z"
        stroke="#c0c0c0"
        strokeOpacity="0.12"
        strokeWidth="1"
        fill="none"
      />
    </svg>
  );
}
