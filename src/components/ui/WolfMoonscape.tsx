"use client";

import { useId } from "react";

interface WolfMoonscapeProps {
  className?: string;
}

/** Subtle horizon line — no clip-art trees */
export function WolfMoonscape({ className = "" }: WolfMoonscapeProps) {
  const uid = useId().replace(/:/g, "");
  const horizonGrad = `horizon-${uid}`;

  return (
    <svg
      viewBox="0 0 1440 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id={horizonGrad} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2d6a4f" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#0a0a0a" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0 60C240 30 480 50 720 25C960 0 1200 30 1440 15V120H0V60Z"
        fill={`url(#${horizonGrad})`}
      />
      <path
        d="M0 55C360 35 720 45 1080 30C1260 22 1380 28 1440 25"
        stroke="#52b788"
        strokeWidth="0.8"
        strokeOpacity="0.2"
        fill="none"
      />
    </svg>
  );
}
