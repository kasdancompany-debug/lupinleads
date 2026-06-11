import type { Lead, LeadStatus } from "@/lib/dashboard/types";
import { formatCurrency, formatRelativeDate } from "@/lib/dashboard/format";

const STATUS_STYLES: Record<LeadStatus, string> = {
  new: "text-silver-muted bg-silver/10",
  qualified: "text-forest-glow bg-forest-mid/15",
  contacted: "text-blue-300/80 bg-blue-400/10",
  converted: "text-forest-light bg-forest-mid/25",
  lost: "text-red-400/70 bg-red-400/10",
};

interface LatestLeadsProps {
  leads: Lead[];
}

export function LatestLeads({ leads }: LatestLeadsProps) {
  return (
    <div id="leads" className="dashboard-card overflow-hidden">
      <div className="px-5 py-4 border-b border-silver/8 flex items-center justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.12em] text-silver-dim">
            Latest Leads
          </p>
          <p className="text-sm text-silver-muted mt-0.5">
            {leads.length} most recent
          </p>
        </div>
        <button
          type="button"
          className="text-[12px] text-silver-muted hover:text-foreground transition-colors"
        >
          View all
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b border-silver/6 text-left">
              <th className="px-5 py-3 font-medium text-silver-dim text-[11px] uppercase tracking-wider">
                Lead
              </th>
              <th className="px-5 py-3 font-medium text-silver-dim text-[11px] uppercase tracking-wider hidden sm:table-cell">
                Source
              </th>
              <th className="px-5 py-3 font-medium text-silver-dim text-[11px] uppercase tracking-wider">
                Status
              </th>
              <th className="px-5 py-3 font-medium text-silver-dim text-[11px] uppercase tracking-wider text-right">
                Value
              </th>
              <th className="px-5 py-3 font-medium text-silver-dim text-[11px] uppercase tracking-wider text-right hidden md:table-cell">
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
                <td className="px-5 py-3.5">
                  <p className="font-medium text-foreground">{lead.name}</p>
                  <p className="text-silver-dim text-[12px] mt-0.5">{lead.company}</p>
                </td>
                <td className="px-5 py-3.5 text-silver-muted hidden sm:table-cell">
                  {lead.source}
                </td>
                <td className="px-5 py-3.5">
                  <span
                    className={`inline-flex px-2 py-0.5 rounded text-[11px] font-medium capitalize ${STATUS_STYLES[lead.status]}`}
                  >
                    {lead.status}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-right tabular-nums text-foreground">
                  {formatCurrency(lead.estimatedValue)}
                </td>
                <td className="px-5 py-3.5 text-right text-silver-dim text-[12px] hidden md:table-cell">
                  {formatRelativeDate(lead.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
