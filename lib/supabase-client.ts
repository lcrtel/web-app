import { createBrowserClient } from "@supabase/ssr";

export const supabaseClient = async () => {
  const supabase = await createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
  return supabase;
};
