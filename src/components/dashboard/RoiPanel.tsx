import { calculateRoi } from "@/lib/dashboard/data";
import { formatCurrency, formatPercent } from "@/lib/dashboard/format";
import type { DashboardSummary } from "@/lib/dashboard/types";

interface RoiPanelProps {
  summary: DashboardSummary;
}

export function RoiPanel({ summary }: RoiPanelProps) {
  const netReturn = summary.revenueClosed - summary.totalSpend;
  const roi = calculateRoi(summary.revenueClosed, summary.totalSpend);
  const isPositiveRoi = roi > 0;

  return (
    <div className="dashboard-card p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-48 h-48 bg-forest-mid/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative">
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.12em] text-silver-dim mb-1">
              Return on Investment
            </p>
            <p className="text-3xl font-medium tabular-nums tracking-tight text-foreground">
              {formatPercent(roi)}
            </p>
          </div>
          <span
            className={`text-[12px] font-medium tabular-nums px-2 py-1 rounded-md ${
              summary.roiChange >= 0
                ? "text-forest-glow bg-forest-mid/15"
                : "text-red-400/80 bg-red-400/10"
            }`}
          >
            {summary.roiChange >= 0 ? "+" : ""}
            {summary.roiChange}% vs last month
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="rounded-md bg-black/40 border border-silver/8 px-4 py-3">
            <p className="text-[11px] text-silver-dim mb-1">Revenue Closed</p>
            <p className="text-lg font-medium tabular-nums text-foreground">
              {formatCurrency(summary.revenueClosed)}
            </p>
          </div>
          <div className="rounded-md bg-black/40 border border-silver/8 px-4 py-3">
            <p className="text-[11px] text-silver-dim mb-1">Total Spend</p>
            <p className="text-lg font-medium tabular-nums text-foreground">
              {formatCurrency(summary.totalSpend)}
            </p>
          </div>
          <div className="rounded-md bg-black/40 border border-silver/8 px-4 py-3">
            <p className="text-[11px] text-silver-dim mb-1">Net Return</p>
            <p className={`text-lg font-medium tabular-nums ${isPositiveRoi ? "text-forest-glow" : "text-red-400/80"}`}>
              {formatCurrency(netReturn)}
            </p>
          </div>
        </div>

        <div className="rounded-md bg-black/30 border border-silver/6 px-4 py-3">
          <p className="text-[11px] uppercase tracking-[0.1em] text-silver-dim mb-2">
            Formula
          </p>
          <p className="text-[13px] text-silver-muted font-mono">
            ROI = (Revenue − Spend) ÷ Spend × 100
          </p>
          <p className="text-[13px] text-silver-dim font-mono mt-1">
            = ({formatCurrency(summary.revenueClosed)} − {formatCurrency(summary.totalSpend)}) ÷ {formatCurrency(summary.totalSpend)} × 100
          </p>
        </div>
      </div>
    </div>
  );
}
