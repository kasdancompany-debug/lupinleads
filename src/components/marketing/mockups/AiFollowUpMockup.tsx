"use client";

import { MockupShell, MockupAvatar } from "./MockupShell";

export function AiFollowUpMockup({ compact = false }: { compact?: boolean }) {
  return (
    <MockupShell title="LUPIN AI · Follow-up" badge="Example" compact={compact}>
      <div className="space-y-3">
        <div className="rounded-lg border border-red-400/30 bg-red-400/5 p-3">
          <div className="flex items-start gap-3">
            <MockupAvatar name="Marcus T." size="sm" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-1">
                <p className="text-sm font-semibold text-foreground">Marcus T.</p>
                <span className="text-[9px] font-bold uppercase tracking-wider text-red-300 px-1.5 py-0.5 rounded bg-red-400/10 border border-red-400/20">
                  Hot · 94
                </span>
              </div>
              <p className="text-[11px] text-silver-muted mb-2">
                Full roof replace · Mississauga · wants estimate this week
              </p>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-forest-glow font-medium">→ Call immediately</span>
                <span className="text-[9px] text-silver-dim">· Responded in 3 min wins 78% more</span>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-amber-400/25 bg-amber-400/5 p-3">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] uppercase tracking-wider text-silver-dim">Recommended action</p>
            <span className="text-[9px] text-amber-200/80">Priority 1</span>
          </div>
          <p className="text-[12px] text-foreground font-medium mb-1">Send estimate slot offer via SMS</p>
          <p className="text-[11px] text-silver-dim">Best window: today 2–5pm based on lead behaviour</p>
        </div>

        <div className="rounded-lg border border-forest-mid/30 bg-forest-mid/8 p-3">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] uppercase tracking-wider text-silver-dim">Draft SMS</p>
            <span className="text-[9px] text-forest-glow">AI generated</span>
          </div>
          <p className="text-[12px] text-silver-muted leading-relaxed italic">
            &ldquo;Hi Marcus — got your roof request for Mississauga. I can stop by Thursday for a
            free estimate. Does 2pm work? — Sample Contractor&rdquo;
          </p>
          <div className="flex gap-2 mt-3">
            <span className="text-[10px] px-2.5 py-1 rounded-md bg-forest-mid/25 border border-forest-mid/40 text-forest-glow">
              Send SMS
            </span>
            <span className="text-[10px] px-2.5 py-1 rounded-md border border-silver/15 text-silver-dim">
              Edit draft
            </span>
          </div>
        </div>

        {!compact && (
          <div className="rounded-lg border border-silver/10 bg-black-surface/50 p-3">
            <div className="flex items-center gap-3">
              <MockupAvatar name="Elena V." size="sm" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-medium text-foreground">Elena V.</p>
                  <span className="text-[9px] uppercase text-amber-300/90">Warm · 61</span>
                </div>
                <p className="text-[10px] text-silver-dim">Follow up tomorrow · bathroom reno</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </MockupShell>
  );
}
