"use server";

import { supabaseServer } from "@/lib/supabase-server";
import { redirect } from "next/navigation";

export const handleSignOut = async () => {
    const supabase = supabaseServer();
    await supabase.auth.signOut();
    redirect("/");
};
