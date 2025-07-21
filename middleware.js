import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/supabaseAdmin";

export async function middleware(request) {
  const { pathname, search } = request.nextUrl;
  const host = request.headers.get("host") || "";

  const isDev = process.env.NODE_ENV === "development";
  const mainHost = isDev ? "localhost:3000" : "onefol.io";
  const rootDomain = mainHost;
  const mainOrigin = (isDev ? "http://" : "https://") + mainHost;
  const isRootDomain = host === rootDomain || host === `www.${rootDomain}`;

  let slug = null;
  if (!isRootDomain) {
    if (host.endsWith(`.${rootDomain}`)) {
      slug = host.replace(`.${rootDomain}`, "");
    } else {
      const { data } = await supabaseAdmin
        .from("custom_domains_with_profile_slug")
        .select("profile_username")
        .eq("domain", host)
        .single();
      slug = data?.profile_username ?? null;
    }
  }

  const isCustom = Boolean(slug);

  if (isCustom) {
    if (pathname === "/") {
      const url = request.nextUrl.clone();
      url.pathname = `/u/${slug}`;
      return NextResponse.rewrite(url);
    }
    return NextResponse.redirect(`${mainOrigin}${pathname}${search}`);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api/webhook/stripe|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
