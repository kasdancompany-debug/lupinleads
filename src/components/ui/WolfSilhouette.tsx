interface WolfSilhouetteProps {
  className?: string;
}

export function WolfSilhouette({ className = "" }: WolfSilhouetteProps) {
  return (
    <svg
      viewBox="0 0 400 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="wolf-fade" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2d6a4f" stopOpacity="0.15" />
          <stop offset="50%" stopColor="#1b4332" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#0a0a0a" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0 180C40 160 80 170 120 150C160 130 180 100 220 90C260 80 300 100 340 85C360 78 380 70 400 65V200H0V180Z"
        fill="url(#wolf-fade)"
      />
      <path
        d="M280 60C290 45 310 35 330 40C350 45 360 60 355 75C350 90 330 95 315 88C300 81 275 75 280 60Z"
        stroke="#2d6a4f"
        strokeWidth="0.5"
        fill="none"
        opacity="0.2"
      />
      <path
        d="M300 55L310 42L320 50L315 58L300 55Z"
        stroke="#40916c"
        strokeWidth="0.4"
        fill="none"
        opacity="0.15"
      />
      <path
        d="M50 140C70 125 90 130 110 115C130 100 140 80 160 75"
        stroke="#c0c0c0"
        strokeWidth="0.3"
        fill="none"
        opacity="0.1"
      />
    </svg>
  );
}
