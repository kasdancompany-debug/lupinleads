import { createAdminClient } from "@/lib/supabase/admin";
import { getFormBySlug } from "./db";
import { mapSubmissionToLead, resolveCampaign } from "./mapper";
import type { CampaignTracking } from "./types";
import { createCrmLead } from "@/lib/crm/db";
import { sendInstantNotification } from "@/lib/notifications/service";

export interface SubmitResult {
  success: boolean;
  submissionId?: string;
  crmLeadId?: string;
  campaign?: string | null;
  error?: string;
}

export async function processFormSubmission(
  slug: string,
  data: Record<string, string | number>,
  tracking: CampaignTracking
): Promise<SubmitResult> {
  const form = await getFormBySlug(slug);
  if (!form) {
    return { success: false, error: "Form not found or inactive" };
  }

  for (const field of form.fields) {
    if (field.required && !data[field.id]) {
      return { success: false, error: `${field.label} is required` };
    }
  }

  const campaign = resolveCampaign(
    {
      campaign: tracking.campaign,
      utmCampaign: tracking.utmCampaign,
    },
    form.defaultCampaign
  );

  const supabase = createAdminClient();
  if (!supabase) {
    return { success: false, error: "Database not configured" };
  }

  const leadInput = mapSubmissionToLead(
    form.fields,
    data,
    `Form: ${form.name}`,
    campaign
  );

  const { data: submission, error: subError } = await supabase
    .from("form_submissions")
    .insert({
      form_id: form.id,
      data,
      campaign,
      utm_source: tracking.utmSource ?? null,
      utm_medium: tracking.utmMedium ?? null,
      utm_campaign: tracking.utmCampaign ?? null,
      utm_content: tracking.utmContent ?? null,
      utm_term: tracking.utmTerm ?? null,
      referrer: tracking.referrer ?? null,
    })
    .select()
    .single();

  if (subError) {
    console.error("Submission insert:", subError);
    return { success: false, error: "Failed to save submission" };
  }

  const crmLead = await createCrmLead({
    ...leadInput,
    status: "new_lead",
    stage: "new_lead",
    formSubmissionId: submission.id,
    campaign,
  });

  if (crmLead) {
    await supabase
      .from("form_submissions")
      .update({ crm_lead_id: crmLead.id })
      .eq("id", submission.id);
  }

  const campaignLabel = campaign ? ` [${campaign}]` : "";
  await sendInstantNotification({
    email: form.notifyEmail,
    title: `New lead from ${form.name}${campaignLabel}`,
    message: [
      `${leadInput.name} just submitted your "${form.name}" form.`,
      leadInput.email ? `Email: ${leadInput.email}` : null,
      leadInput.phone ? `Phone: ${leadInput.phone}` : null,
      leadInput.serviceRequested ? `Service: ${leadInput.serviceRequested}` : null,
      campaign ? `Campaign: ${campaign}` : null,
    ]
      .filter(Boolean)
      .join("\n"),
    metadata: {
      formId: form.id,
      formSlug: form.slug,
      submissionId: submission.id,
      crmLeadId: crmLead?.id,
      campaign,
      leadName: leadInput.name,
    },
  });

  return {
    success: true,
    submissionId: submission.id,
    crmLeadId: crmLead?.id,
    campaign,
  };
}
