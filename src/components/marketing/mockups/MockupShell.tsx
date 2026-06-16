import type { ReactNode } from "react";

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
    <div
      className={`mockup-glass rounded-xl overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.55)] ${className}`}
    >
      <div
        className={`flex items-center justify-between gap-3 border-b border-silver/10 bg-black-surface/80 ${
          compact ? "px-3 py-2" : "px-4 py-3"
        }`}
      >
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex gap-1.5 shrink-0">
            <span className="w-2 h-2 rounded-full bg-red-500/60" />
            <span className="w-2 h-2 rounded-full bg-amber-500/60" />
            <span className="w-2 h-2 rounded-full bg-forest-glow/70" />
          </div>
          <span
            className={`text-silver-dim tracking-wide truncate ${
              compact ? "text-[10px]" : "text-[11px]"
            }`}
          >
            {title}
          </span>
        </div>
        {badge && (
          <span className="text-[9px] uppercase tracking-wider text-forest-glow px-2 py-0.5 rounded border border-forest-mid/30 bg-forest-mid/10 shrink-0">
            {badge}
          </span>
        )}
      </div>
      <div className={compact ? "p-3" : "p-4"}>{children}</div>
    </div>
  );
}

export function MockupStat({
  label,
  value,
  sub,
  highlight,
}: {
  label: string;
  value: string;
  sub?: string;
  highlight?: boolean;
}) {
  return (
    <div className="rounded-lg bg-black-surface/70 border border-silver/10 px-3 py-2.5">
      <p className="text-[9px] text-silver-dim uppercase tracking-wider">{label}</p>
      <p className="text-lg font-semibold text-foreground tabular-nums leading-tight">{value}</p>
      {sub && (
        <p className={`text-[10px] ${highlight ? "text-forest-glow" : "text-silver-dim"}`}>
          {sub}
        </p>
      )}
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
      className={`rounded-lg bg-forest-mid/20 border border-forest-mid/35 flex items-center justify-center text-forest-glow font-semibold shrink-0 ${
        size === "sm" ? "w-8 h-8 text-[10px]" : "w-10 h-10 text-xs"
      }`}
    >
      {initials}
    </div>
  );
}
