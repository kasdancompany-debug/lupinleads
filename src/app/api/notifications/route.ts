import { NextRequest, NextResponse } from "next/server";
import { apiAuthError, requireAgencyApiAccess } from "@/lib/auth";
import { listNotifications, markAllNotificationsRead } from "@/lib/notifications/service";
import { isSupabaseConfigured } from "@/lib/supabase/admin";

export async function GET(request: NextRequest) {
  try {
    await requireAgencyApiAccess(request);

    if (!isSupabaseConfigured()) {
      return NextResponse.json({ notifications: [] });
    }

    const notifications = await listNotifications();
    const unreadCount = notifications.filter((n) => !n.read).length;

    return NextResponse.json({ notifications, unreadCount });
  } catch (error) {
    return apiAuthError(error);
  }
}

export async function PATCH(request: NextRequest) {
  try {
    await requireAgencyApiAccess(request);

    if (!isSupabaseConfigured()) {
      return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
    }

    await markAllNotificationsRead();
    return NextResponse.json({ success: true });
  } catch (error) {
    return apiAuthError(error);
  }
}
