import { MetricCard } from "./MetricCard";
import type { DashboardSummary } from "@/lib/dashboard/types";

interface DashboardMetricsProps {
  summary: DashboardSummary;
}

export function DashboardMetrics({ summary }: DashboardMetricsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <MetricCard
        label="Leads Generated"
        value={summary.leadsGenerated}
        change={summary.leadsChange}
        format="number"
      />
      <MetricCard
        label="Cost Per Lead"
        value={summary.costPerLead}
        change={summary.costPerLeadChange}
        format="currency"
        invertChange
      />
      <MetricCard
        label="Appointments Booked"
        value={summary.appointmentsBooked}
        change={summary.appointmentsChange}
        format="number"
      />
      <MetricCard
        label="Revenue Closed"
        value={summary.revenueClosed}
        change={summary.revenueChange}
        format="currency"
      />
    </div>
  );
}
