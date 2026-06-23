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
          background: "#0a0a0a",
          borderRadius: 36,
        }}
      >
        <svg
          width="120"
          height="120"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M24 6C24 6 14 12 14 22C14 30 18 36 24 38C30 36 34 30 34 22C34 12 24 6 24 6Z"
            stroke="#52b788"
            strokeWidth="1.2"
            fill="none"
          />
          <circle cx="20.5" cy="19" r="1.5" fill="#52b788" />
          <circle cx="27.5" cy="19" r="1.5" fill="#52b788" />
          <path
            d="M22 24C22 24 23 23 24 23C25 23 26 24 26 24"
            stroke="#52b788"
            strokeWidth="0.8"
            strokeLinecap="round"
            opacity="0.6"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
