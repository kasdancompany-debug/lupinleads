import { createCrmLead } from "./db";
import type { ContractorLead } from "./types";

export interface StrategyCallInput {
  name: string;
  email: string;
  company?: string | null;
  phone?: string | null;
  message?: string | null;
  consultationRequestId: string;
}

export async function createCrmLeadFromStrategyCall(
  input: StrategyCallInput
): Promise<ContractorLead | null> {
  const notes = [input.message?.trim(), input.company?.trim() ? `Company: ${input.company.trim()}` : null]
    .filter(Boolean)
    .join("\n");

  return createCrmLead({
    name: input.name.trim(),
    phone: input.phone?.trim() || "",
    email: input.email.trim().toLowerCase(),
    serviceRequested: input.company?.trim() || "Strategy call inquiry",
    estimatedValue: 0,
    notes,
    source: "Strategy Call",
    status: "new_lead",
    stage: "new_lead",
    consultationRequestId: input.consultationRequestId,
    campaign: "strategy-call",
  });
}
