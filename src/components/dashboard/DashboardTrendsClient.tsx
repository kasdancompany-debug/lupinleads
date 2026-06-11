"use client";

import dynamic from "next/dynamic";
import type { MonthlyMetrics } from "@/lib/dashboard/types";

const DashboardTrends = dynamic(
  () => import("./DashboardTrends").then((m) => m.DashboardTrends),
  {
    ssr: false,
    loading: () => (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="dashboard-card h-[200px] animate-pulse bg-black-surface" />
        ))}
      </div>
    ),
  }
);

interface DashboardTrendsClientProps {
  trends: MonthlyMetrics[];
}

export function DashboardTrendsClient({ trends }: DashboardTrendsClientProps) {
  return <DashboardTrends trends={trends} />;
}
