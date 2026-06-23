import Link from "next/link";

interface PortalOverviewHeaderProps {
  clientName: string;
  periodLabel: string;
  isLive?: boolean;
}

export function PortalOverviewHeader({
  clientName,
  periodLabel,
  isLive = true,
}: PortalOverviewHeaderProps) {
  return (
    <header className="mb-6 sm:mb-8">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6">
        <div className="max-w-2xl">
          <p className="text-[11px] uppercase tracking-[0.2em] text-forest-glow mb-2 sm:mb-3">
            {periodLabel}
          </p>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-foreground tracking-tight mb-2">
            {clientName}
          </h1>
          <p className="text-sm text-silver-muted leading-relaxed">
            Your leads, estimates, jobs, and revenue from Lupin ad campaigns.
          </p>
          {!isLive && (
            <p className="text-[12px] text-amber-400/80 mt-3">
              Your account is being set up. Numbers will appear here once campaigns are live.
            </p>
          )}
        </div>

        {isLive ? (
          <div className="flex items-center gap-2 shrink-0">
            <span className="inline-flex items-center gap-1.5 dashboard-card px-3 py-1.5 text-[12px] text-forest-glow">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-glow animate-pulse" />
              Live
            </span>
          </div>
        ) : null}
      </div>

      <div className="mt-5 sm:mt-6 flex flex-wrap gap-2 sm:gap-3">
        <FunnelStep label="Ads" />
        <FunnelArrow />
        <FunnelStep label="Leads" active />
        <FunnelArrow />
        <FunnelStep label="Estimates" />
        <FunnelArrow />
        <FunnelStep label="Jobs" highlight />
        <FunnelArrow />
        <FunnelStep label="Revenue" highlight />
      </div>
    </header>
  );
}

function FunnelStep({
  label,
  active = false,
  highlight = false,
}: {
  label: string;
  active?: boolean;
  highlight?: boolean;
}) {
  return (
    <span
      className={`text-[10px] sm:text-[11px] uppercase tracking-wider px-2.5 sm:px-3 py-1.5 rounded-full border ${
        highlight
          ? "border-forest-glow/40 bg-forest-mid/15 text-forest-glow"
          : active
            ? "border-silver/20 bg-white/[0.04] text-foreground"
            : "border-silver/10 text-silver-dim"
      }`}
    >
      {label}
    </span>
  );
}

function FunnelArrow() {
  return (
    <span className="text-silver/25 text-sm self-center hidden xs:inline" aria-hidden="true">
      →
    </span>
  );
}

export function PortalSpendNote() {
  return (
    <div className="dashboard-card px-4 sm:px-5 py-4 border-l-2 border-l-forest-mid/50 bg-forest-mid/[0.04]">
      <p className="text-sm text-foreground font-medium mb-1">Ad spend not added yet</p>
      <p className="text-[13px] text-silver-muted leading-relaxed">
        Your Lupin team logs monthly ad spend. Once it&apos;s in, you&apos;ll see cost per
        lead and return on your ads here.
      </p>
      <Link
        href="/portal/reports"
        className="inline-block mt-3 text-[12px] text-forest-glow hover:text-forest-light transition-colors"
      >
        View monthly reports →
      </Link>
    </div>
  );
}
