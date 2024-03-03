"use server";

import { supabaseServer } from "@/lib/supabase-server";
import { UserAttributes } from "@supabase/supabase-js";

export async function updateUser(attributes: UserAttributes) {
    const supabase = supabaseServer();
    const { error } = await supabase.auth.updateUser(attributes);
    return { error };
}
export async function updateUserProfile(attributes: any, userId: string) {
    const supabase = supabaseServer();
    const { data: user, error } = await supabase
        .from("profiles")
        .update(attributes)
        .eq("id", userId)
        .select();
    return { error };
}

export async function signOut() {
    const supabase = supabaseServer();
    const {error} = await supabase.auth.signOut();
    return {error};
}
