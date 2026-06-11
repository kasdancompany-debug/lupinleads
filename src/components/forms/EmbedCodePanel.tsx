"use client";

import { useState } from "react";
import {
  generateCampaignLink,
  generateDirectLink,
  generateIframeEmbed,
  generateScriptEmbed,
} from "@/lib/forms/embed";

interface EmbedCodePanelProps {
  slug: string;
  defaultCampaign?: string | null;
}

type Tab = "iframe" | "script" | "link" | "campaign";

export function EmbedCodePanel({ slug, defaultCampaign }: EmbedCodePanelProps) {
  const [tab, setTab] = useState<Tab>("iframe");
  const [campaign, setCampaign] = useState(defaultCampaign ?? "");
  const [utmSource, setUtmSource] = useState("google");
  const [copied, setCopied] = useState(false);

  const codes: Record<Tab, string> = {
    iframe: generateIframeEmbed(slug, campaign || undefined),
    script: generateScriptEmbed(slug, campaign || undefined),
    link: generateDirectLink(slug, campaign || undefined),
    campaign: generateCampaignLink(slug, campaign || "campaign-name", utmSource),
  };

  async function copy() {
    await navigator.clipboard.writeText(codes[tab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: "iframe", label: "iFrame" },
    { id: "script", label: "Script" },
    { id: "link", label: "Direct Link" },
    { id: "campaign", label: "Campaign URL" },
  ];

  return (
    <div className="dashboard-card overflow-hidden">
      <div className="px-5 py-4 border-b border-silver/8">
        <p className="text-[11px] uppercase tracking-wider text-silver-dim mb-1">
          Embeddable Code
        </p>
        <p className="text-sm text-silver-muted">
          Copy and paste into any website or ad campaign
        </p>
      </div>

      <div className="px-5 py-4 border-b border-silver/8 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`px-3 py-1.5 rounded-md text-[12px] transition-colors ${
              tab === t.id
                ? "bg-white/[0.08] text-foreground"
                : "text-silver-muted hover:text-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="px-5 py-4 space-y-4">
        {tab === "campaign" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] text-silver-dim mb-1">Campaign Name</label>
              <input
                className="w-full bg-black border border-silver/15 rounded-md px-3 py-2 text-[13px] text-foreground"
                value={campaign}
                onChange={(e) => setCampaign(e.target.value)}
                placeholder="spring-kitchen-2026"
              />
            </div>
            <div>
              <label className="block text-[11px] text-silver-dim mb-1">UTM Source</label>
              <input
                className="w-full bg-black border border-silver/15 rounded-md px-3 py-2 text-[13px] text-foreground"
                value={utmSource}
                onChange={(e) => setUtmSource(e.target.value)}
                placeholder="google"
              />
            </div>
          </div>
        )}

        {tab !== "campaign" && (
          <div>
            <label className="block text-[11px] text-silver-dim mb-1">
              Campaign param (optional)
            </label>
            <input
              className="w-full bg-black border border-silver/15 rounded-md px-3 py-2 text-[13px] text-foreground"
              value={campaign}
              onChange={(e) => setCampaign(e.target.value)}
              placeholder="?campaign=your-campaign"
            />
          </div>
        )}

        <div className="relative">
          <pre className="bg-black rounded-md border border-silver/10 p-4 text-[12px] text-silver-muted overflow-x-auto whitespace-pre-wrap font-mono">
            {codes[tab]}
          </pre>
          <button
            type="button"
            onClick={copy}
            className="absolute top-3 right-3 px-3 py-1.5 rounded-md text-[11px] bg-forest-mid/80 text-foreground hover:bg-forest-mid transition-colors"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        <p className="text-[11px] text-silver-dim">
          Campaign tracking captures <code className="text-silver-muted">?campaign=</code>,{" "}
          UTM parameters, and referrer automatically on submit.
        </p>
      </div>
    </div>
  );
}
