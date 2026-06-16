"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement;
        prefill?: { name?: string; email?: string };
      }) => void;
    };
  }
}

interface CalendlyEmbedProps {
  url: string;
  prefill?: { name?: string; email?: string };
  minHeight?: number;
  className?: string;
}

function buildCalendlyUrl(
  baseUrl: string,
  prefill?: { name?: string; email?: string }
): string {
  const url = new URL(baseUrl);
  if (prefill?.name) url.searchParams.set("name", prefill.name);
  if (prefill?.email) url.searchParams.set("email", prefill.email);
  return url.toString();
}

export function CalendlyEmbed({
  url,
  prefill,
  minHeight = 700,
  className = "",
}: CalendlyEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = "";
    const embedUrl = buildCalendlyUrl(url, prefill);

    function initWidget() {
      if (!container || !window.Calendly) return;
      window.Calendly.initInlineWidget({
        url: embedUrl,
        parentElement: container,
        prefill,
      });
    }

    const existingScript = document.querySelector(
      'script[src="https://assets.calendly.com/assets/external/widget.js"]'
    );

    if (window.Calendly) {
      initWidget();
      return;
    }

    if (existingScript) {
      existingScript.addEventListener("load", initWidget);
      return () => existingScript.removeEventListener("load", initWidget);
    }

    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.onload = initWidget;
    document.body.appendChild(script);
  }, [url, prefill?.name, prefill?.email, prefill]);

  return (
    <div
      ref={containerRef}
      className={`calendly-inline-widget w-full overflow-hidden rounded-sm bg-black-surface ${className}`}
      style={{ minWidth: "280px", height: `${minHeight}px` }}
    />
  );
}
