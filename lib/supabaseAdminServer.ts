import { createServerClient } from "@supabase/ssr";
import { cookies, type UnsafeUnwrappedCookies } from "next/headers";

export const supabaseAdminServer = async () => {
  const cookieStore = cookies() as unknown as UnsafeUnwrappedCookies;
  const supabase = await createServerClient<Database>(
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
  return supabase;
};
