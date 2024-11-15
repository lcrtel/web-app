import { getUser } from "@/utils/user";
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  await supabase.auth.getUser();
  const user = await getUser();
  if (
    user?.user_roles?.role_slug === "user" &&
    !request.nextUrl.pathname.startsWith(`/user`)
  ) {
    return NextResponse.redirect(new URL(`/user`, request.url));
  } else if (
    user?.user_roles?.role_slug &&
    user?.user_roles?.role_slug !== "user" &&
    !request.nextUrl.pathname.startsWith(`/admin`)
  ) {
    return NextResponse.redirect(new URL(`/admin`, request.url));
  }
  if (
    !user?.user_roles?.role_slug &&
    request.nextUrl.pathname !== "/" &&
    !request.nextUrl.pathname.startsWith("/auth")
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return supabaseResponse;
}
