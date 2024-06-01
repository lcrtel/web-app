"use server";

import { supabaseServer } from "@/lib/supabase-server";
import { redirect } from "next/navigation";

export const handleSignOut = async () => {
    const supabase = supabaseServer();
    await supabase.auth.signOut();
    redirect("/");
};
export async function fetchCartItems() {
    const supabase = supabaseServer();
     const { data: selectedRoutes } = await supabase
       .from("selected_routes")
       .select(`*, routes (*)`)
    return selectedRoutes;
}