import { updateSession } from "@/lib/supabase/middleware";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const host = request.headers.get("host") || "";
  const pathname = request.nextUrl.pathname;

  const internalRoutes = ["/auth", "/dashboard", "/editor", "/statistics"];

  // Interne Pfade auf onefol.io → redirect nach app.onefol.io
  if (
    host === "onefol.io" &&
    internalRoutes.some((route) => pathname.startsWith(route))
  ) {
    const url = request.nextUrl.clone();
    url.hostname = "app.onefol.io";
    return NextResponse.redirect(url);
  }

  // Optional: öffentliche Routen auf app.onefol.io → redirect nach onefol.io
  if (
    host === "app.onefol.io" &&
    !internalRoutes.some((route) => pathname.startsWith(route))
  ) {
    const url = request.nextUrl.clone();
    url.hostname = "onefol.io";
    return NextResponse.redirect(url);
  }

  // Session aktualisieren
  return await updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$|$).*)",
  ],
};
