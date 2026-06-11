import { SITE } from "@/lib/constants";
import { createAdminClient, isSupabaseConfigured } from "@/lib/supabase/admin";
import type {
  Appointment,
  AppointmentStatus,
  DashboardData,
  DashboardSummary,
  Lead,
  LeadStatus,
  MonthlyMetrics,
} from "./types";

interface ConsultationRow {
  id: string;
  name: string;
  email: string;
  company: string | null;
  phone: string | null;
  message: string | null;
  status: string;
  created_at: string;
}

interface CrmLeadRow {
  id: string;
  name: string;
  email: string;
  service_requested: string;
  estimated_value: number;
  source: string;
  stage: string;
  created_at: string;
  updated_at: string;
}

const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function calculateRoi(revenue: number, spend: number): number {
  if (spend === 0) return 0;
  return Math.round(((revenue - spend) / spend) * 1000) / 10;
}

function pctChange(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Math.round(((current - previous) / previous) * 1000) / 10;
}

function monthKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function monthLabel(key: string): string {
  const [, m] = key.split("-");
  return MONTH_LABELS[parseInt(m, 10) - 1] ?? m;
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

function consultationToStatus(status: string): LeadStatus {
  switch (status) {
    case "contacted":
      return "contacted";
    case "scheduled":
      return "qualified";
    case "closed":
      return "converted";
    default:
      return "new";
  }
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

function consultationToLead(row: ConsultationRow): Lead {
  return {
    id: `consultation-${row.id}`,
    name: row.name,
    company: row.company?.trim() || "—",
    email: row.email,
    source: "Strategy Call",
    status: consultationToStatus(row.status),
    estimatedValue: 0,
    createdAt: row.created_at,
  };
}

function crmToLead(row: CrmLeadRow): Lead {
  return {
    id: row.id,
    name: row.name,
    company: row.service_requested?.trim() || "—",
    email: row.email,
    source: row.source || "CRM",
    status: crmStageToStatus(row.stage),
    estimatedValue: Number(row.estimated_value) || 0,
    createdAt: row.created_at,
  };
}

function consultationToAppointment(row: ConsultationRow): Appointment | null {
  if (row.status !== "scheduled" && row.status !== "closed") return null;

  const status: AppointmentStatus =
    row.status === "closed" ? "completed" : "scheduled";

  return {
    id: `consultation-${row.id}`,
    leadName: row.name,
    company: row.company?.trim() || "—",
    scheduledAt: row.created_at,
    type: "Strategy Call",
    status,
  };
}

function crmToAppointment(row: CrmLeadRow): Appointment | null {
  if (row.stage !== "appointment_booked" && row.stage !== "estimate_sent") {
    return null;
  }

  return {
    id: row.id,
    leadName: row.name,
    company: row.service_requested?.trim() || "—",
    scheduledAt: row.updated_at,
    type: row.stage === "estimate_sent" ? "Estimate Sent" : "Appointment",
    status: "scheduled",
  };
}

function isInMonth(isoDate: string, key: string): boolean {
  return monthKey(new Date(isoDate)) === key;
}

function buildTrends(
  consultations: ConsultationRow[],
  crmLeads: CrmLeadRow[],
  monthKeys: string[]
): MonthlyMetrics[] {
  return monthKeys.map((key) => {
    const leadsGenerated =
      consultations.filter((r) => isInMonth(r.created_at, key)).length +
      crmLeads.filter((r) => isInMonth(r.created_at, key)).length;

    const appointmentsBooked =
      consultations.filter(
        (r) =>
          isInMonth(r.created_at, key) &&
          (r.status === "scheduled" || r.status === "closed")
      ).length +
      crmLeads.filter(
        (r) =>
          isInMonth(r.updated_at, key) &&
          (r.stage === "appointment_booked" || r.stage === "estimate_sent")
      ).length;

    const revenueClosed = crmLeads
      .filter((r) => r.stage === "won" && isInMonth(r.updated_at, key))
      .reduce((sum, r) => sum + (Number(r.estimated_value) || 0), 0);

    const totalSpend = 0;

    return {
      month: key,
      label: monthLabel(key),
      leadsGenerated,
      costPerLead: leadsGenerated > 0 && totalSpend > 0 ? Math.round(totalSpend / leadsGenerated) : 0,
      appointmentsBooked,
      revenueClosed,
      totalSpend,
    };
  });
}

function buildSummary(trends: MonthlyMetrics[]): DashboardSummary {
  const current = trends[trends.length - 1] ?? {
    leadsGenerated: 0,
    costPerLead: 0,
    appointmentsBooked: 0,
    revenueClosed: 0,
    totalSpend: 0,
  };
  const previous = trends[trends.length - 2] ?? current;

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

function emptyDashboardData(): DashboardData {
  const now = new Date();
  const periodLabel = now.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  const monthKeys = getLast6MonthKeys();
  const trends = buildTrends([], [], monthKeys);

  return {
    clientName: SITE.name,
    periodLabel,
    summary: buildSummary(trends),
    trends,
    latestLeads: [],
    recentAppointments: [],
    isLive: false,
  };
}

async function fetchConsultations(
  supabase: NonNullable<ReturnType<typeof createAdminClient>>
): Promise<ConsultationRow[]> {
  const { data, error } = await supabase
    .from("consultation_requests")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getDashboardData consultation_requests:", error);
    return [];
  }

  return (data ?? []) as ConsultationRow[];
}

async function fetchCrmLeads(
  supabase: NonNullable<ReturnType<typeof createAdminClient>>
): Promise<CrmLeadRow[]> {
  const { data, error } = await supabase
    .from("crm_leads")
    .select("*")
    .order("updated_at", { ascending: false });

  if (error) {
    // Table may not exist until migration 002 is run
    if (error.code !== "42P01" && error.code !== "PGRST205") {
      console.error("getDashboardData crm_leads:", error);
    }
    return [];
  }

  return (data ?? []) as CrmLeadRow[];
}

export async function getDashboardData(): Promise<DashboardData> {
  if (!isSupabaseConfigured()) {
    return emptyDashboardData();
  }

  const supabase = createAdminClient();
  if (!supabase) {
    return emptyDashboardData();
  }

  const [consultations, crmLeads] = await Promise.all([
    fetchConsultations(supabase),
    fetchCrmLeads(supabase),
  ]);

  const monthKeys = getLast6MonthKeys();
  const trends = buildTrends(consultations, crmLeads, monthKeys);
  const summary = buildSummary(trends);

  const latestLeads = [...consultations.map(consultationToLead), ...crmLeads.map(crmToLead)]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 8);

  const recentAppointments = [
    ...consultations.map(consultationToAppointment),
    ...crmLeads.map(crmToAppointment),
  ]
    .filter((appt): appt is Appointment => appt !== null)
    .sort((a, b) => new Date(b.scheduledAt).getTime() - new Date(a.scheduledAt).getTime())
    .slice(0, 6);

  const now = new Date();
  const periodLabel = now.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  return {
    clientName: SITE.name,
    periodLabel,
    summary,
    trends,
    latestLeads,
    recentAppointments,
    isLive: true,
  };
}
