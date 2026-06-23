import { createAdminClient, isSupabaseConfigured } from "@/lib/supabase/admin";

export function currentMonthKey(date = new Date()): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

export type ClientSpendRow = {
  adSpendCad: number;
  notes: string | null;
};

export type AgencySpendEntry = {
  id: string;
  clientSlug: string;
  clientName: string;
  month: string;
  adSpendCad: number;
  notes: string | null;
};

export type GetClientMonthlySpendOptions = {
  clientSlug: string;
  month?: string;
};

export type UpsertClientMonthlySpendInput = {
  clientSlug: string;
  month: string;
  adSpendCad: number;
  notes?: string | null;
};

/** Spend row exists and amount is greater than zero. */
export function isAdSpendEntered(row: ClientSpendRow | undefined | null): boolean {
  return row != null && row.adSpendCad > 0;
}

/**
 * Returns ad spend for a client/month, or null when no row exists.
 */
export async function getClientMonthlySpend(
  options: GetClientMonthlySpendOptions
): Promise<number | null> {
  const row = await getClientMonthlySpendRow(options);
  if (!row) return null;
  return row.adSpendCad;
}

export async function getClientMonthlySpendRow(
  options: GetClientMonthlySpendOptions
): Promise<ClientSpendRow | null> {
  const map = await getClientMonthlySpendMap(options.clientSlug);
  const month = options.month ?? currentMonthKey();
  return map.get(month) ?? null;
}

/**
 * All monthly ad spend rows for a client, keyed by YYYY-MM.
 * Missing months are omitted (not zero-filled).
 */
export async function getClientMonthlySpendMap(
  clientSlug: string
): Promise<Map<string, ClientSpendRow>> {
  const map = new Map<string, ClientSpendRow>();
  if (!isSupabaseConfigured()) return map;

  const admin = createAdminClient();
  if (!admin) return map;

  const { data: client, error: clientError } = await admin
    .from("clients")
    .select("id")
    .eq("slug", clientSlug)
    .maybeSingle();

  if (clientError || !client) {
    if (clientError) console.error("getClientMonthlySpendMap client:", clientError);
    return map;
  }

  const { data, error } = await admin
    .from("client_monthly_spend")
    .select("month, ad_spend_cad, notes")
    .eq("client_id", client.id);

  if (error) {
    if (error.code !== "42P01" && error.code !== "PGRST205") {
      console.error("getClientMonthlySpendMap:", error);
    }
    return map;
  }

  for (const row of data ?? []) {
    map.set(row.month, {
      adSpendCad: Number(row.ad_spend_cad) || 0,
      notes: row.notes ?? null,
    });
  }

  return map;
}

export async function listAllClientMonthlySpend(): Promise<AgencySpendEntry[]> {
  if (!isSupabaseConfigured()) return [];

  const admin = createAdminClient();
  if (!admin) return [];

  const { data, error } = await admin
    .from("client_monthly_spend")
    .select(
      `
      id,
      month,
      ad_spend_cad,
      notes,
      clients (
        slug,
        name
      )
    `
    )
    .order("month", { ascending: false });

  if (error) {
    console.error("listAllClientMonthlySpend:", error);
    return [];
  }

  return (data ?? []).flatMap((row) => {
    const client = row.clients as { slug: string; name: string } | { slug: string; name: string }[] | null;
    const resolved = Array.isArray(client) ? client[0] : client;
    if (!resolved) return [];

    return [
      {
        id: row.id as string,
        clientSlug: resolved.slug,
        clientName: resolved.name,
        month: row.month as string,
        adSpendCad: Number(row.ad_spend_cad) || 0,
        notes: (row.notes as string | null) ?? null,
      },
    ];
  });
}

export async function upsertClientMonthlySpend(
  input: UpsertClientMonthlySpendInput
): Promise<{ entry: AgencySpendEntry | null; error?: string }> {
  if (!isSupabaseConfigured()) {
    return { entry: null, error: "Supabase not configured" };
  }

  const admin = createAdminClient();
  if (!admin) {
    return { entry: null, error: "Supabase not configured" };
  }

  if (!/^\d{4}-\d{2}$/.test(input.month)) {
    return { entry: null, error: "Month must be YYYY-MM" };
  }

  if (!Number.isFinite(input.adSpendCad) || input.adSpendCad < 0) {
    return { entry: null, error: "Ad spend must be a non-negative number" };
  }

  const { data: client, error: clientError } = await admin
    .from("clients")
    .select("id, slug, name")
    .eq("slug", input.clientSlug)
    .maybeSingle();

  if (clientError || !client) {
    return { entry: null, error: "Client not found" };
  }

  const { data, error } = await admin
    .from("client_monthly_spend")
    .upsert(
      {
        client_id: client.id,
        month: input.month,
        ad_spend_cad: input.adSpendCad,
        notes: input.notes?.trim() || null,
      },
      { onConflict: "client_id,month" }
    )
    .select("id, month, ad_spend_cad, notes")
    .single();

  if (error) {
    console.error("upsertClientMonthlySpend:", error);
    return { entry: null, error: "Failed to save ad spend" };
  }

  return {
    entry: {
      id: data.id,
      clientSlug: client.slug,
      clientName: client.name,
      month: data.month,
      adSpendCad: Number(data.ad_spend_cad) || 0,
      notes: data.notes,
    },
  };
}
