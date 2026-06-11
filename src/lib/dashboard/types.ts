export type LeadStatus = "new" | "qualified" | "contacted" | "converted" | "lost";

export type AppointmentStatus = "scheduled" | "completed" | "cancelled" | "no-show";

export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  source: string;
  status: LeadStatus;
  estimatedValue: number;
  createdAt: string;
}

export interface Appointment {
  id: string;
  leadName: string;
  company: string;
  scheduledAt: string;
  type: string;
  status: AppointmentStatus;
}

export interface MonthlyMetrics {
  month: string;
  label: string;
  leadsGenerated: number;
  costPerLead: number;
  appointmentsBooked: number;
  revenueClosed: number;
  totalSpend: number;
}

export interface DashboardSummary {
  leadsGenerated: number;
  costPerLead: number;
  appointmentsBooked: number;
  revenueClosed: number;
  totalSpend: number;
  leadsChange: number;
  costPerLeadChange: number;
  appointmentsChange: number;
  revenueChange: number;
  roi: number;
  roiChange: number;
}

export interface DashboardData {
  clientName: string;
  periodLabel: string;
  summary: DashboardSummary;
  trends: MonthlyMetrics[];
  latestLeads: Lead[];
  recentAppointments: Appointment[];
  isLive: boolean;
}
