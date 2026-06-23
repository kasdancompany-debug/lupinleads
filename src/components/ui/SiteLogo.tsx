import Link from "next/link";
import { LupinMark } from "@/components/ui/LupinMark";

type SiteLogoProps = {
  size?: number;
  showName?: boolean;
  href?: string;
  className?: string;
  nameClassName?: string;
  variant?: "dark" | "light";
};

export function SiteLogo({
  size = 32,
  showName = true,
  href = "/",
  className = "",
  nameClassName = "font-sans text-base sm:text-lg tracking-[0.06em] truncate",
  variant = "dark",
}: SiteLogoProps) {
  const content = (
    <>
      <LupinMark
        size={size}
        className="transition-transform duration-300 group-hover:scale-[1.03]"
      />
      {showName ? (
        <span className={nameClassName}>
          <span className="wordmark-lupin">Lupin</span>{" "}
          <span className={variant === "light" ? "text-deep-soil" : "wordmark-leads"}>Leads</span>
        </span>
      ) : null}
    </>
  );

  if (!href) {
    return (
      <span className={`inline-flex items-center gap-2.5 min-w-0 ${className}`}>
        {content}
      </span>
    );
  }

  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2.5 min-w-0 ${className}`}
    >
      {content}
    </Link>
  );
}
