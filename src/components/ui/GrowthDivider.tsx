import { useId } from "react";

export type GrowthDividerVariant = "whisper" | "stem" | "branch" | "node";
export type GrowthDividerAlign = "left" | "center" | "right";

type GrowthDividerProps = {
  /** whisper = barely there; stem/branch/node = slightly more structure */
  variant?: GrowthDividerVariant;
  align?: GrowthDividerAlign;
  className?: string;
};

const alignClass: Record<GrowthDividerAlign, string> = {
  left: "growth-divider--left",
  center: "growth-divider--center",
  right: "growth-divider--right",
};

/**
 * Subtle section break — stem, branch, and node motifs from the Lupin identity.
 */
export function GrowthDivider({
  variant = "whisper",
  align = "center",
  className = "",
}: GrowthDividerProps) {
  const uid = useId().replace(/:/g, "");

  return (
    <div
      className={[
        "growth-divider",
        `growth-divider--${variant}`,
        alignClass[align],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      role="presentation"
      aria-hidden
    >
      <svg
        className="growth-divider__svg"
        viewBox="0 0 320 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id={`${uid}-fade`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--forest-green-bright)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--forest-green-bright)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--forest-green-bright)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Soil whisper — all variants */}
        <path
          d="M 24 40 H 296"
          stroke={`url(#${uid}-fade)`}
          strokeWidth="0.75"
          strokeLinecap="round"
          opacity={variant === "whisper" ? 0.5 : 0.7}
        />

        {variant === "whisper" && (
          <g opacity="0.65">
            <path
              d="M 160 40 V 28"
              stroke="var(--forest-green)"
              strokeWidth="0.75"
              strokeLinecap="round"
              strokeOpacity="0.4"
            />
            <circle cx="160" cy="26" r="1.5" fill="var(--lupin-purple-light)" fillOpacity="0.55" />
          </g>
        )}

        {variant === "stem" && (
          <g opacity="0.75">
            <path
              d="M 160 40 V 14"
              stroke="var(--forest-green-bright)"
              strokeWidth="0.85"
              strokeLinecap="round"
              strokeOpacity="0.45"
            />
            <circle cx="160" cy="22" r="1.75" fill="var(--forest-green-bright)" fillOpacity="0.5" />
            <circle cx="160" cy="12" r="2" fill="var(--lupin-purple-light)" fillOpacity="0.65" />
            <path
              d="M 160 30 H 188 L 204 18"
              stroke="var(--forest-green)"
              strokeWidth="0.75"
              strokeLinecap="round"
              strokeOpacity="0.35"
            />
            <circle cx="204" cy="18" r="1.25" fill="var(--lupin-purple)" fillOpacity="0.45" />
          </g>
        )}

        {variant === "branch" && (
          <g opacity="0.8">
            <path
              d="M 96 40 V 26 M 96 32 C 120 32 132 24 148 20 C 168 14 188 18 208 24"
              stroke="var(--forest-green-bright)"
              strokeWidth="0.85"
              strokeLinecap="round"
              strokeOpacity="0.4"
              fill="none"
            />
            <path
              d="M 224 40 V 22"
              stroke="var(--forest-green)"
              strokeWidth="0.75"
              strokeLinecap="round"
              strokeOpacity="0.35"
            />
            <circle cx="148" cy="20" r="2" fill="var(--lupin-purple-light)" fillOpacity="0.7" />
            <circle cx="208" cy="24" r="1.5" fill="var(--forest-green-bright)" fillOpacity="0.55" />
            <circle cx="224" cy="20" r="1.5" fill="var(--lupin-purple)" fillOpacity="0.5" />
          </g>
        )}

        {variant === "node" && (
          <g opacity="0.7">
            <path
              d="M 128 40 V 24 M 192 40 V 24 M 128 32 H 192"
              stroke="var(--forest-green)"
              strokeWidth="0.75"
              strokeLinecap="round"
              strokeOpacity="0.38"
            />
            <circle cx="128" cy="22" r="1.75" fill="var(--forest-green-bright)" fillOpacity="0.5" />
            <circle cx="160" cy="32" r="2.25" fill="var(--lupin-purple-light)" fillOpacity="0.6" />
            <circle cx="192" cy="22" r="1.75" fill="var(--forest-green-bright)" fillOpacity="0.5" />
          </g>
        )}
      </svg>
    </div>
  );
}
