import { updateSession } from "@/lib/supabase/middleware";
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/supabaseAdmin";

export async function middleware(request) {
  const pathname = request.nextUrl.pathname;
  const host = request.headers.get("host") || "";

  const isDev = process.env.NODE_ENV === "development";
  const rootDomain = isDev ? "localhost:3000" : "onefol.io";

  const isRootDomain = host === rootDomain || host === `www.${rootDomain}`;

  let subdomain = null;
  let customDomainUserSlug = null;

  if (!isRootDomain && host.endsWith(`.${rootDomain}`)) {
    subdomain = host.replace(`.${rootDomain}`, "");
  } else if (!isRootDomain) {
    const { data: domainMatch } = await supabaseAdmin
      .from("custom_domains_with_profile_slug")
      .select("profile_username")
      .eq("domain", host)
      .single();

    if (domainMatch?.profile_username) {
      customDomainUserSlug = domainMatch.profile_username;
    }
  }

  if ((subdomain || customDomainUserSlug) && pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = `/u/${subdomain || customDomainUserSlug}`;
    return NextResponse.rewrite(url);
  }

  const response =
    pathname === "/" || pathname.startsWith("/u")
      ? NextResponse.next()
      : await updateSession(request);

  if (subdomain) {
    response.headers.set("x-subdomain", subdomain);
  }

  return response;
}

export const config = {
  matcher: [
    // Match all request paths except:
    // - Stripe Webhook
    // - Static assets
    // - Image optimization
    // - favicon
    "/((?!api/webhook/stripe|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
