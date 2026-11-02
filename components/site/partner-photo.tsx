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
      width={partner.studioPortrait ? 1122 : 1024}
      height={partner.studioPortrait ? 1402 : 1536}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
    />
  );
}
