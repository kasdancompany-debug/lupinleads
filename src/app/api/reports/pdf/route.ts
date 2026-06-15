import { NextRequest, NextResponse } from "next/server";
import { generateReportPdf } from "@/lib/reports/pdf/generate";
import type { ClientBranding } from "@/lib/reports/types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { clientId, reportMonth, branding } = body as {
      clientId: string;
      reportMonth?: string;
      branding?: Partial<ClientBranding>;
    };

    if (!clientId) {
      return NextResponse.json({ error: "clientId is required" }, { status: 400 });
    }

    const pdf = await generateReportPdf(clientId, reportMonth, branding);

    const month = reportMonth ?? "latest";
    const filename = `executive-report-${clientId}-${month}.pdf`;

    return new NextResponse(new Uint8Array(pdf), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error("PDF generation failed:", error);
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const clientId = searchParams.get("clientId");
  const reportMonth = searchParams.get("month") ?? undefined;

  if (!clientId) {
    return NextResponse.json({ error: "clientId is required" }, { status: 400 });
  }

  try {
    const pdf = await generateReportPdf(clientId, reportMonth);
    const filename = `executive-report-${clientId}.pdf`;

    return new NextResponse(new Uint8Array(pdf), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error("PDF generation failed:", error);
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 });
  }
}
