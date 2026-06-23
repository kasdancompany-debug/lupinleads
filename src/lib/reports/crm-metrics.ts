import { getCrmLeads } from "@/lib/data/crm-leads";
import {
  getClientMonthlySpendMap,
  isAdSpendEntered,
  type ClientSpendRow,
} from "@/lib/data/client-spend";
import type { ExecutiveMonthMetrics, ExecutiveReport } from "./types";
import { calculateCloseRate, calculateRoas, pctChange } from "./calculations";
import { fetchServerBranding, fetchReportClients } from "./branding-server";
import type { ContractorLead } from "@/lib/crm/types";
import { filterPortalLeads } from "@/lib/portal/filters";

const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function monthKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function monthLabel(key: string): string {
  const [year, m] = key.split("-");
  const label = MONTH_LABELS[parseInt(m, 10) - 1] ?? m;
  return `${label} ${year}`;
}

function shortLabel(key: string): string {
  const [, m] = key.split("-");
  return MONTH_LABELS[parseInt(m, 10) - 1] ?? m;
}

function isInMonth(isoDate: string, key: string): boolean {
  return monthKey(new Date(isoDate)) === key;
}

function getLast6MonthKeys(): string[] {
  const keys: string[] = [];
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    keys.push(monthKey(d));
  }
  return keys;
}

async function fetchLeadsForClient(
  clientId: string,
  forPortal = false
): Promise<ContractorLead[]> {
  const leads = await getCrmLeads({ clientSlug: clientId });
  return forPortal ? filterPortalLeads(leads) : leads;
}

function buildMonthMetrics(
  leads: ContractorLead[],
  key: string,
  spendRow: ClientSpendRow | undefined
): ExecutiveMonthMetrics {
  const monthLeads = leads.filter((r) => isInMonth(r.createdAt, key));
  const appointments = leads.filter(
    (r) =>
      (r.stage === "appointment_booked" || r.stage === "estimate_sent") &&
      isInMonth(r.updatedAt, key)
  ).length;
  const wonLeads = leads.filter((r) => r.stage === "won" && isInMonth(r.updatedAt, key));
  const dealsClosed = wonLeads.length;
  const revenue = wonLeads.reduce((sum, r) => sum + (r.estimatedValue || 0), 0);
  const adSpendEntered = isAdSpendEntered(spendRow);
  const totalSpend = spendRow?.adSpendCad ?? 0;
  const leadCount = monthLeads.length;

  return {
    month: key,
    label: shortLabel(key),
    monthLabel: monthLabel(key),
    leads: leadCount,
    costPerLead:
      adSpendEntered && leadCount > 0 ? Math.round(totalSpend / leadCount) : 0,
    appointments,
    closeRate: calculateCloseRate(dealsClosed, leadCount),
    revenue,
    totalSpend,
    roas:
      adSpendEntered && revenue > 0 ? calculateRoas(revenue, totalSpend) : 0,
    dealsClosed,
    adSpendEntered,
  };
}

function buildHighlights(
  current: ExecutiveMonthMetrics,
  previous: ExecutiveMonthMetrics | null
): string[] {
  const highlights: string[] = [];

  if (current.leads === 0) {
    highlights.push("No leads recorded for this period yet — data updates as campaigns run.");
    return highlights;
  }

  highlights.push(`${current.leads} new lead${current.leads === 1 ? "" : "s"} entered the pipeline.`);

  if (previous && previous.leads > 0) {
    const leadGrowth = pctChange(current.leads, previous.leads);
    if (leadGrowth !== 0) {
      highlights.push(
        `Lead volume ${leadGrowth > 0 ? "grew" : "decreased"} ${Math.abs(leadGrowth)}% month-over-month.`
      );
    }
  }

  if (current.appointments > 0) {
    highlights.push(
      `${current.appointments} appointment${current.appointments === 1 ? "" : "s"} booked or estimates sent.`
    );
  }

  if (current.dealsClosed > 0) {
    highlights.push(
      `${current.dealsClosed} job${current.dealsClosed === 1 ? "" : "s"} marked won (${current.closeRate}% close rate on new leads).`
    );
    if (current.revenue > 0) {
      highlights.push(`$${current.revenue.toLocaleString()} in tracked job value from won leads.`);
    }
  }

  if (!current.adSpendEntered) {
    highlights.push("Ad spend has not been entered for this month — CPL and ROAS appear once spend is logged.");
  } else if (current.totalSpend > 0) {
    highlights.push(`$${current.totalSpend.toLocaleString()} in Meta ad spend recorded for this month.`);
  }

  return highlights.slice(0, 4);
}

export async function getAvailableMonthsFromCrm(
  clientId: string,
  forPortal = false
): Promise<{ month: string; label: string }[]> {
  const leads = await fetchLeadsForClient(clientId, forPortal);
  const spendMap = await getClientMonthlySpendMap(clientId);
  const keys = new Set<string>();

  for (const lead of leads) {
    keys.add(monthKey(new Date(lead.createdAt)));
    keys.add(monthKey(new Date(lead.updatedAt)));
  }

  for (const key of spendMap.keys()) {
    keys.add(key);
  }

  const sorted = [...keys].sort();
  if (sorted.length === 0) {
    return getLast6MonthKeys().map((key) => ({ month: key, label: monthLabel(key) }));
  }

  return sorted.map((key) => ({ month: key, label: monthLabel(key) }));
}

export async function buildExecutiveReportFromCrm(
  clientId: string,
  reportMonth?: string,
  brandingOverride?: Partial<import("./types").ClientBranding>,
  forPortal = false
): Promise<ExecutiveReport> {
  const leads = await fetchLeadsForClient(clientId, forPortal);
  const spendMap = await getClientMonthlySpendMap(clientId);

  const monthKeySet = new Set(getLast6MonthKeys());
  if (reportMonth) {
    monthKeySet.add(reportMonth);
  }
  const monthKeys = [...monthKeySet].sort();

  const trends = monthKeys.map((key) =>
    buildMonthMetrics(leads, key, spendMap.get(key))
  );

  const monthIndex = reportMonth
    ? trends.findIndex((t) => t.month === reportMonth)
    : trends.length - 1;
  const idx = monthIndex >= 0 ? monthIndex : trends.length - 1;
  const current = trends[idx];
  const previous = idx > 0 ? trends[idx - 1] : null;

  const baseBranding = await fetchServerBranding(clientId);
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
    trends,
    highlights: buildHighlights(current, previous),
  };
}

export async function getReportClientList(): Promise<{ id: string; name: string }[]> {
  return fetchReportClients();
}
