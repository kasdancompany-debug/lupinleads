"use client";

import { useCallback, useEffect, useState } from "react";
import type { ContractorLead } from "@/lib/crm/types";
import type { FollowUpAnalysis } from "@/lib/ai/types";
import { getCachedAnalysis, setCachedAnalysis } from "@/lib/ai/cache";
import { LeadScoreBadge } from "./LeadScoreBadge";
import { RecommendationCard } from "./RecommendationCard";
import { Button } from "@/components/ui/Button";

interface AiFollowUpPanelProps {
  lead: ContractorLead;
  compact?: boolean;
  onAnalysis?: (analysis: FollowUpAnalysis) => void;
}

type MessageTab = "sms" | "email";

export function AiFollowUpPanel({ lead, compact = false, onAnalysis }: AiFollowUpPanelProps) {
  const [analysis, setAnalysis] = useState<FollowUpAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tab, setTab] = useState<MessageTab>("sms");
  const [copied, setCopied] = useState<string | null>(null);
  const [source, setSource] = useState<"openai" | "fallback" | null>(null);

  const generate = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/ai/follow-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lead }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Analysis failed");

      setAnalysis(data.analysis);
      setSource(data.openaiConfigured ? "openai" : "fallback");
      setCachedAnalysis(lead.id, lead.updatedAt, data.analysis);
      onAnalysis?.(data.analysis);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Analysis failed");
    } finally {
      setLoading(false);
    }
  }, [lead, onAnalysis]);

  useEffect(() => {
    const cached = getCachedAnalysis(lead.id, lead.updatedAt);
    if (cached) {
      setAnalysis(cached);
      setSource("openai");
    } else {
      setAnalysis(null);
      setSource(null);
    }
  }, [lead.id, lead.updatedAt]);

  async function copy(text: string, key: string) {
    await navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <div className={compact ? "" : "dashboard-card p-5"}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-[11px] uppercase tracking-wider text-silver-dim mb-0.5">
            AI Follow-Up Assistant
          </p>
          {analysis && (
            <div className="flex items-center gap-2 mt-1">
              <LeadScoreBadge score={analysis.score} size="md" />
              {source === "fallback" && (
                <span className="text-[10px] text-silver-dim">Rule-based</span>
              )}
            </div>
          )}
        </div>
        <Button size="sm" loading={loading} onClick={generate}>
          {analysis ? "Regenerate" : "Analyze Lead"}
        </Button>
      </div>

      {error && <p className="text-red-400/80 text-sm mb-4">{error}</p>}

      {!analysis && !loading && (
        <div className="text-center py-8 border border-dashed border-silver/10 rounded-md">
          <div className="w-10 h-10 rounded-full bg-forest-mid/15 border border-forest-mid/25 flex items-center justify-center mx-auto mb-3">
            <svg className="w-5 h-5 text-forest-glow" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M10 2L12 7H17L13 10.5L14.5 16L10 13L5.5 16L7 10.5L3 7H8L10 2Z" />
            </svg>
          </div>
          <p className="text-sm text-silver-muted mb-1">Get AI-powered follow-up guidance</p>
          <p className="text-[12px] text-silver-dim">
            Score, recommended action, SMS & email drafts
          </p>
        </div>
      )}

      {loading && (
        <div className="space-y-3 py-4">
          <div className="h-16 bg-black-surface rounded-md animate-pulse" />
          <div className="h-24 bg-black-surface rounded-md animate-pulse" />
          <div className="h-32 bg-black-surface rounded-md animate-pulse" />
        </div>
      )}

      {analysis && !loading && (
        <div className="space-y-4">
          <p className="text-[12px] text-silver-muted">{analysis.scoreReason}</p>

          <RecommendationCard
            recommendation={analysis.recommendation}
            reason={analysis.recommendationReason}
          />

          <div className="rounded-md bg-black/40 border border-silver/8 px-4 py-3">
            <p className="text-[10px] uppercase tracking-wider text-silver-dim mb-1">
              Next Action
            </p>
            <p className="text-[13px] text-foreground">{analysis.nextAction}</p>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-wider text-silver-dim mb-2">
              Talking Points
            </p>
            <ul className="space-y-1.5">
              {analysis.talkingPoints.map((point) => (
                <li
                  key={point}
                  className="text-[12px] text-silver-muted flex items-start gap-2"
                >
                  <span className="text-forest-glow mt-0.5">•</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="flex gap-2 mb-3">
              {(["sms", "email"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTab(t)}
                  className={`px-3 py-1.5 rounded-md text-[12px] uppercase tracking-wider transition-colors ${
                    tab === t
                      ? "bg-white/[0.08] text-foreground"
                      : "text-silver-muted hover:text-foreground"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {tab === "sms" ? (
              <MessageBlock
                content={analysis.sms}
                copyKey="sms"
                copied={copied}
                onCopy={copy}
                charCount={analysis.sms.length}
              />
            ) : (
              <div className="space-y-3">
                <div>
                  <p className="text-[10px] text-silver-dim mb-1">Subject</p>
                  <MessageBlock
                    content={analysis.email.subject}
                    copyKey="subject"
                    copied={copied}
                    onCopy={copy}
                    singleLine
                  />
                </div>
                <div>
                  <p className="text-[10px] text-silver-dim mb-1">Body</p>
                  <MessageBlock
                    content={analysis.email.body}
                    copyKey="email"
                    copied={copied}
                    onCopy={copy}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function MessageBlock({
  content,
  copyKey,
  copied,
  onCopy,
  charCount,
  singleLine = false,
}: {
  content: string;
  copyKey: string;
  copied: string | null;
  onCopy: (text: string, key: string) => void;
  charCount?: number;
  singleLine?: boolean;
}) {
  return (
    <div className="relative rounded-md bg-black border border-silver/10 p-4">
      <p
        className={`text-[13px] text-silver-muted pr-16 ${
          singleLine ? "truncate" : "whitespace-pre-wrap"
        }`}
      >
        {content}
      </p>
      {charCount !== undefined && (
        <p className="text-[10px] text-silver-dim mt-2">{charCount} characters</p>
      )}
      <button
        type="button"
        onClick={() => onCopy(content, copyKey)}
        className="absolute top-3 right-3 text-[11px] text-forest-glow hover:text-forest-light transition-colors"
      >
        {copied === copyKey ? "Copied!" : "Copy"}
      </button>
    </div>
  );
}
