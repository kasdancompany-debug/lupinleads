import type { User } from "@supabase/supabase-js";
import { isAgencyAdminEmail } from "@/lib/auth/config";

export type MiddlewareRoles = {
  isAgency: boolean;
  isClient: boolean;
};

/** Edge-safe role check for middleware (no admin SDK import). */
async function hasClientMembership(authUserId: string): Promise<boolean> {
  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!baseUrl || !serviceKey) {
    return false;
  }

  const url = new URL(`${baseUrl}/rest/v1/client_users`);
  url.searchParams.set("auth_user_id", `eq.${authUserId}`);
  url.searchParams.set("select", "id");
  url.searchParams.set("limit", "1");

  const res = await fetch(url.toString(), {
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    return false;
  }

  const rows = (await res.json()) as unknown[];
  return Array.isArray(rows) && rows.length > 0;
}

export async function resolveMiddlewareRoles(
  user: User | null
): Promise<MiddlewareRoles> {
  if (!user?.email) {
    return { isAgency: false, isClient: false };
  }

  const email = user.email.trim().toLowerCase();

  if (isAgencyAdminEmail(email)) {
    return { isAgency: true, isClient: false };
  }

  const isClient = await hasClientMembership(user.id);
  return { isAgency: false, isClient };
}
