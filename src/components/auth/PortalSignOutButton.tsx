"use client";

import { useRouter } from "next/navigation";

export function PortalSignOutButton() {
  const router = useRouter();

  async function handleSignOut() {
    await fetch("/api/auth/signout", { method: "POST" });
    router.push("/portal/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      className="text-[12px] text-silver-dim hover:text-foreground transition-colors"
    >
      Sign out
    </button>
  );
}
