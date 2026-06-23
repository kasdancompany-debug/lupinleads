import { NextResponse } from "next/server";
import { getAgencyUser, getClientUser, getCurrentUser } from "@/lib/auth/session";
import { linkPendingClientInvites } from "@/lib/clients/invites";

export async function GET() {
  const user = await getCurrentUser();
  if (user?.email) {
    await linkPendingClientInvites(user.id, user.email);
  }

  const agency = await getAgencyUser();
  if (agency) {
    return NextResponse.json({ redirect: "/dashboard" });
  }

  const client = await getClientUser();
  if (client) {
    return NextResponse.json({ redirect: "/portal" });
  }

  return NextResponse.json(
    { error: "No portal or agency access for this account", redirect: "/login" },
    { status: 403 }
  );
}
