"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";

/** Dev-only fallback when DASHBOARD_PASSWORD is set locally. */
export function DevDashboardPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/dashboard-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        setError("Incorrect password");
        return;
      }

      const from = searchParams.get("from") || "/dashboard";
      router.push(from);
      router.refresh();
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full bg-black-surface border border-silver/15 rounded-sm px-4 py-3 text-foreground text-sm focus:outline-none focus:border-forest-mid/50 focus:ring-1 focus:ring-forest-mid/30 transition-colors";

  return (
    <form
      onSubmit={handleSubmit}
      className="glass-card p-6 rounded-sm space-y-4 border border-silver/10"
    >
      <p className="text-[11px] uppercase tracking-wider text-silver-dim">
        Dev-only dashboard password
      </p>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={inputClass}
        placeholder="DASHBOARD_PASSWORD"
      />
      {error ? <p className="text-red-400 text-sm">{error}</p> : null}
      <Button type="submit" variant="outline" size="md" className="w-full" loading={loading}>
        Enter with dev password
      </Button>
    </form>
  );
}
