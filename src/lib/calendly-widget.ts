"use client";

import {
  buildCalendlyUrl,
  getCalendlyUrl,
  type CalendlyPrefill,
} from "@/lib/calendly";

const SCRIPT_ID = "calendly-widget";
const SCRIPT_SRC = "https://assets.calendly.com/assets/external/widget.js";
const LOAD_TIMEOUT_MS = 8000;

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement;
        prefill?: CalendlyPrefill;
      }) => void;
      initPopupWidget: (options: {
        url: string;
        prefill?: CalendlyPrefill;
      }) => void;
    };
  }
}

let scriptPromise: Promise<boolean> | null = null;

function waitForCalendly(timeoutMs: number): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Calendly) {
      resolve(true);
      return;
    }

    const started = Date.now();
    const tick = () => {
      if (window.Calendly) {
        resolve(true);
        return;
      }
      if (Date.now() - started >= timeoutMs) {
        resolve(false);
        return;
      }
      window.setTimeout(tick, 50);
    };
    tick();
  });
}

/** Load Calendly widget.js once. Resolves true when Calendly is ready. */
export function loadCalendlyScript(): Promise<boolean> {
  if (typeof window === "undefined") return Promise.resolve(false);
  if (window.Calendly) return Promise.resolve(true);
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise<boolean>((resolve) => {
    const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;

    const finish = async () => {
      const ready = await waitForCalendly(LOAD_TIMEOUT_MS);
      resolve(ready);
    };

    if (existing) {
      if (existing.getAttribute("data-loaded") === "true") {
        void finish();
        return;
      }
      existing.addEventListener("load", () => void finish(), { once: true });
      existing.addEventListener("error", () => resolve(false), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = () => {
      script.setAttribute("data-loaded", "true");
      void finish();
    };
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

  return scriptPromise;
}

export function preloadCalendlyScript(): void {
  void loadCalendlyScript();
}

export type CalendlyOpenResult = "popup" | "tab" | "unavailable";

/**
 * Open Calendly in a popup overlay. Falls back to a new tab if the widget fails.
 * Returns "unavailable" when NEXT_PUBLIC_CALENDLY_URL is not set.
 */
export async function openCalendlyPopup(
  prefill?: CalendlyPrefill
): Promise<CalendlyOpenResult> {
  const baseUrl = getCalendlyUrl();
  if (!baseUrl) return "unavailable";

  const url = buildCalendlyUrl(baseUrl, prefill);

  try {
    const ready = await loadCalendlyScript();
    if (ready && window.Calendly?.initPopupWidget) {
      window.Calendly.initPopupWidget({ url, prefill });
      return "popup";
    }
  } catch {
    // fall through to tab
  }

  try {
    window.open(url, "_blank", "noopener,noreferrer");
    return "tab";
  } catch {
    return "unavailable";
  }
}

export function openCalendlyInNewTab(prefill?: CalendlyPrefill): boolean {
  const baseUrl = getCalendlyUrl();
  if (!baseUrl) return false;
  const url = buildCalendlyUrl(baseUrl, prefill);
  try {
    window.open(url, "_blank", "noopener,noreferrer");
    return true;
  } catch {
    return false;
  }
}
