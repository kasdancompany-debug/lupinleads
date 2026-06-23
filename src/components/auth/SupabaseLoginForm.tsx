"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";

type SupabaseLoginFormProps = {
  submitLabel: string;
  fallbackRedirect: string;
  showDevPassword?: boolean;
};

export function SupabaseLoginForm({
  submitLabel,
  fallbackRedirect,
  showDevPassword = false,
}: SupabaseLoginFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [devPassword, setDevPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const devPasswordEnabled =
    showDevPassword && process.env.NODE_ENV === "development";

  async function handleSupabaseSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const supabase = createClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (signInError) {
        setError(signInError.message);
        return;
      }

      const redirectRes = await fetch("/api/auth/redirect");
      const data = await redirectRes.json();

      if (!redirectRes.ok) {
        setError(data.error ?? "This account does not have access.");
        await supabase.auth.signOut();
        return;
      }

      const from = searchParams.get("from");
      const destination =
        from && !from.includes("/login") ? from : (data.redirect ?? fallbackRedirect);

      router.push(destination);
      router.refresh();
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDevPasswordSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/dashboard-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: devPassword }),
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
    <div className="space-y-6">
      <form onSubmit={handleSupabaseSubmit} className="glass-card glow-green p-8 rounded-sm space-y-5">
        <div>
          <label
            htmlFor="email"
            className="block text-xs tracking-wider uppercase text-silver-dim mb-2"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            placeholder="you@company.com"
            autoComplete="email"
            required
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-xs tracking-wider uppercase text-silver-dim mb-2"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClass}
            placeholder="Your password"
            autoComplete="current-password"
            required
          />
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <Button type="submit" size="lg" className="w-full" loading={loading}>
          {submitLabel}
        </Button>
      </form>

      {devPasswordEnabled && (
        <form
          onSubmit={handleDevPasswordSubmit}
          className="glass-card p-6 rounded-sm space-y-4 border border-silver/10"
        >
          <p className="text-[11px] uppercase tracking-wider text-silver-dim">
            Dev-only dashboard password
          </p>
          <input
            type="password"
            value={devPassword}
            onChange={(e) => setDevPassword(e.target.value)}
            className={inputClass}
            placeholder="DASHBOARD_PASSWORD"
          />
          <Button type="submit" variant="outline" size="md" className="w-full" loading={loading}>
            Enter with dev password
          </Button>
        </form>
      )}
    </div>
  );
}
