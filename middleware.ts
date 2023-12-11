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
                !request.nextUrl.pathname.startsWith("/agent"))
        ) {
            return NextResponse.redirect(new URL("/agent", request.url));
        }
        if (
            (userRole === "client" || userRole === "vendor") &&
            (request.nextUrl.pathname === "/" ||
                !request.nextUrl.pathname.startsWith("/user"))
        ) {
            return NextResponse.redirect(new URL("/user", request.url));
        }
    }

    if (
        !user &&
        (request.nextUrl.pathname !== "/" &&
            !request.nextUrl.pathname.startsWith("/auth"))
    ) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    return response;
}

export const config = {
    matcher: [
        "/",
        "/admin/:path*",
        "/agent/:path*",
        "/user/:path*",
        "/auth/:path*",
    ],
};
