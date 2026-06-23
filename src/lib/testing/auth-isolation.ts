import { isAgencyAdminEmail } from "@/lib/auth/config";
import { evaluateRouteAccess } from "@/lib/auth/route-access";
import { resolveMiddlewareRoles } from "@/lib/auth/middleware-roles";
import type { IsolationTestReport, IsolationTestResult } from "@/lib/testing/data-isolation.types";

function pass(id: string, name: string, message: string, detail?: string): IsolationTestResult {
  return { id, name, pass: true, message, detail };
}

function fail(id: string, name: string, message: string, detail?: string): IsolationTestResult {
  return { id, name, pass: false, message, detail };
}

function expectRedirect(
  id: string,
  name: string,
  pathname: string,
  roles: { isAgency: boolean; isClient: boolean; hasUser: boolean },
  expectedTo: string
): IsolationTestResult {
  const decision = evaluateRouteAccess({ pathname, ...roles });
  if (decision.action === "redirect" && decision.to === expectedTo) {
    return pass(id, name, `Blocked with redirect to ${expectedTo}`);
  }
  return fail(
    id,
    name,
    `Expected redirect to ${expectedTo}`,
    `Got ${JSON.stringify(decision)} for ${pathname}`
  );
}

function expectDeny(
  id: string,
  name: string,
  pathname: string,
  roles: { isAgency: boolean; isClient: boolean; hasUser: boolean },
  expectedStatus: 401 | 403
): IsolationTestResult {
  const decision = evaluateRouteAccess({ pathname, ...roles });
  if (decision.action === "deny" && decision.status === expectedStatus) {
    return pass(id, name, `Blocked with HTTP ${expectedStatus}`);
  }
  return fail(
    id,
    name,
    `Expected HTTP ${expectedStatus}`,
    `Got ${JSON.stringify(decision)} for ${pathname}`
  );
}

function expectAllow(
  id: string,
  name: string,
  pathname: string,
  roles: { isAgency: boolean; isClient: boolean; hasUser: boolean }
): IsolationTestResult {
  const decision = evaluateRouteAccess({ pathname, ...roles });
  if (decision.action === "allow") {
    return pass(id, name, "Access allowed");
  }
  return fail(
    id,
    name,
    "Expected access to be allowed",
    `Got ${JSON.stringify(decision)} for ${pathname}`
  );
}

/**
 * Route and role rules — no database required.
 */
export async function runAuthIsolationTests(): Promise<IsolationTestReport> {
  const results: IsolationTestResult[] = [];

  // Non-admin cannot access /dashboard
  results.push(
    expectRedirect(
      "non-admin-dashboard",
      "Non-admin cannot access /dashboard",
      "/dashboard",
      { isAgency: false, isClient: false, hasUser: false },
      "/login"
    )
  );

  results.push(
    expectRedirect(
      "signed-in-non-member-dashboard",
      "Signed-in user without invite cannot access /dashboard",
      "/dashboard",
      { isAgency: false, isClient: false, hasUser: true },
      "/login"
    )
  );

  results.push(
    expectDeny(
      "non-admin-agency-api",
      "Non-admin cannot call agency CRM API",
      "/api/crm/leads",
      { isAgency: false, isClient: false, hasUser: false },
      401
    )
  );

  // Portal client cannot access dashboard
  results.push(
    expectRedirect(
      "client-not-dashboard",
      "Portal client cannot access /dashboard",
      "/dashboard/clients",
      { isAgency: false, isClient: true, hasUser: true },
      "/portal"
    )
  );

  results.push(
    expectDeny(
      "client-not-agency-api",
      "Portal client cannot call agency API",
      "/api/clients",
      { isAgency: false, isClient: true, hasUser: true },
      403
    )
  );

  // Agency admin cannot accidentally use portal
  results.push(
    expectRedirect(
      "agency-not-portal",
      "Agency admin cannot access /portal (redirected to dashboard)",
      "/portal",
      { isAgency: true, isClient: false, hasUser: true },
      "/dashboard"
    )
  );

  results.push(
    expectDeny(
      "agency-not-portal-api",
      "Agency admin cannot call portal API",
      "/api/portal/leads",
      { isAgency: true, isClient: false, hasUser: true },
      403
    )
  );

  results.push(
    expectAllow(
      "agency-dashboard",
      "Agency admin can access /dashboard",
      "/dashboard",
      { isAgency: true, isClient: false, hasUser: true }
    )
  );

  // Uninvited email rejected at portal
  results.push(
    expectRedirect(
      "uninvited-portal",
      "Uninvited user is rejected from /portal",
      "/portal/pipeline",
      { isAgency: false, isClient: false, hasUser: true },
      "/portal/login"
    )
  );

  results.push(
    expectDeny(
      "uninvited-portal-api",
      "Uninvited user cannot call portal API",
      "/api/portal/leads",
      { isAgency: false, isClient: false, hasUser: true },
      401
    )
  );

  // Invited client can access portal only
  results.push(
    expectAllow(
      "invited-portal",
      "Invited portal client can access /portal",
      "/portal",
      { isAgency: false, isClient: true, hasUser: true }
    )
  );

  results.push(
    expectAllow(
      "invited-portal-api",
      "Invited portal client can call portal API",
      "/api/portal/leads",
      { isAgency: false, isClient: true, hasUser: true }
    )
  );

  // Agency admin is never treated as portal client
  const adminEmails = (process.env.AGENCY_ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);

  if (adminEmails.length > 0) {
    const adminEmail = adminEmails[0]!;
    const roles = await resolveMiddlewareRoles({
      id: "00000000-0000-0000-0000-000000000099",
      email: adminEmail,
      app_metadata: {},
      user_metadata: {},
      aud: "authenticated",
      created_at: new Date().toISOString(),
    } as import("@supabase/supabase-js").User);

    if (roles.isAgency && !roles.isClient) {
      results.push(
        pass(
          "agency-not-client-role",
          "Agency admin is not assigned a portal client role",
          `${adminEmail} resolves as agency-only`
        )
      );
    } else {
      results.push(
        fail(
          "agency-not-client-role",
          "Agency admin is not assigned a portal client role",
          `Expected isAgency=true, isClient=false`,
          `Got ${JSON.stringify(roles)} for ${adminEmail}`
        )
      );
    }

    if (isAgencyAdminEmail(adminEmail)) {
      results.push(
        pass(
          "agency-email-flag",
          "Agency admin email is recognized",
          `${adminEmail} is in AGENCY_ADMIN_EMAILS`
        )
      );
    } else {
      results.push(
        fail(
          "agency-email-flag",
          "Agency admin email is recognized",
          `${adminEmail} not recognized — check AGENCY_ADMIN_EMAILS`
        )
      );
    }
  } else {
    results.push(
      fail(
        "agency-email-config",
        "AGENCY_ADMIN_EMAILS is configured",
        "Set AGENCY_ADMIN_EMAILS in .env.local to test agency role resolution"
      )
    );
  }

  const passed = results.filter((r) => r.pass).length;
  const failed = results.filter((r) => !r.pass).length;

  return {
    ranAt: new Date().toISOString(),
    suite: "auth",
    clients: { a: "summit-renovations", b: "northline-plumbing" },
    prerequisites: { configured: true },
    results,
    passed,
    failed,
    allPassed: failed === 0,
    role: "unauthenticated",
  };
}
