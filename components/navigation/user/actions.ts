"use server";

import { supabaseServer } from "@/lib/supabase-server";


export async function fetchCartItems() {
    const supabase = supabaseServer();
     const { data: selectedRoutes } = await supabase
       .from("selected_routes")
       .select(`*, routes (*)`)
    return selectedRoutes;
}