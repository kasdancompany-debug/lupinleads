import { useId } from "react";

export type GrowthPatternTone = "dark" | "light";
export type GrowthPatternIntensity = "whisper" | "subtle" | "soft";
export type GrowthPatternPlacement = "balanced" | "left" | "right" | "corners";

export type GrowthPatternProps = {
  /** Tune contrast for dark vs light section backgrounds */
  tone?: GrowthPatternTone;
  /** Keep low — whisper/subtle for body sections, soft for hero only */
  intensity?: GrowthPatternIntensity;
  /** Bias the composition away from primary reading areas */
  placement?: GrowthPatternPlacement;
  className?: string;
};

const intensityClass: Record<GrowthPatternIntensity, string> = {
  whisper: "growth-pattern--whisper",
  subtle: "growth-pattern--subtle",
  soft: "growth-pattern--soft",
};

const placementClass: Record<GrowthPatternPlacement, string> = {
  balanced: "growth-pattern--balanced",
  left: "growth-pattern--left",
  right: "growth-pattern--right",
  corners: "growth-pattern--corners",
};

/**
 * Subtle abstract line art — lupin stems, growth branches, lead nodes.
 * Decorative only; sits behind content with a readability mask.
 */
export function GrowthPattern({
  tone = "dark",
  intensity = "subtle",
  placement = "balanced",
  className = "",
}: GrowthPatternProps) {
  const uid = useId().replace(/:/g, "");

  return (
    <div
      className={[
        "growth-pattern",
        tone === "light" ? "growth-pattern--light" : "growth-pattern--dark",
        intensityClass[intensity],
        placementClass[placement],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-hidden
    >
      <div className="growth-pattern__canvas">
        <svg
          className="growth-pattern__svg"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id={`${uid}-stem`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--growth-node)" stopOpacity="0.5" />
              <stop offset="55%" stopColor="var(--growth-stem)" stopOpacity="0.9" />
              <stop offset="100%" stopColor="var(--growth-stem)" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id={`${uid}-branch`} x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--growth-stem)" />
              <stop offset="100%" stopColor="var(--growth-branch)" />
            </linearGradient>
          </defs>

          {/* ── Left stem cluster ── */}
          <g className="growth-pattern__group" opacity="0.95">
            <path
              d="M118 780V220"
              stroke={`url(#${uid}-stem)`}
              strokeWidth="1.25"
              strokeLinecap="round"
            />
            {[
              [118, 260],
              [118, 340],
              [118, 420],
              [118, 500],
              [118, 580],
            ].map(([cx, cy]) => (
              <g key={cy} transform={`translate(${cx} ${cy})`}>
                <path d="M-5 -4 L0 -9 L5 -4 L0 1 Z" fill="var(--growth-node)" fillOpacity="0.55" />
                <circle r="2.25" fill="var(--growth-node)" fillOpacity="0.35" />
              </g>
            ))}
            <path
              d="M118 620 H168 L228 560"
              stroke={`url(#${uid}-branch)`}
              strokeWidth="1.35"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M220 560 L228 552 M228 560 V568"
              stroke="var(--growth-branch)"
              strokeWidth="1.35"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="168" cy="620" r="3" fill="var(--growth-node)" fillOpacity="0.4" />
          </g>

          {/* ── Center-right ascending branch ── */}
          <g className="growth-pattern__group" opacity="0.85">
            <path
              d="M920 760 V420"
              stroke="var(--growth-stem)"
              strokeWidth="1.15"
              strokeLinecap="round"
              strokeOpacity="0.7"
            />
            <path
              d="M920 520 L1040 400 L1140 320"
              stroke={`url(#${uid}-branch)`}
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            <path
              d="M1132 320 L1140 312 M1140 320 H1148"
              stroke="var(--growth-branch)"
              strokeWidth="1.35"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {[520, 460, 400].map((cy) => (
              <circle
                key={cy}
                cx="920"
                cy={cy}
                r="2.5"
                fill="var(--growth-node)"
                fillOpacity="0.32"
              />
            ))}
            <circle cx="1040" cy="400" r="3.25" fill="var(--growth-node)" fillOpacity="0.45" />
          </g>

          {/* ── Upper right whisper stems ── */}
          <g className="growth-pattern__group" opacity="0.7">
            <path
              d="M1260 180 V420"
              stroke="var(--growth-stem)"
              strokeWidth="1"
              strokeLinecap="round"
              strokeOpacity="0.55"
            />
            <path d="M1260 240 L1295 205 L1330 240 L1295 275 Z" fill="var(--growth-node)" fillOpacity="0.28" />
            <path d="M1260 320 L1295 285 L1330 320 L1295 355 Z" fill="var(--growth-node)" fillOpacity="0.22" />
            <path
              d="M1260 400 H1310 L1360 350"
              stroke="var(--growth-branch)"
              strokeWidth="1.15"
              strokeLinecap="round"
              strokeOpacity="0.65"
            />
            <circle cx="1310" cy="400" r="2.75" fill="var(--growth-node)" fillOpacity="0.3" />
          </g>

          {/* ── Lower center nodes + branch ── */}
          <g className="growth-pattern__group" opacity="0.65">
            <path
              d="M520 820 L640 700 L760 600"
              stroke={`url(#${uid}-branch)`}
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeDasharray="4 7"
              strokeOpacity="0.55"
            />
            <circle cx="520" cy="820" r="3" fill="var(--growth-node)" fillOpacity="0.28" />
            <circle cx="640" cy="700" r="2.5" fill="var(--growth-node)" fillOpacity="0.22" />
            <circle cx="760" cy="600" r="2" fill="var(--growth-stem)" fillOpacity="0.35" />
            <path
              d="M748 592 L760 600 L752 612"
              stroke="var(--growth-branch)"
              strokeWidth="1.1"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeOpacity="0.5"
            />
          </g>

          {/* ── Far left accent ── */}
          <g className="growth-pattern__group" opacity="0.5">
            <path
              d="M48 640 V360"
              stroke="var(--growth-stem)"
              strokeWidth="0.9"
              strokeLinecap="round"
              strokeOpacity="0.45"
            />
            <path d="M48 400 L56 392 L64 400 L56 408 Z" fill="var(--growth-node)" fillOpacity="0.2" />
          </g>
        </svg>
      </div>
    </div>
  );
}
