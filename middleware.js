import { updateSession } from "@/lib/supabase/middleware";
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/supabaseAdmin";

export async function middleware(request) {
  const pathname = request.nextUrl.pathname;
  const host = request.headers.get("host") || "";

  // Environment variables validation
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.SUPABASE_SERVICE_ROLE_KEY ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    console.error("Missing Supabase environment variables");
    return NextResponse.next();
  }

  const isDev = process.env.NODE_ENV === "development";
  const rootDomain = isDev ? "localhost:3000" : "onefol.io";

  const isRootDomain = host === rootDomain || host === `www.${rootDomain}`;

  // Debug logging for production
  if (!isDev) {
    console.log(
      `Middleware: ${host}${pathname} - isRootDomain: ${isRootDomain}`
    );
  }

  let subdomain = null;
  let customDomainUserSlug = null;

  if (!isRootDomain && host.endsWith(`.${rootDomain}`)) {
    subdomain = host.replace(`.${rootDomain}`, "");
  } else if (!isRootDomain) {
    try {
      const { data: domainMatch, error } = await supabaseAdmin
        .from("custom_domains_with_profile_slug")
        .select("profile_username")
        .eq("domain", host)
        .single();

      if (error && !isDev) {
        console.error("Supabase query error:", error);
      }

      if (domainMatch?.profile_username) {
        customDomainUserSlug = domainMatch.profile_username;
      }
    } catch (error) {
      console.error("Error in domain lookup:", error);
      // Continue with null customDomainUserSlug
    }
  }

  if ((subdomain || customDomainUserSlug) && pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = `/u/${subdomain || customDomainUserSlug}`;
    return NextResponse.rewrite(url);
  }

  let response;
  try {
    response =
      pathname === "/" || pathname.startsWith("/u")
        ? NextResponse.next()
        : await updateSession(request);
  } catch (error) {
    console.error("Authentication middleware error:", error);
    response = NextResponse.next();
  }

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
