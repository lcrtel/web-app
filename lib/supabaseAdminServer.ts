import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies, type UnsafeUnwrappedCookies } from "next/headers";

export const supabaseAdminServer = () => {
    const cookieStore = (cookies() as unknown as UnsafeUnwrappedCookies);
    return createServerClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
        },
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      },
    );
};
