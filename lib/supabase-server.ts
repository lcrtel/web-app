import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";


export const supabaseServer = async () => {
    const cookieStore = cookies();

   return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value;
                },
            },
        }
    );
        }
