"use client";

import { CalendlyEmbed } from "@/components/ui/CalendlyEmbed";
import { Button } from "@/components/ui/Button";
import { getCalendlyUrl, type CalendlyPrefill } from "@/lib/calendly";
import { openCalendlyInNewTab } from "@/lib/calendly-widget";
import { scrollToBook } from "@/lib/marketing";

interface CalendlyBookingProps {
  calendlyUrl?: string | null;
  prefill?: CalendlyPrefill;
  compact?: boolean;
}

export function CalendlyBooking({ calendlyUrl, prefill, compact = false }: CalendlyBookingProps) {
  const resolvedUrl = calendlyUrl ?? getCalendlyUrl();

  if (!resolvedUrl) {
    return (
      <div className="rounded-xl border border-silver/15 bg-black-surface/40 p-8 text-center">
        <p className="text-foreground font-medium mb-2">Pick a time on the call</p>
        <p className="text-silver-muted text-sm mb-6 max-w-sm mx-auto">
          Online scheduling isn&apos;t set up yet. Send us a message and we&apos;ll book your free
          lead strategy call manually.
        </p>
        <Button type="button" emphasis onClick={scrollToBook}>
          Go to contact form
        </Button>
      </div>
    );
  }

  const mobileHeight = compact ? 640 : 720;

  return (
    <div className={compact ? "" : "rounded-xl border border-silver/10 bg-black-surface/30 p-3 sm:p-5"}>
      <CalendlyEmbed
        url={resolvedUrl}
        prefill={prefill}
        minHeight={mobileHeight}
        className="rounded-lg"
      />
      <p className="text-center text-[12px] text-silver-dim mt-4 px-2 leading-relaxed">
        Calendar not loading?{" "}
        <button
          type="button"
          onClick={() => openCalendlyInNewTab(prefill)}
          className="text-forest-glow hover:text-forest-light underline-offset-2 hover:underline"
        >
          Open in Calendly
        </button>
        {" · "}
        <button
          type="button"
          onClick={() =>
            document.getElementById("book-call-form")?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            })
          }
          className="text-forest-glow hover:text-forest-light underline-offset-2 hover:underline"
        >
          Use the contact form
        </button>
      </p>
    </div>
  );
}
