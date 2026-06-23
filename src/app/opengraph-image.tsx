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
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 40 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "linear-gradient(135deg, #2f8f5f, #1a5c3e)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 32px rgba(124, 92, 255, 0.25)",
            }}
          >
            <div
              style={{
                width: 18,
                height: 18,
                borderRadius: 999,
                background: "linear-gradient(135deg, #a78bfa, #6b4eff)",
              }}
            />
          </div>
          <div style={{ display: "flex", fontSize: 28, fontWeight: 700 }}>
            <span style={{ color: "#2f8f5f" }}>Lupin </span>
            <span style={{ color: "#f6f5f1" }}>Leads</span>
          </div>
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            maxWidth: 900,
            marginBottom: 20,
          }}
        >
          {SITE.headlineLead}
        </div>
        <div
          style={{
            fontSize: 40,
            fontWeight: 700,
            lineHeight: 1.15,
            background: "linear-gradient(90deg, #8fb5a0, #a78bfa)",
            backgroundClip: "text",
            color: "transparent",
            marginBottom: 32,
          }}
        >
          {SITE.headlineHighlight}
        </div>
        <p
          style={{
            fontSize: 24,
            lineHeight: 1.45,
            color: "rgba(200, 200, 198, 0.88)",
            maxWidth: 820,
          }}
        >
          {SITE.heroOneLiner}
        </p>
      </div>
    ),
    { ...size }
  );
}
