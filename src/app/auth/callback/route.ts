import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getAgencyUser, getClientUser } from "@/lib/auth/session";
import { linkPendingClientInvites } from "@/lib/clients/invites";

function safeRedirectPath(next: string | null, fallback: string): string {
  if (!next || !next.startsWith("/") || next.startsWith("//")) {
    return fallback;
  }
  return next;
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next");

  const supabase = await createClient();

  if (code) {
    await supabase.auth.exchangeCodeForSession(code);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user?.email) {
      await linkPendingClientInvites(user.id, user.email);
    }
  }

  const agency = await getAgencyUser();
  if (agency) {
    return NextResponse.redirect(
      `${origin}${safeRedirectPath(next, "/dashboard")}`
    );
  }

  const client = await getClientUser();
  if (client) {
    return NextResponse.redirect(
      `${origin}${safeRedirectPath(next, "/portal")}`
    );
  }

  await supabase.auth.signOut();

  const deniedPath = next?.startsWith("/portal")
    ? "/portal/login?error=access"
    : "/login?error=access";

  return NextResponse.redirect(`${origin}${deniedPath}`);
}
