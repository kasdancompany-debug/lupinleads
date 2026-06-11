"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import type { CaptureForm } from "@/lib/forms/types";
import { Button } from "@/components/ui/Button";

export function FormsManager() {
  const [forms, setForms] = useState<CaptureForm[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/forms");
      const data = await res.json();
      if (!res.ok && res.status === 503) {
        setError("Connect Supabase to enable lead capture forms. See .env.example.");
        setForms([]);
        return;
      }
      setForms(data.forms ?? []);
      setError("");
    } catch {
      setError("Failed to load forms");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="dashboard-card h-20 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-[11px] uppercase tracking-[0.15em] text-silver-dim mb-1">
            Lead Capture
          </p>
          <h1 className="text-xl font-medium text-foreground">Forms</h1>
        </div>
        <Link href="/dashboard/forms/new">
          <Button size="sm">Create Form</Button>
        </Link>
      </div>

      {error && (
        <div className="dashboard-card p-4 mb-6 border-amber-400/20 bg-amber-400/5">
          <p className="text-amber-300/90 text-sm">{error}</p>
        </div>
      )}

      {forms.length === 0 && !error ? (
        <div className="dashboard-card p-12 text-center">
          <p className="text-silver-muted mb-4">No forms yet. Create your first capture form.</p>
          <Link href="/dashboard/forms/new">
            <Button>Create Form</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {forms.map((form) => (
            <Link
              key={form.id}
              href={`/dashboard/forms/${form.id}`}
              className="dashboard-card p-5 flex items-center justify-between hover:border-silver/20 transition-colors block"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-[15px] font-medium text-foreground">{form.name}</h3>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded ${
                      form.isActive
                        ? "text-forest-glow bg-forest-mid/15"
                        : "text-silver-dim bg-silver/10"
                    }`}
                  >
                    {form.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
                <p className="text-[12px] text-silver-dim">
                  /embed/{form.slug} · {form.fields.length} fields
                  {form.defaultCampaign && ` · ${form.defaultCampaign}`}
                </p>
              </div>
              <svg className="w-4 h-4 text-silver-dim" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 3L11 8L6 13" />
              </svg>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
