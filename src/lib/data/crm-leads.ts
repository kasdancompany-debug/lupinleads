import type { ContractorLead, PipelineStage } from "@/lib/crm/types";
import { createAdminClient, isSupabaseConfigured } from "@/lib/supabase/admin";

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

export type GetCrmLeadsOptions = {
  /** When set, only leads with campaign = clientSlug. When omitted, returns all leads. */
  clientSlug?: string;
};

/**
 * Fetch CRM leads, optionally scoped to a client campaign slug.
 * Callers must resolve clientSlug server-side (see resolveDataScope).
 */
export async function getCrmLeads(
  options: GetCrmLeadsOptions = {}
): Promise<ContractorLead[]> {
  if (!isSupabaseConfigured()) return [];

  const supabase = createAdminClient();
  if (!supabase) return [];

  let query = supabase.from("crm_leads").select("*").order("updated_at", { ascending: false });

  if (options.clientSlug) {
    query = query.eq("campaign", options.clientSlug);
  }

  const { data, error } = await query;

  if (error) {
    if (error.code !== "42P01" && error.code !== "PGRST205") {
      console.error("getCrmLeads:", error);
    }
    return [];
  }

  return (data as DbLead[]).map(toLead);
}
