import { TrendChart } from "./TrendChart";
import type { MonthlyMetrics } from "@/lib/dashboard/types";

interface DashboardTrendsProps {
  trends: MonthlyMetrics[];
}

const CHART_CONFIG = [
  { title: "Leads Generated", dataKey: "leadsGenerated" as const, color: "#52b788", format: "number" as const },
  { title: "Cost Per Lead", dataKey: "costPerLead" as const, color: "#c0c0c0", format: "currency" as const },
  { title: "Appointments Booked", dataKey: "appointmentsBooked" as const, color: "#40916c", format: "number" as const },
  { title: "Revenue Closed", dataKey: "revenueClosed" as const, color: "#2d6a4f", format: "currency" as const },
];

export function DashboardTrends({ trends }: DashboardTrendsProps) {
  return (
    <div id="reports" className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {CHART_CONFIG.map((config) => (
        <TrendChart
          key={config.dataKey}
          title={config.title}
          data={trends}
          dataKey={config.dataKey}
          color={config.color}
          format={config.format}
        />
      ))}
    </div>
  );
}
