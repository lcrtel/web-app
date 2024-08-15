"use server";

import { supabaseServer } from "@/lib/supabase-server";

export async function deletePurchaseRequest(id: string) {
    const supabase = supabaseServer();
    const { error } = await supabase
        .from("purchase_requests")
        .delete()
        .match({ id: id });
    if (error) {
        return { error: error.message };
    }
}