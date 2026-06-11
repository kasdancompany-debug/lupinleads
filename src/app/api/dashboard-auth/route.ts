import { NextRequest, NextResponse } from "next/server";
import {
  createAuthToken,
  DASHBOARD_AUTH_COOKIE,
  getDashboardPassword,
  verifyPassword,
} from "@/lib/dashboard-auth";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export async function POST(request: NextRequest) {
  const password = getDashboardPassword();

  if (!password) {
    return NextResponse.json(
      { error: "Dashboard password is not configured" },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const input = typeof body.password === "string" ? body.password : "";

    if (!verifyPassword(input, password)) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    const token = await createAuthToken(password);
    const response = NextResponse.json({ success: true });

    response.cookies.set(DASHBOARD_AUTH_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: COOKIE_MAX_AGE,
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set(DASHBOARD_AUTH_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return response;
}
