import { NextResponse } from "next/server";
import { apiAuthError } from "@/lib/auth";
import { getAgencyUser, getClientUser, getCurrentUser } from "@/lib/auth/session";
import {
  formatIsolationReport,
  runDataIsolationTests,
  runSessionIsolationTests,
} from "@/lib/testing/data-isolation";

/**
 * Session-aware isolation checks.
 * - Agency admin: runs full data suite (test #6 + all enforcement checks).
 * - Portal client: runs tests for the logged-in tenant only.
 */
export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Sign in required" }, { status: 401 });
    }

    const agency = await getAgencyUser();
    if (agency) {
      const report = await runDataIsolationTests();
      return NextResponse.json({
        report,
        text: formatIsolationReport(report),
        role: "agency",
      });
    }

    const client = await getClientUser();
    if (!client) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const report = await runSessionIsolationTests(client.clientSlug);
    return NextResponse.json({
      report,
      text: formatIsolationReport(report),
      role: "client",
      clientSlug: client.clientSlug,
    });
  } catch (error) {
    return apiAuthError(error);
  }
}
