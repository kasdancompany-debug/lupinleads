"use client";

import { MockupAvatar } from "./MockupShell";
import { MockupCard, MockupNode, MockupStatus } from "./MockupBrand";

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
      className={`mockup-glass mockup-glow-accent rounded-xl overflow-hidden ${className}`}
    >
      <div className={compact ? "p-3" : "p-4"}>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="mockup-section-label !mb-0">New on the path</span>
          <MockupStatus variant="new" label="Live" />
        </div>

        <MockupCard active className="!p-3">
          <div className="flex items-start gap-3">
            <div className="relative shrink-0">
              <MockupNode variant="hot" pulse className="absolute -top-0.5 -right-0.5 z-10" />
              <MockupAvatar name="Sarah M." size={compact ? "sm" : "md"} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-0.5">
                <p className="text-[10px] uppercase tracking-wider text-sage-green font-medium">
                  Lead captured
                </p>
                <span className="text-[10px] text-silver-dim shrink-0">2 min ago</span>
              </div>
              <p className={`font-semibold text-foreground ${compact ? "text-sm" : "text-base"}`}>
                Sarah M.
              </p>
              <p className="text-[12px] text-silver-muted">Kitchen renovation</p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                <MockupStatus variant="neutral" label="Brampton" />
                <MockupStatus variant="hot" label="Hot" />
                <MockupStatus variant="won" label="Est. $28K" />
              </div>
            </div>
          </div>
        </MockupCard>

        <div className={`flex gap-2 ${compact ? "mt-2" : "mt-3"}`}>
          <span className="flex-1 text-center text-[10px] py-2 rounded-lg font-medium mockup-status mockup-status--won !tracking-normal !normal-case !text-[10px]">
            View in pipeline
          </span>
        </div>
      </div>
    </div>
  );
}
