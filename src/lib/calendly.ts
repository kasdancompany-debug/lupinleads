export type CalendlyPrefill = {
  name?: string;
  email?: string;
};

/** Normalize and validate NEXT_PUBLIC_CALENDLY_URL. Returns null if missing or invalid. */
export function getCalendlyUrl(): string | null {
  const raw = process.env.NEXT_PUBLIC_CALENDLY_URL?.trim();
  if (!raw) return null;

  try {
    const url = raw.startsWith("http")
      ? raw
      : `https://calendly.com/${raw.replace(/^\//, "")}`;
    const parsed = new URL(url);
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") return null;
    if (!parsed.hostname.includes("calendly.com")) return null;
    return parsed.toString().replace(/\/$/, "");
  } catch {
    return null;
  }
}

export function isCalendlyConfigured(): boolean {
  return Boolean(getCalendlyUrl());
}

/** Brand-matched Calendly URL with optional prefill query params. */
export function buildCalendlyUrl(baseUrl: string, prefill?: CalendlyPrefill): string {
  try {
    const parsed = new URL(baseUrl);
    if (prefill?.name) parsed.searchParams.set("name", prefill.name);
    if (prefill?.email) parsed.searchParams.set("email", prefill.email);
    parsed.searchParams.set("background_color", "0a0a0a");
    parsed.searchParams.set("text_color", "e8e8e8");
    parsed.searchParams.set("primary_color", "52b788");
    return parsed.toString();
  } catch {
    return baseUrl;
  }
}
