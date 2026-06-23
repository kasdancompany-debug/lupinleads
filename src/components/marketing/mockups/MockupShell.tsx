import type { ReactNode } from "react";
import { MockupNode } from "./MockupBrand";

interface MockupShellProps {
  title: string;
  badge?: string;
  children: ReactNode;
  className?: string;
  compact?: boolean;
  bare?: boolean;
}

export function MockupShell({
  title,
  badge,
  children,
  className = "",
  compact = false,
  bare = false,
}: MockupShellProps) {
  if (bare) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={`mockup-glass mockup-shell ${className}`}>
      <div
        className={`mockup-shell__chrome flex items-center justify-between gap-3 ${
          compact ? "px-3 py-2" : "px-4 py-2.5"
        }`}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="flex gap-1.5 shrink-0" aria-hidden>
            <span className="mockup-chrome-dot mockup-chrome-dot--purple" />
            <span className="mockup-chrome-dot mockup-chrome-dot--green" />
            <span className="mockup-chrome-dot mockup-chrome-dot--sage" />
          </div>
          <span
            className={`text-silver-muted tracking-wide truncate font-medium ${
              compact ? "text-[10px]" : "text-[11px]"
            }`}
          >
            {title}
          </span>
        </div>
        {badge && <span className="mockup-shell__badge shrink-0">{badge}</span>}
      </div>
      <div className={compact ? "p-3" : "p-4 sm:p-5"}>{children}</div>
    </div>
  );
}

export function MockupStat({
  label,
  value,
  sub,
  highlight,
  trend,
}: {
  label: string;
  value: string;
  sub?: string;
  highlight?: boolean;
  trend?: "up" | "neutral";
}) {
  return (
    <div className={`mockup-stat ${highlight ? "mockup-stat--highlight" : ""}`}>
      <span className="mockup-stat__stem" aria-hidden />
      <div className="min-w-0">
        <p className="mockup-stat__label">{label}</p>
        <p className="mockup-stat__value">{value}</p>
        {sub && (
          <p className={`mockup-stat__sub ${trend === "up" ? "mockup-stat__sub--up" : ""}`}>
            {sub}
          </p>
        )}
      </div>
      {highlight && <MockupNode variant="won" className="mockup-stat__node" />}
    </div>
  );
}

export function MockupAvatar({ name, size = "md" }: { name: string; size?: "sm" | "md" }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className={`mockup-avatar ${size === "sm" ? "mockup-avatar--sm" : "mockup-avatar--md"}`}
    >
      {initials}
    </div>
  );
}
