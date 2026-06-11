export interface ClientBranding {
  clientId: string;
  clientName: string;
  logoUrl: string | null;
  primaryColor: string;
  accentColor: string;
  agencyName: string;
  reportFooter: string;
}

export interface ExecutiveMonthMetrics {
  month: string;
  label: string;
  monthLabel: string;
  leads: number;
  costPerLead: number;
  appointments: number;
  closeRate: number;
  revenue: number;
  totalSpend: number;
  roas: number;
  dealsClosed: number;
}

export interface ExecutiveReport {
  clientId: string;
  clientName: string;
  branding: ClientBranding;
  reportMonth: string;
  reportMonthLabel: string;
  generatedAt: string;
  current: ExecutiveMonthMetrics;
  previous: ExecutiveMonthMetrics | null;
  trends: ExecutiveMonthMetrics[];
  highlights: string[];
}

export type BrandingInput = Omit<ClientBranding, "clientId"> & { clientId?: string };
