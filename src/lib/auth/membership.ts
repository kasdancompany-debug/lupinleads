import { createAdminClient } from "@/lib/supabase/admin";
import type { ClientContext } from "@/lib/auth/types";

interface ClientUserRow {
  role: string;
  email: string;
  clients:
    | {
        id: string;
        slug: string;
        name: string;
      }
    | {
        id: string;
        slug: string;
        name: string;
      }[]
    | null;
}

function resolveClient(
  clients: ClientUserRow["clients"]
): { id: string; slug: string; name: string } | null {
  if (!clients) return null;
  return Array.isArray(clients) ? (clients[0] ?? null) : clients;
}

/** Server-only lookup: client_users → clients by Supabase auth user id. */
export async function fetchClientMembership(
  authUserId: string
): Promise<ClientContext | null> {
  const admin = createAdminClient();
  if (!admin) {
    return null;
  }

  const { data, error } = await admin
    .from("client_users")
    .select(
      `
      role,
      email,
      clients (
        id,
        slug,
        name
      )
    `
    )
    .eq("auth_user_id", authUserId)
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("fetchClientMembership:", error);
    return null;
  }

  if (!data) {
    return null;
  }

  const row = data as ClientUserRow;
  const client = resolveClient(row.clients);
  if (!client) {
    return null;
  }

  return {
    userId: authUserId,
    email: row.email.trim().toLowerCase(),
    clientId: client.id,
    clientSlug: client.slug,
    clientName: client.name,
    role: row.role,
  };
}
