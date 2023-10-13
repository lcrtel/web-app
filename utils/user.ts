import { createServerComponentClient } from "@supabase/auth-helpers-nextjs/dist";
import { cookies } from "next/headers";
import type { User } from "@supabase/gotrue-js/src/lib/types";
export async function fetchUserRole() {
    const supabase = createServerComponentClient<Database>({ cookies });
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (user) {
        return user.user_metadata.role;
    }
}

export async function fetchUserMetadata() {
    const supabase = createServerComponentClient<Database>({ cookies });
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (user) {
        return user.user_metadata;
    }
}
export async function fetchUserData() {
    const supabase = createServerComponentClient<Database>({ cookies });
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (user) {
        return user;
    }
}
