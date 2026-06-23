"use client";

import { useEffect } from "react";
import { isCalendlyConfigured } from "@/lib/calendly";
import { preloadCalendlyScript } from "@/lib/calendly-widget";

/** Preload Calendly widget.js on marketing pages when configured. */
export function CalendlyBootstrap() {
  useEffect(() => {
    if (isCalendlyConfigured()) preloadCalendlyScript();
  }, []);

  return null;
}
