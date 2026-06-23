"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { LupinMark } from "@/components/ui/LupinMark";
import { MagicLinkForm } from "@/components/auth/MagicLinkForm";
import { DevDashboardPasswordForm } from "@/components/auth/DevDashboardPasswordForm";

function LoginContent() {
  const searchParams = useSearchParams();
  const accessError = searchParams.get("error") === "access";

  return (
    <>
      {accessError ? (
        <p className="text-sm text-red-400/90 text-center mb-4">
          This account does not have agency access.
        </p>
      ) : null}
      <MagicLinkForm
        callbackNext="/dashboard"
        inputId="agency-email"
        accessDeniedMessage="This email is not listed for agency access."
      />
      <DevDashboardPasswordForm />
    </>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="absolute inset-0 hero-gradient pointer-events-none" />
      <div className="relative w-full max-w-sm space-y-6">
        <div className="text-center mb-2">
          <LupinMark size={48} className="mx-auto mb-4" priority />
          <h1 className="font-sans text-2xl text-foreground tracking-tight mb-2">
            <span className="wordmark-lupin">Lupin</span>{" "}
            <span className="wordmark-leads">Leads</span>
          </h1>
          <p className="text-sm text-silver-muted">Agency dashboard sign-in</p>
        </div>

        <Suspense fallback={<div className="glass-card h-56 animate-pulse rounded-sm" />}>
          <LoginContent />
        </Suspense>

        <p className="text-center">
          <Link
            href="/"
            className="text-[12px] text-silver-dim hover:text-silver-muted transition-colors"
          >
            ← Back to site
          </Link>
        </p>
      </div>
    </div>
  );
}
