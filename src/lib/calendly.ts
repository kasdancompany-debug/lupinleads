export function getCalendlyUrl(): string | null {
  const url = process.env.NEXT_PUBLIC_CALENDLY_URL?.trim();
  if (!url) return null;
  return url.startsWith("http") ? url : `https://calendly.com/${url.replace(/^\//, "")}`;
}

export function isCalendlyConfigured(): boolean {
  return Boolean(getCalendlyUrl());
}
