"use server";

import { supabaseServer } from "@/lib/supabase-server";

export async function deletePurchaseRequest(id: string) {
    const supabase = await supabaseServer();
    const { error } = await supabase
        .from("purchases")
        .delete()
        .match({ id: id });
    if (error) {
        return { error: error.message };
    }
}
