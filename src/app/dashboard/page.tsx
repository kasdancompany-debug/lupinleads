import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardMetrics } from "@/components/dashboard/DashboardMetrics";
import { DashboardTrendsClient } from "@/components/dashboard/DashboardTrendsClient";
import { RoiPanel } from "@/components/dashboard/RoiPanel";
import { LatestLeads } from "@/components/dashboard/LatestLeads";
import { RecentAppointments } from "@/components/dashboard/RecentAppointments";
import { getDashboardData } from "@/lib/dashboard/data";

export default function DashboardPage() {
  const data = getDashboardData();

  return (
    <div className="px-6 py-8 lg:px-10 max-w-[1400px]">
      <DashboardHeader
        clientName={data.clientName}
        periodLabel={data.periodLabel}
      />

      <div className="space-y-6">
        <DashboardMetrics summary={data.summary} />

        <RoiPanel summary={data.summary} />

        <DashboardTrendsClient trends={data.trends} />

        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
          <div className="xl:col-span-3">
            <LatestLeads leads={data.latestLeads} />
          </div>
          <div className="xl:col-span-2">
            <RecentAppointments appointments={data.recentAppointments} />
          </div>
        </div>
      </div>
    </div>
  );
}
