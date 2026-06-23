import type { ContractorLead, NewLeadInput } from "./types";

export async function fetchCrmLeads(clientSlug?: string): Promise<{
  leads: ContractorLead[];
  source: "supabase" | "local";
}> {
  const query = clientSlug
    ? `?clientSlug=${encodeURIComponent(clientSlug)}`
    : "";
  const res = await fetch(`/api/crm/leads${query}`);
  const data = await res.json();
  return {
    leads: data.leads ?? [],
    source: data.source === "supabase" ? "supabase" : "local",
  };
}

export async function createCrmLeadApi(input: NewLeadInput): Promise<ContractorLead | null> {
  const res = await fetch("/api/crm/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.lead;
}

export async function updateCrmLeadApi(lead: ContractorLead): Promise<ContractorLead | null> {
  const res = await fetch(`/api/crm/leads/${lead.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lead),
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.lead;
}

export async function deleteCrmLeadApi(id: string): Promise<boolean> {
  const res = await fetch(`/api/crm/leads/${id}`, { method: "DELETE" });
  return res.ok;
}

export function isRemoteLead(id: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
}
