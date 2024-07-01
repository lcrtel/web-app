import { supabaseServer } from "@/lib/supabase-server";
import { fetchUserRole } from "@/utils/user";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";


export async function GET(request: NextRequest) {
  const role = await fetchUserRole()
  console.log(role)
  if (!role) {
    return NextResponse.redirect(new URL("/", request.url))
  } 
  return NextResponse.redirect(new URL(`/${role}/account/passowrd`, request.url))

}
