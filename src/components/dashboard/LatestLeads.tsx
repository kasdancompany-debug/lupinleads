import Link from "next/link";
import type { Lead, LeadStatus } from "@/lib/dashboard/types";
import { formatCurrency, formatRelativeDate } from "@/lib/dashboard/format";

const DEFAULT_STATUS_STYLES: Record<LeadStatus, string> = {
  new: "text-silver-muted bg-silver/10",
  qualified: "text-forest-glow bg-forest-mid/15",
  contacted: "text-blue-300/80 bg-blue-400/10",
  converted: "text-forest-light bg-forest-mid/25",
  lost: "text-red-400/70 bg-red-400/10",
};

interface LatestLeadsProps {
  leads: Lead[];
  crmHref?: string;
  title?: string;
  subtitle?: string;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyAction?: { label: string; href: string };
  statusLabels?: Record<LeadStatus, string>;
  pipelineLinkLabel?: string;
}

export function LatestLeads({
  leads,
  crmHref = "/dashboard/crm",
  title = "Latest Leads",
  subtitle,
  emptyTitle = "No leads in the pipeline yet.",
  emptyDescription = "Strategy call submissions and CRM leads will show up here automatically.",
  emptyAction,
  statusLabels,
  pipelineLinkLabel = "View pipeline",
}: LatestLeadsProps) {
  return (
    <div id="leads" className="dashboard-card overflow-hidden">
      <div className="px-4 sm:px-5 py-4 border-b border-silver/8 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] uppercase tracking-[0.12em] text-silver-dim">
            {title}
          </p>
          <p className="text-sm text-silver-muted mt-0.5 truncate">
            {subtitle ??
              (leads.length === 0 ? "No leads yet" : `${leads.length} most recent`)}
          </p>
        </div>
        <Link
          href={crmHref}
          className="text-[12px] text-silver-muted hover:text-foreground transition-colors shrink-0"
        >
          {pipelineLinkLabel}
        </Link>
      </div>

      {leads.length === 0 ? (
        <div className="px-4 sm:px-5 py-10 sm:py-12 text-center">
          <p className="text-sm text-silver-muted mb-1">{emptyTitle}</p>
          <p className="text-[12px] text-silver-dim leading-relaxed max-w-sm mx-auto">
            {emptyDescription}
          </p>
          {emptyAction ? (
            <Link
              href={emptyAction.href}
              className="inline-block mt-4 text-[12px] text-forest-glow hover:text-forest-light transition-colors"
            >
              {emptyAction.label} →
            </Link>
          ) : null}
        </div>
      ) : (
        <div className="overflow-x-auto -mx-px">
          <table className="w-full text-[13px] min-w-[520px]">
            <thead>
              <tr className="border-b border-silver/6 text-left">
                <th className="px-4 sm:px-5 py-3 font-medium text-silver-dim text-[11px] uppercase tracking-wider">
                  Lead
                </th>
                <th className="px-4 sm:px-5 py-3 font-medium text-silver-dim text-[11px] uppercase tracking-wider hidden sm:table-cell">
                  Source
                </th>
                <th className="px-4 sm:px-5 py-3 font-medium text-silver-dim text-[11px] uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 sm:px-5 py-3 font-medium text-silver-dim text-[11px] uppercase tracking-wider text-right">
                  Value
                </th>
                <th className="px-4 sm:px-5 py-3 font-medium text-silver-dim text-[11px] uppercase tracking-wider text-right hidden md:table-cell">
                  Added
                </th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr
                  key={lead.id}
                  className="border-b border-silver/4 last:border-0 hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-4 sm:px-5 py-3.5">
                    <p className="font-medium text-foreground">{lead.name}</p>
                    <p className="text-silver-dim text-[12px] mt-0.5">{lead.company}</p>
                  </td>
                  <td className="px-4 sm:px-5 py-3.5 text-silver-muted hidden sm:table-cell">
                    {lead.source}
                  </td>
                  <td className="px-4 sm:px-5 py-3.5">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded text-[11px] font-medium ${DEFAULT_STATUS_STYLES[lead.status]}`}
                    >
                      {statusLabels?.[lead.status] ?? lead.status}
                    </span>
                  </td>
                  <td className="px-4 sm:px-5 py-3.5 text-right tabular-nums text-foreground">
                    {lead.estimatedValue > 0 ? formatCurrency(lead.estimatedValue) : "—"}
                  </td>
                  <td className="px-4 sm:px-5 py-3.5 text-right text-silver-dim text-[12px] hidden md:table-cell">
                    {formatRelativeDate(lead.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
