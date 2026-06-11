"use client";

import { useId } from "react";

interface WolfCrestProps {
  className?: string;
  size?: number;
  variant?: "full" | "minimal";
}

export function WolfCrest({ className = "", size = 48, variant = "full" }: WolfCrestProps) {
  const uid = useId().replace(/:/g, "");
  const crestGrad = `crest-grad-${uid}`;

  if (variant === "minimal") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-hidden="true"
      >
        <path
          d="M24 6C24 6 14 12 14 22C14 30 18 36 24 38C30 36 34 30 34 22C34 12 24 6 24 6Z"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeOpacity="0.25"
          fill="none"
        />
        <path
          d="M18 20C20 16 22 15 24 15C26 15 28 16 30 20"
          stroke="currentColor"
          strokeWidth="0.9"
          strokeLinecap="round"
        />
        <circle cx="20.5" cy="19" r="1" fill="currentColor" fillOpacity="0.7" />
        <circle cx="27.5" cy="19" r="1" fill="currentColor" fillOpacity="0.7" />
        <path
          d="M22 24C22 24 23 23 24 23C25 23 26 24 26 24"
          stroke="currentColor"
          strokeWidth="0.6"
          strokeLinecap="round"
          strokeOpacity="0.5"
        />
        <path
          d="M24 4V6M12 14L10 10M36 14L38 10"
          stroke="currentColor"
          strokeWidth="0.5"
          strokeLinecap="round"
          strokeOpacity="0.3"
        />
      </svg>
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={crestGrad} x1="32" y1="4" x2="32" y2="68" gradientUnits="userSpaceOnUse">
          <stop stopColor="#52b788" stopOpacity="0.6" />
          <stop offset="1" stopColor="#c0c0c0" stopOpacity="0.2" />
        </linearGradient>
      </defs>

      {/* Shield frame */}
      <path
        d="M32 4L8 16V36C8 50 18 62 32 68C46 62 56 50 56 36V16L32 4Z"
        stroke={`url(#${crestGrad})`}
        strokeWidth="1.4"
        fill="none"
      />
      <path
        d="M32 8L12 18V36C12 48 20 58 32 62C44 58 52 48 52 36V18L32 8Z"
        stroke="currentColor"
        strokeWidth="0.6"
        strokeOpacity="0.35"
        fill="none"
      />

      {/* Wolf head — heraldic */}
      <path
        d="M32 20C26 20 22 24 20 30C18 36 20 42 26 45C28 46 30 47 32 47C34 47 36 46 38 45C44 42 46 36 44 30C42 24 38 20 32 20Z"
        fill="currentColor"
        fillOpacity="0.2"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.9"
      />
      <path d="M24 28L26 20L30 26" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.7" fill="none" />
      <path d="M40 28L38 20L34 26" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.7" fill="none" />
      <circle cx="27" cy="30" r="1.5" fill="currentColor" fillOpacity="0.9" />
      <circle cx="37" cy="30" r="1.5" fill="currentColor" fillOpacity="0.9" />
      <path
        d="M30 33C30 33 31 32 32 32C33 32 34 33 34 33"
        stroke="currentColor"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeOpacity="0.4"
      />

      {/* Ornamental flourishes */}
      <path
        d="M32 48V54M24 52H40"
        stroke="currentColor"
        strokeWidth="0.4"
        strokeOpacity="0.2"
        strokeLinecap="round"
      />
      <path
        d="M18 56C22 54 26 55 32 55C38 55 42 54 46 56"
        stroke="currentColor"
        strokeWidth="0.35"
        strokeOpacity="0.15"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
