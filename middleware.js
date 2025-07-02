import { updateSession } from "@/lib/supabase/middleware";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const pathname = request.nextUrl.pathname;

  // 1. Subdomain extrahieren
  const host = request.headers.get("host") || "";
  const currentHost = host
    .replace(".localhost:3000", "") // local dev
    .replace(".onefol.io", "");

  const isRootDomain =
    host.startsWith("www.") ||
    host === "onefol.io" ||
    host === "localhost:3000";
  const subdomain = isRootDomain ? null : currentHost;

  // 2. Optional: Redirect auf /u/[subdomain], wenn Subdomain existiert und root angefragt wird
  if (subdomain && pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = `/u/${subdomain}`;
    return NextResponse.rewrite(url);
  }

  // 3. Deine bestehende Logik bleibt erhalten
  if (pathname === "/" || pathname.startsWith("/u")) {
    const response = NextResponse.next();

    // Subdomain ggf. in Header mitschicken
    if (subdomain) {
      response.headers.set("x-subdomain", subdomain);
    }

    return response;
  }

  // 4. updateSession ausführen + Subdomain in Response setzen
  const response = await updateSession(request);
  if (subdomain) {
    response.headers.set("x-subdomain", subdomain);
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - Stripe Webhook
     * - Static assets
     * - Image optimization
     * - favicon
     */
    "/((?!api/webhook/stripe|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
