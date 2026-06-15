import { createAdminClient, isSupabaseConfigured } from "@/lib/supabase/admin";
import type { ClientBranding } from "./types";
import { SITE } from "@/lib/constants";

interface DbBranding {
  client_id: string;
  client_name: string;
  logo_url: string | null;
  primary_color: string;
  accent_color: string;
  agency_name: string;
  report_footer: string | null;
}

function slugToName(slug: string): string {
  return slug
    .split(/[-_]/g)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function defaultBranding(clientId: string, clientName?: string): ClientBranding {
  const name = clientName ?? slugToName(clientId);
  return {
    clientId,
    clientName: name,
    logoUrl: null,
    primaryColor: "#1b4332",
    accentColor: "#52b788",
    agencyName: SITE.name,
    reportFooter: `Confidential — Prepared exclusively for ${name}.`,
  };
}

function rowToBranding(row: DbBranding): ClientBranding {
  return {
    clientId: row.client_id,
    clientName: row.client_name,
    logoUrl: row.logo_url,
    primaryColor: row.primary_color,
    accentColor: row.accent_color,
    agencyName: row.agency_name,
    reportFooter: row.report_footer ?? `Confidential — Prepared exclusively for ${row.client_name}.`,
  };
}

export async function fetchServerBranding(clientId: string): Promise<ClientBranding> {
  if (!isSupabaseConfigured()) {
    return defaultBranding(clientId);
  }

  const supabase = createAdminClient();
  if (!supabase) return defaultBranding(clientId);

  const { data, error } = await supabase
    .from("client_branding")
    .select("*")
    .eq("client_id", clientId)
    .maybeSingle();

  if (error || !data) {
    return defaultBranding(clientId);
  }

  return rowToBranding(data as DbBranding);
}

export async function fetchReportClients(): Promise<{ id: string; name: string }[]> {
  if (!isSupabaseConfigured()) return [];

  const supabase = createAdminClient();
  if (!supabase) return [];

  const [{ data: brandingRows }, { data: leadRows }] = await Promise.all([
    supabase.from("client_branding").select("client_id, client_name").order("client_name"),
    supabase.from("crm_leads").select("campaign").not("campaign", "is", null),
  ]);

  const clients = new Map<string, string>();

  for (const row of brandingRows ?? []) {
    clients.set(row.client_id, row.client_name);
  }

  for (const row of leadRows ?? []) {
    const campaign = row.campaign as string;
    if (campaign && !clients.has(campaign)) {
      clients.set(campaign, slugToName(campaign));
    }
  }

  return [...clients.entries()]
    .map(([id, name]) => ({ id, name }))
    .sort((a, b) => a.name.localeCompare(b.name));
}
