import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    const supabase = createRouteHandlerClient<Database>({ cookies });
    let { data: user } = await supabase.from("profiles").select("role_id");

    return NextResponse.json(user);
}
