import type { partners } from "@/content/site";

export function PartnerPhoto({
  partner,
  priority = false,
}: {
  partner: (typeof partners)[number];
  priority?: boolean;
}) {
  return (
    <img
      src={partner.image!}
      alt={partner.name}
      width={partner.imageWidth ?? 1122}
      height={partner.imageHeight ?? 1402}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
    />
  );
}
