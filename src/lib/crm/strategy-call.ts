import { createCrmLead } from "./db";
import type { ContractorLead } from "./types";
import type { StrategyCallPayload } from "@/lib/strategy-call/types";

export type StrategyCallCrmInput = StrategyCallPayload & {
  consultationRequestId: string;
};

function buildStrategyCallNotes(payload: StrategyCallPayload): string {
  return [
    payload.trade ? `Trade: ${payload.trade}` : null,
    payload.city ? `City: ${payload.city}` : null,
    payload.website ? `Website: ${payload.website}` : null,
    payload.monthlyAdBudget ? `Ad budget: ${payload.monthlyAdBudget}` : null,
    payload.message,
  ]
    .filter(Boolean)
    .join("\n");
}

export async function createCrmLeadFromStrategyCall(
  input: StrategyCallCrmInput
): Promise<ContractorLead | null> {
  const serviceRequested =
    [input.businessName, input.trade].filter(Boolean).join(" · ") || "Strategy call inquiry";

  return createCrmLead({
    name: input.name.trim(),
    phone: input.phone.trim(),
    email: input.email.trim().toLowerCase(),
    serviceRequested,
    estimatedValue: 0,
    notes: buildStrategyCallNotes(input),
    source: "Strategy Call",
    status: "new_lead",
    stage: "new_lead",
    consultationRequestId: input.consultationRequestId,
    campaign: "strategy-call",
  });
}
