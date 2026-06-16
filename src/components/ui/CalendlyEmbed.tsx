"use client";

import Script from "next/script";
import { useCallback, useState } from "react";

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
  const parsed = new URL(baseUrl);
  if (prefill?.name) parsed.searchParams.set("name", prefill.name);
  if (prefill?.email) parsed.searchParams.set("email", prefill.email);
  parsed.searchParams.set("background_color", "0a0a0a");
  parsed.searchParams.set("text_color", "e8e8e8");
  parsed.searchParams.set("primary_color", "52b788");
  return parsed.toString();
}

export function CalendlyEmbed({
  url,
  prefill,
  minHeight = 700,
  className = "",
}: CalendlyEmbedProps) {
  const [scriptReady, setScriptReady] = useState(false);
  const [initFailed, setInitFailed] = useState(false);
  const embedUrl = buildCalendlyUrl(url, prefill);

  const initWidget = useCallback(
    (container: HTMLDivElement | null) => {
      if (!container || !window.Calendly) return false;

      if (container.querySelector("iframe")) return true;

      try {
        window.Calendly.initInlineWidget({
          url: embedUrl,
          parentElement: container,
          prefill,
        });
        return Boolean(container.querySelector("iframe"));
      } catch {
        return false;
      }
    },
    [embedUrl, prefill]
  );

  const containerRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node || !scriptReady) return;

      const ok = initWidget(node);
      if (!ok) {
        window.setTimeout(() => {
          if (!initWidget(node)) setInitFailed(true);
        }, 1200);
      }
    },
    [initWidget, scriptReady]
  );

  return (
    <>
      <div
        ref={containerRef}
        className={`calendly-inline-widget w-full overflow-hidden rounded-sm ${className}`}
        data-url={embedUrl}
        style={{ minWidth: "280px", height: `${minHeight}px` }}
      />

      {initFailed && (
        <div className="text-center mt-4 p-4 border border-silver/15 rounded-sm">
          <p className="text-silver-muted text-sm mb-3">
            Calendar didn&apos;t load in-page. Open it directly:
          </p>
          <a
            href={embedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium bg-forest-mid text-foreground rounded-sm border border-forest-light/30 hover:bg-forest-light transition-colors"
          >
            Book on Calendly →
          </a>
        </div>
      )}

      <Script
        id="calendly-widget"
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
        onReady={() => setScriptReady(true)}
        onLoad={() => setScriptReady(true)}
      />
    </>
  );
}
