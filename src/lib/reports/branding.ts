import type { ClientBranding } from "./types";
import { SITE } from "@/lib/constants";

export const DEFAULT_BRANDINGS: ClientBranding[] = [];

const STORAGE_KEY = "lupin-client-branding";

function slugToName(slug: string): string {
  return slug
    .split(/[-_]/g)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function fallbackBranding(clientId: string): ClientBranding {
  const clientName = slugToName(clientId);
  return {
    clientId,
    clientName,
    logoUrl: null,
    primaryColor: "#1b4332",
    accentColor: "#52b788",
    agencyName: SITE.name,
    reportFooter: `Confidential — Prepared exclusively for ${clientName}.`,
  };
}

export function getBrandings(): ClientBranding[] {
  if (typeof window === "undefined") return DEFAULT_BRANDINGS;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return Object.values(JSON.parse(stored) as Record<string, ClientBranding>);
    }
  } catch {
    // fall through
  }
  return DEFAULT_BRANDINGS;
}

export function saveBranding(branding: ClientBranding): void {
  if (typeof window === "undefined") return;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const overrides: Record<string, ClientBranding> = stored ? JSON.parse(stored) : {};
    overrides[branding.clientId] = branding;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
  } catch {
    // ignore
  }
}

export function getBrandingById(clientId: string): ClientBranding {
  const found = getBrandings().find((b) => b.clientId === clientId);
  return found ?? fallbackBranding(clientId);
}

export function getServerBranding(clientId: string): ClientBranding {
  return fallbackBranding(clientId);
}
