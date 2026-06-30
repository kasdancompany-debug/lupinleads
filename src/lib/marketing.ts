import { FOUNDING_PARTNER } from "@/lib/constants";

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

/** Scroll to the Calendly embed on the homepage, or navigate there from other routes. */
export function scrollToBook(): boolean {
  if (typeof window === "undefined") return false;

  const calendar = document.getElementById("book-call-calendar");
  const section = document.getElementById("book-call");
  const target = calendar ?? section;

  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    return true;
  }

  if (window.location.pathname !== "/") {
    window.location.assign("/#book-call");
    return true;
  }

  return false;
}

export function scrollToHowItWorks() {
  document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
}

export function scrollToPricing() {
  document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
}

export function bookLeadStrategyCall(): "form" | "failed" {
  return scrollToBook() ? "form" : "failed";
}
