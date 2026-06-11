import { WolfDivider } from "@/components/ui/WolfDivider";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  ornament?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  ornament = true,
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`max-w-2xl mb-16 ${alignClass}`}>
      {eyebrow && (
        <p className="text-forest-glow text-xs font-medium tracking-[0.25em] uppercase mb-4">
          {eyebrow}
        </p>
      )}
      {ornament && (
        <WolfDivider
          variant="crest"
          className={`max-w-xs mb-8 ${align === "center" ? "mx-auto" : ""}`}
        />
      )}
      <h2
        className={`font-display text-4xl md:text-5xl font-light tracking-tight text-gradient-silver mb-6 ${alignClass}`}
      >
        {title}
      </h2>
      {description && (
        <p className={`text-silver-muted text-lg leading-relaxed ${alignClass}`}>
          {description}
        </p>
      )}
    </div>
  );
}
