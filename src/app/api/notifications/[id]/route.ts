import { NextRequest, NextResponse } from "next/server";
import { markNotificationRead } from "@/lib/notifications/service";
import { isSupabaseConfigured } from "@/lib/supabase/admin";

export async function PATCH(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
  }

  await markNotificationRead(id);
  return NextResponse.json({ success: true });
}
