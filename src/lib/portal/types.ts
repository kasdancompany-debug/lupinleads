export type LeadStatus = "new" | "qualified" | "contacted" | "converted" | "lost";

export interface PortalLead {
  id: string;
  name: string;
  company: string;
  email: string;
  source: string;
  status: LeadStatus;
  estimatedValue: number;
  createdAt: string;
}

export interface PortalOverviewData {
  clientName: string;
  periodLabel: string;
  monthKey: string;
  isLive: boolean;
  /** All-time lead counts (portal-scoped) */
  totalLeads: number;
  newLeads: number;
  contactedLeads: number;
  bookedEstimates: number;
  wonJobs: number;
  estimatedRevenue: number;
  adSpendEntered: boolean;
  adSpend: number;
  costPerLead: number | null;
  /** Month-over-month (optional display) */
  leadsThisMonth: number;
  leadsChange: number;
  estimatesBooked: number;
  estimatesChange: number;
  jobsWon: number;
  jobsWonChange: number;
  revenueClosedThisMonth: number;
  revenueChange: number;
  pipelineValue: number;
  roas: number | null;
  recentLeads: PortalLead[];
}
