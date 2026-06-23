"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

type ClientOption = { id: string; slug: string; name: string };

export function MetaLeadTestPanel() {
  const [clients, setClients] = useState<ClientOption[]>([]);
  const [clientSlug, setClientSlug] = useState("");
  const [metaFormId, setMetaFormId] = useState("");
  const [name, setName] = useState("Jane Homeowner");
  const [email, setEmail] = useState("jane@example.com");
  const [phone, setPhone] = useState("(403) 555-0199");
  const [serviceRequested, setServiceRequested] = useState("Roof replacement quote");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>("");
  const [error, setError] = useState("");

  const loadClients = useCallback(async () => {
    const res = await fetch("/api/clients");
    const data = await res.json();
    if (res.ok && data.clients) {
      const list = (data.clients as ClientOption[]).map((c) => ({
        id: c.id,
        slug: c.slug,
        name: c.name,
      }));
      setClients(list);
      if (list.length === 1) setClientSlug(list[0].slug);
    }
  }, []);

  useEffect(() => {
    void loadClients();
  }, [loadClients]);

  async function handleSimulate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult("");

    try {
      const res = await fetch("/api/dev/meta-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientSlug,
          metaFormId: metaFormId || undefined,
          name,
          email,
          phone,
          serviceRequested,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Simulation failed");
        return;
      }

      setResult(
        `Status: ${data.status} · CRM lead ${data.crmLeadId ?? "—"} · client ${data.clientSlug ?? clientSlug}`
      );
    } catch {
      setError("Simulation failed");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full bg-black border border-silver/15 rounded-md px-3 py-2 text-[13px] text-foreground focus:outline-none focus:border-forest-mid/50";

  return (
    <div className="space-y-6">
      <div>
        <p className="text-[11px] uppercase tracking-[0.15em] text-silver-dim mb-1">Dev tool</p>
        <h1 className="text-xl font-medium text-foreground">Simulate Meta lead</h1>
        <p className="text-[13px] text-silver-muted mt-2 max-w-2xl">
          Creates a lead through the same intake path as the Meta webhook — without Facebook. Use
          this to verify client slug mapping and portal visibility before going live. Setup guide:{" "}
          <code className="text-xs text-forest-glow">docs/META_LEAD_SETUP.md</code>
        </p>
        <p className="text-[13px] mt-3">
          <Link href="/dashboard/clients" className="text-forest-glow hover:underline">
            Client onboarding
          </Link>
        </p>
      </div>

      <form onSubmit={handleSimulate} className="dashboard-card p-5 space-y-4 max-w-xl">
        <Field label="Client slug *">
          {clients.length > 0 ? (
            <select
              className={inputClass}
              value={clientSlug}
              onChange={(e) => setClientSlug(e.target.value)}
              required
            >
              <option value="">Select client</option>
              {clients.map((c) => (
                <option key={c.id} value={c.slug}>
                  {c.name} ({c.slug})
                </option>
              ))}
            </select>
          ) : (
            <input
              className={inputClass}
              value={clientSlug}
              onChange={(e) => setClientSlug(e.target.value)}
              placeholder="summit-roofing"
              required
            />
          )}
        </Field>

        <Field label="Meta form ID (optional)">
          <input
            className={inputClass}
            value={metaFormId}
            onChange={(e) => setMetaFormId(e.target.value)}
            placeholder="123456789012345"
          />
          <p className="text-[11px] text-silver-dim mt-1">
            Leave blank to use a dev mapping. In production, this must match your Meta instant form
            ID.
          </p>
        </Field>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Name">
            <input className={inputClass} value={name} onChange={(e) => setName(e.target.value)} />
          </Field>
          <Field label="Phone">
            <input className={inputClass} value={phone} onChange={(e) => setPhone(e.target.value)} />
          </Field>
        </div>

        <Field label="Email">
          <input className={inputClass} value={email} onChange={(e) => setEmail(e.target.value)} />
        </Field>

        <Field label="Service requested">
          <input
            className={inputClass}
            value={serviceRequested}
            onChange={(e) => setServiceRequested(e.target.value)}
          />
        </Field>

        {error ? <p className="text-sm text-red-400/80">{error}</p> : null}
        {result ? <p className="text-sm text-forest-glow">{result}</p> : null}

        <Button type="submit" size="sm" disabled={loading}>
          {loading ? "Simulating…" : "Simulate Meta lead"}
        </Button>
      </form>

      <div className="dashboard-card p-5 text-[13px] text-silver-muted max-w-2xl">
        <p className="font-medium text-foreground mb-2">Production webhook URL</p>
        <code className="text-forest-glow text-xs break-all">
          {typeof window !== "undefined"
            ? `${window.location.origin}/api/webhooks/meta`
            : "/api/webhooks/meta"}
        </code>
        <p className="mt-3">
          After simulating, check{" "}
          <Link
            href={clientSlug ? `/dashboard/crm?client=${encodeURIComponent(clientSlug)}` : "/dashboard/crm"}
            className="text-forest-glow hover:underline"
          >
            CRM leads
          </Link>{" "}
          and the client portal.
        </p>
      </div>
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
