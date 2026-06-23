import { NextRequest, NextResponse } from "next/server";
import { apiAuthError, AuthRequiredError, requireAgencyApiAccess, resolveApiDataScope } from "@/lib/auth";
import { generateReportPdf } from "@/lib/reports/pdf/generate";
import type { ClientBranding } from "@/lib/reports/types";

export async function POST(request: NextRequest) {
  try {
    await requireAgencyApiAccess(request);

    const body = await request.json();
    const { clientId, reportMonth, branding } = body as {
      clientId?: string;
      reportMonth?: string;
      branding?: Partial<ClientBranding>;
    };

    const scope = await resolveApiDataScope(clientId);
    if (!scope.clientSlug) {
      return NextResponse.json({ error: "clientId is required" }, { status: 400 });
    }

    const pdf = await generateReportPdf(scope.clientSlug, reportMonth, branding);

    const month = reportMonth ?? "latest";
    const filename = `executive-report-${scope.clientSlug}-${month}.pdf`;

    return new NextResponse(new Uint8Array(pdf), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    if (error instanceof AuthRequiredError) {
      return apiAuthError(error);
    }
    console.error("PDF generation failed:", error);
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    await requireAgencyApiAccess(request);

    const { searchParams } = new URL(request.url);
    const scope = await resolveApiDataScope(searchParams.get("clientId"));
    const reportMonth = searchParams.get("month") ?? undefined;

    if (!scope.clientSlug) {
      return NextResponse.json({ error: "clientId is required" }, { status: 400 });
    }

    const pdf = await generateReportPdf(scope.clientSlug, reportMonth);
    const filename = `executive-report-${scope.clientSlug}.pdf`;

    return new NextResponse(new Uint8Array(pdf), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    return apiAuthError(error);
  }
}
