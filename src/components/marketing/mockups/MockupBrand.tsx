import type { ReactNode } from "react";

/** Purple / green status pill — no generic red/amber. */
export function MockupStatus({
  variant,
  label,
  className = "",
}: {
  variant: "hot" | "warm" | "neutral" | "won" | "new";
  label: string;
  className?: string;
}) {
  return (
    <span className={`mockup-status mockup-status--${variant} ${className}`}>{label}</span>
  );
}

/** Glowing node dot for lists and cards. */
export function MockupNode({
  variant = "neutral",
  pulse = false,
  className = "",
}: {
  variant?: "hot" | "warm" | "neutral" | "won" | "new";
  pulse?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`mockup-node mockup-node--${variant} ${pulse ? "mockup-node--pulse" : ""} ${className}`}
      aria-hidden
    />
  );
}

/** Cleaner inner card surface. */
export function MockupCard({
  children,
  className = "",
  active = false,
}: {
  children: ReactNode;
  className?: string;
  active?: boolean;
}) {
  return (
    <div
      className={`mockup-card ${active ? "mockup-card--active" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

/** Stem-inspired bar chart — growth from soil line upward. */
export function StemBarChart({
  values,
  labels,
  height = 96,
  className = "",
}: {
  values: number[];
  labels: string[];
  height?: number;
  className?: string;
}) {
  const max = Math.max(...values, 1);

  return (
    <div className={`mockup-stem-chart ${className}`}>
      <div className="mockup-stem-chart__soil" aria-hidden />
      <div className="mockup-stem-chart__bars" style={{ height }}>
        {values.map((value, i) => {
          const pct = Math.round((value / max) * 100);
          return (
            <div key={labels[i] ?? i} className="mockup-stem-chart__col">
              <div className="mockup-stem-chart__stem-wrap" style={{ height: `${pct}%` }}>
                <span className="mockup-stem-chart__node" aria-hidden />
                <span className="mockup-stem-chart__stem" />
              </div>
              <span className="mockup-stem-chart__label">{labels[i]}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** Horizontal growth rail connecting pipeline columns. */
export function PipelineGrowthRail({
  columns,
  className = "",
}: {
  columns: number;
  className?: string;
}) {
  const step = 100 / columns;
  const points = Array.from({ length: columns }, (_, i) => ({
    x: step * i + step / 2,
    y: i === columns - 1 ? 58 : 42 + (i % 2) * 6,
  }));

  const pathD = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  return (
    <svg
      className={`mockup-pipeline-rail ${className}`}
      viewBox="0 0 100 64"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path
        d="M 4 52 H 96"
        stroke="var(--forest-green)"
        strokeWidth="0.75"
        strokeOpacity="0.25"
        strokeLinecap="round"
      />
      <path
        d={pathD}
        fill="none"
        stroke="var(--forest-green-bright)"
        strokeWidth="1.25"
        strokeOpacity="0.55"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {points.map((p, i) => (
        <g key={i} transform={`translate(${p.x} ${p.y})`}>
          <circle r="2.2" fill="var(--lupin-purple-deep)" fillOpacity="0.35" />
          <circle r="1" fill="var(--lupin-purple-light)" fillOpacity="0.9" />
        </g>
      ))}
    </svg>
  );
}

/** Stem progress row for report snapshots. */
export function StemProgressRow({
  label,
  value,
  pct,
}: {
  label: string;
  value: string;
  pct: number;
}) {
  return (
    <div className="mockup-stem-progress">
      <div className="flex justify-between text-xs mb-1.5">
        <span className="text-silver-muted">{label}</span>
        <span className="text-foreground font-medium tabular-nums">{value}</span>
      </div>
      <div className="mockup-stem-progress__track">
        <div className="mockup-stem-progress__fill" style={{ width: `${pct}%` }}>
          <span className="mockup-stem-progress__node" aria-hidden />
        </div>
      </div>
    </div>
  );
}

/** Revenue vs spend — dual stem comparison. */
export function StemCompareBar({
  spendLabel,
  spendValue,
  closedLabel,
  closedValue,
  closedPct,
}: {
  spendLabel: string;
  spendValue: string;
  closedLabel: string;
  closedValue: string;
  closedPct: number;
}) {
  return (
    <MockupCard>
      <div className="flex items-center justify-between mb-4">
        <p className="mockup-section-label">Revenue vs ad spend</p>
        <MockupStatus variant="won" label="+26% MoM" />
      </div>
      <div className="mockup-stem-compare">
        <div className="mockup-stem-compare__row">
          <span className="mockup-stem-compare__label">{spendLabel}</span>
          <div className="mockup-stem-compare__track">
            <div className="mockup-stem-compare__spend" style={{ width: "38%" }} />
          </div>
          <span className="mockup-stem-compare__value text-silver-muted">{spendValue}</span>
        </div>
        <div className="mockup-stem-compare__row">
          <span className="mockup-stem-compare__label">{closedLabel}</span>
          <div className="mockup-stem-compare__track">
            <div className="mockup-stem-compare__closed" style={{ width: `${closedPct}%` }}>
              <span className="mockup-stem-progress__node" aria-hidden />
            </div>
          </div>
          <span className="mockup-stem-compare__value text-foreground font-semibold">
            {closedValue}
          </span>
        </div>
      </div>
    </MockupCard>
  );
}
