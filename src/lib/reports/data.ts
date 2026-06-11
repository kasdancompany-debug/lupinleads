import type { ExecutiveMonthMetrics, ExecutiveReport } from "./types";
import { getServerBranding } from "./branding";
import { calculateCloseRate, calculateRoas, pctChange } from "./calculations";

interface RawMonth {
  month: string;
  label: string;
  leads: number;
  costPerLead: number;
  appointments: number;
  dealsClosed: number;
  revenue: number;
  totalSpend: number;
}

const CLIENT_DATA: Record<string, RawMonth[]> = {
  "apex-outdoors": [
    { month: "2025-09", label: "Sep 2025", leads: 142, costPerLead: 68, appointments: 28, dealsClosed: 8, revenue: 42000, totalSpend: 9656 },
    { month: "2025-10", label: "Oct 2025", leads: 168, costPerLead: 62, appointments: 34, dealsClosed: 11, revenue: 58000, totalSpend: 10416 },
    { month: "2025-11", label: "Nov 2025", leads: 195, costPerLead: 58, appointments: 41, dealsClosed: 14, revenue: 72000, totalSpend: 11310 },
    { month: "2025-12", label: "Dec 2025", leads: 178, costPerLead: 55, appointments: 38, dealsClosed: 12, revenue: 65000, totalSpend: 9790 },
    { month: "2026-01", label: "Jan 2026", leads: 210, costPerLead: 52, appointments: 47, dealsClosed: 16, revenue: 89000, totalSpend: 10920 },
    { month: "2026-02", label: "Feb 2026", leads: 224, costPerLead: 49, appointments: 52, dealsClosed: 18, revenue: 94000, totalSpend: 10976 },
  ],
  "summit-ventures": [
    { month: "2025-09", label: "Sep 2025", leads: 89, costPerLead: 95, appointments: 18, dealsClosed: 4, revenue: 62000, totalSpend: 8455 },
    { month: "2025-10", label: "Oct 2025", leads: 102, costPerLead: 88, appointments: 22, dealsClosed: 6, revenue: 78000, totalSpend: 8976 },
    { month: "2025-11", label: "Nov 2025", leads: 118, costPerLead: 82, appointments: 26, dealsClosed: 7, revenue: 91000, totalSpend: 9676 },
    { month: "2025-12", label: "Dec 2025", leads: 95, costPerLead: 79, appointments: 20, dealsClosed: 5, revenue: 68000, totalSpend: 7505 },
    { month: "2026-01", label: "Jan 2026", leads: 134, costPerLead: 74, appointments: 31, dealsClosed: 9, revenue: 112000, totalSpend: 9916 },
    { month: "2026-02", label: "Feb 2026", leads: 148, costPerLead: 71, appointments: 35, dealsClosed: 10, revenue: 128000, totalSpend: 10508 },
  ],
  "wildcraft-studio": [
    { month: "2025-09", label: "Sep 2025", leads: 64, costPerLead: 45, appointments: 14, dealsClosed: 5, revenue: 28000, totalSpend: 2880 },
    { month: "2025-10", label: "Oct 2025", leads: 72, costPerLead: 42, appointments: 16, dealsClosed: 6, revenue: 34000, totalSpend: 3024 },
    { month: "2025-11", label: "Nov 2025", leads: 85, costPerLead: 40, appointments: 19, dealsClosed: 7, revenue: 41000, totalSpend: 3400 },
    { month: "2025-12", label: "Dec 2025", leads: 58, costPerLead: 38, appointments: 12, dealsClosed: 4, revenue: 24000, totalSpend: 2204 },
    { month: "2026-01", label: "Jan 2026", leads: 96, costPerLead: 36, appointments: 22, dealsClosed: 8, revenue: 48000, totalSpend: 3456 },
    { month: "2026-02", label: "Feb 2026", leads: 104, costPerLead: 34, appointments: 24, dealsClosed: 9, revenue: 52000, totalSpend: 3536 },
  ],
};

function enrich(raw: RawMonth): ExecutiveMonthMetrics {
  return {
    month: raw.month,
    label: raw.label.split(" ")[0],
    monthLabel: raw.label,
    leads: raw.leads,
    costPerLead: raw.costPerLead,
    appointments: raw.appointments,
    closeRate: calculateCloseRate(raw.dealsClosed, raw.leads),
    revenue: raw.revenue,
    totalSpend: raw.totalSpend,
    roas: calculateRoas(raw.revenue, raw.totalSpend),
    dealsClosed: raw.dealsClosed,
  };
}

function buildHighlights(current: ExecutiveMonthMetrics, previous: ExecutiveMonthMetrics | null): string[] {
  const highlights: string[] = [];

  if (previous) {
    const leadGrowth = pctChange(current.leads, previous.leads);
    if (leadGrowth > 0) highlights.push(`Lead volume grew ${leadGrowth}% month-over-month.`);
    if (current.costPerLead < previous.costPerLead) {
      highlights.push(`Cost per lead decreased to $${current.costPerLead}, down from $${previous.costPerLead}.`);
    }
    const roasGrowth = pctChange(current.roas, previous.roas);
    if (roasGrowth > 0) highlights.push(`ROAS improved to ${current.roas}×, a ${roasGrowth}% increase.`);
  }

  highlights.push(`${current.dealsClosed} deals closed from ${current.leads} leads (${current.closeRate}% close rate).`);
  highlights.push(`$${current.revenue.toLocaleString()} in revenue on $${current.totalSpend.toLocaleString()} ad spend.`);

  return highlights.slice(0, 4);
}

export function getAvailableMonths(clientId: string): { month: string; label: string }[] {
  const raw = CLIENT_DATA[clientId] ?? CLIENT_DATA["apex-outdoors"];
  return raw.map((r) => ({ month: r.month, label: r.label }));
}

export function getClientIds(): { id: string; name: string }[] {
  return Object.keys(CLIENT_DATA).map((id) => ({
    id,
    name: getServerBranding(id).clientName,
  }));
}

export function buildExecutiveReport(
  clientId: string,
  reportMonth?: string,
  brandingOverride?: Partial<import("./types").ClientBranding>
): ExecutiveReport {
  const raw = CLIENT_DATA[clientId] ?? CLIENT_DATA["apex-outdoors"];
  const trends = raw.map(enrich);
  const monthIndex = reportMonth
    ? trends.findIndex((t) => t.month === reportMonth)
    : trends.length - 1;
  const idx = monthIndex >= 0 ? monthIndex : trends.length - 1;
  const current = trends[idx];
  const previous = idx > 0 ? trends[idx - 1] : null;

  const baseBranding = getServerBranding(clientId);
  const branding = { ...baseBranding, ...brandingOverride };

  return {
    clientId,
    clientName: branding.clientName,
    branding,
    reportMonth: current.month,
    reportMonthLabel: current.monthLabel,
    generatedAt: new Date().toISOString(),
    current,
    previous,
    trends: trends.slice(Math.max(0, idx - 5), idx + 1),
    highlights: buildHighlights(current, previous),
  };
}
