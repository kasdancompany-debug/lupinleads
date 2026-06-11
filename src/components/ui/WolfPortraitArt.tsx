"use client";

import { useId } from "react";

interface WolfPortraitArtProps {
  className?: string;
}

/** Editorial line-art wolf profile — no filled shapes, reads on dark backgrounds */
export function WolfPortraitArt({ className = "" }: WolfPortraitArtProps) {
  const uid = useId().replace(/:/g, "");
  const furGrad = `fur-grad-${uid}`;
  const moonGrad = `moon-grad-${uid}`;

  return (
    <svg
      viewBox="0 0 480 520"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={furGrad} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#74c69d" />
          <stop offset="50%" stopColor="#52b788" />
          <stop offset="100%" stopColor="#c0c0c0" />
        </linearGradient>
        <radialGradient id={moonGrad} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#e8e8e8" stopOpacity="0.35" />
          <stop offset="70%" stopColor="#c0c0c0" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#52b788" stopOpacity="0" />
        </radialGradient>
        <filter id={`glow-${uid}`}>
          <feGaussianBlur stdDeviation="2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Moon */}
      <circle cx="360" cy="90" r="56" fill={`url(#${moonGrad})`} />
      <circle cx="360" cy="90" r="56" stroke="#c0c0c0" strokeWidth="0.6" strokeOpacity="0.3" />

      {/* Constellation */}
      <g stroke="#c0c0c0" strokeWidth="0.5" strokeOpacity="0.25">
        <path d="M40 70L75 50L108 65" />
        <circle cx="40" cy="70" r="1.5" fill="#52b788" fillOpacity="0.6" />
        <circle cx="75" cy="50" r="1" fill="#c0c0c0" fillOpacity="0.5" />
      </g>

      {/* Wolf profile — stroke-only editorial illustration */}
      <g filter={`url(#glow-${uid})`}>
        <path
          d="M80 360C72 310 88 260 130 225C155 206 185 198 215 208C232 213 246 225 256 242C270 222 292 208 320 206C355 203 385 225 402 258C418 290 420 328 408 358C396 388 370 410 340 420C322 426 302 428 282 424C260 442 232 452 200 456C162 461 125 445 102 415C80 385 72 345 80 360Z"
          stroke={`url(#${furGrad})`}
          strokeWidth="1.6"
          fill="#1b4332"
          fillOpacity="0.12"
        />
        <path
          d="M256 242C248 210 262 178 284 166C298 158 310 168 304 186C294 208 272 228 256 242Z"
          stroke="#52b788"
          strokeWidth="1.2"
          fill="none"
        />
        <path d="M284 166L292 148L302 162" stroke="#74c69d" strokeWidth="0.9" fill="none" />
        <path
          d="M340 420C358 410 378 390 390 365C400 345 396 325 380 312C364 299 342 304 328 318C314 332 310 355 320 375C330 395 336 410 340 420Z"
          stroke="#c0c0c0"
          strokeWidth="1"
          strokeOpacity="0.6"
          fill="none"
        />
        <ellipse cx="302" cy="278" rx="7" ry="4.5" fill="#52b788" fillOpacity="0.8" />
        <circle cx="304" cy="277" r="1.8" fill="#e8e8e8" />

        {/* Fur strokes */}
        <g stroke={`url(#${furGrad})`} strokeWidth="1" strokeLinecap="round" fill="none">
          <path d="M155 248C172 236 198 230 222 236" opacity="0.85" />
          <path d="M140 280C160 268 188 262 216 270" opacity="0.8" />
          <path d="M128 315C150 302 180 296 210 304" opacity="0.75" />
          <path d="M118 350C142 338 172 332 202 340" opacity="0.7" />
          <path d="M112 385C138 375 168 370 198 378" opacity="0.65" />
          <path d="M262 228C278 242 290 262 296 284" opacity="0.8" />
          <path d="M272 262C286 280 294 302 296 324" opacity="0.75" />
          <path d="M200 456C222 442 248 432 282 424" opacity="0.6" />
        </g>
      </g>

      {/* Ground line */}
      <path
        d="M0 470C120 450 220 460 340 440C400 430 440 435 480 425"
        stroke="#52b788"
        strokeWidth="0.8"
        strokeOpacity="0.25"
        fill="none"
      />
    </svg>
  );
}
