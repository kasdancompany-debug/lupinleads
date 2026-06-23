import type { ReactNode } from "react";
import { BrandEyebrow } from "@/components/ui/BrandEyebrow";

interface SectionIntroProps {
  eyebrow: string;
  title: ReactNode;
  highlight?: ReactNode;
  description?: string;
  align?: "left" | "center";
  variant?: "bold" | "display";
  className?: string;
  children?: ReactNode;
}

export function SectionIntro({
  eyebrow,
  title,
  highlight,
  description,
  align = "left",
  variant = "display",
  className = "",
  children,
}: SectionIntroProps) {
  const centered = align === "center";

  return (
    <header
      className={`section-header ${centered ? "section-header--center mx-auto" : ""} ${className}`}
    >
      {eyebrow ? <BrandEyebrow align={centered ? "center" : "left"}>{eyebrow}</BrandEyebrow> : null}
      <h2 className={variant === "display" ? "section-headline-display" : "section-headline"}>
        {title}
        {highlight && (
          <>
            {" "}
            <span className="text-gradient-forest">{highlight}</span>
          </>
        )}
      </h2>
      {description && (
        <p className={`section-lead ${centered ? "mx-auto" : ""}`}>{description}</p>
      )}
      {children}
    </header>
  );
}
