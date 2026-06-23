"use client";

import { useRouter } from "next/navigation";
import { NotificationBell } from "./NotificationBell";

export function DashboardTopBar() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/signout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <div className="hidden lg:flex items-center justify-end gap-4 px-6 py-3 border-b border-silver/8 bg-black/50">
      <NotificationBell />
      <button
        type="button"
        onClick={handleLogout}
        className="text-[12px] text-silver-dim hover:text-foreground transition-colors"
      >
        Sign out
      </button>
    </div>
  );
}
