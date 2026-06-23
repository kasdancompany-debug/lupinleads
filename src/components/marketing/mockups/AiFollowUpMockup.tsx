"use client";

import { MockupShell, MockupAvatar } from "./MockupShell";
import { MockupCard, MockupNode, MockupStatus } from "./MockupBrand";

export function AiFollowUpMockup({ compact = false }: { compact?: boolean }) {
  return (
    <MockupShell title="LUPIN AI · Follow-up" badge="Sample" compact={compact}>
      <MockupCard active className="mb-3">
        <div className="flex items-start gap-3">
          <MockupAvatar name="Marcus T." size="sm" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-1">
              <p className="text-sm font-semibold text-foreground">Marcus T.</p>
              <div className="flex items-center gap-1.5">
                <MockupNode variant="hot" pulse />
                <MockupStatus variant="hot" label="Hot · 94" />
              </div>
            </div>
            <p className="text-[11px] text-silver-muted mb-2">
              Roof replace · Mississauga · estimate this week
            </p>
            <p className="text-[10px] text-sage-green font-medium">→ Call now</p>
          </div>
        </div>
      </MockupCard>

      <MockupCard className="mb-3">
        <div className="flex items-center justify-between mb-2">
          <p className="mockup-section-label !mb-0">Next action</p>
          <MockupStatus variant="warm" label="Priority" />
        </div>
        <p className="text-[12px] text-foreground font-medium mb-1">
          Send estimate slot via SMS
        </p>
        <p className="text-[11px] text-silver-dim">Best window: today 2–5pm</p>
      </MockupCard>

      <MockupCard>
        <div className="flex items-center justify-between mb-2">
          <p className="mockup-section-label !mb-0">Draft SMS</p>
          <span className="text-[9px] text-lupin-purple-light uppercase tracking-wider font-medium">
            AI
          </span>
        </div>
        <p className="text-[12px] text-silver-muted leading-relaxed">
          &ldquo;Hi Marcus — got your roof request for Mississauga. I can stop by Thursday for a
          free estimate. Does 2pm work?&rdquo;
        </p>
        <div className="flex gap-2 mt-3">
          <span className="text-[10px] px-2.5 py-1.5 rounded-md mockup-status mockup-status--won !tracking-normal !normal-case">
            Send SMS
          </span>
          <span className="text-[10px] px-2.5 py-1.5 rounded-md mockup-status mockup-status--neutral !tracking-normal !normal-case">
            Edit
          </span>
        </div>
      </MockupCard>

      {!compact && (
        <div className="mockup-lead-row mt-3">
          <MockupNode variant="warm" />
          <MockupAvatar name="Elena V." size="sm" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <p className="text-[11px] font-medium text-foreground">Elena V.</p>
              <MockupStatus variant="warm" label="Warm · 61" />
            </div>
            <p className="text-[10px] text-silver-dim">Follow up tomorrow · bathroom</p>
          </div>
        </div>
      )}
    </MockupShell>
  );
}
