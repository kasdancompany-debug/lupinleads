import type { FollowUpAnalysis } from "./types";

const STORAGE_KEY = "lupin-ai-analysis";

interface CachedEntry {
  leadUpdatedAt: string;
  analysis: FollowUpAnalysis;
}

type CacheStore = Record<string, CachedEntry>;

export function getCachedAnalysis(
  leadId: string,
  leadUpdatedAt: string
): FollowUpAnalysis | null {
  if (typeof window === "undefined") return null;
  try {
    const store: CacheStore = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    const entry = store[leadId];
    if (entry && entry.leadUpdatedAt === leadUpdatedAt) {
      return entry.analysis;
    }
  } catch {
    // ignore
  }
  return null;
}

export function setCachedAnalysis(
  leadId: string,
  leadUpdatedAt: string,
  analysis: FollowUpAnalysis
): void {
  if (typeof window === "undefined") return;
  try {
    const store: CacheStore = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    store[leadId] = { leadUpdatedAt, analysis };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    // ignore
  }
}
