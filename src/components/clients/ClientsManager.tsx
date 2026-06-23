"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  CLIENT_STATUSES,
  type AgencyClient,
  type ClientStatus,
} from "@/lib/clients/types";
import { isValidClientSlug, normalizeClientSlug } from "@/lib/clients/slug";

const PORTAL_LOGIN_PATH = "/portal/login";

const STATUS_STYLES: Record<ClientStatus, string> = {
  onboarding: "text-amber-300/90 bg-amber-400/10",
  active: "text-forest-glow bg-forest-mid/15",
  paused: "text-silver-muted bg-silver/10",
  churned: "text-red-400/70 bg-red-400/10",
};

const ONBOARDING_STEPS = [
  "Create the client (name, slug, trade, city, owner email)",
  "Map the Meta lead form ID to this client slug",
  "Copy the portal login link and send it to the owner",
  "Simulate a Meta lead (Dashboard → Dev → Meta lead) or add a test lead",
  "Log this month's ad spend",
  "Owner signs in, moves leads, and checks stats",
];

export function ClientsManager() {
  const [clients, setClients] = useState<AgencyClient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState("");
  const [createWarning, setCreateWarning] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const [testLeadLoading, setTestLeadLoading] = useState<string | null>(null);
  const [testLeadMessage, setTestLeadMessage] = useState<Record<string, string>>({});

  const [form, setForm] = useState({
    name: "",
    slug: "",
    trade: "",
    city: "",
    ownerEmail: "",
    status: "onboarding" as ClientStatus,
  });

  const [inviteEmail, setInviteEmail] = useState<Record<string, string>>({});
  const [invitingId, setInvitingId] = useState<string | null>(null);
  const [inviteError, setInviteError] = useState<Record<string, string>>({});

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/clients");
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Failed to load clients");
        setClients([]);
        return;
      }
      if (!data.configured) {
        setError("Connect Supabase to manage clients. See .env.example.");
        setClients([]);
        return;
      }
      setClients(data.clients ?? []);
      setError("");
    } catch {
      setError("Failed to load clients");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  function portalLoginUrl(): string {
    if (typeof window === "undefined") return PORTAL_LOGIN_PATH;
    return `${window.location.origin}${PORTAL_LOGIN_PATH}`;
  }

  async function copyPortalLink(key: string) {
    const url = portalLoginUrl();
    try {
      await navigator.clipboard.writeText(url);
      setCopied(key);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      setCopied(null);
    }
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setCreating(true);
    setCreateError("");
    setCreateWarning("");

    const slug = normalizeClientSlug(form.slug || form.name);
    if (!isValidClientSlug(slug)) {
      setCreateError("Enter a valid slug (lowercase, hyphens, min 2 characters).");
      setCreating(false);
      return;
    }

    try {
      const res = await fetch("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          slug,
          trade: form.trade,
          city: form.city,
          ownerEmail: form.ownerEmail,
          status: form.status,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setCreateError(data.error ?? "Failed to create client");
        return;
      }

      if (data.warning) {
        setCreateWarning(data.warning);
      }

      setForm({
        name: "",
        slug: "",
        trade: "",
        city: "",
        ownerEmail: "",
        status: "onboarding",
      });
      setShowCreate(false);
      await load();
    } catch {
      setCreateError("Failed to create client");
    } finally {
      setCreating(false);
    }
  }

  async function handleInvite(clientId: string) {
    const email = inviteEmail[clientId]?.trim();
    if (!email) return;

    setInvitingId(clientId);
    setInviteError((prev) => ({ ...prev, [clientId]: "" }));

    try {
      const res = await fetch(`/api/clients/${clientId}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok) {
        setInviteError((prev) => ({
          ...prev,
          [clientId]: data.error ?? "Failed to invite owner",
        }));
        return;
      }

      setInviteEmail((prev) => ({ ...prev, [clientId]: "" }));
      await load();
    } catch {
      setInviteError((prev) => ({ ...prev, [clientId]: "Failed to invite owner" }));
    } finally {
      setInvitingId(null);
    }
  }

  async function handleTestLead(clientId: string) {
    setTestLeadLoading(clientId);
    setTestLeadMessage((prev) => ({ ...prev, [clientId]: "" }));

    try {
      const res = await fetch(`/api/clients/${clientId}/test-lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const data = await res.json();

      if (!res.ok) {
        setTestLeadMessage((prev) => ({
          ...prev,
          [clientId]: data.error ?? "Failed to add test lead",
        }));
        return;
      }

      setTestLeadMessage((prev) => ({
        ...prev,
        [clientId]: "Test lead added — check CRM or client portal",
      }));
    } catch {
      setTestLeadMessage((prev) => ({
        ...prev,
        [clientId]: "Failed to add test lead",
      }));
    } finally {
      setTestLeadLoading(null);
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="dashboard-card h-28 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <p className="text-[11px] uppercase tracking-[0.15em] text-silver-dim mb-1">
            Client onboarding
          </p>
          <h1 className="text-xl font-medium text-foreground">Clients</h1>
          <p className="text-[13px] text-silver-muted mt-1 max-w-xl">
            Onboard founding partners: create the account, invite the owner, add a test lead, and log
            ad spend. Client slug must match the{" "}
            <code className="text-forest-glow text-xs">campaign</code> on CRM leads.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => copyPortalLink("global")}
          >
            {copied === "global" ? "Copied!" : "Copy portal login link"}
          </Button>
          <Button type="button" size="sm" onClick={() => setShowCreate((v) => !v)}>
            {showCreate ? "Cancel" : "Add client"}
          </Button>
        </div>
      </div>

      <div className="dashboard-card p-5 mb-6">
        <p className="text-[11px] uppercase tracking-wider text-silver-dim mb-3">
          Onboarding checklist
        </p>
        <ol className="space-y-2">
          {ONBOARDING_STEPS.map((step, index) => (
            <li key={step} className="flex gap-3 text-[13px] text-silver-muted">
              <span className="text-forest-glow font-medium tabular-nums shrink-0">
                {index + 1}.
              </span>
              {step}
            </li>
          ))}
        </ol>
      </div>

      {error ? (
        <div className="dashboard-card p-4 mb-6 border-amber-400/20 bg-amber-400/5">
          <p className="text-amber-300/90 text-sm">{error}</p>
        </div>
      ) : null}

      {createWarning ? (
        <div className="dashboard-card p-4 mb-6 border-amber-400/20 bg-amber-400/5">
          <p className="text-amber-300/90 text-sm">{createWarning}</p>
        </div>
      ) : null}

      {showCreate ? (
        <form onSubmit={handleCreate} className="dashboard-card p-5 mb-6 space-y-4">
          <p className="text-sm font-medium text-foreground">New client</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Client name *">
              <input
                className={inputClass}
                value={form.name}
                onChange={(e) => {
                  const name = e.target.value;
                  setForm((prev) => ({
                    ...prev,
                    name,
                    slug: prev.slug || normalizeClientSlug(name),
                  }));
                }}
                required
              />
            </Field>
            <Field label="Slug (CRM campaign) *">
              <input
                className={inputClass}
                value={form.slug}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, slug: normalizeClientSlug(e.target.value) }))
                }
                placeholder="summit-roofing"
                required
              />
            </Field>
            <Field label="Trade *">
              <input
                className={inputClass}
                value={form.trade}
                onChange={(e) => setForm((prev) => ({ ...prev, trade: e.target.value }))}
                placeholder="Roofing"
                required
              />
            </Field>
            <Field label="City *">
              <input
                className={inputClass}
                value={form.city}
                onChange={(e) => setForm((prev) => ({ ...prev, city: e.target.value }))}
                placeholder="Calgary, AB"
                required
              />
            </Field>
            <Field label="Owner email *">
              <input
                type="email"
                className={inputClass}
                value={form.ownerEmail}
                onChange={(e) => setForm((prev) => ({ ...prev, ownerEmail: e.target.value }))}
                placeholder="owner@company.com"
                required
              />
            </Field>
            <Field label="Status">
              <select
                className={inputClass}
                value={form.status}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, status: e.target.value as ClientStatus }))
                }
              >
                {CLIENT_STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </Field>
          </div>
          <p className="text-[12px] text-silver-dim">
            Owner gets portal access immediately. They sign in at the portal login link with this
            email (magic link).
          </p>
          {createError ? <p className="text-sm text-red-400/80">{createError}</p> : null}
          <Button type="submit" size="sm" disabled={creating}>
            {creating ? "Creating…" : "Create client & invite owner"}
          </Button>
        </form>
      ) : null}

      {clients.length === 0 && !error ? (
        <div className="dashboard-card p-12 text-center">
          <p className="text-silver-muted mb-4">No clients yet. Add client #1 to get started.</p>
          <Button type="button" onClick={() => setShowCreate(true)}>
            Add client
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {clients.map((client) => (
            <div key={client.id} className="dashboard-card p-5">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-4">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h2 className="text-[15px] font-medium text-foreground">{client.name}</h2>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded capitalize ${STATUS_STYLES[client.status]}`}
                    >
                      {client.status}
                    </span>
                  </div>
                  <p className="text-[12px] text-silver-dim">
                    <code className="text-forest-glow">{client.slug}</code>
                    {client.trade ? ` · ${client.trade}` : ""}
                    {client.market ? ` · ${client.market}` : ""}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Link
                    href={`/dashboard/crm?client=${encodeURIComponent(client.slug)}`}
                    className="inline-flex items-center justify-center gap-2 rounded-md font-medium tracking-wide transition-all duration-200 px-4 py-2 text-sm min-h-[40px] bg-black-surface text-foreground border border-silver/25 hover:border-silver/45 hover:bg-black-elevated"
                  >
                    View leads
                  </Link>
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    disabled={testLeadLoading === client.id}
                    onClick={() => handleTestLead(client.id)}
                  >
                    {testLeadLoading === client.id ? "Adding…" : "Add test lead"}
                  </Button>
                  <Link
                    href={`/dashboard/spend?client=${encodeURIComponent(client.slug)}`}
                    className="inline-flex items-center justify-center gap-2 rounded-md font-medium tracking-wide transition-all duration-200 px-4 py-2 text-sm min-h-[40px] bg-black-surface text-foreground border border-silver/25 hover:border-silver/45 hover:bg-black-elevated"
                  >
                    Log ad spend
                  </Link>
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => copyPortalLink(client.id)}
                  >
                    {copied === client.id ? "Copied!" : "Copy portal link"}
                  </Button>
                </div>
              </div>

              {testLeadMessage[client.id] ? (
                <p
                  className={`text-[12px] mb-4 ${
                    testLeadMessage[client.id].includes("added")
                      ? "text-forest-glow"
                      : "text-red-400/80"
                  }`}
                >
                  {testLeadMessage[client.id]}
                </p>
              ) : null}

              <div className="border-t border-silver/8 pt-4 mb-4">
                <ClientMetaForms clientId={client.id} clientSlug={client.slug} />
              </div>

              <div className="border-t border-silver/8 pt-4">
                <p className="text-[11px] uppercase tracking-wider text-silver-dim mb-3">
                  Portal owner
                </p>

                {client.users.length === 0 ? (
                  <p className="text-[13px] text-silver-muted mb-3">No owner invited yet.</p>
                ) : (
                  <ul className="space-y-2 mb-4">
                    {client.users.map((user) => (
                      <li
                        key={user.id}
                        className="flex flex-wrap items-center gap-2 text-[13px] text-silver-muted"
                      >
                        <span className="text-foreground">{user.email}</span>
                        <span className="text-[10px] uppercase tracking-wide text-silver-dim">
                          {user.role}
                        </span>
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded ${
                            user.linked
                              ? "text-forest-glow bg-forest-mid/15"
                              : "text-amber-300/90 bg-amber-400/10"
                          }`}
                        >
                          {user.linked ? "Signed in before" : "Pending first login"}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    className={`${inputClass} sm:max-w-xs`}
                    placeholder="owner@company.com"
                    value={inviteEmail[client.id] ?? ""}
                    onChange={(e) =>
                      setInviteEmail((prev) => ({ ...prev, [client.id]: e.target.value }))
                    }
                  />
                  <Button
                    type="button"
                    size="sm"
                    disabled={invitingId === client.id}
                    onClick={() => handleInvite(client.id)}
                  >
                    {invitingId === client.id ? "Inviting…" : "Invite owner"}
                  </Button>
                </div>
                {inviteError[client.id] ? (
                  <p className="text-[12px] text-red-400/80 mt-2">{inviteError[client.id]}</p>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const inputClass =
  "w-full bg-black border border-silver/15 rounded-md px-3 py-2 text-[13px] text-foreground placeholder:text-silver-dim focus:outline-none focus:border-forest-mid/50 transition-colors";

function ClientMetaForms({ clientId, clientSlug }: { clientId: string; clientSlug: string }) {
  const [mappings, setMappings] = useState<
    { id: string; metaFormId: string; metaPageId: string | null; label: string | null }[]
  >([]);
  const [metaFormId, setMetaFormId] = useState("");
  const [metaPageId, setMetaPageId] = useState("");
  const [saving, setSaving] = useState(false);
  const [metaError, setMetaError] = useState("");
  const [loaded, setLoaded] = useState(false);

  const loadMappings = useCallback(async () => {
    try {
      const res = await fetch(`/api/clients/${clientId}/meta-forms`);
      const data = await res.json();
      if (res.ok) {
        setMappings(
          (data.mappings ?? []).map(
            (m: {
              id: string;
              metaFormId: string;
              metaPageId: string | null;
              label: string | null;
            }) => m
          )
        );
      }
    } finally {
      setLoaded(true);
    }
  }, [clientId]);

  useEffect(() => {
    void loadMappings();
  }, [loadMappings]);

  async function handleSaveMetaForm(e: React.FormEvent) {
    e.preventDefault();
    if (!metaFormId.trim()) return;
    setSaving(true);
    setMetaError("");

    try {
      const res = await fetch(`/api/clients/${clientId}/meta-forms`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          metaFormId: metaFormId.trim(),
          metaPageId: metaPageId.trim() || undefined,
          label: `${clientSlug} lead form`,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMetaError(data.error ?? "Failed to save Meta form mapping");
        return;
      }
      setMetaFormId("");
      setMetaPageId("");
      await loadMappings();
    } catch {
      setMetaError("Failed to save Meta form mapping");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <p className="text-[11px] uppercase tracking-wider text-silver-dim mb-3">
        Meta lead form
      </p>
      <p className="text-[12px] text-silver-muted mb-3">
        Map Meta instant form ID → <code className="text-forest-glow">{clientSlug}</code>. See{" "}
        <code className="text-forest-glow text-[11px]">docs/META_LEAD_SETUP.md</code>.
      </p>

      {loaded && mappings.length > 0 ? (
        <ul className="space-y-1.5 mb-4 text-[13px] text-silver-muted">
          {mappings.map((m) => (
            <li key={m.id}>
              Form <code className="text-forest-glow text-[11px]">{m.metaFormId}</code>
              {m.metaPageId ? (
                <span className="text-silver-dim"> · Page {m.metaPageId}</span>
              ) : null}
            </li>
          ))}
        </ul>
      ) : loaded ? (
        <p className="text-[13px] text-silver-muted mb-3">No Meta form mapped yet.</p>
      ) : null}

      <form onSubmit={handleSaveMetaForm} className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          className={`${inputClass} sm:max-w-[200px]`}
          placeholder="Meta form ID"
          value={metaFormId}
          onChange={(e) => setMetaFormId(e.target.value)}
        />
        <input
          type="text"
          className={`${inputClass} sm:max-w-[200px]`}
          placeholder="Page ID (optional)"
          value={metaPageId}
          onChange={(e) => setMetaPageId(e.target.value)}
        />
        <Button type="submit" size="sm" disabled={saving}>
          {saving ? "Saving…" : "Save mapping"}
        </Button>
      </form>
      {metaError ? <p className="text-[12px] text-red-400/80 mt-2">{metaError}</p> : null}
      <p className="mt-2">
        <Link
          href="/dashboard/dev/meta-lead"
          className="text-[12px] text-forest-glow hover:underline"
        >
          Simulate Meta lead →
        </Link>
      </p>
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
