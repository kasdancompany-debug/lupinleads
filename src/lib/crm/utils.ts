import type { ContractorLead, PipelineStage } from "./types";
import { PIPELINE_STAGES } from "./types";
import { SEED_LEADS } from "./data";
import { STORAGE_KEY } from "./constants";

export function createLeadId(): string {
  return `crm_${Date.now().toString(36)}`;
}

export function loadLeads(): ContractorLead[] {
  if (typeof window === "undefined") return SEED_LEADS;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored) as ContractorLead[];
    }
  } catch {
    // fall through to seed data
  }
  return SEED_LEADS;
}

export function saveLeads(leads: ContractorLead[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
}

export function getLeadsByStage(
  leads: ContractorLead[],
  stage: PipelineStage
): ContractorLead[] {
  return leads
    .filter((lead) => lead.stage === stage)
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
}

export function resolveDropStage(
  overId: string,
  leads: ContractorLead[]
): PipelineStage | null {
  if (PIPELINE_STAGES.includes(overId as PipelineStage)) {
    return overId as PipelineStage;
  }

  const targetLead = leads.find((lead) => lead.id === overId);
  return targetLead?.stage ?? null;
}

export function getPipelineValue(leads: ContractorLead[]): number {
  return leads
    .filter((lead) => lead.stage !== "lost")
    .reduce((sum, lead) => sum + lead.estimatedValue, 0);
}

export function getWonValue(leads: ContractorLead[]): number {
  return leads
    .filter((lead) => lead.stage === "won")
    .reduce((sum, lead) => sum + lead.estimatedValue, 0);
}
