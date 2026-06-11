"use client";

import { formatCurrency } from "@/lib/dashboard/format";

interface CrmHeaderProps {
  totalLeads: number;
  pipelineValue: number;
  wonValue: number;
  onAddLead: () => void;
}

export function CrmHeader({
  totalLeads,
  pipelineValue,
  wonValue,
  onAddLead,
}: CrmHeaderProps) {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <p className="text-[11px] uppercase tracking-[0.15em] text-silver-dim mb-1">
          Contractor CRM
        </p>
        <h1 className="text-xl font-medium text-foreground tracking-tight">
          Pipeline
        </h1>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <StatPill label="Active Leads" value={String(totalLeads)} />
        <StatPill label="Pipeline Value" value={formatCurrency(pipelineValue)} />
        <StatPill label="Won" value={formatCurrency(wonValue)} highlight />

        <button
          type="button"
          onClick={onAddLead}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-[13px] font-medium bg-forest-mid text-foreground hover:bg-forest-light border border-forest-light/30 transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M8 3V13M3 8H13" />
          </svg>
          New Lead
        </button>
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
    <div className="dashboard-card px-3 py-2">
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
