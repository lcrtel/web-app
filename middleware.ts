import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "./lib/supabase-middleware";
import { fetchUserRole } from "./utils/user";

export async function middleware(request: NextRequest) {
  const { supabase, response } = createClient(request);

  await supabase.auth.getSession();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userRole = await fetchUserRole();

  if (user) {
    if (
      userRole === "admin" &&
      (request.nextUrl.pathname === "/" ||
        !request.nextUrl.pathname.startsWith("/admin"))
    ) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    if (
      userRole === "agent" &&
      (request.nextUrl.pathname === "/" ||
        !request.nextUrl.pathname.startsWith("/manager"))
    ) {
      return NextResponse.redirect(new URL("/manager", request.url));
    }
    if (
      userRole === "manager" &&
      (request.nextUrl.pathname === "/" ||
        !request.nextUrl.pathname.startsWith("/manager"))
    ) {
      return NextResponse.redirect(new URL("/manager", request.url));
    }
    if (
      userRole === "noc" &&
      (request.nextUrl.pathname === "/" ||
        !request.nextUrl.pathname.startsWith("/noc"))
    ) {
      return NextResponse.redirect(new URL("/noc", request.url));
    }
    if (
      userRole === "salesman" &&
      (request.nextUrl.pathname === "/" ||
        !request.nextUrl.pathname.startsWith("/sales"))
    ) {
      return NextResponse.redirect(new URL("/sales", request.url));
    }
  }
  if (
    userRole === "tech" &&
    (request.nextUrl.pathname === "/" ||
      !request.nextUrl.pathname.startsWith("/tech"))
  ) {
    return NextResponse.redirect(new URL("/tech", request.url));
  }
  if (
    userRole === "accountant" &&
    (request.nextUrl.pathname === "/" ||
      !request.nextUrl.pathname.startsWith("/accounts"))
  ) {
    return NextResponse.redirect(new URL("/accounts", request.url));
  }
  if (
    (userRole === "client" || userRole === "vendor") &&
    (request.nextUrl.pathname === "/" ||
      !request.nextUrl.pathname.startsWith("/user"))
  ) {
    return NextResponse.redirect(new URL("/user", request.url));
  }

  if (
    !user &&
    request.nextUrl.pathname !== "/" &&
    !request.nextUrl.pathname.startsWith("/auth")
  ) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/",
    "/admin/:path*",
    "/manager/:path*",
    "/noc/:path*",
    "/sales/:path*",
    "/tech/:path*",
    "/accounts/:path*",
    "/auth/:path*",
  ],
};
