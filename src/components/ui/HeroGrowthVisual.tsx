"use client";

import { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";

type HeroGrowthVisualProps = {
  variant?: "full" | "compact";
  className?: string;
};

const FLOW_STAGES = [
  { id: "click", label: "Click", cx: 92, cy: 548 },
  { id: "lead", label: "Lead", cx: 168, cy: 468 },
  { id: "quote", label: "Quote", cx: 268, cy: 388 },
  { id: "booked", label: "Booked", cx: 392, cy: 292 },
] as const;

/**
 * Large abstract lupin growth structure — stems, branch, nodes, lead-flow path.
 */
export function HeroGrowthVisual({
  variant = "full",
  className = "",
}: HeroGrowthVisualProps) {
  const uid = useId().replace(/:/g, "");
  const reduce = useReducedMotion();
  const compact = variant === "compact";

  return (
    <div
      className={[
        "hero-growth-visual",
        compact ? "hero-growth-visual--compact" : "hero-growth-visual--full",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-hidden
    >
      <div className="hero-growth-visual__glow" />
      <motion.svg
        className="hero-growth-visual__svg"
        viewBox="0 0 560 640"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={reduce ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <defs>
          <linearGradient id={`${uid}-petal`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--lupin-purple-light)" />
            <stop offset="100%" stopColor="var(--lupin-purple-deep)" />
          </linearGradient>
          <linearGradient id={`${uid}-stem`} x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="var(--forest-green-deep)" stopOpacity="0.4" />
            <stop offset="45%" stopColor="var(--forest-green)" stopOpacity="0.95" />
            <stop offset="100%" stopColor="var(--forest-green-bright)" stopOpacity="0.75" />
          </linearGradient>
          <linearGradient id={`${uid}-branch`} x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--forest-green-bright)" />
            <stop offset="100%" stopColor="var(--sage-green)" />
          </linearGradient>
          <linearGradient id={`${uid}-soil`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--forest-green-deep)" stopOpacity="0" />
            <stop offset="100%" stopColor="var(--forest-green-deep)" stopOpacity="0.35" />
          </linearGradient>
          <filter id={`${uid}-glow`} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Soil horizon */}
        <ellipse
          cx="300"
          cy="610"
          rx="280"
          ry="48"
          fill={`url(#${uid}-soil)`}
          opacity="0.9"
        />

        {/* Main L stem — logo growth base */}
        <g opacity="0.92">
          <path
            d="M72 580 H248 V520 H128 V96 H72 V580 Z"
            fill={`url(#${uid}-stem)`}
            fillOpacity="0.55"
          />
          <path
            d="M72 580 H248 V520 H128 V96 H72 V580 Z"
            stroke="var(--forest-green-bright)"
            strokeWidth="1.25"
            strokeOpacity="0.35"
            fill="none"
          />
        </g>

        {/* Ascending growth branch */}
        <path
          d="M248 520 L420 350"
          stroke={`url(#${uid}-branch)`}
          strokeWidth="3.5"
          strokeLinecap="round"
          opacity="0.88"
        />
        <path
          d="M408 350 L420 338 M420 350 V362"
          stroke="var(--forest-green-bright)"
          strokeWidth="2.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.9"
        />

        {/* Secondary whisper stem */}
        <path
          d="M468 580 V280"
          stroke="var(--forest-green)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeOpacity="0.45"
        />
        <path
          d="M468 340 H512 L548 304"
          stroke="var(--forest-green-bright)"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeOpacity="0.4"
        />

        {/* Lupin petals on primary stem */}
        {[520, 468, 416, 364, 312, 260, 208, 156].map((cy, i) => (
          <path
            key={cy}
            d={`M108 ${cy} L124 ${cy - 16} L140 ${cy} L124 ${cy + 16} Z`}
            fill={`url(#${uid}-petal)`}
            fillOpacity={0.55 + i * 0.04}
            opacity={0.7 + i * 0.03}
          />
        ))}

        {/* Lead-flow path */}
        <path
          className="hero-flow-path"
          d="M92 548 C132 520 148 500 168 468 S228 420 268 388 S340 340 392 292"
          stroke="var(--lupin-purple)"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeOpacity="0.55"
          fill="none"
        />

        {/* Flow nodes + labels */}
        {FLOW_STAGES.map((stage, i) => (
          <g key={stage.id} filter={`url(#${uid}-glow)`}>
            <circle
              cx={stage.cx}
              cy={stage.cy}
              r={i === FLOW_STAGES.length - 1 ? 7 : 5.5}
              fill="var(--lupin-purple-deep)"
              fillOpacity="0.35"
              stroke="var(--lupin-purple-light)"
              strokeWidth="1.5"
              strokeOpacity="0.75"
            />
            <circle
              cx={stage.cx}
              cy={stage.cy}
              r="2"
              fill="var(--lupin-purple-light)"
              fillOpacity="0.9"
            />
            {!compact && (
              <text
                x={stage.cx}
                y={stage.cy + (i === 0 ? 22 : -14)}
                textAnchor="middle"
                className="hero-growth-visual__label"
              >
                {stage.label}
              </text>
            )}
          </g>
        ))}

        {/* Accent nodes along branch */}
        <circle cx="320" cy="448" r="3" fill="var(--sage-green)" fillOpacity="0.5" />
        <circle cx="368" cy="400" r="2.5" fill="var(--forest-green-bright)" fillOpacity="0.45" />
      </motion.svg>

      {compact && (
        <div className="hero-lead-flow-strip">
          {FLOW_STAGES.map((stage, i) => (
            <span key={stage.id} className="hero-lead-flow-strip__item">
              <span className="hero-lead-flow-strip__node" />
              <span className="hero-lead-flow-strip__label">{stage.label}</span>
              {i < FLOW_STAGES.length - 1 && (
                <span className="hero-lead-flow-strip__connector" aria-hidden />
              )}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
