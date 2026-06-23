"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import type { AgencyClient } from "@/lib/clients/types";
import type { AgencySpendEntry } from "@/lib/data/client-spend";
import { currentMonthKey } from "@/lib/data/client-spend";
import { formatCurrency } from "@/lib/dashboard/format";

const inputClass =
  "w-full bg-black border border-silver/15 rounded-md px-3 py-2 text-[13px] text-foreground placeholder:text-silver-dim focus:outline-none focus:border-forest-mid/50 transition-colors";

function formatMonthLabel(month: string): string {
  const [year, mon] = month.split("-");
  const date = new Date(Number(year), Number(mon) - 1, 1);
  return date.toLocaleDateString("en-CA", { month: "long", year: "numeric" });
}

export function SpendManager() {
  const searchParams = useSearchParams();
  const initialClient = searchParams.get("client") ?? "";

  const [clients, setClients] = useState<AgencyClient[]>([]);
  const [entries, setEntries] = useState<AgencySpendEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saveError, setSaveError] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [form, setForm] = useState({
    clientSlug: initialClient,
    month: currentMonthKey(),
    adSpendCad: "",
    notes: "",
  });

  const load = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const [clientsRes, spendRes] = await Promise.all([
        fetch("/api/clients"),
        fetch("/api/clients/spend"),
      ]);

      const clientsData = await clientsRes.json();
      const spendData = await spendRes.json();

      if (!clientsRes.ok) {
        setError(clientsData.error ?? "Failed to load clients");
        setClients([]);
        setEntries([]);
        return;
      }

      if (!clientsData.configured) {
        setError("Connect Supabase to manage ad spend. See .env.example.");
        setClients([]);
        setEntries([]);
        return;
      }

      const loadedClients: AgencyClient[] = clientsData.clients ?? [];
      setClients(loadedClients);

      if (!spendRes.ok) {
        setEntries([]);
      } else {
        setEntries(spendData.entries ?? []);
      }

      setForm((prev) => ({
        ...prev,
        clientSlug:
          prev.clientSlug && loadedClients.some((c) => c.slug === prev.clientSlug)
            ? prev.clientSlug
            : loadedClients[0]?.slug ?? "",
      }));
    } catch {
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaveError("");
    setSaveSuccess(false);

    const adSpendCad = Number(form.adSpendCad);
    if (!form.clientSlug) {
      setSaveError("Select a client");
      setSaving(false);
      return;
    }
    if (!form.month) {
      setSaveError("Select a month");
      setSaving(false);
      return;
    }
    if (!Number.isFinite(adSpendCad) || adSpendCad < 0) {
      setSaveError("Enter a valid ad spend amount");
      setSaving(false);
      return;
    }

    try {
      const res = await fetch("/api/clients/spend", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientSlug: form.clientSlug,
          month: form.month,
          adSpendCad,
          notes: form.notes.trim() || null,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setSaveError(data.error ?? "Failed to save");
        return;
      }

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);

      if (data.entry) {
        setEntries((prev) => {
          const next = prev.filter(
            (row) =>
              !(row.clientSlug === data.entry.clientSlug && row.month === data.entry.month)
          );
          return [data.entry, ...next].sort((a, b) => b.month.localeCompare(a.month));
        });
      } else {
        await load();
      }
    } catch {
      setSaveError("Failed to save");
    } finally {
      setSaving(false);
    }
  }

  function startEdit(entry: AgencySpendEntry) {
    setForm({
      clientSlug: entry.clientSlug,
      month: entry.month,
      adSpendCad: String(entry.adSpendCad),
      notes: entry.notes ?? "",
    });
    setSaveError("");
    setSaveSuccess(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 bg-black-surface rounded animate-pulse" />
        <div className="dashboard-card h-64 animate-pulse" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <p className="text-[11px] uppercase tracking-[0.15em] text-silver-dim mb-1">
          Agency
        </p>
        <h1 className="text-xl font-medium text-foreground mb-2">Monthly Ad Spend</h1>
        <p className="text-[13px] text-silver-muted leading-relaxed max-w-2xl">
          Log Meta ad spend per client and month. Reports use this data for CPL and ROAS.
          Clients see metrics only after spend is entered.
        </p>
      </div>

      {error ? (
        <div className="dashboard-card p-6 mb-6 text-sm text-red-400/80">{error}</div>
      ) : null}

      {clients.length === 0 && !error ? (
        <div className="dashboard-card p-12 text-center">
          <p className="text-silver-muted mb-4">
            Add a client before logging ad spend.
          </p>
          <Link
            href="/dashboard/clients"
            className="inline-flex items-center justify-center gap-2 rounded-md font-medium tracking-wide transition-all duration-200 px-4 py-2 text-sm min-h-[40px] bg-forest-glow text-black font-semibold hover:bg-[#6dd4a0] border border-forest-glow/80"
          >
            Go to clients
          </Link>
        </div>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="dashboard-card p-5 mb-8 space-y-4">
            <p className="text-[11px] uppercase tracking-wider text-silver-dim">
              {entries.some(
                (e) => e.clientSlug === form.clientSlug && e.month === form.month
              )
                ? "Update entry"
                : "New entry"}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Client">
                <select
                  className={inputClass}
                  value={form.clientSlug}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, clientSlug: e.target.value }))
                  }
                  required
                >
                  <option value="" disabled>
                    Select client
                  </option>
                  {clients.map((client) => (
                    <option key={client.id} value={client.slug}>
                      {client.name}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Month">
                <input
                  type="month"
                  className={inputClass}
                  value={form.month}
                  onChange={(e) => setForm((prev) => ({ ...prev, month: e.target.value }))}
                  required
                />
              </Field>

              <Field label="Ad spend (CAD)">
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  className={inputClass}
                  value={form.adSpendCad}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, adSpendCad: e.target.value }))
                  }
                  placeholder="2500"
                  required
                />
              </Field>

              <Field label="Notes (optional)">
                <input
                  className={inputClass}
                  value={form.notes}
                  onChange={(e) => setForm((prev) => ({ ...prev, notes: e.target.value }))}
                  placeholder="Meta Ads — campaign breakdown"
                />
              </Field>
            </div>

            {saveError ? <p className="text-sm text-red-400/80">{saveError}</p> : null}
            {saveSuccess ? (
              <p className="text-sm text-forest-glow">Ad spend saved.</p>
            ) : null}

            <Button type="submit" size="sm" disabled={saving}>
              {saving ? "Saving…" : "Save ad spend"}
            </Button>
          </form>

          <div className="dashboard-card overflow-hidden">
            <div className="px-5 py-4 border-b border-silver/8 flex items-center justify-between">
              <p className="text-[11px] uppercase tracking-wider text-silver-dim">
                Logged spend
              </p>
              <span className="text-[12px] text-silver-dim tabular-nums">
                {entries.length} {entries.length === 1 ? "entry" : "entries"}
              </span>
            </div>

            {entries.length === 0 ? (
              <div className="p-10 text-center text-[13px] text-silver-muted">
                No ad spend logged yet. Use the form above to add the first entry.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-[13px]">
                  <thead>
                    <tr className="border-b border-silver/8 text-left">
                      {["Client", "Month", "Ad spend", "Notes", ""].map((h) => (
                        <th
                          key={h || "actions"}
                          className="px-5 py-3 text-[11px] uppercase tracking-wider text-silver-dim font-medium"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {entries.map((entry) => (
                      <tr key={entry.id} className="border-b border-silver/4">
                        <td className="px-5 py-3 text-foreground">{entry.clientName}</td>
                        <td className="px-5 py-3 text-silver-muted">
                          {formatMonthLabel(entry.month)}
                        </td>
                        <td className="px-5 py-3 tabular-nums text-forest-glow">
                          {formatCurrency(entry.adSpendCad)}
                        </td>
                        <td className="px-5 py-3 text-silver-muted max-w-xs truncate">
                          {entry.notes || "—"}
                        </td>
                        <td className="px-5 py-3 text-right">
                          <button
                            type="button"
                            onClick={() => startEdit(entry)}
                            className="text-[12px] text-silver-muted hover:text-foreground transition-colors"
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[11px] uppercase tracking-wider text-silver-dim mb-1.5">
        {label}
      </span>
      {children}
    </label>
  );
}
