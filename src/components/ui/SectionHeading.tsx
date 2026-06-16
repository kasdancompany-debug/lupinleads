import { SectionIntro } from "@/components/ui/SectionIntro";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  bold?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  bold = false,
}: SectionHeadingProps) {
  return (
    <SectionIntro
      eyebrow={eyebrow ?? ""}
      title={title}
      description={description}
      align={align}
      variant={bold ? "bold" : "display"}
      className={align === "center" ? "max-w-3xl" : ""}
    />
  );
}
