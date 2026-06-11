"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import type { Notification } from "@/lib/forms/types";
import { formatRelativeDate } from "@/lib/dashboard/format";

export function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/notifications");
      const data = await res.json();
      setNotifications(data.notifications ?? []);
      setUnreadCount(data.unreadCount ?? 0);
    } catch {
      // silent
    }
  }, []);

  useEffect(() => {
    load();
    const interval = setInterval(load, 15000);
    return () => clearInterval(interval);
  }, [load]);

  async function markRead(id: string) {
    await fetch(`/api/notifications/${id}`, { method: "PATCH" });
    load();
  }

  async function markAllRead() {
    await fetch("/api/notifications", { method: "PATCH" });
    load();
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-md text-silver-muted hover:text-foreground hover:bg-white/5 transition-colors"
        aria-label="Notifications"
      >
        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4 6.5C4 4 6 2 8 2C10 2 12 4 12 6.5C12 10 13.5 11.5 13.5 11.5H2.5C2.5 11.5 4 10 4 6.5Z" />
          <path d="M7 13.5C7.3 14 7.6 14.5 8 14.5C8.4 14.5 8.7 14 9 13.5" />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-forest-glow text-black text-[9px] font-bold flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
            aria-label="Close notifications"
          />
          <div className="absolute right-0 top-full mt-2 w-80 z-50 dashboard-card shadow-2xl overflow-hidden">
            <div className="px-4 py-3 border-b border-silver/8 flex items-center justify-between">
              <p className="text-[13px] font-medium text-foreground">Notifications</p>
              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={markAllRead}
                  className="text-[11px] text-forest-glow hover:text-forest-light"
                >
                  Mark all read
                </button>
              )}
            </div>

            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <p className="px-4 py-8 text-center text-[12px] text-silver-dim">
                  No notifications yet
                </p>
              ) : (
                notifications.map((n) => (
                  <button
                    key={n.id}
                    type="button"
                    onClick={() => {
                      if (!n.read) markRead(n.id);
                    }}
                    className={`w-full text-left px-4 py-3 border-b border-silver/6 hover:bg-white/[0.02] transition-colors ${
                      !n.read ? "bg-forest-mid/5" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-[12px] font-medium text-foreground">{n.title}</p>
                      {!n.read && (
                        <span className="w-1.5 h-1.5 rounded-full bg-forest-glow shrink-0 mt-1.5" />
                      )}
                    </div>
                    <p className="text-[11px] text-silver-muted mt-0.5 line-clamp-2">
                      {n.message}
                    </p>
                    <p className="text-[10px] text-silver-dim mt-1">
                      {formatRelativeDate(n.createdAt)}
                    </p>
                    {n.metadata?.crmLeadId ? (
                      <Link
                        href="/dashboard/crm"
                        className="text-[10px] text-forest-glow mt-1 inline-block"
                        onClick={(e) => e.stopPropagation()}
                      >
                        View in CRM →
                      </Link>
                    ) : null}
                  </button>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
