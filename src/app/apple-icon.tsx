import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0c0b",
          borderRadius: 40,
        }}
      >
        <svg width="120" height="120" viewBox="0 0 48 48" fill="none">
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
      </div>
    ),
    { ...size }
  );
}
