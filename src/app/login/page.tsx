"use client";

import { Suspense, FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { WolfCrest } from "@/components/ui/WolfCrest";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/constants";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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

  return (
    <form onSubmit={handleSubmit} className="glass-card glow-green p-8 rounded-sm space-y-5">
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
          className="w-full bg-black-surface border border-silver/15 rounded-sm px-4 py-3 text-foreground text-sm focus:outline-none focus:border-forest-mid/50 focus:ring-1 focus:ring-forest-mid/30 transition-colors"
          placeholder="Enter dashboard password"
          autoFocus
          required
        />
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <Button type="submit" size="lg" className="w-full" loading={loading}>
        Enter Dashboard
      </Button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="absolute inset-0 hero-gradient pointer-events-none" />
      <div className="relative w-full max-w-sm">
        <div className="text-center mb-8">
          <WolfCrest size={48} className="text-forest-glow mx-auto mb-4" />
          <h1 className="font-display text-2xl text-foreground tracking-wide mb-2">
            {SITE.name}
          </h1>
          <p className="text-sm text-silver-muted">Agency dashboard access</p>
        </div>

        <Suspense fallback={<div className="glass-card h-48 animate-pulse rounded-sm" />}>
          <LoginForm />
        </Suspense>

        <p className="text-center mt-6">
          <Link href="/" className="text-[12px] text-silver-dim hover:text-silver-muted transition-colors">
            ← Back to site
          </Link>
        </p>
      </div>
    </div>
  );
}
