/** Inline Lupin mark paths for OG images, favicons, and other non-Image contexts. */
export function LupinMarkSvg({
  size = 48,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id="lupin-petal" x1="18" y1="6" x2="18" y2="34" gradientUnits="userSpaceOnUse">
          <stop stopColor="#A78BFA" />
          <stop offset="1" stopColor="#6B4EFF" />
        </linearGradient>
        <linearGradient id="lupin-growth" x1="8" y1="40" x2="44" y2="14" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1A5C3E" />
          <stop offset="1" stopColor="#2F8F5F" />
        </linearGradient>
      </defs>
      <path d="M7 40H27V34H13V8H7V40Z" fill="url(#lupin-growth)" />
      <path d="M27 34L41 20" stroke="#2F8F5F" strokeWidth="3.25" strokeLinecap="round" />
      <path
        d="M35 20H41V26"
        stroke="#2F8F5F"
        strokeWidth="3.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M15.5 31L19 27.5L22.5 31L19 34.5L15.5 31Z" fill="url(#lupin-petal)" fillOpacity="0.88" />
      <path d="M15.5 25.5L19 22L22.5 25.5L19 29L15.5 25.5Z" fill="url(#lupin-petal)" fillOpacity="0.92" />
      <path d="M15.5 20L19 16.5L22.5 20L19 23.5L15.5 20Z" fill="url(#lupin-petal)" />
      <path d="M15.5 14.5L19 11L22.5 14.5L19 18L15.5 14.5Z" fill="url(#lupin-petal)" fillOpacity="0.9" />
      <path d="M15.5 9L19 5.5L22.5 9L19 12.5L15.5 9Z" fill="url(#lupin-petal)" fillOpacity="0.78" />
    </svg>
  );
}
