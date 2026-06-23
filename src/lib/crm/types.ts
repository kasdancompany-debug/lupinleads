export const PIPELINE_STAGES = [
  "new_lead",
  "attempted_contact",
  "appointment_booked",
  "estimate_sent",
  "won",
  "lost",
] as const;

export type PipelineStage = (typeof PIPELINE_STAGES)[number];

export interface ContractorLead {
  id: string;
  name: string;
  phone: string;
  email: string;
  serviceRequested: string;
  estimatedValue: number;
  notes: string;
  source: string;
  status: PipelineStage;
  stage: PipelineStage;
  createdAt: string;
  updatedAt: string;
}

export type NewLeadInput = Omit<
  ContractorLead,
  "id" | "status" | "stage" | "createdAt" | "updatedAt"
> & {
  /** Client slug — stored as crm_leads.campaign for portal scoping */
  campaign?: string | null;
};
