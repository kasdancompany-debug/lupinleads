import type { PortalOverviewData } from "@/lib/portal/types";
import { MetricCard } from "@/components/dashboard/MetricCard";

const AD_SPEND_PENDING = "Not logged yet";

interface PortalOverviewMetricsProps {
  data: PortalOverviewData;
}

export function PortalOverviewMetrics({ data }: PortalOverviewMetricsProps) {
  const costPerLeadPlaceholder = !data.adSpendEntered
    ? AD_SPEND_PENDING
    : data.totalLeads === 0
      ? "No leads yet"
      : undefined;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
        <MetricCard label="Total leads" value={data.totalLeads} format="number" hideChange />
        <MetricCard label="New leads" value={data.newLeads} format="number" hideChange />
        <MetricCard label="Contacted" value={data.contactedLeads} format="number" hideChange />
        <MetricCard
          label="Booked estimates"
          value={data.bookedEstimates}
          format="number"
          hideChange
        />
        <MetricCard label="Won jobs" value={data.wonJobs} format="number" hideChange />
        <MetricCard
          label="Estimated revenue"
          value={data.estimatedRevenue}
          format="currency"
          hideChange
          footnote="From won jobs"
        />
        <MetricCard
          label="Ad spend"
          value={data.adSpend}
          format="currency"
          hideChange
          placeholder={!data.adSpendEntered ? AD_SPEND_PENDING : undefined}
          footnote={data.adSpendEntered ? `${data.periodLabel}` : undefined}
        />
        <MetricCard
          label="Cost per lead"
          value={data.costPerLead ?? 0}
          format="currency"
          hideChange
          placeholder={costPerLeadPlaceholder}
          footnote={data.costPerLead !== null ? "Ad spend ÷ total leads" : undefined}
        />
      </div>
    </div>
  );
}
