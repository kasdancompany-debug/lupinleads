import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { isAgencyAdminEmail } from "@/lib/auth/config";
import { AuthRequiredError } from "@/lib/auth/errors";
import { fetchClientMembership } from "@/lib/auth/membership";
import type { AgencyUser, ClientContext } from "@/lib/auth/types";

/** Supabase Auth user from the current request session (server-only). */
export async function getCurrentUser(): Promise<User | null> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return null;
  }

  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  return user;
}

/** Agency operator if the session email is listed in AGENCY_ADMIN_EMAILS. */
export async function getAgencyUser(): Promise<AgencyUser | null> {
  const user = await getCurrentUser();
  if (!user?.email || !isAgencyAdminEmail(user.email)) {
    return null;
  }

  return {
    userId: user.id,
    email: user.email.trim().toLowerCase(),
    role: "agency",
  };
}

/** Portal client membership for the current session, if any. */
export async function getClientUser(): Promise<ClientContext | null> {
  const user = await getCurrentUser();
  if (!user) {
    return null;
  }

  if (isAgencyAdminEmail(user.email)) {
    return null;
  }

  return fetchClientMembership(user.id);
}

/** Resolved tenant context for the current portal client session. */
export async function getClientContext(): Promise<ClientContext | null> {
  return getClientUser();
}

/** Throws AuthRequiredError (403) if the session is not an agency admin. */
export async function requireAgencyUser(): Promise<AgencyUser> {
  const agency = await getAgencyUser();
  if (!agency) {
    throw new AuthRequiredError("Agency access required", 403);
  }
  return agency;
}

/** Throws AuthRequiredError (401/403) if the session is not a portal client user. */
export async function requireClientUser(): Promise<ClientContext> {
  const user = await getCurrentUser();
  if (!user) {
    throw new AuthRequiredError("Sign in required", 401);
  }

  const client = await fetchClientMembership(user.id);
  if (!client) {
    throw new AuthRequiredError("Client portal access required", 403);
  }

  return client;
}
