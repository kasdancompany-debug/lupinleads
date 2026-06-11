import { NextResponse } from "next/server";
import { listNotifications, markAllNotificationsRead } from "@/lib/notifications/service";
import { isSupabaseConfigured } from "@/lib/supabase/admin";

export async function GET() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ notifications: [] });
  }

  const notifications = await listNotifications();
  const unreadCount = notifications.filter((n) => !n.read).length;

  return NextResponse.json({ notifications, unreadCount });
}

export async function PATCH() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
  }

  await markAllNotificationsRead();
  return NextResponse.json({ success: true });
}
