import type { ClientBranding } from "./types";

export const DEFAULT_BRANDINGS: ClientBranding[] = [
  {
    clientId: "apex-outdoors",
    clientName: "Apex Outdoors Co.",
    logoUrl: null,
    primaryColor: "#1b4332",
    accentColor: "#52b788",
    agencyName: "LUPIN LEADS",
    reportFooter: "Confidential — Prepared exclusively for Apex Outdoors Co.",
  },
  {
    clientId: "summit-ventures",
    clientName: "Summit Ventures",
    logoUrl: null,
    primaryColor: "#1e3a5f",
    accentColor: "#4a90d9",
    agencyName: "LUPIN LEADS",
    reportFooter: "Confidential — Prepared exclusively for Summit Ventures.",
  },
  {
    clientId: "wildcraft-studio",
    clientName: "Wildcraft Studio",
    logoUrl: null,
    primaryColor: "#3d2c29",
    accentColor: "#c9a87c",
    agencyName: "LUPIN LEADS",
    reportFooter: "Confidential — Prepared exclusively for Wildcraft Studio.",
  },
];

const STORAGE_KEY = "lupin-client-branding";

export function getBrandings(): ClientBranding[] {
  if (typeof window === "undefined") return DEFAULT_BRANDINGS;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const overrides: Record<string, Partial<ClientBranding>> = JSON.parse(stored);
      return DEFAULT_BRANDINGS.map((b) => ({
        ...b,
        ...(overrides[b.clientId] ?? {}),
      }));
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
    const overrides: Record<string, Partial<ClientBranding>> = stored
      ? JSON.parse(stored)
      : {};
    overrides[branding.clientId] = branding;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
  } catch {
    // ignore
  }
}

export function getBrandingById(clientId: string): ClientBranding {
  const found = DEFAULT_BRANDINGS.find((b) => b.clientId === clientId);
  return found ?? DEFAULT_BRANDINGS[0];
}

export function getServerBranding(clientId: string): ClientBranding {
  return getBrandingById(clientId);
}
