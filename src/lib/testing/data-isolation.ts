import { runAuthIsolationTests } from "@/lib/testing/auth-isolation";
import { AuthRequiredError } from "@/lib/auth/errors";
import { assertLeadBelongsToClient } from "@/lib/auth/api-access";
import { fetchClientMembership } from "@/lib/auth/membership";
import { getCrmLeadById, updatePortalCrmLead, createCrmLead } from "@/lib/crm/db";
import { getCrmLeads } from "@/lib/data/crm-leads";
import { getReportData } from "@/lib/reports/data";
import { createAdminClient, isSupabaseConfigured } from "@/lib/supabase/admin";
import {
  ISOLATION_CLIENT_A,
  ISOLATION_CLIENT_B,
  type IsolationTestReport,
  type IsolationTestResult,
} from "@/lib/testing/data-isolation.types";

export {
  ISOLATION_CLIENT_A,
  ISOLATION_CLIENT_B,
  ISOLATION_CLIENT_A_NAME,
  ISOLATION_CLIENT_B_NAME,
} from "@/lib/testing/data-isolation.types";
export type { IsolationTestReport, IsolationTestResult } from "@/lib/testing/data-isolation.types";

type TestContext = {
  clientALeadIds: string[];
  clientBLeadIds: string[];
  clientATestLeadId: string | null;
  clientBTestLeadId: string | null;
  clientAId: string | null;
  clientBId: string | null;
};

const FIX_HINTS: Record<string, string> = {
  "client-a-leads": "Run migration 008_isolation_test_leads.sql and verify crm_leads.campaign = client slug.",
  "client-b-leads": "Run migration 008_isolation_test_leads.sql and verify crm_leads.campaign = client slug.",
  "client-a-read-b-lead": "Check assertLeadBelongsToClient and crm_leads.campaign column.",
  "client-a-update-b-lead": "Check updatePortalCrmLead filters by campaign slug.",
  "lead-query-client-scope": "getCrmLeads must filter with .eq('campaign', clientSlug).",
  "manual-test-lead-scope": "Test lead route must set campaign from clients.slug for the selected client.",
  "invited-client-tenant": "Each client_users.auth_user_id should map to exactly one client.",
  "uninvited-no-membership": "Users without client_users rows must not resolve as portal clients.",
  supabase: "Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local",
};

function pass(id: string, name: string, message: string, detail?: string): IsolationTestResult {
  return { id, name, pass: true, message, detail };
}

function fail(id: string, name: string, message: string, detail?: string): IsolationTestResult {
  return { id, name, pass: false, message, detail };
}

function summarize(
  suite: IsolationTestReport["suite"],
  results: IsolationTestResult[],
  prerequisites: IsolationTestReport["prerequisites"],
  extra?: Pick<IsolationTestReport, "role" | "clientSlug">
): IsolationTestReport {
  const passed = results.filter((r) => r.pass).length;
  const failed = results.filter((r) => !r.pass).length;

  return {
    ranAt: new Date().toISOString(),
    suite,
    clients: { a: ISOLATION_CLIENT_A, b: ISOLATION_CLIENT_B },
    prerequisites,
    results,
    passed,
    failed,
    allPassed: failed === 0,
    ...extra,
  };
}

async function loadTestContext(): Promise<TestContext> {
  const clientALeadIds = (await getCrmLeads({ clientSlug: ISOLATION_CLIENT_A })).map((l) => l.id);
  const clientBLeadIds = (await getCrmLeads({ clientSlug: ISOLATION_CLIENT_B })).map((l) => l.id);

  const clientATestLeadId = await findLeadIdByEmail("isolation-test@summit-renovations.local");
  const clientBTestLeadId = await findLeadIdByEmail("isolation-test@northline-plumbing.local");
  const clientAId = await findClientIdBySlug(ISOLATION_CLIENT_A);
  const clientBId = await findClientIdBySlug(ISOLATION_CLIENT_B);

  return {
    clientALeadIds,
    clientBLeadIds,
    clientATestLeadId,
    clientBTestLeadId,
    clientAId,
    clientBId,
  };
}

async function findClientIdBySlug(slug: string): Promise<string | null> {
  if (!isSupabaseConfigured()) return null;

  const admin = createAdminClient();
  if (!admin) return null;

  const { data } = await admin.from("clients").select("id").eq("slug", slug).maybeSingle();
  return data?.id ?? null;
}

async function findLeadIdByEmail(email: string): Promise<string | null> {
  if (!isSupabaseConfigured()) return null;

  const admin = createAdminClient();
  if (!admin) return null;

  const { data } = await admin
    .from("crm_leads")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  return data?.id ?? null;
}

async function verifyLeadCampaigns(leadIds: string[], expectedCampaign: string): Promise<string | null> {
  if (!isSupabaseConfigured()) return "Supabase not configured";

  const admin = createAdminClient();
  if (!admin) return "Supabase not configured";

  if (leadIds.length === 0) return null;

  const { data, error } = await admin
    .from("crm_leads")
    .select("id, campaign")
    .in("id", leadIds);

  if (error) return error.message;

  const wrong = (data ?? []).filter((row) => row.campaign !== expectedCampaign);
  if (wrong.length > 0) {
    return `${wrong.length} lead(s) have campaign other than ${expectedCampaign}`;
  }

  return null;
}

function setsOverlap(a: string[], b: string[]): string[] {
  const setB = new Set(b);
  return a.filter((id) => setB.has(id));
}

/** Mirrors resolveDataScope for portal clients (no session required). */
export function evaluatePortalSlugAccess(
  memberSlug: string,
  requestedSlug?: string | null
): "allowed" | "forbidden" {
  const slug = requestedSlug?.trim();
  if (slug && slug !== memberSlug) {
    return "forbidden";
  }
  return "allowed";
}

async function testClientLeadsScoped(
  id: string,
  label: string,
  clientSlug: string,
  leadIds: string[],
  otherLeadIds: string[]
): Promise<IsolationTestResult> {
  if (leadIds.length === 0) {
    return fail(
      id,
      label,
      `No leads found for ${clientSlug}`,
      "Run migration 008_isolation_test_leads.sql or add leads with campaign set."
    );
  }

  const campaignError = await verifyLeadCampaigns(leadIds, clientSlug);
  if (campaignError) {
    return fail(id, label, "Lead query returned wrong campaign tags", campaignError);
  }

  const overlap = setsOverlap(leadIds, otherLeadIds);
  if (overlap.length > 0) {
    return fail(
      id,
      label,
      `Found ${overlap.length} lead ID(s) shared with the other client`,
      overlap.join(", ")
    );
  }

  return pass(
    id,
    label,
    `${leadIds.length} lead(s) scoped to ${clientSlug} only`
  );
}

async function testCannotAccessOtherLead(
  id: string,
  label: string,
  actorSlug: string,
  otherLeadId: string | null
): Promise<IsolationTestResult> {
  if (!otherLeadId) {
    return fail(id, label, "Missing isolation test lead for the other client", "Run migration 008");
  }

  try {
    await assertLeadBelongsToClient(otherLeadId, actorSlug);
    return fail(
      id,
      label,
      `${actorSlug} was allowed to access the other client's lead`,
      `Lead ${otherLeadId}`
    );
  } catch (error) {
    if (error instanceof AuthRequiredError && error.status === 403) {
      return pass(id, label, "Direct lead access blocked (403 Forbidden)");
    }
    const message = error instanceof Error ? error.message : "Unexpected error";
    return fail(id, label, "Expected 403 Forbidden", message);
  }
}

async function testCannotUpdateOtherLead(
  id: string,
  label: string,
  actorSlug: string,
  otherLeadId: string | null
): Promise<IsolationTestResult> {
  if (!otherLeadId) {
    return fail(id, label, "Missing isolation test lead for the other client", "Run migration 008");
  }

  const existing = await getCrmLeadById(otherLeadId);
  if (!existing) {
    return fail(id, label, "Other client's test lead not found in database");
  }

  const updated = await updatePortalCrmLead(otherLeadId, actorSlug, {
    notes: existing.notes,
    stage: existing.stage,
  });

  if (updated) {
    return fail(
      id,
      label,
      `${actorSlug} was able to update the other client's lead`,
      `Lead ${otherLeadId}`
    );
  }

  return pass(id, label, "Cross-tenant lead stage update blocked");
}

async function testCannotViewOtherReport(
  id: string,
  label: string,
  actorSlug: string,
  otherSlug: string
): Promise<IsolationTestResult> {
  if (evaluatePortalSlugAccess(actorSlug, otherSlug) !== "forbidden") {
    return fail(id, label, "Scope check did not block cross-tenant report slug");
  }

  const ownReport = await getReportData({ clientSlug: actorSlug });
  const otherReport = await getReportData({ clientSlug: otherSlug });

  if (!ownReport.report) {
    return fail(id, label, `No report data for ${actorSlug}`);
  }

  if (!otherReport.report) {
    return fail(id, label, `No report data for ${otherSlug} (prerequisite)`);
  }

  if (ownReport.report.clientName === otherReport.report.clientName) {
    return fail(id, label, "Reports for both clients share the same client name");
  }

  const ownLeads = await getCrmLeads({ clientSlug: actorSlug });
  const overlap = setsOverlap(
    ownLeads.map((l) => l.id),
    (await getCrmLeads({ clientSlug: otherSlug })).map((l) => l.id)
  );

  if (overlap.length > 0) {
    return fail(id, label, "Report data sources share lead IDs across clients");
  }

  return pass(
    id,
    label,
    `Portal scope blocks ${otherSlug} report for ${actorSlug} session`
  );
}

async function testAgencySeesBoth(ctx: TestContext): Promise<IsolationTestResult> {
  const allLeads = await getCrmLeads();
  const campaigns = new Set<string>();

  if (!isSupabaseConfigured()) {
    return fail("agency-sees-both", "Agency admin can see both clients", "Supabase not configured");
  }

  const admin = createAdminClient();
  if (!admin) {
    return fail("agency-sees-both", "Agency admin can see both clients", "Supabase not configured");
  }

  if (allLeads.length === 0) {
    return fail("agency-sees-both", "Agency admin can see both clients", "No leads in database");
  }

  const { data } = await admin
    .from("crm_leads")
    .select("campaign")
    .in("id", allLeads.map((l) => l.id));

  for (const row of data ?? []) {
    if (row.campaign) campaigns.add(row.campaign);
  }

  const hasA = campaigns.has(ISOLATION_CLIENT_A) || ctx.clientALeadIds.length > 0;
  const hasB = campaigns.has(ISOLATION_CLIENT_B) || ctx.clientBLeadIds.length > 0;

  if (!hasA || !hasB) {
    return fail(
      "agency-sees-both",
      "Agency admin can see both clients",
      `Expected both campaigns; saw: ${[...campaigns].join(", ") || "(none)"}`
    );
  }

  const clients = (await getReportData()).clients;
  const slugs = new Set(clients.map((c) => c.id));
  if (!slugs.has(ISOLATION_CLIENT_A) || !slugs.has(ISOLATION_CLIENT_B)) {
    return fail(
      "agency-sees-both",
      "Agency admin can see both clients",
      "Client picker missing one or both test clients"
    );
  }

  return pass(
    "agency-sees-both",
    "Agency admin can see both clients",
    `Unscoped query spans ${campaigns.size} campaign(s); both test clients listed`
  );
}

async function testLeadQueryScopedByClient(ctx: TestContext): Promise<IsolationTestResult> {
  if (!ctx.clientAId || !ctx.clientBId) {
    return fail(
      "lead-query-client-scope",
      "Lead queries are scoped by client (campaign slug)",
      "Missing test clients in database",
      "Run migration 006_client_portal.sql"
    );
  }

  const admin = createAdminClient();
  if (!admin) {
    return fail("lead-query-client-scope", "Lead queries are scoped by client (campaign slug)", "Supabase not configured");
  }

  const scopedA = await getCrmLeads({ clientSlug: ISOLATION_CLIENT_A });
  const scopedB = await getCrmLeads({ clientSlug: ISOLATION_CLIENT_B });

  const { data: clientARows } = await admin
    .from("crm_leads")
    .select("id, campaign")
    .eq("campaign", ISOLATION_CLIENT_A);

  const { data: clientBRows } = await admin
    .from("crm_leads")
    .select("id, campaign")
    .eq("campaign", ISOLATION_CLIENT_B);

  const aIds = new Set((clientARows ?? []).map((r) => r.id));
  const bIds = new Set((clientBRows ?? []).map((r) => r.id));
  const overlap = scopedA.filter((l) => bIds.has(l.id));

  if (overlap.length > 0) {
    return fail(
      "lead-query-client-scope",
      "Lead queries are scoped by client (campaign slug)",
      "Client A query returned leads belonging to Client B",
      overlap.map((l) => l.id).join(", ")
    );
  }

  if (scopedA.length !== aIds.size || scopedB.length !== bIds.size) {
    return fail(
      "lead-query-client-scope",
      "Lead queries are scoped by client (campaign slug)",
      "getCrmLeads count does not match direct campaign filter"
    );
  }

  const { data: clientA } = await admin
    .from("clients")
    .select("id, slug")
    .eq("id", ctx.clientAId)
    .maybeSingle();

  if (!clientA || clientA.slug !== ISOLATION_CLIENT_A) {
    return fail(
      "lead-query-client-scope",
      "Lead queries are scoped by client (campaign slug)",
      "clients.slug does not align with lead campaign filter"
    );
  }

  return pass(
    "lead-query-client-scope",
    "Lead queries are scoped by client (campaign slug)",
    `Client A (${scopedA.length} leads) and Client B (${scopedB.length} leads) are isolated via campaign`
  );
}

async function testManualTestLeadScoped(ctx: TestContext): Promise<IsolationTestResult> {
  if (!ctx.clientAId) {
    return fail(
      "manual-test-lead-scope",
      "Manual test lead goes only to selected client",
      "Client A not found",
      "Run migration 006_client_portal.sql"
    );
  }

  const admin = createAdminClient();
  if (!admin) {
    return fail("manual-test-lead-scope", "Manual test lead goes only to selected client", "Supabase not configured");
  }

  const { data: client } = await admin
    .from("clients")
    .select("id, slug, trade")
    .eq("id", ctx.clientAId)
    .maybeSingle();

  if (!client) {
    return fail("manual-test-lead-scope", "Manual test lead goes only to selected client", "Client A not found");
  }

  const markerEmail = `isolation-manual-test-${Date.now()}@lupin.local`;

  const lead = await createCrmLead({
    name: "[Isolation] Manual test lead",
    phone: "(555) 000-0099",
    email: markerEmail,
    serviceRequested: "Isolation test",
    estimatedValue: 0,
    notes: "Temporary — created by test:isolation",
    source: "Test",
    status: "new_lead",
    stage: "new_lead",
    campaign: client.slug,
  });

  if (!lead) {
    return fail(
      "manual-test-lead-scope",
      "Manual test lead goes only to selected client",
      "Failed to create temporary test lead"
    );
  }

  try {
    const inA = (await getCrmLeads({ clientSlug: ISOLATION_CLIENT_A })).some((l) => l.id === lead.id);
    const inB = (await getCrmLeads({ clientSlug: ISOLATION_CLIENT_B })).some((l) => l.id === lead.id);

    if (!inA || inB) {
      return fail(
        "manual-test-lead-scope",
        "Manual test lead goes only to selected client",
        inB ? "Test lead appeared under Client B" : "Test lead missing from Client A",
        `Lead ${lead.id} campaign should be ${client.slug}`
      );
    }

    return pass(
      "manual-test-lead-scope",
      "Manual test lead goes only to selected client",
      `Lead ${lead.id} scoped to ${client.slug} only`
    );
  } finally {
    await admin.from("crm_leads").delete().eq("id", lead.id);
  }
}

async function testInvitedClientMembership(): Promise<IsolationTestResult> {
  const admin = createAdminClient();
  if (!admin) {
    return fail("invited-client-tenant", "Invited client maps to one portal tenant", "Supabase not configured");
  }

  const { data: rows, error } = await admin
    .from("client_users")
    .select(
      `
      auth_user_id,
      email,
      clients ( slug )
    `
    )
    .not("auth_user_id", "is", null);

  if (error) {
    return fail("invited-client-tenant", "Invited client maps to one portal tenant", error.message);
  }

  if (!rows?.length) {
    return pass(
      "invited-client-tenant",
      "Invited client maps to one portal tenant",
      "No linked portal users yet (invite owners to verify in production)"
    );
  }

  const byAuthUser = new Map<string, Set<string>>();

  for (const row of rows) {
    const authUserId = row.auth_user_id as string | null;
    if (!authUserId) continue;

    const clients = row.clients as { slug: string } | { slug: string }[] | null;
    const slug = Array.isArray(clients) ? clients[0]?.slug : clients?.slug;
    if (!slug) continue;

    const slugs = byAuthUser.get(authUserId) ?? new Set<string>();
    slugs.add(slug);
    byAuthUser.set(authUserId, slugs);
  }

  const multiTenant = [...byAuthUser.entries()].filter(([, slugs]) => slugs.size > 1);
  if (multiTenant.length > 0) {
    return fail(
      "invited-client-tenant",
      "Invited client maps to one portal tenant",
      `${multiTenant.length} auth user(s) linked to multiple clients`,
      multiTenant.map(([id, slugs]) => `${id} → ${[...slugs].join(", ")}`).join("; ")
    );
  }

  return pass(
    "invited-client-tenant",
    "Invited client maps to one portal tenant",
    `${byAuthUser.size} linked portal user(s), each tied to a single client slug`
  );
}

async function testUninvitedNoMembership(): Promise<IsolationTestResult> {
  const fakeAuthUserId = "00000000-0000-0000-0000-000000000001";
  const membership = await fetchClientMembership(fakeAuthUserId);

  if (membership !== null) {
    return fail(
      "uninvited-no-membership",
      "Uninvited user has no portal membership",
      "Random auth user unexpectedly resolved to a client",
      JSON.stringify(membership)
    );
  }

  return pass(
    "uninvited-no-membership",
    "Uninvited user has no portal membership",
    "fetchClientMembership returns null for unknown auth user"
  );
}

/**
 * Full data-layer isolation suite (no browser session required).
 * Run as agency admin or via CLI with service role.
 */
export async function runDataIsolationTests(): Promise<IsolationTestReport> {
  const configured = isSupabaseConfigured();
  const ctx = configured ? await loadTestContext() : {
    clientALeadIds: [],
    clientBLeadIds: [],
    clientATestLeadId: null,
    clientBTestLeadId: null,
    clientAId: null,
    clientBId: null,
  };

  const prerequisites: IsolationTestReport["prerequisites"] = {
    configured,
    clientALeadCount: ctx.clientALeadIds.length,
    clientBLeadCount: ctx.clientBLeadIds.length,
    clientATestLeadId: ctx.clientATestLeadId,
    clientBTestLeadId: ctx.clientBTestLeadId,
    clientAId: ctx.clientAId,
    clientBId: ctx.clientBId,
  };

  if (!configured) {
    return summarize("data", [
      fail("supabase", "Supabase configured", "NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY required"),
    ], prerequisites, { role: "agency" });
  }

  const results = await Promise.all([
    testClientLeadsScoped(
      "client-a-leads",
      "Client A sees only Client A leads",
      ISOLATION_CLIENT_A,
      ctx.clientALeadIds,
      ctx.clientBLeadIds
    ),
    testClientLeadsScoped(
      "client-b-leads",
      "Client B sees only Client B leads",
      ISOLATION_CLIENT_B,
      ctx.clientBLeadIds,
      ctx.clientALeadIds
    ),
    testCannotAccessOtherLead(
      "client-a-read-b-lead",
      "Client A cannot access Client B lead via API",
      ISOLATION_CLIENT_A,
      ctx.clientBTestLeadId
    ),
    testCannotUpdateOtherLead(
      "client-a-update-b-lead",
      "Client A cannot update Client B lead stage",
      ISOLATION_CLIENT_A,
      ctx.clientBTestLeadId
    ),
    testCannotViewOtherReport(
      "client-a-report-b",
      "Client A cannot view Client B report",
      ISOLATION_CLIENT_A,
      ISOLATION_CLIENT_B
    ),
    testAgencySeesBoth(ctx),
    testLeadQueryScopedByClient(ctx),
    testManualTestLeadScoped(ctx),
    testInvitedClientMembership(),
    testUninvitedNoMembership(),
  ]);

  return summarize("data", results, prerequisites, { role: "agency" });
}

/**
 * Session-scoped checks for the currently logged-in portal client.
 */
export async function runSessionIsolationTests(
  clientSlug: string
): Promise<IsolationTestReport> {
  const configured = isSupabaseConfigured();
  const ctx = configured ? await loadTestContext() : {
    clientALeadIds: [],
    clientBLeadIds: [],
    clientATestLeadId: null,
    clientBTestLeadId: null,
    clientAId: null,
    clientBId: null,
  };

  const prerequisites: IsolationTestReport["prerequisites"] = {
    configured,
    clientALeadCount: ctx.clientALeadIds.length,
    clientBLeadCount: ctx.clientBLeadIds.length,
    clientATestLeadId: ctx.clientATestLeadId,
    clientBTestLeadId: ctx.clientBTestLeadId,
    clientAId: ctx.clientAId,
    clientBId: ctx.clientBId,
  };

  const isA = clientSlug === ISOLATION_CLIENT_A;
  const isB = clientSlug === ISOLATION_CLIENT_B;
  const otherSlug = isA ? ISOLATION_CLIENT_B : ISOLATION_CLIENT_A;
  const otherTestLeadId = isA ? ctx.clientBTestLeadId : ctx.clientATestLeadId;
  const ownLeadIds = isA ? ctx.clientALeadIds : isB ? ctx.clientBLeadIds : await getCrmLeads({ clientSlug }).then((l) => l.map((x) => x.id));
  const otherLeadIds = isA ? ctx.clientBLeadIds : isB ? ctx.clientALeadIds : [];

  const results: IsolationTestResult[] = [];

  if (!isA && !isB) {
    results.push(
      fail(
        "session-client",
        "Session is a known test client",
        `Logged in as ${clientSlug}; expected ${ISOLATION_CLIENT_A} or ${ISOLATION_CLIENT_B}`
      )
    );
  } else {
    results.push(
      await testClientLeadsScoped(
        "session-own-leads",
        `Logged-in client (${clientSlug}) sees only own leads`,
        clientSlug,
        ownLeadIds,
        otherLeadIds
      ),
      await testCannotAccessOtherLead(
        "session-read-other-lead",
        "Cannot access other client lead via API",
        clientSlug,
        otherTestLeadId
      ),
      await testCannotUpdateOtherLead(
        "session-update-other-lead",
        "Cannot update other client lead stage",
        clientSlug,
        otherTestLeadId
      ),
      await testCannotViewOtherReport(
        "session-other-report",
        "Cannot view other client report",
        clientSlug,
        otherSlug
      )
    );
  }

  return summarize("session", results, prerequisites, {
    role: "client",
    clientSlug,
  });
}

export function formatIsolationReport(report: IsolationTestReport): string {
  const useColor = Boolean(process.stdout.isTTY);
  const green = useColor ? "\x1b[32m" : "";
  const red = useColor ? "\x1b[31m" : "";
  const dim = useColor ? "\x1b[2m" : "";
  const reset = useColor ? "\x1b[0m" : "";

  const failures = report.results.filter((r) => !r.pass);
  const passes = report.results.filter((r) => r.pass);

  const lines: string[] = [
    "",
    "═".repeat(64),
    `  AGENCY / CLIENT ISOLATION — ${report.suite.toUpperCase()}`,
    "═".repeat(64),
    `  Ran at:    ${report.ranAt}`,
    `  Client A:  ${report.clients.a}`,
    `  Client B:  ${report.clients.b}`,
  ];

  if (report.role) lines.push(`  Role:      ${report.role}`);
  if (report.clientSlug) lines.push(`  Session:   ${report.clientSlug}`);

  if (report.prerequisites.configured !== undefined) {
    lines.push(
      "",
      "  Prerequisites:",
      `    Supabase:     ${report.prerequisites.configured ? "yes" : "NO — set env vars"}`,
    );
    if (report.prerequisites.clientALeadCount !== undefined) {
      lines.push(`    A lead count: ${report.prerequisites.clientALeadCount}`);
      lines.push(`    B lead count: ${report.prerequisites.clientBLeadCount}`);
      lines.push(`    A test lead:  ${report.prerequisites.clientATestLeadId ?? "missing"}`);
      lines.push(`    B test lead:  ${report.prerequisites.clientBTestLeadId ?? "missing"}`);
    }
    if (report.prerequisites.message) {
      lines.push(`    Note:         ${report.prerequisites.message}`);
    }
  }

  if (failures.length > 0) {
    lines.push("", "─".repeat(64), `  ${red}FAILURES (${failures.length})${reset}`, "");
    for (const result of failures) {
      lines.push(`  ${red}✗ FAIL${reset}  ${result.name}`);
      lines.push(`         ${result.message}`);
      if (result.detail) {
        lines.push(`         ${dim}detail: ${result.detail}${reset}`);
      }
      const hint = FIX_HINTS[result.id];
      if (hint) {
        lines.push(`         ${dim}fix:   ${hint}${reset}`);
      }
      lines.push("");
    }
  }

  if (passes.length > 0) {
    lines.push("─".repeat(64), `  ${green}PASSED (${passes.length})${reset}`, "");
    for (const result of passes) {
      lines.push(`  ${green}✓ PASS${reset}  ${result.name}`);
      lines.push(`         ${result.message}`);
      lines.push("");
    }
  }

  lines.push(
    "─".repeat(64),
    `  ${report.passed} passed, ${report.failed} failed`,
    report.allPassed
      ? `  ${green}✓ ALL ISOLATION TESTS PASSED${reset}`
      : `  ${red}✗ ISOLATION TESTS FAILED — fix failures above before onboarding clients${reset}`,
    "═".repeat(64),
    ""
  );

  return lines.join("\n");
}

/** Run auth + data isolation suites (CLI entry point). */
export async function runFullIsolationTests(): Promise<IsolationTestReport> {
  const authReport = await runAuthIsolationTests();
  const dataReport = await runDataIsolationTests();

  const results = [...authReport.results, ...dataReport.results];
  const passed = results.filter((r) => r.pass).length;
  const failed = results.filter((r) => !r.pass).length;

  return {
    ranAt: new Date().toISOString(),
    suite: "full",
    role: "agency",
    clients: dataReport.clients,
    prerequisites: {
      ...dataReport.prerequisites,
      message: "Auth suite needs no DB; data suite needs migrations 006 + 008.",
    },
    results,
    passed,
    failed,
    allPassed: failed === 0,
  };
}
