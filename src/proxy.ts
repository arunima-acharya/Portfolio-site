import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Phones only — deliberately excludes tablets (iPad never contains
// "iPhone"/"iPod"; Android tablets omit the "Mobile" token that Android
// phones include), since desktop/tablet share the main site per the
// "optimize for desktop + tablet, separate site for mobile" decision.
const MOBILE_UA_RE = /iPhone|iPod|Android.*Mobile|Windows Phone|BlackBerry|IEMobile|Opera Mini/i;

// Only paths that actually have a built /m/* page — everything else falls
// through to the regular (responsive) desktop site rather than 404ing.
// Expand this list as more of the mobile tree gets built out.
const MOBILE_PATHS = new Set(["/", "/contact"]);

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Already on the mobile tree, or a route the mobile site doesn't need
  // to intercept (kept out of the matcher below too, this is belt-and-braces).
  if (pathname.startsWith("/m")) return NextResponse.next();

  if (!MOBILE_PATHS.has(pathname)) return NextResponse.next();

  const ua = request.headers.get("user-agent") ?? "";
  if (!MOBILE_UA_RE.test(ua)) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/m${pathname}`;
  // Redirect, not rewrite: with a rewrite the browser's URL — and every
  // client component's usePathname() — still reports the *original* path,
  // so the shared root layout has no reliable way to know it should hide
  // the desktop Navbar/Footer/CustomCursor for this request. A redirect
  // makes /m/* the real, visible URL, so that check actually works.
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    /*
     * Skip:
     *  - /m/* (already the mobile tree)
     *  - /api/* (no page to fork)
     *  - Next internals (_next/static, _next/image)
     *  - files with an extension (favicon.ico, assets, fonts, etc.)
     */
    "/((?!m/|api/|_next/static|_next/image|.*\\..*).*)",
  ],
};
