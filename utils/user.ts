import { supabaseServer } from "@/lib/supabase-server";
export async function fetchUserRole() {
    const supabase = supabaseServer()
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (user) {
        return user.user_metadata.role;
    }
}

export async function fetchUserMetadata() {
    const supabase = supabaseServer()
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (user) {
        return user.user_metadata;
    }
}
export async function fetchUserData() {
    const supabase = supabaseServer()
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (user) {
        return user;
    }
}
