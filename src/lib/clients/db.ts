import { createAdminClient } from "@/lib/supabase/admin";
import { findAuthUserIdByEmail } from "@/lib/clients/invites";
import type { AgencyClient, ClientStatus, ClientUserRecord, CreateClientInput } from "./types";
import { CLIENT_STATUSES } from "./types";

interface DbClient {
  id: string;
  slug: string;
  name: string;
  trade: string | null;
  market: string | null;
  status: string;
  created_at: string;
}

interface DbClientUser {
  id: string;
  client_id: string;
  auth_user_id: string | null;
  email: string;
  role: string;
  invited_at: string;
  accepted_at: string | null;
}

function toClientUser(row: DbClientUser): ClientUserRecord {
  return {
    id: row.id,
    email: row.email,
    role: row.role,
    authUserId: row.auth_user_id,
    invitedAt: row.invited_at,
    acceptedAt: row.accepted_at,
    linked: Boolean(row.auth_user_id),
  };
}

function toAgencyClient(row: DbClient, users: DbClientUser[]): AgencyClient {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    trade: row.trade,
    market: row.market,
    status: (CLIENT_STATUSES.includes(row.status as ClientStatus)
      ? row.status
      : "onboarding") as ClientStatus,
    createdAt: row.created_at,
    users: users.map(toClientUser),
  };
}

export async function listAgencyClients(): Promise<AgencyClient[]> {
  const admin = createAdminClient();
  if (!admin) return [];

  const { data: clients, error } = await admin
    .from("clients")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("listAgencyClients:", error);
    return [];
  }

  const { data: users, error: usersError } = await admin
    .from("client_users")
    .select("*")
    .order("invited_at", { ascending: true });

  if (usersError) {
    console.error("listAgencyClients users:", usersError);
  }

  const usersByClient = new Map<string, DbClientUser[]>();
  for (const user of (users ?? []) as DbClientUser[]) {
    const list = usersByClient.get(user.client_id) ?? [];
    list.push(user);
    usersByClient.set(user.client_id, list);
  }

  return ((clients ?? []) as DbClient[]).map((client) =>
    toAgencyClient(client, usersByClient.get(client.id) ?? [])
  );
}

export async function createAgencyClient(
  input: CreateClientInput
): Promise<{ client: AgencyClient | null; error?: string }> {
  const admin = createAdminClient();
  if (!admin) {
    return { client: null, error: "Supabase not configured" };
  }

  const status = input.status ?? "onboarding";
  if (!CLIENT_STATUSES.includes(status)) {
    return { client: null, error: "Invalid status" };
  }

  const { data, error } = await admin
    .from("clients")
    .insert({
      name: input.name.trim(),
      slug: input.slug.trim(),
      trade: input.trade?.trim() || null,
      market: input.market?.trim() || null,
      status,
    })
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      return { client: null, error: "A client with this slug already exists" };
    }
    console.error("createAgencyClient:", error);
    return { client: null, error: "Failed to create client" };
  }

  return { client: toAgencyClient(data as DbClient, []) };
}

export async function addClientUserByEmail(
  clientId: string,
  email: string
): Promise<{ user: ClientUserRecord | null; error?: string }> {
  const admin = createAdminClient();
  if (!admin) {
    return { user: null, error: "Supabase not configured" };
  }

  const normalized = email.trim().toLowerCase();
  if (!normalized.includes("@")) {
    return { user: null, error: "Valid email is required" };
  }

  const { data: client, error: clientError } = await admin
    .from("clients")
    .select("id")
    .eq("id", clientId)
    .maybeSingle();

  if (clientError || !client) {
    return { user: null, error: "Client not found" };
  }

  const authUserId = await findAuthUserIdByEmail(normalized);
  const now = new Date().toISOString();

  const { data, error } = await admin
    .from("client_users")
    .insert({
      client_id: clientId,
      email: normalized,
      auth_user_id: authUserId,
      role: "owner",
      accepted_at: authUserId ? now : null,
    })
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      return { user: null, error: "This email is already invited for this client" };
    }
    console.error("addClientUserByEmail:", error);
    return { user: null, error: "Failed to add client user" };
  }

  return { user: toClientUser(data as DbClientUser) };
}
