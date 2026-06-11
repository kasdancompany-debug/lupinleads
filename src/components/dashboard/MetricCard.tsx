import { formatCurrency, formatNumber, formatPercent } from "@/lib/dashboard/format";

interface MetricCardProps {
  label: string;
  value: number;
  change: number;
  format: "number" | "currency";
  invertChange?: boolean;
}

export function MetricCard({ label, value, change, format, invertChange = false }: MetricCardProps) {
  const displayValue = format === "currency" ? formatCurrency(value) : formatNumber(value);
  const isPositive = invertChange ? change < 0 : change > 0;
  const isNegative = invertChange ? change > 0 : change < 0;

  return (
    <div className="dashboard-card p-5">
      <p className="text-[11px] uppercase tracking-[0.12em] text-silver-dim mb-3">
        {label}
      </p>
      <p className="text-2xl font-medium text-foreground tabular-nums tracking-tight mb-2">
        {displayValue}
      </p>
      <div className="flex items-center gap-1.5">
        {change !== 0 && (
          <span
            className={`inline-flex items-center text-[12px] font-medium tabular-nums ${
              isPositive
                ? "text-forest-glow"
                : isNegative
                  ? "text-red-400/80"
                  : "text-silver-dim"
            }`}
          >
            {isPositive && (
              <svg className="w-3 h-3 mr-0.5" viewBox="0 0 12 12" fill="currentColor">
                <path d="M6 2L10 8H2L6 2Z" />
              </svg>
            )}
            {isNegative && (
              <svg className="w-3 h-3 mr-0.5" viewBox="0 0 12 12" fill="currentColor">
                <path d="M6 10L2 4H10L6 10Z" />
              </svg>
            )}
            {formatPercent(Math.abs(change))}
          </span>
        )}
        {change === 0 && value === 0 ? (
          <span className="text-[11px] text-silver-dim">No data this month</span>
        ) : (
          <span className="text-[11px] text-silver-dim">vs last month</span>
        )}
      </div>
    </div>
  );
}
