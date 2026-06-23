import type { ContractorLead, PipelineStage } from "./types";
import type { PortalLeadUpdateInput } from "./portal-update";
import { createAdminClient } from "@/lib/supabase/admin";
import { getCrmLeads } from "@/lib/data/crm-leads";

interface DbLead {
  id: string;
  name: string;
  phone: string;
  email: string;
  service_requested: string;
  estimated_value: number;
  notes: string;
  source: string;
  campaign: string | null;
  meta_leadgen_id: string | null;
  status: PipelineStage;
  stage: PipelineStage;
  form_submission_id: string | null;
  consultation_request_id: string | null;
  created_at: string;
  updated_at: string;
}

function toLead(row: DbLead): ContractorLead {
  return {
    id: row.id,
    name: row.name,
    phone: row.phone,
    email: row.email,
    serviceRequested: row.service_requested,
    estimatedValue: Number(row.estimated_value),
    notes: row.notes,
    source: row.source,
    status: row.status,
    stage: row.stage,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function toDbLead(lead: ContractorLead): Omit<DbLead, "form_submission_id" | "consultation_request_id" | "campaign" | "meta_leadgen_id"> & {
  form_submission_id?: string | null;
  consultation_request_id?: string | null;
  campaign?: string | null;
  meta_leadgen_id?: string | null;
} {
  return {
    id: lead.id,
    name: lead.name,
    phone: lead.phone,
    email: lead.email,
    service_requested: lead.serviceRequested,
    estimated_value: lead.estimatedValue,
    notes: lead.notes,
    source: lead.source,
    status: lead.status,
    stage: lead.stage,
    created_at: lead.createdAt,
    updated_at: lead.updatedAt,
  };
}

/** @deprecated Use getCrmLeads from @/lib/data/crm-leads */
export async function listCrmLeads(campaign?: string): Promise<ContractorLead[]> {
  return getCrmLeads({ clientSlug: campaign });
}

export async function createCrmLead(
  lead: Omit<ContractorLead, "id" | "createdAt" | "updatedAt"> & {
    formSubmissionId?: string;
    consultationRequestId?: string;
    campaign?: string | null;
    metaLeadgenId?: string | null;
  }
): Promise<ContractorLead | null> {
  const supabase = createAdminClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("crm_leads")
    .insert({
      name: lead.name,
      phone: lead.phone,
      email: lead.email,
      service_requested: lead.serviceRequested,
      estimated_value: lead.estimatedValue,
      notes: lead.notes,
      source: lead.source,
      campaign: lead.campaign ?? null,
      meta_leadgen_id: lead.metaLeadgenId ?? null,
      status: lead.status,
      stage: lead.stage,
      form_submission_id: lead.formSubmissionId ?? null,
      consultation_request_id: lead.consultationRequestId ?? null,
    })
    .select()
    .single();

  if (error) {
    console.error("createCrmLead:", error);
    return null;
  }

  return toLead(data as DbLead);
}

export async function findCrmLeadByMetaLeadgenId(
  metaLeadgenId: string
): Promise<(ContractorLead & { campaign: string | null }) | null> {
  const supabase = createAdminClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("crm_leads")
    .select("*")
    .eq("meta_leadgen_id", metaLeadgenId)
    .maybeSingle();

  if (error || !data) return null;
  const row = data as DbLead;
  return { ...toLead(row), campaign: row.campaign };
}

export async function getCrmLeadCampaign(id: string): Promise<string | null> {
  const supabase = createAdminClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("crm_leads")
    .select("campaign")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) return null;
  return (data as { campaign: string | null }).campaign;
}

export async function getCrmLeadById(
  id: string
): Promise<(ContractorLead & { campaign: string | null }) | null> {
  const supabase = createAdminClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("crm_leads")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) return null;

  const row = data as DbLead;
  return { ...toLead(row), campaign: row.campaign };
}

export async function updatePortalCrmLead(
  id: string,
  clientSlug: string,
  input: PortalLeadUpdateInput
): Promise<ContractorLead | null> {
  const existing = await getCrmLeadById(id);
  if (!existing || existing.campaign !== clientSlug) {
    return null;
  }

  const stage = input.stage ?? existing.stage;
  const lead: ContractorLead = {
    id: existing.id,
    name: existing.name,
    phone: existing.phone,
    email: existing.email,
    serviceRequested: existing.serviceRequested,
    estimatedValue: input.estimatedValue ?? existing.estimatedValue,
    notes: input.notes ?? existing.notes,
    source: existing.source,
    status: stage,
    stage,
    createdAt: existing.createdAt,
    updatedAt: new Date().toISOString(),
  };

  return updateCrmLeadForCampaign(lead, clientSlug);
}

export async function updateCrmLeadForCampaign(
  lead: ContractorLead,
  campaign: string
): Promise<ContractorLead | null> {
  const supabase = createAdminClient();
  if (!supabase) return null;

  const row = toDbLead(lead);
  const { data, error } = await supabase
    .from("crm_leads")
    .update({
      name: row.name,
      phone: row.phone,
      email: row.email,
      service_requested: row.service_requested,
      estimated_value: row.estimated_value,
      notes: row.notes,
      source: row.source,
      status: row.status,
      stage: row.stage,
    })
    .eq("id", lead.id)
    .eq("campaign", campaign)
    .select()
    .single();

  if (error) {
    console.error("updateCrmLeadForCampaign:", error);
    return null;
  }

  return toLead(data as DbLead);
}

export async function updateCrmLead(lead: ContractorLead): Promise<ContractorLead | null> {
  const supabase = createAdminClient();
  if (!supabase) return null;

  const row = toDbLead(lead);
  const { data, error } = await supabase
    .from("crm_leads")
    .update({
      name: row.name,
      phone: row.phone,
      email: row.email,
      service_requested: row.service_requested,
      estimated_value: row.estimated_value,
      notes: row.notes,
      source: row.source,
      status: row.status,
      stage: row.stage,
    })
    .eq("id", lead.id)
    .select()
    .single();

  if (error) {
    console.error("updateCrmLead:", error);
    return null;
  }

  return toLead(data as DbLead);
}

export async function deleteCrmLead(id: string): Promise<boolean> {
  const supabase = createAdminClient();
  if (!supabase) return false;
  const { error } = await supabase.from("crm_leads").delete().eq("id", id);
  return !error;
}

export async function syncCrmLeads(leads: ContractorLead[]): Promise<boolean> {
  const supabase = createAdminClient();
  if (!supabase) return false;

  const rows = leads.map((lead) => ({
    id: lead.id.includes("-") ? lead.id : undefined,
    name: lead.name,
    phone: lead.phone,
    email: lead.email,
    service_requested: lead.serviceRequested,
    estimated_value: lead.estimatedValue,
    notes: lead.notes,
    source: lead.source,
    status: lead.status,
    stage: lead.stage,
    updated_at: lead.updatedAt,
  }));

  const { error } = await supabase.from("crm_leads").upsert(rows, { onConflict: "id" });
  return !error;
}
