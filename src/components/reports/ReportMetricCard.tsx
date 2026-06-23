import { formatCurrency } from "@/lib/dashboard/format";
import { pctChange } from "@/lib/reports/calculations";

interface ReportMetricCardProps {
  label: string;
  value: number;
  previous?: number;
  format: "number" | "currency" | "percent" | "roas";
  invertChange?: boolean;
  placeholder?: string;
  hideChange?: boolean;
}

export function ReportMetricCard({
  label,
  value,
  previous,
  format,
  invertChange = false,
  placeholder,
  hideChange = false,
}: ReportMetricCardProps) {
  let display: string;
  switch (format) {
    case "currency":
      display = formatCurrency(value);
      break;
    case "percent":
      display = `${value}%`;
      break;
    case "roas":
      display = `${value}×`;
      break;
    default:
      display = value.toLocaleString();
  }

  const change = previous !== undefined && !placeholder ? pctChange(value, previous) : null;
  const isPositive = invertChange ? (change ?? 0) < 0 : (change ?? 0) > 0;
  const isNegative = invertChange ? (change ?? 0) > 0 : (change ?? 0) < 0;

  return (
    <div className="dashboard-card p-5">
      <p className="text-[11px] uppercase tracking-[0.12em] text-silver-dim mb-3">
        {label}
      </p>
      {placeholder ? (
        <p className="text-sm text-silver-muted leading-snug mb-2 min-h-[2rem] flex items-center">
          {placeholder}
        </p>
      ) : (
        <p className="text-2xl font-medium text-foreground tabular-nums tracking-tight mb-2">
          {display}
        </p>
      )}
      {!hideChange && change !== null && (
        <p
          className={`text-[12px] tabular-nums ${
            isPositive
              ? "text-forest-glow"
              : isNegative
                ? "text-red-400/80"
                : "text-silver-dim"
          }`}
        >
          {change > 0 ? "+" : ""}
          {change}% vs prior month
        </p>
      )}
    </div>
  );
}
