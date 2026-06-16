"use client";

import type { ReactNode } from "react";

interface BrowserWindowMockupProps {
  url: string;
  children: ReactNode;
  className?: string;
}

export function BrowserWindowMockup({ url, children, className = "" }: BrowserWindowMockupProps) {
  return (
    <div
      className={`browser-mockup group relative rounded-xl lg:rounded-2xl overflow-hidden ${className}`}
    >
      <div className="browser-mockup-chrome flex items-center gap-3 px-4 py-3 border-b border-silver/10 bg-charcoal-elevated/95">
        <div className="flex gap-1.5 shrink-0" aria-hidden="true">
          <span className="w-3 h-3 rounded-full bg-[#ff5f57]/80" />
          <span className="w-3 h-3 rounded-full bg-[#febc2e]/80" />
          <span className="w-3 h-3 rounded-full bg-[#28c840]/80" />
        </div>
        <div className="flex-1 flex justify-center min-w-0 px-2">
          <div className="flex items-center gap-2 w-full max-w-md rounded-lg bg-black/50 border border-silver/10 px-3 py-1.5">
            <svg
              className="w-3 h-3 text-forest-glow/70 shrink-0"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="M8 1a5 5 0 00-5 5v1H2.5a.5.5 0 00-.5.5v5a.5.5 0 00.5.5h11a.5.5 0 00.5-.5v-5a.5.5 0 00-.5-.5H13V6a5 5 0 00-5-5z" />
            </svg>
            <span className="text-[11px] sm:text-xs text-silver-muted truncate tabular-nums">
              {url}
            </span>
          </div>
        </div>
        <span className="hidden sm:inline-flex text-[9px] uppercase tracking-wider text-silver-dim px-2 py-1 rounded border border-silver/10 bg-black/30 shrink-0">
          Preview
        </span>
      </div>
      <div className="browser-mockup-body bg-black-surface/90 p-4 sm:p-5 lg:p-6">
        {children}
      </div>
      <div
        className="absolute inset-0 rounded-xl lg:rounded-2xl ring-1 ring-inset ring-white/[0.04] pointer-events-none"
        aria-hidden="true"
      />
    </div>
  );
}

interface ProductScreenshotProps {
  label: string;
  caption: string;
  url: string;
  children: ReactNode;
  className?: string;
}

export function ProductScreenshot({
  label,
  caption,
  url,
  children,
  className = "",
}: ProductScreenshotProps) {
  return (
    <figure className={`m-0 ${className}`}>
      <div className="flex items-center justify-between gap-3 mb-4 px-1">
        <div>
          <p className="text-sm font-semibold text-foreground">{label}</p>
          <p className="text-xs text-silver-dim mt-0.5">{caption}</p>
        </div>
        <span className="text-[10px] uppercase tracking-wider text-forest-glow/80 border border-forest-mid/25 bg-forest-mid/10 px-2.5 py-1 rounded-full shrink-0">
          Sample data
        </span>
      </div>
      <BrowserWindowMockup url={url}>{children}</BrowserWindowMockup>
    </figure>
  );
}
