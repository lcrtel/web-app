import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "./lib/supabase-middleware";
import { fetchUserRole } from "./utils/user";

export async function middleware(request: NextRequest) {
  const userRole = await fetchUserRole();
  if (
    userRole &&
    !request.nextUrl.pathname.startsWith(`/${userRole}`)
  ) {
    if (userRole === "user") {
      return NextResponse.redirect(new URL(`/u`, request.url));
    }
    return NextResponse.redirect(new URL(`/${userRole}`, request.url));
  }
  if (
    !userRole &&
    request.nextUrl.pathname !== "/" &&
    !request.nextUrl.pathname.startsWith("/auth")
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return await updateSession(request);
}

export const config = {
  matcher: [
    "/",
    "/director/:path*",
    "/company_manager/:path*",
    "/finance_executive/:path*",
    "/finance_manager/:path*",
    "/noc_executive/:path*",
    "/noc_manager/:path*",
    "/purchase_executive/:path*",
    "/purchase_manager/:path*",
    "/sales_executive/:path*",
    "/sales_manager/:path*",
    "/auth/:path*",
  ],
};
