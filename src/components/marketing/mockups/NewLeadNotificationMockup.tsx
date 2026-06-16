"use client";

import { MockupAvatar } from "./MockupShell";

interface NewLeadNotificationMockupProps {
  compact?: boolean;
  className?: string;
}

export function NewLeadNotificationMockup({
  compact = false,
  className = "",
}: NewLeadNotificationMockupProps) {
  return (
    <div
      className={`mockup-glass mockup-glow-accent rounded-xl border-forest-mid/40 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)] ${className}`}
    >
      <div className={`${compact ? "p-3" : "p-4"}`}>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[9px] uppercase tracking-wider text-silver-dim">Example notification</span>
          <span className="text-[9px] uppercase tracking-wider text-forest-glow px-2 py-0.5 rounded border border-forest-mid/30 bg-forest-mid/10">
            Demo
          </span>
        </div>
        <div className="flex items-start gap-3">
          <div className="relative shrink-0">
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-forest-glow animate-pulse ring-2 ring-black-surface" />
            <MockupAvatar name="Sarah M." size={compact ? "sm" : "md"} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-0.5">
              <p className="text-[10px] uppercase tracking-wider text-forest-glow font-medium">
                New lead
              </p>
              <span className="text-[10px] text-silver-dim shrink-0">2 min ago</span>
            </div>
            <p className={`font-semibold text-foreground ${compact ? "text-sm" : "text-base"}`}>
              Sarah M. <span className="text-silver-dim font-normal text-[11px]">(sample)</span>
            </p>
            <p className="text-[12px] text-silver-muted">Kitchen renovation</p>
            <div className="flex flex-wrap gap-1.5 mt-2">
              <span className="text-[9px] px-2 py-0.5 rounded-full border border-silver/15 bg-black-surface/60 text-silver-muted">
                Brampton, ON
              </span>
              <span className="text-[9px] px-2 py-0.5 rounded-full border border-red-400/25 bg-red-400/8 text-red-300/90">
                Hot lead
              </span>
              <span className="text-[9px] px-2 py-0.5 rounded-full border border-forest-mid/25 bg-forest-mid/10 text-forest-glow">
                Est. $28K
              </span>
            </div>
          </div>
        </div>

        {!compact && (
          <div className="mt-3 pt-3 border-t border-silver/10 grid grid-cols-2 gap-2 text-[11px]">
            <div>
              <p className="text-silver-dim text-[9px] uppercase tracking-wider mb-0.5">Phone</p>
              <p className="text-foreground tabular-nums">(905) 555-0142</p>
            </div>
            <div>
              <p className="text-silver-dim text-[9px] uppercase tracking-wider mb-0.5">Timeline</p>
              <p className="text-foreground">Within 30 days</p>
            </div>
          </div>
        )}

        <div className={`flex gap-2 ${compact ? "mt-2" : "mt-3"}`}>
          <span className="flex-1 text-center text-[10px] py-1.5 rounded-lg bg-forest-mid/25 border border-forest-mid/40 text-forest-glow font-medium">
            View in CRM
          </span>
          {!compact && (
            <span className="text-[10px] py-1.5 px-3 rounded-lg border border-silver/15 text-silver-dim">
              Call
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
