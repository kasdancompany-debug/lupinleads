"use client";

import { useCallback, useEffect, useState } from "react";
import { buildCalendlyUrl, type CalendlyPrefill } from "@/lib/calendly";
import { loadCalendlyScript, openCalendlyInNewTab } from "@/lib/calendly-widget";
import { Button } from "@/components/ui/Button";

interface CalendlyEmbedProps {
  url: string;
  prefill?: CalendlyPrefill;
  minHeight?: number;
  className?: string;
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

  useEffect(() => {
    let cancelled = false;
    void loadCalendlyScript().then((ready) => {
      if (!cancelled) setScriptReady(ready);
    });
    return () => {
      cancelled = true;
    };
  }, []);

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
        }, 1500);
      }
    },
    [initWidget, scriptReady]
  );

  if (!scriptReady && !initFailed) {
    return (
      <div
        className={`flex items-center justify-center rounded-sm border border-silver/10 bg-black-surface/40 ${className}`}
        style={{ minWidth: "280px", height: `${Math.min(minHeight, 420)}px` }}
        aria-busy="true"
        aria-label="Loading calendar"
      >
        <p className="text-sm text-silver-muted">Loading calendar…</p>
      </div>
    );
  }

  return (
    <>
      {!initFailed && (
        <div
          ref={containerRef}
          className={`calendly-inline-widget w-full overflow-hidden rounded-sm ${className}`}
          data-url={embedUrl}
          style={{ minWidth: "280px", height: `${minHeight}px` }}
        />
      )}

      {initFailed && (
        <div
          className="text-center p-6 sm:p-8 border border-silver/15 rounded-xl bg-black-surface/40"
          style={{ minHeight: Math.min(minHeight, 320) }}
        >
          <p className="text-foreground font-medium mb-2">Calendar didn&apos;t load</p>
          <p className="text-silver-muted text-sm mb-5 max-w-sm mx-auto">
            This can happen on slow connections or with strict browser settings. Open Calendly
            directly or use the contact form below.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              type="button"
              emphasis
              onClick={() => openCalendlyInNewTab(prefill)}
            >
              Open Calendly
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                document.getElementById("book-call-form")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
            >
              Use contact form
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
