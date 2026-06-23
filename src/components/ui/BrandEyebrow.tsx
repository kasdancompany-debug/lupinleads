import { LeadNode, StemLine } from "@/components/ui/BrandMotifs";

type BrandEyebrowProps = {
  children: string;
  className?: string;
  align?: "left" | "center";
};

/** Section label with brand stem line + lead nodes. */
export function BrandEyebrow({
  children,
  className = "",
  align = "left",
}: BrandEyebrowProps) {
  const centered = align === "center";

  return (
    <div
      className={`flex items-center gap-3 mb-4 ${centered ? "justify-center" : ""} ${className}`}
    >
      {!centered ? (
        <>
          <StemLine className="w-8 shrink-0" />
          <LeadNode size="sm" />
        </>
      ) : null}
      <p className="section-eyebrow !mb-0">{children}</p>
      {centered ? (
        <>
          <LeadNode size="sm" />
          <StemLine className="w-8 shrink-0" />
        </>
      ) : null}
    </div>
  );
}
