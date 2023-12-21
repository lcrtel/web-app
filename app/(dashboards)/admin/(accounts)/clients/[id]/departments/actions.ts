"use server";

import { supabaseServer } from "@/lib/supabase-server";

export async function updateFinanceDipartment(data: any) {
    const supabase = await supabaseServer();
    return await supabase
        .from("profiles")
        .update({ finance_department: data.finance_department })
        .eq("id", data.user_id);
}

export async function updateNOCDipartment(data: any) {
    const supabase = await supabaseServer();
    return await supabase
        .from("profiles")
        .update({ noc_department: data.noc_department })
        .eq("id", data.user_id);
}

export async function updateSalesDipartment(data: any) {
    const supabase = await supabaseServer();
    return await supabase
        .from("profiles")
        .update({ sales_department: data.sales_department })
        .eq("id", data.user_id);
}
