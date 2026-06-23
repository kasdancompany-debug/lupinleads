import { createAdminClient } from "@/lib/supabase/admin";

export type MetaFormMapping = {
  id: string;
  clientSlug: string;
  metaFormId: string;
  metaPageId: string | null;
  label: string | null;
  createdAt: string;
};

interface DbMapping {
  id: string;
  client_slug: string;
  meta_form_id: string;
  meta_page_id: string | null;
  label: string | null;
  created_at: string;
}

function toMapping(row: DbMapping): MetaFormMapping {
  return {
    id: row.id,
    clientSlug: row.client_slug,
    metaFormId: row.meta_form_id,
    metaPageId: row.meta_page_id,
    label: row.label,
    createdAt: row.created_at,
  };
}

export async function resolveClientSlugFromMetaForm(
  metaFormId: string
): Promise<string | null> {
  const admin = createAdminClient();
  if (!admin) return null;

  const { data, error } = await admin
    .from("meta_form_mappings")
    .select("client_slug")
    .eq("meta_form_id", metaFormId)
    .maybeSingle();

  if (error || !data) return null;
  return (data as { client_slug: string }).client_slug;
}

export async function listMetaFormMappingsForClient(
  clientSlug: string
): Promise<MetaFormMapping[]> {
  const admin = createAdminClient();
  if (!admin) return [];

  const { data, error } = await admin
    .from("meta_form_mappings")
    .select("*")
    .eq("client_slug", clientSlug)
    .order("created_at", { ascending: true });

  if (error) return [];
  return ((data ?? []) as DbMapping[]).map(toMapping);
}

export async function upsertMetaFormMapping(input: {
  clientSlug: string;
  metaFormId: string;
  metaPageId?: string | null;
  label?: string | null;
}): Promise<{ mapping: MetaFormMapping | null; error?: string }> {
  const admin = createAdminClient();
  if (!admin) return { mapping: null, error: "Supabase not configured" };

  const metaFormId = input.metaFormId.trim();
  if (!metaFormId) return { mapping: null, error: "Meta form ID is required" };

  const { data: client } = await admin
    .from("clients")
    .select("slug")
    .eq("slug", input.clientSlug.trim())
    .maybeSingle();

  if (!client) return { mapping: null, error: "Client not found" };

  const { data, error } = await admin
    .from("meta_form_mappings")
    .upsert(
      {
        client_slug: input.clientSlug.trim(),
        meta_form_id: metaFormId,
        meta_page_id: input.metaPageId?.trim() || null,
        label: input.label?.trim() || null,
      },
      { onConflict: "meta_form_id" }
    )
    .select()
    .single();

  if (error) {
    console.error("upsertMetaFormMapping:", error);
    return { mapping: null, error: "Failed to save mapping" };
  }

  return { mapping: toMapping(data as DbMapping) };
}
