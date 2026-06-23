import { NextRequest, NextResponse } from "next/server";
import { apiAuthError, requireAgencyApiAccess } from "@/lib/auth";
import { markNotificationRead } from "@/lib/notifications/service";
import { isSupabaseConfigured } from "@/lib/supabase/admin";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    await requireAgencyApiAccess(request);

    if (!isSupabaseConfigured()) {
      return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
    }

    await markNotificationRead(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return apiAuthError(error);
  }
}
