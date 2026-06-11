import type { ContractorLead, PipelineStage } from "./types";
import { createAdminClient } from "@/lib/supabase/admin";

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
  status: PipelineStage;
  stage: PipelineStage;
  form_submission_id: string | null;
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

function toDbLead(lead: ContractorLead): Omit<DbLead, "form_submission_id" | "campaign"> & {
  form_submission_id?: string | null;
  campaign?: string | null;
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

export async function listCrmLeads(): Promise<ContractorLead[]> {
  const supabase = createAdminClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("crm_leads")
    .select("*")
    .order("updated_at", { ascending: false });

  if (error) {
    console.error("listCrmLeads:", error);
    return [];
  }

  return (data as DbLead[]).map(toLead);
}

export async function createCrmLead(
  lead: Omit<ContractorLead, "id" | "createdAt" | "updatedAt"> & {
    formSubmissionId?: string;
    campaign?: string | null;
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
      status: lead.status,
      stage: lead.stage,
      form_submission_id: lead.formSubmissionId ?? null,
    })
    .select()
    .single();

  if (error) {
    console.error("createCrmLead:", error);
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
