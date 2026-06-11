import type { DashboardData, DashboardSummary, MonthlyMetrics } from "./types";

const MONTHLY_TRENDS: MonthlyMetrics[] = [
  { month: "2025-09", label: "Sep", leadsGenerated: 142, costPerLead: 68, appointmentsBooked: 28, revenueClosed: 42000, totalSpend: 9656 },
  { month: "2025-10", label: "Oct", leadsGenerated: 168, costPerLead: 62, appointmentsBooked: 34, revenueClosed: 58000, totalSpend: 10416 },
  { month: "2025-11", label: "Nov", leadsGenerated: 195, costPerLead: 58, appointmentsBooked: 41, revenueClosed: 72000, totalSpend: 11310 },
  { month: "2025-12", label: "Dec", leadsGenerated: 178, costPerLead: 55, appointmentsBooked: 38, revenueClosed: 65000, totalSpend: 9790 },
  { month: "2026-01", label: "Jan", leadsGenerated: 210, costPerLead: 52, appointmentsBooked: 47, revenueClosed: 89000, totalSpend: 10920 },
  { month: "2026-02", label: "Feb", leadsGenerated: 224, costPerLead: 49, appointmentsBooked: 52, revenueClosed: 94000, totalSpend: 10976 },
];

function pctChange(current: number, previous: number): number {
  if (previous === 0) return 0;
  return Math.round(((current - previous) / previous) * 1000) / 10;
}

export function calculateRoi(revenue: number, spend: number): number {
  if (spend === 0) return 0;
  return Math.round(((revenue - spend) / spend) * 1000) / 10;
}

function buildSummary(trends: MonthlyMetrics[]): DashboardSummary {
  const current = trends[trends.length - 1];
  const previous = trends[trends.length - 2];

  const currentRoi = calculateRoi(current.revenueClosed, current.totalSpend);
  const previousRoi = calculateRoi(previous.revenueClosed, previous.totalSpend);

  return {
    leadsGenerated: current.leadsGenerated,
    costPerLead: current.costPerLead,
    appointmentsBooked: current.appointmentsBooked,
    revenueClosed: current.revenueClosed,
    totalSpend: current.totalSpend,
    leadsChange: pctChange(current.leadsGenerated, previous.leadsGenerated),
    costPerLeadChange: pctChange(current.costPerLead, previous.costPerLead),
    appointmentsChange: pctChange(current.appointmentsBooked, previous.appointmentsBooked),
    revenueChange: pctChange(current.revenueClosed, previous.revenueClosed),
    roi: currentRoi,
    roiChange: pctChange(currentRoi, previousRoi),
  };
}

export function getDashboardData(): DashboardData {
  const summary = buildSummary(MONTHLY_TRENDS);

  return {
    clientName: "Apex Outdoors Co.",
    periodLabel: "February 2026",
    summary,
    trends: MONTHLY_TRENDS,
    latestLeads: [
      { id: "ld_8f2a", name: "Sarah Chen", company: "Northwind Gear", email: "s.chen@northwindgear.com", source: "Outbound", status: "qualified", estimatedValue: 12000, createdAt: "2026-02-10T14:32:00Z" },
      { id: "ld_7e1b", name: "Marcus Webb", company: "Trailforge Inc.", email: "mwebb@trailforge.io", source: "LinkedIn", status: "new", estimatedValue: 8500, createdAt: "2026-02-10T11:15:00Z" },
      { id: "ld_6d0c", name: "Elena Vasquez", company: "Summit Supply Co.", email: "elena@summitsupply.co", source: "Referral", status: "contacted", estimatedValue: 22000, createdAt: "2026-02-09T16:48:00Z" },
      { id: "ld_5c9d", name: "James Okonkwo", company: "Alpine Ventures", email: "j.okonkwo@alpinevc.com", source: "Outbound", status: "converted", estimatedValue: 45000, createdAt: "2026-02-09T09:22:00Z" },
      { id: "ld_4b8e", name: "Rachel Kim", company: "Wildcraft Studio", email: "rachel@wildcraft.studio", source: "Content", status: "qualified", estimatedValue: 15000, createdAt: "2026-02-08T13:05:00Z" },
      { id: "ld_3a7f", name: "David Torres", company: "Ridge Equipment", email: "d.torres@ridgeeq.com", source: "Outbound", status: "new", estimatedValue: 9200, createdAt: "2026-02-08T08:41:00Z" },
    ],
    recentAppointments: [
      { id: "ap_1", leadName: "James Okonkwo", company: "Alpine Ventures", scheduledAt: "2026-02-11T15:00:00Z", type: "Discovery Call", status: "scheduled" },
      { id: "ap_2", leadName: "Sarah Chen", company: "Northwind Gear", scheduledAt: "2026-02-11T10:30:00Z", type: "Strategy Review", status: "scheduled" },
      { id: "ap_3", leadName: "Elena Vasquez", company: "Summit Supply Co.", scheduledAt: "2026-02-10T14:00:00Z", type: "Demo", status: "completed" },
      { id: "ap_4", leadName: "Rachel Kim", company: "Wildcraft Studio", scheduledAt: "2026-02-09T11:00:00Z", type: "Discovery Call", status: "completed" },
      { id: "ap_5", leadName: "Tom Bradley", company: "Peak Performance", scheduledAt: "2026-02-07T16:30:00Z", type: "Follow-up", status: "no-show" },
    ],
  };
}
