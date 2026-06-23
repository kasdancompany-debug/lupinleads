import type { User } from "@supabase/supabase-js";
import { isAgencyAdminEmail } from "@/lib/auth/config";
import { fetchClientMembership } from "@/lib/auth/membership";
import type { AgencyUser, ClientContext } from "@/lib/auth/types";

export type ResolvedAuth = {
  agency: AgencyUser | null;
  client: ClientContext | null;
};

export async function resolveAuthRoles(user: User | null): Promise<ResolvedAuth> {
  if (!user?.email) {
    return { agency: null, client: null };
  }

  const email = user.email.trim().toLowerCase();

  if (isAgencyAdminEmail(email)) {
    return {
      agency: {
        userId: user.id,
        email,
        role: "agency",
      },
      client: null,
    };
  }

  const client = await fetchClientMembership(user.id);
  return { agency: null, client };
}
