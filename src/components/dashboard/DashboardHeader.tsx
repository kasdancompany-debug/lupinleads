interface DashboardHeaderProps {
  clientName: string;
  periodLabel: string;
}

export function DashboardHeader({ clientName, periodLabel }: DashboardHeaderProps) {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
      <div>
        <p className="text-[11px] uppercase tracking-[0.15em] text-silver-dim mb-1">
          Dashboard
        </p>
        <h1 className="text-xl font-medium text-foreground tracking-tight">
          {clientName}
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center dashboard-card px-3 py-1.5 text-[13px] text-silver-muted">
          <svg className="w-3.5 h-3.5 mr-2 text-silver-dim" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="2" y="3" width="12" height="11" rx="1" />
            <path d="M2 6H14M5 1V4M11 1V4" />
          </svg>
          {periodLabel}
        </div>
        <button
          type="button"
          className="dashboard-card px-3 py-1.5 text-[13px] text-silver-muted hover:text-foreground transition-colors"
        >
          Export
        </button>
      </div>
    </header>
  );
}
