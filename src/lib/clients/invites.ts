import { createAdminClient } from "@/lib/supabase/admin";

/** Link pending client_users rows when the invitee signs in with a matching email. */
export async function linkPendingClientInvites(
  authUserId: string,
  email: string
): Promise<number> {
  const admin = createAdminClient();
  if (!admin) return 0;

  const normalized = email.trim().toLowerCase();
  const now = new Date().toISOString();

  const { data: pending, error } = await admin
    .from("client_users")
    .select("id")
    .eq("email", normalized)
    .is("auth_user_id", null);

  if (error || !pending?.length) {
    return 0;
  }

  const { data: updated, error: updateError } = await admin
    .from("client_users")
    .update({
      auth_user_id: authUserId,
      accepted_at: now,
    })
    .eq("email", normalized)
    .is("auth_user_id", null)
    .select("id");

  if (updateError) {
    console.error("linkPendingClientInvites:", updateError);
    return 0;
  }

  return updated?.length ?? 0;
}

export async function findAuthUserIdByEmail(email: string): Promise<string | null> {
  const admin = createAdminClient();
  if (!admin) return null;

  const normalized = email.trim().toLowerCase();
  let page = 1;
  const perPage = 200;

  while (page <= 10) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage });
    if (error) {
      console.error("findAuthUserIdByEmail:", error);
      return null;
    }

    const match = data.users.find(
      (user) => user.email?.trim().toLowerCase() === normalized
    );
    if (match) return match.id;

    if (data.users.length < perPage) break;
    page += 1;
  }

  return null;
}
