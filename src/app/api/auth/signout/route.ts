import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { DASHBOARD_AUTH_COOKIE } from "@/lib/dashboard-auth";

export async function POST() {
  const supabase = await createClient();
  await supabase.auth.signOut();

  const response = NextResponse.json({ success: true });

  response.cookies.set(DASHBOARD_AUTH_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return response;
}
