import { createAdminClient } from "@/lib/supabase/admin";

export type MetaWebhookLogStatus = "received" | "processed" | "duplicate" | "error" | "ignored";

export async function logMetaWebhookEvent(input: {
  metaLeadgenId?: string | null;
  metaFormId?: string | null;
  payload: unknown;
  status?: MetaWebhookLogStatus;
  clientSlug?: string | null;
  crmLeadId?: string | null;
  errorMessage?: string | null;
}): Promise<string | null> {
  const admin = createAdminClient();
  if (!admin) return null;

  const { data, error } = await admin
    .from("meta_webhook_logs")
    .insert({
      meta_leadgen_id: input.metaLeadgenId ?? null,
      meta_form_id: input.metaFormId ?? null,
      payload: input.payload ?? {},
      status: input.status ?? "received",
      client_slug: input.clientSlug ?? null,
      crm_lead_id: input.crmLeadId ?? null,
      error_message: input.errorMessage ?? null,
    })
    .select("id")
    .single();

  if (error) {
    console.error("logMetaWebhookEvent:", error);
    return null;
  }

  return (data as { id: string }).id;
}

export async function updateMetaWebhookLog(
  logId: string,
  patch: {
    status: MetaWebhookLogStatus;
    clientSlug?: string | null;
    crmLeadId?: string | null;
    errorMessage?: string | null;
  }
): Promise<void> {
  const admin = createAdminClient();
  if (!admin) return;

  await admin
    .from("meta_webhook_logs")
    .update({
      status: patch.status,
      client_slug: patch.clientSlug ?? null,
      crm_lead_id: patch.crmLeadId ?? null,
      error_message: patch.errorMessage ?? null,
    })
    .eq("id", logId);
}
