interface DashboardHeaderProps {
  clientName: string;
  periodLabel: string;
  isLive?: boolean;
}

export function DashboardHeader({ clientName, periodLabel, isLive = true }: DashboardHeaderProps) {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
      <div>
        <p className="text-[11px] uppercase tracking-[0.15em] text-silver-dim mb-1">
          Agency Dashboard
        </p>
        <h1 className="text-xl font-medium text-foreground tracking-tight">
          {clientName}
        </h1>
        {!isLive && (
          <p className="text-[12px] text-amber-400/80 mt-1">
            Supabase not connected — metrics will appear once env vars are set.
          </p>
        )}
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center dashboard-card px-3 py-1.5 text-[13px] text-silver-muted">
          <svg className="w-3.5 h-3.5 mr-2 text-silver-dim" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="2" y="3" width="12" height="11" rx="1" />
            <path d="M2 6H14M5 1V4M11 1V4" />
          </svg>
          {periodLabel}
        </div>
        {isLive && (
          <span className="inline-flex items-center gap-1.5 dashboard-card px-3 py-1.5 text-[12px] text-forest-glow">
            <span className="w-1.5 h-1.5 rounded-full bg-forest-glow animate-pulse" />
            Live data
          </span>
        )}
      </div>
    </header>
  );
}
