"use client";

import Link from "next/link";
import { CalendlyEmbed } from "@/components/ui/CalendlyEmbed";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/constants";

interface CalendlyBookingProps {
  calendlyUrl: string | null;
  prefill?: { name?: string; email?: string };
  compact?: boolean;
}

export function CalendlyBooking({ calendlyUrl, prefill, compact = false }: CalendlyBookingProps) {
  if (!calendlyUrl) {
    return (
      <div className="glass-card p-8 text-center max-w-lg mx-auto">
        <p className="text-foreground font-medium mb-2">Scheduling not configured yet</p>
        <p className="text-silver-muted text-sm mb-6">
          Add <code className="text-forest-glow">NEXT_PUBLIC_CALENDLY_URL</code> in Vercel, then
          redeploy. Example:{" "}
          <code className="text-silver-dim">https://calendly.com/your-name/strategy-call</code>
        </p>
        <Button onClick={() => window.location.assign("/#book-call")}>
          Use the contact form instead
        </Button>
      </div>
    );
  }

  return (
    <div className={compact ? "" : "glass-card p-4 sm:p-6"}>
      <CalendlyEmbed
        url={calendlyUrl}
        prefill={prefill}
        minHeight={compact ? 620 : 700}
      />
      {!compact && (
        <p className="text-center text-[12px] text-silver-dim mt-4">
          Prefer a callback?{" "}
          <Link href="/#book-call" className="text-forest-glow hover:text-forest-light">
            Send us a message
          </Link>{" "}
          and we&apos;ll reach out — {SITE.email}
        </p>
      )}
    </div>
  );
}
