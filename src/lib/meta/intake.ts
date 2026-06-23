import { createCrmLead, findCrmLeadByMetaLeadgenId } from "@/lib/crm/db";
import { sendInstantNotification } from "@/lib/notifications/service";
import { isSupabaseConfigured } from "@/lib/supabase/admin";
import { fetchMetaLeadFromGraph } from "./graph";
import { logMetaWebhookEvent, updateMetaWebhookLog } from "./logs";
import { mapMetaFieldDataToLead } from "./map-fields";
import { resolveClientSlugFromMetaForm } from "./mappings";
import type { MetaLeadIntakeInput, MetaLeadIntakeResult } from "./types";

export async function processMetaLeadIntake(
  input: MetaLeadIntakeInput
): Promise<MetaLeadIntakeResult> {
  const leadgenId = input.leadgenId.trim();
  const formId = input.formId.trim();

  if (!leadgenId || !formId) {
    return { ok: false, status: "error", error: "leadgen_id and form_id are required" };
  }

  if (!isSupabaseConfigured()) {
    return { ok: false, status: "error", error: "Supabase not configured" };
  }

  const logId = await logMetaWebhookEvent({
    metaLeadgenId: leadgenId,
    metaFormId: formId,
    payload: input.rawPayload ?? {
      leadgen_id: leadgenId,
      form_id: formId,
      page_id: input.pageId,
      ad_id: input.adId,
    },
    status: "received",
  });

  const existing = await findCrmLeadByMetaLeadgenId(leadgenId);
  if (existing) {
    if (logId) {
      await updateMetaWebhookLog(logId, {
        status: "duplicate",
        clientSlug: existing.campaign,
        crmLeadId: existing.id,
      });
    }
    return {
      ok: true,
      status: "duplicate",
      crmLeadId: existing.id,
      clientSlug: existing.campaign ?? undefined,
      logId: logId ?? undefined,
    };
  }

  const clientSlug = await resolveClientSlugFromMetaForm(formId);
  if (!clientSlug) {
    const error = `No client mapping for Meta form ID ${formId}`;
    if (logId) {
      await updateMetaWebhookLog(logId, { status: "error", errorMessage: error });
    }
    return { ok: false, status: "error", error, logId: logId ?? undefined };
  }

  let fieldData = input.fieldData ?? [];
  let adId = input.adId;
  let pageId = input.pageId;
  let resolvedFormId = formId;

  if (fieldData.length === 0 && !input.skipFetch) {
    const fetched = await fetchMetaLeadFromGraph(leadgenId);
    if (!fetched) {
      const error = "Failed to fetch lead from Meta Graph API. Check META_GRAPH_ACCESS_TOKEN.";
      if (logId) {
        await updateMetaWebhookLog(logId, {
          status: "error",
          clientSlug,
          errorMessage: error,
        });
      }
      return { ok: false, status: "error", error, clientSlug, logId: logId ?? undefined };
    }
    fieldData = fetched.fieldData;
    adId = adId ?? fetched.adId;
    pageId = pageId ?? fetched.pageId;
    resolvedFormId = fetched.formId ?? formId;
  }

  if (fieldData.length === 0) {
    const error = "Lead has no field data";
    if (logId) {
      await updateMetaWebhookLog(logId, {
        status: "error",
        clientSlug,
        errorMessage: error,
      });
    }
    return { ok: false, status: "error", error, clientSlug, logId: logId ?? undefined };
  }

  const mapped = mapMetaFieldDataToLead(fieldData, {
    adId,
    formId: resolvedFormId,
    pageId,
  });

  const crmLead = await createCrmLead({
    name: mapped.name,
    phone: mapped.phone,
    email: mapped.email,
    serviceRequested: mapped.serviceRequested,
    estimatedValue: 0,
    notes: mapped.notes,
    source: "Facebook Lead Ad",
    status: "new_lead",
    stage: "new_lead",
    campaign: clientSlug,
    metaLeadgenId: leadgenId,
  });

  if (!crmLead) {
    const error = "Failed to create CRM lead";
    if (logId) {
      await updateMetaWebhookLog(logId, {
        status: "error",
        clientSlug,
        errorMessage: error,
      });
    }
    return { ok: false, status: "error", error, clientSlug, logId: logId ?? undefined };
  }

  if (logId) {
    await updateMetaWebhookLog(logId, {
      status: "processed",
      clientSlug,
      crmLeadId: crmLead.id,
    });
  }

  try {
    await sendInstantNotification({
      title: `Meta lead: ${mapped.name} (${clientSlug})`,
      message: [
        `${mapped.name} submitted a Facebook lead form.`,
        mapped.email ? `Email: ${mapped.email}` : null,
        mapped.phone ? `Phone: ${mapped.phone}` : null,
        mapped.serviceRequested ? `Service: ${mapped.serviceRequested}` : null,
        `Client: ${clientSlug}`,
        `Meta leadgen ID: ${leadgenId}`,
      ]
        .filter(Boolean)
        .join("\n"),
      metadata: {
        source: "Meta Lead Ad",
        crmLeadId: crmLead.id,
        clientSlug,
        metaLeadgenId: leadgenId,
        metaFormId: resolvedFormId,
        leadName: mapped.name,
      },
    });
  } catch (notifyError) {
    console.error("Meta lead notification failed:", notifyError);
  }

  return {
    ok: true,
    status: "processed",
    crmLeadId: crmLead.id,
    clientSlug,
    logId: logId ?? undefined,
  };
}
