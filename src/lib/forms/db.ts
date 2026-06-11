import type { CaptureForm, CreateFormInput, FormField } from "./types";
import { createAdminClient } from "@/lib/supabase/admin";
import { slugify } from "./defaults";

interface DbForm {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  fields: FormField[];
  default_campaign: string | null;
  notify_email: string | null;
  success_message: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

function toForm(row: DbForm): CaptureForm {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    description: row.description,
    fields: row.fields,
    defaultCampaign: row.default_campaign,
    notifyEmail: row.notify_email,
    successMessage: row.success_message,
    isActive: row.is_active,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function listForms(): Promise<CaptureForm[]> {
  const supabase = createAdminClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("capture_forms")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("listForms:", error);
    return [];
  }

  return (data as DbForm[]).map(toForm);
}

export async function getFormBySlug(slug: string): Promise<CaptureForm | null> {
  const supabase = createAdminClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("capture_forms")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (error) return null;
  return toForm(data as DbForm);
}

export async function getFormById(id: string): Promise<CaptureForm | null> {
  const supabase = createAdminClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("capture_forms")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return toForm(data as DbForm);
}

export async function createForm(input: CreateFormInput): Promise<CaptureForm | null> {
  const supabase = createAdminClient();
  if (!supabase) return null;

  let slug = slugify(input.name);
  const { data: existing } = await supabase
    .from("capture_forms")
    .select("slug")
    .like("slug", `${slug}%`);

  if (existing && existing.length > 0) {
    slug = `${slug}-${existing.length + 1}`;
  }

  const { data, error } = await supabase
    .from("capture_forms")
    .insert({
      slug,
      name: input.name,
      description: input.description,
      fields: input.fields,
      default_campaign: input.defaultCampaign,
      notify_email: input.notifyEmail,
      success_message: input.successMessage,
    })
    .select()
    .single();

  if (error) {
    console.error("createForm:", error);
    return null;
  }

  return toForm(data as DbForm);
}

export async function updateForm(
  id: string,
  input: Partial<CreateFormInput> & { isActive?: boolean }
): Promise<CaptureForm | null> {
  const supabase = createAdminClient();
  if (!supabase) return null;

  const payload: Record<string, unknown> = {};
  if (input.name !== undefined) payload.name = input.name;
  if (input.description !== undefined) payload.description = input.description;
  if (input.fields !== undefined) payload.fields = input.fields;
  if (input.defaultCampaign !== undefined) payload.default_campaign = input.defaultCampaign;
  if (input.notifyEmail !== undefined) payload.notify_email = input.notifyEmail;
  if (input.successMessage !== undefined) payload.success_message = input.successMessage;
  if (input.isActive !== undefined) payload.is_active = input.isActive;

  const { data, error } = await supabase
    .from("capture_forms")
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("updateForm:", error);
    return null;
  }

  return toForm(data as DbForm);
}

export async function deleteForm(id: string): Promise<boolean> {
  const supabase = createAdminClient();
  if (!supabase) return false;

  const { error } = await supabase.from("capture_forms").delete().eq("id", id);
  return !error;
}

export async function getSubmissionCount(formId: string): Promise<number> {
  const supabase = createAdminClient();
  if (!supabase) return 0;

  const { count, error } = await supabase
    .from("form_submissions")
    .select("*", { count: "exact", head: true })
    .eq("form_id", formId);

  if (error) return 0;
  return count ?? 0;
}
