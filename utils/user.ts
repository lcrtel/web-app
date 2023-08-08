import { createServerComponentClient } from "@supabase/auth-helpers-nextjs/dist";
import { cookies } from "next/headers";
export const dynamic = "force-dynamic";

export async function fetchUserRole() {
    const supabase = createServerComponentClient<Database>({ cookies });
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (user) {
        return user.user_metadata.role;
    }
}

export async function fetchUserData() {
    const supabase = createServerComponentClient({ cookies });
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (user) {
        return user.user_metadata;
    }
}
