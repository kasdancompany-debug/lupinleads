import { FOUNDING_PARTNER } from "@/lib/constants";
import { isCalendlyConfigured } from "@/lib/calendly";
import { openCalendlyPopup } from "@/lib/calendly-widget";
import type { CalendlyPrefill } from "@/lib/calendly";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: FOUNDING_PARTNER.currency,
    minimumFractionDigits: 0,
  }).format(price);
}

/** Shared pricing hook: $299 first month · then $499/mo + ad spend */
export function formatFoundingPriceLine(separator: "·" | "•" = "·") {
  return `${formatPrice(FOUNDING_PARTNER.introPrice)} first month ${separator} then ${formatPrice(FOUNDING_PARTNER.regularPrice)}/mo + ad spend`;
}

export function scrollToBook() {
  const el = document.getElementById("book-call");
  if (!el) return false;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  return true;
}

export function scrollToHowItWorks() {
  document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
}

export function scrollToPricing() {
  document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
}

export type BookLeadStrategyCallOptions = {
  /** When true, always scroll to the contact form section (skip Calendly popup). */
  preferForm?: boolean;
  prefill?: CalendlyPrefill;
};

/**
 * Primary booking action sitewide.
 * - Calendly configured: popup overlay (new tab fallback) — or scroll to embed when preferForm.
 * - Not configured: scroll to contact form at #book-call.
 */
export async function bookLeadStrategyCall(
  options: BookLeadStrategyCallOptions = {}
): Promise<"popup" | "tab" | "form" | "failed"> {
  const { preferForm = false, prefill } = options;

  if (!preferForm && isCalendlyConfigured()) {
    const result = await openCalendlyPopup(prefill);
    if (result === "popup" || result === "tab") return result;
    // Popup and tab both failed — fall through to form section
  }

  const scrolled = scrollToBook();
  return scrolled ? "form" : "failed";
}
