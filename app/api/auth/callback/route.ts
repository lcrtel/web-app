import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get("code");
    const passwordReset = requestUrl.searchParams.get("password_reset");

    if (code) {
        const supabase = createRouteHandlerClient<Database>({ cookies });
        await supabase.auth.exchangeCodeForSession(code);
    }

    if (passwordReset) {
        console.log("got password reset");
        return NextResponse.redirect(new URL(passwordReset, request.url));
    }

    return NextResponse.redirect(new URL("/user", request.url));
    

}
