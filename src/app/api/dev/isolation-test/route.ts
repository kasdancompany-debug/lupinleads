import { NextRequest, NextResponse } from "next/server";
import { apiAuthError, requireAgencyApiAccess } from "@/lib/auth";
import {
  formatIsolationReport,
  runFullIsolationTests,
} from "@/lib/testing/data-isolation";

/** Agency-only automated isolation suite (no client login required). */
export async function GET(request: NextRequest) {
  try {
    await requireAgencyApiAccess(request);

    const report = await runFullIsolationTests();
    const text = formatIsolationReport(report);

    return NextResponse.json({ report, text });
  } catch (error) {
    return apiAuthError(error);
  }
}
