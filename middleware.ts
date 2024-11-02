import { type NextRequest } from "next/server";
import { updateSession } from "./lib/supabase-middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    "/user/((?!routes|targets|post-offers|post-targets).*)",
    // "/user/:path*",
    "/director/:path*",
    "/company_manager/:path*",
    "/finance_executive/:path*",
    "/finance_manager/:path*",
    "/noc_executive/:path*",
    "/noc_manager/:path*",
    "/purchase_executive/:path*",
    "/purchase_manager/:path*",
    "/sales_executive/:path*",
    "/admin/:path*",
    "/auth/:path*",
  ],
};
