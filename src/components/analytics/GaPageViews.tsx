"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { getGaMeasurementId } from "@/components/analytics/GoogleAnalytics";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** Sends page_view on client navigations (initial view is tracked by gtag config). */
export function GaPageViews() {
  const pathname = usePathname();
  const isFirst = useRef(true);
  const measurementId = getGaMeasurementId();

  useEffect(() => {
    if (!measurementId || typeof window.gtag !== "function") {
      return;
    }

    if (isFirst.current) {
      isFirst.current = false;
      return;
    }

    window.gtag("config", measurementId, { page_path: pathname });
  }, [measurementId, pathname]);

  return null;
}
