import { createAdminClient } from "@/lib/supabase/admin";
import type { Notification } from "@/lib/forms/types";

interface DbNotification {
  id: string;
  type: string;
  title: string;
  message: string;
  metadata: Record<string, unknown>;
  read: boolean;
  created_at: string;
}

function toNotification(row: DbNotification): Notification {
  return {
    id: row.id,
    type: row.type,
    title: row.title,
    message: row.message,
    metadata: row.metadata ?? {},
    read: row.read,
    createdAt: row.created_at,
  };
}

export async function createNotification(input: {
  type: string;
  title: string;
  message: string;
  metadata?: Record<string, unknown>;
}): Promise<Notification | null> {
  const supabase = createAdminClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("notifications")
    .insert({
      type: input.type,
      title: input.title,
      message: input.message,
      metadata: input.metadata ?? {},
    })
    .select()
    .single();

  if (error) {
    console.error("createNotification:", error);
    return null;
  }

  return toNotification(data as DbNotification);
}

export async function listNotifications(limit = 20): Promise<Notification[]> {
  const supabase = createAdminClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) return [];
  return (data as DbNotification[]).map(toNotification);
}

export async function markNotificationRead(id: string): Promise<boolean> {
  const supabase = createAdminClient();
  if (!supabase) return false;

  const { error } = await supabase
    .from("notifications")
    .update({ read: true })
    .eq("id", id);

  return !error;
}

export async function markAllNotificationsRead(): Promise<boolean> {
  const supabase = createAdminClient();
  if (!supabase) return false;

  const { error } = await supabase
    .from("notifications")
    .update({ read: true })
    .eq("read", false);

  return !error;
}

export async function sendInstantNotification(input: {
  email?: string | null;
  title: string;
  message: string;
  metadata?: Record<string, unknown>;
}): Promise<void> {
  await createNotification({
    type: "new_lead",
    title: input.title,
    message: input.message,
    metadata: input.metadata,
  });

  const webhookUrl = process.env.NOTIFICATION_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: input.title,
          message: input.message,
          metadata: input.metadata,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (err) {
      console.error("Webhook notification failed:", err);
    }
  }

  const resendKey = process.env.RESEND_API_KEY;
  const notifyEmail = input.email || process.env.NOTIFICATION_EMAIL;
  if (resendKey && notifyEmail) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.NOTIFICATION_FROM || "LUPIN LEADS <notifications@lupinleads.com>",
          to: [notifyEmail],
          subject: input.title,
          text: input.message,
        }),
      });
    } catch (err) {
      console.error("Email notification failed:", err);
    }
  }
}
