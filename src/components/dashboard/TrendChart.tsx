"use client";

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { MonthlyMetrics } from "@/lib/dashboard/types";
import { formatCurrency, formatNumber } from "@/lib/dashboard/format";

type MetricKey = "leadsGenerated" | "costPerLead" | "appointmentsBooked" | "revenueClosed";

interface TrendChartProps {
  title: string;
  data: MonthlyMetrics[];
  dataKey: MetricKey;
  color: string;
  format: "number" | "currency";
}

function ChartTooltip({
  active,
  payload,
  label,
  format,
}: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
  format: "number" | "currency";
}) {
  if (!active || !payload?.length) return null;

  const value = payload[0].value;
  const formatted = format === "currency" ? formatCurrency(value) : formatNumber(value);

  return (
    <div className="dashboard-card px-3 py-2 shadow-xl">
      <p className="text-[11px] text-silver-dim mb-0.5">{label}</p>
      <p className="text-sm font-medium text-foreground tabular-nums">{formatted}</p>
    </div>
  );
}

export function TrendChart({ title, data, dataKey, color, format }: TrendChartProps) {
  const chartData = data.map((d) => ({
    label: d.label,
    value: d[dataKey],
  }));

  const formatter = (v: number) =>
    format === "currency" ? formatCurrency(v, true) : formatNumber(v);

  return (
    <div className="dashboard-card p-5">
      <p className="text-[11px] uppercase tracking-[0.12em] text-silver-dim mb-4">
        {title}
      </p>
      <div className="h-[140px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id={`gradient-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.25} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#5a5c62", fontSize: 11 }}
              dy={8}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#5a5c62", fontSize: 11 }}
              tickFormatter={formatter}
              width={48}
            />
            <Tooltip
              content={<ChartTooltip format={format} />}
              cursor={{ stroke: "rgba(192,192,192,0.15)", strokeWidth: 1 }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={1.5}
              fill={`url(#gradient-${dataKey})`}
              dot={false}
              activeDot={{ r: 3, fill: color, stroke: "#0a0a0a", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
