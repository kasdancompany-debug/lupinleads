"use client";

import { formatCurrency } from "@/lib/dashboard/format";

interface CrmHeaderProps {
  totalLeads: number;
  pipelineValue: number;
  wonValue: number;
  onAddLead?: () => void;
  variant?: "agency" | "portal";
}

export function CrmHeader({
  totalLeads,
  pipelineValue,
  wonValue,
  onAddLead,
  variant = "agency",
}: CrmHeaderProps) {
  const isPortal = variant === "portal";

  return (
    <header className="flex flex-col gap-4 mb-5 sm:mb-6">
      <div>
        <p className="text-[11px] uppercase tracking-[0.15em] text-forest-glow mb-1">
          {isPortal ? "Your leads" : "Contractor CRM"}
        </p>
        <h1 className="text-lg sm:text-xl font-medium text-foreground tracking-tight">
          {isPortal ? "Track leads to jobs" : "Pipeline"}
        </h1>
        {isPortal ? (
          <p className="text-[13px] text-silver-muted mt-1.5 max-w-lg leading-relaxed">
            Drag a card to update status, or open a lead to add notes and job value.
          </p>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        <StatPill label={isPortal ? "Open leads" : "Active Leads"} value={String(totalLeads)} />
        <StatPill
          label={isPortal ? "Open job value" : "Pipeline Value"}
          value={formatCurrency(pipelineValue)}
        />
        <StatPill
          label={isPortal ? "Revenue won" : "Won"}
          value={formatCurrency(wonValue)}
          highlight
        />

        {onAddLead ? (
          <button
            type="button"
            onClick={onAddLead}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-[13px] font-medium bg-forest-mid text-foreground hover:bg-forest-light border border-forest-light/30 transition-colors min-h-[40px]"
          >
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M8 3V13M3 8H13" />
            </svg>
            New Lead
          </button>
        ) : null}
      </div>
    </header>
  );
}

function StatPill({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="dashboard-card px-3 py-2 min-w-[5.5rem]">
      <p className="text-[10px] uppercase tracking-wider text-silver-dim">{label}</p>
      <p
        className={`text-sm font-medium tabular-nums ${
          highlight ? "text-forest-glow" : "text-foreground"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
