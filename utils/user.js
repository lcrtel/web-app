import { createServerComponentClient } from "@supabase/auth-helpers-nextjs/dist";
import { cookies } from "next/headers";
export const dynamic = "force-dynamic";

export async function fetchUser() {
    const supabase = createServerComponentClient({ cookies });
    const {
        data: { session },
    } = await supabase.auth.getSession();

    const { data: user } = await supabase.from("users").select("role");
    if (user) {
        return user[0].role;
    }
}
export async function fetchUserData() {
    const supabase = createServerComponentClient({ cookies });
    const {
        data: { session },
    } = await supabase.auth.getSession();

    const { data: user } = await supabase.from("users").select("*");
    if (user) {
        return user;
    }
}
