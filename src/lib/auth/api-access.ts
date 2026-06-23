import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { AuthRequiredError } from "@/lib/auth/errors";
import { hasLegacyDashboardAuth } from "@/lib/auth/legacy";
import {
  getAgencyUser,
  getClientUser,
  getCurrentUser,
} from "@/lib/auth/session";
import type { AgencyUser, ClientContext } from "@/lib/auth/types";
import { getCrmLeadCampaign } from "@/lib/crm/db";
import { resolveDataScope, type ResolvedDataScope } from "@/lib/data/scope";

export type AgencyApiAccess = {
  kind: "agency";
  user: AgencyUser;
};

export type LegacyAgencyApiAccess = {
  kind: "legacy";
};

export type AgencyRouteAccess = AgencyApiAccess | LegacyAgencyApiAccess;

/** Map AuthRequiredError to a JSON response (401 / 403). */
export function apiAuthError(error: unknown): NextResponse {
  if (error instanceof AuthRequiredError) {
    return NextResponse.json({ error: error.message }, { status: error.status });
  }
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

/**
 * Agency dashboard API routes only.
 * - 401 when there is no session (and no dev legacy cookie)
 * - 403 when a portal client session hits an agency route
 */
export async function requireAgencyApiAccess(
  request: NextRequest
): Promise<AgencyRouteAccess> {
  const agency = await getAgencyUser();
  if (agency) {
    return { kind: "agency", user: agency };
  }

  if (await hasLegacyDashboardAuth(request)) {
    return { kind: "legacy" };
  }

  const sessionUser = await getCurrentUser();
  if (!sessionUser) {
    throw new AuthRequiredError("Unauthorized", 401);
  }

  const client = await getClientUser();
  if (client) {
    throw new AuthRequiredError("Forbidden", 403);
  }

  throw new AuthRequiredError("Forbidden", 403);
}

/**
 * Portal client API routes only.
 * - 401 when unauthenticated
 * - 403 when an agency admin (or non-client) hits a portal route
 */
export async function requireClientApiAccess(): Promise<ClientContext> {
  const sessionUser = await getCurrentUser();
  if (!sessionUser) {
    throw new AuthRequiredError("Unauthorized", 401);
  }

  const agency = await getAgencyUser();
  if (agency) {
    throw new AuthRequiredError("Forbidden", 403);
  }

  const client = await getClientUser();
  if (!client) {
    throw new AuthRequiredError("Forbidden", 403);
  }

  return client;
}

/**
 * Resolve query/body client slug for agency or lock to membership for clients.
 * Rejects cross-tenant slug params for portal users (403).
 */
export async function resolveApiDataScope(
  requestedSlug?: string | null
): Promise<ResolvedDataScope> {
  return resolveDataScope(requestedSlug);
}

/**
 * Verify crm_leads.campaign matches the caller's clientSlug.
 * Use for every portal lead mutation keyed by lead id.
 */
export async function assertLeadBelongsToClient(
  leadId: string,
  clientSlug: string
): Promise<void> {
  const campaign = await getCrmLeadCampaign(leadId);
  if (!campaign || campaign !== clientSlug) {
    throw new AuthRequiredError("Forbidden", 403);
  }
}