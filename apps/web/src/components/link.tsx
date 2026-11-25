import type { ComponentProps } from "react";
import NextLink from "next/link";

/**
 * `next/link` with prefetching off. The public site imports this instead of
 * `next/link`.
 *
 * Left on, every link fetched its whole target route as soon as it scrolled
 * into view: the footer alone cost 26 requests on every page view and the
 * departments index 62, each one billed by the host. Navigation is still
 * client-side; the route is fetched on click.
 */
export default function Link(props: ComponentProps<typeof NextLink>) {
  return <NextLink prefetch={false} {...props} />;
}
