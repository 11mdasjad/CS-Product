import type { ComponentProps } from "react";
/** Native navigation keeps server-rendered routes independent of RSC prefetch. */
export default function Link(props: ComponentProps<"a"> & { href: string }) {
  return <a {...props} />;
}
