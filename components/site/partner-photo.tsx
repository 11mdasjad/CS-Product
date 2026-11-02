import type { partners } from "@/content/site";

export function PartnerPhoto({
  partner,
  priority = false,
}: {
  partner: (typeof partners)[number];
  priority?: boolean;
}) {
  const crop = partner.portraitCrop;
  if (crop) {
    // Frame the original screenshot without changing the supplied photographs.
    return (
      <span
        className="portrait-crop"
        style={{ aspectRatio: `${crop.width} / ${crop.height}` }}
      >
        <svg
          viewBox={`${crop.x} ${crop.y} ${crop.width} ${crop.height}`}
          role="img"
          aria-label={partner.name}
          preserveAspectRatio="xMidYMid meet"
        >
          <image href="/images/team-source.jpg" width="1600" height="700" />
        </svg>
      </span>
    );
  }
  return (
    <img
      src={partner.image!}
      alt={partner.name}
      width={1024}
      height={1536}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
    />
  );
}
