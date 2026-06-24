import { ImageResponse } from "next/og";
import { SITE } from "@/lib/constants";

export const runtime = "edge";
export const alt = `${SITE.name} — Contractor lead generation from Facebook and Instagram ads`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px 80px",
          background: "linear-gradient(145deg, #0a0c0b 0%, #0f1814 45%, #12101a 100%)",
          color: "#f6f5f1",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 44 }}>
          <svg width="64" height="64" viewBox="0 0 48 48" fill="none">
            <defs>
              <linearGradient id="p" x1="18" y1="6" x2="18" y2="34" gradientUnits="userSpaceOnUse">
                <stop stopColor="#A78BFA" />
                <stop offset="1" stopColor="#6B4EFF" />
              </linearGradient>
              <linearGradient id="g" x1="8" y1="40" x2="44" y2="14" gradientUnits="userSpaceOnUse">
                <stop stopColor="#1A5C3E" />
                <stop offset="1" stopColor="#2F8F5F" />
              </linearGradient>
            </defs>
            <rect width="48" height="48" rx="10" fill="#0a0c0b" />
            <path d="M7 40H27V34H13V8H7V40Z" fill="url(#g)" />
            <path d="M27 34L41 20" stroke="#2F8F5F" strokeWidth="3.25" strokeLinecap="round" />
            <path
              d="M35 20H41V26"
              stroke="#2F8F5F"
              strokeWidth="3.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M15.5 31L19 27.5L22.5 31L19 34.5L15.5 31Z" fill="url(#p)" fillOpacity="0.88" />
            <path d="M15.5 25.5L19 22L22.5 25.5L19 29L15.5 25.5Z" fill="url(#p)" fillOpacity="0.92" />
            <path d="M15.5 20L19 16.5L22.5 20L19 23.5L15.5 20Z" fill="url(#p)" />
            <path d="M15.5 14.5L19 11L22.5 14.5L19 18L15.5 14.5Z" fill="url(#p)" fillOpacity="0.9" />
            <path d="M15.5 9L19 5.5L22.5 9L19 12.5L15.5 9Z" fill="url(#p)" fillOpacity="0.78" />
          </svg>
          <div style={{ display: "flex", fontSize: 30, fontWeight: 700, letterSpacing: "0.06em" }}>
            <span style={{ color: "#2f8f5f" }}>LUPIN </span>
            <span style={{ color: "#f6f5f1" }}>LEADS</span>
          </div>
        </div>
        <div
          style={{
            fontSize: 58,
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
            maxWidth: 900,
            marginBottom: 8,
          }}
        >
          {SITE.headlineLead}
        </div>
        <div
          style={{
            fontSize: 58,
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
            color: "#a78bfa",
            marginBottom: 28,
          }}
        >
          {SITE.headlineHighlight}
        </div>
        <p
          style={{
            fontSize: 22,
            lineHeight: 1.45,
            color: "rgba(200, 200, 198, 0.88)",
            maxWidth: 820,
            fontFamily: "system-ui, sans-serif",
          }}
        >
          {SITE.heroOneLiner}
        </p>
      </div>
    ),
    { ...size }
  );
}
