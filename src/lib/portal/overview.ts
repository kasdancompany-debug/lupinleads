import type { ContractorLead } from "@/lib/crm/types";
import { getCrmLeads } from "@/lib/data/crm-leads";
import { getClientMonthlySpend, currentMonthKey } from "@/lib/data/client-spend";
import { filterPortalLeads } from "@/lib/portal/filters";
import { calculateRoas, pctChange } from "@/lib/reports/calculations";
import { isSupabaseConfigured } from "@/lib/supabase/admin";
import type { LeadStatus, PortalLead, PortalOverviewData } from "./types";

function monthKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function isInMonth(isoDate: string, key: string): boolean {
  return monthKey(new Date(isoDate)) === key;
}

function crmStageToStatus(stage: string): LeadStatus {
  switch (stage) {
    case "attempted_contact":
      return "contacted";
    case "appointment_booked":
    case "estimate_sent":
      return "qualified";
    case "won":
      return "converted";
    case "lost":
      return "lost";
    default:
      return "new";
  }
}

function toPortalLead(row: ContractorLead): PortalLead {
  return {
    id: row.id,
    name: row.name,
    company: row.serviceRequested?.trim() || "—",
    email: row.email,
    source: row.source || "CRM",
    status: crmStageToStatus(row.stage),
    estimatedValue: row.estimatedValue || 0,
    createdAt: row.createdAt,
  };
}

function countLeadsInMonth(leads: ContractorLead[], key: string): number {
  return leads.filter((r) => isInMonth(r.createdAt, key)).length;
}

function countEstimatesInMonth(leads: ContractorLead[], key: string): number {
  return leads.filter(
    (r) =>
      isInMonth(r.updatedAt, key) &&
      (r.stage === "appointment_booked" || r.stage === "estimate_sent")
  ).length;
}

function countJobsWonInMonth(leads: ContractorLead[], key: string): number {
  return leads.filter((r) => r.stage === "won" && isInMonth(r.updatedAt, key)).length;
}

function revenueClosedInMonth(leads: ContractorLead[], key: string): number {
  return leads
    .filter((r) => r.stage === "won" && isInMonth(r.updatedAt, key))
    .reduce((sum, r) => sum + (r.estimatedValue || 0), 0);
}

function pipelineValue(leads: ContractorLead[]): number {
  return leads
    .filter((r) => r.stage !== "won" && r.stage !== "lost")
    .reduce((sum, r) => sum + (r.estimatedValue || 0), 0);
}

function previousMonthKey(key: string): string {
  const [year, month] = key.split("-").map(Number);
  const d = new Date(year, month - 2, 1);
  return monthKey(d);
}

function emptyOverview(clientName: string, monthKey: string): PortalOverviewData {
  const now = new Date();
  const periodLabel = now.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  return {
    clientName,
    periodLabel,
    monthKey,
    isLive: false,
    totalLeads: 0,
    newLeads: 0,
    contactedLeads: 0,
    bookedEstimates: 0,
    wonJobs: 0,
    estimatedRevenue: 0,
    adSpendEntered: false,
    adSpend: 0,
    costPerLead: null,
    leadsThisMonth: 0,
    leadsChange: 0,
    estimatesBooked: 0,
    estimatesChange: 0,
    jobsWon: 0,
    jobsWonChange: 0,
    revenueClosedThisMonth: 0,
    revenueChange: 0,
    pipelineValue: 0,
    roas: null,
    recentLeads: [],
  };
}

function countByStage(leads: ContractorLead[], stage: string): number {
  return leads.filter((r) => r.stage === stage).length;
}

function countBookedEstimates(leads: ContractorLead[]): number {
  return leads.filter(
    (r) => r.stage === "appointment_booked" || r.stage === "estimate_sent"
  ).length;
}

function wonRevenue(leads: ContractorLead[]): number {
  return leads
    .filter((r) => r.stage === "won")
    .reduce((sum, r) => sum + (r.estimatedValue || 0), 0);
}

export type GetPortalOverviewOptions = {
  clientSlug: string;
  clientName: string;
};

/**
 * Portal overview metrics for a single client.
 * clientSlug must come from getClientContext() on the server.
 */
export async function getPortalOverviewData(
  options: GetPortalOverviewOptions
): Promise<PortalOverviewData> {
  const { clientSlug, clientName } = options;
  const thisMonth = currentMonthKey();
  const lastMonth = previousMonthKey(thisMonth);
  const now = new Date();
  const periodLabel = now.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  if (!isSupabaseConfigured()) {
    return emptyOverview(clientName, thisMonth);
  }

  const [leads, adSpendRaw] = await Promise.all([
    getCrmLeads({ clientSlug }),
    getClientMonthlySpend({ clientSlug, month: thisMonth }),
  ]);

  const scopedLeads = filterPortalLeads(leads);

  const adSpendEntered = adSpendRaw !== null && adSpendRaw > 0;
  const adSpend = adSpendRaw ?? 0;

  const leadsThisMonth = countLeadsInMonth(scopedLeads, thisMonth);
  const leadsLastMonth = countLeadsInMonth(scopedLeads, lastMonth);
  const estimatesBooked = countEstimatesInMonth(scopedLeads, thisMonth);
  const estimatesLastMonth = countEstimatesInMonth(scopedLeads, lastMonth);
  const jobsWon = countJobsWonInMonth(scopedLeads, thisMonth);
  const jobsWonLastMonth = countJobsWonInMonth(scopedLeads, lastMonth);
  const revenueClosedThisMonth = revenueClosedInMonth(scopedLeads, thisMonth);
  const revenueLastMonth = revenueClosedInMonth(scopedLeads, lastMonth);

  const costPerLead =
    adSpendEntered && scopedLeads.length > 0
      ? Math.round(adSpend / scopedLeads.length)
      : null;

  const roas =
    adSpendEntered && revenueClosedThisMonth > 0
      ? calculateRoas(revenueClosedThisMonth, adSpend)
      : null;

  const recentLeads = scopedLeads
    .map(toPortalLead)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 8);

  return {
    clientName,
    periodLabel,
    monthKey: thisMonth,
    isLive: true,
    totalLeads: scopedLeads.length,
    newLeads: countByStage(scopedLeads, "new_lead"),
    contactedLeads: countByStage(scopedLeads, "attempted_contact"),
    bookedEstimates: countBookedEstimates(scopedLeads),
    wonJobs: countByStage(scopedLeads, "won"),
    estimatedRevenue: wonRevenue(scopedLeads),
    adSpendEntered,
    adSpend,
    costPerLead,
    leadsThisMonth,
    leadsChange: pctChange(leadsThisMonth, leadsLastMonth),
    estimatesBooked,
    estimatesChange: pctChange(estimatesBooked, estimatesLastMonth),
    jobsWon,
    jobsWonChange: pctChange(jobsWon, jobsWonLastMonth),
    revenueClosedThisMonth,
    revenueChange: pctChange(revenueClosedThisMonth, revenueLastMonth),
    pipelineValue: pipelineValue(scopedLeads),
    roas,
    recentLeads,
  };
}
