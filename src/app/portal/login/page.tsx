import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { LupinMark } from "@/components/ui/LupinMark";
import { PortalMagicLinkForm } from "@/components/auth/PortalMagicLinkForm";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Log in — Client Portal — ${SITE.name}`,
  robots: { index: false, follow: false },
};

export default function PortalLoginPage() {
  return (
    <div className="min-h-screen min-h-[100dvh] bg-black flex items-center justify-center px-5 sm:px-6 py-10">
      <div className="absolute inset-0 hero-gradient pointer-events-none" />
      <div className="absolute inset-0 grain-overlay pointer-events-none opacity-40" />

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8 sm:mb-10">
          <LupinMark size={44} className="mx-auto mb-5 sm:w-12 sm:h-12" priority />
          <h1 className="font-bold text-2xl sm:text-[1.75rem] text-foreground tracking-tight mb-3 leading-snug">
            Your <span className="wordmark-lupin">Lupin</span>{" "}
            <span className="wordmark-leads">Leads</span> portal
          </h1>
          <p className="text-sm sm:text-base text-silver-muted leading-relaxed max-w-sm mx-auto">
            See your leads, estimates, jobs, and revenue — all in one place.
          </p>
        </div>

        <Suspense
          fallback={
            <div className="glass-card rounded-xl min-h-[200px] animate-pulse" />
          }
        >
          <PortalMagicLinkForm />
        </Suspense>

        <p className="text-center mt-8 text-[12px] sm:text-sm text-silver-dim leading-relaxed">
          Lupin team member?{" "}
          <Link
            href="/login"
            className="text-silver-muted hover:text-forest-glow transition-colors"
          >
            Agency sign in
          </Link>
        </p>

        <p className="text-center mt-4">
          <Link
            href="/"
            className="text-[12px] text-silver-dim hover:text-silver-muted transition-colors"
          >
            ← Back to {SITE.name}
          </Link>
        </p>
      </div>
    </div>
  );
}
