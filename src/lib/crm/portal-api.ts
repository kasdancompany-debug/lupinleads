import type { ContractorLead, PipelineStage } from "./types";
import type { PortalLeadUpdateInput } from "./portal-update";

export async function fetchPortalCrmLeads(): Promise<{
  leads: ContractorLead[];
  source: "supabase" | "local";
}> {
  const res = await fetch("/api/portal/leads");
  const data = await res.json();
  return {
    leads: data.leads ?? [],
    source: data.source === "supabase" ? "supabase" : "local",
  };
}

export async function updatePortalCrmLeadApi(
  leadId: string,
  input: PortalLeadUpdateInput
): Promise<{ lead: ContractorLead | null; error?: string }> {
  const res = await fetch(`/api/portal/leads/${leadId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    return {
      lead: null,
      error: typeof data.error === "string" ? data.error : "Update failed",
    };
  }

  return { lead: data.lead ?? null };
}

export function portalLeadUpdateFromLead(lead: ContractorLead): PortalLeadUpdateInput {
  return {
    stage: lead.stage,
    notes: lead.notes,
    estimatedValue: lead.estimatedValue,
  };
}

export function portalStageUpdate(stage: PipelineStage): PortalLeadUpdateInput {
  return { stage };
}
