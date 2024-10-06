"use server";

import { supabaseServer } from "@/lib/supabase-server";

export async function insertSelectedRouteInDb(routeId: string) {
    const supabase = supabaseServer();
    const { error } = await supabase
        .from("selected_routes")
        .insert({ route_id: routeId as string })
        .select();
    return { error };
}

export async function fetchSelectedRoute(routeId: string) {
    const supabase = supabaseServer();
    const { data: selectedRoute } = await supabase
        .from("selected_routes")
        .select("route_id")
        .match({ route_id: routeId })
        .single();
    return { data: selectedRoute };
}
