"use server";

import { supabaseAdminServer } from "@/lib/supabaseAdminServer";

export async function deleteRoute(routeID: any) {
  const supabase = await supabaseAdminServer();
  const { error } = await supabase.from("routes").delete().eq("id", routeID);
  if (error) {
    return {
      error:
        error.code === "23502"
          ? "Can't Delete when there is active gateways"
          : error.message,
    };
  }
}
export async function editRoute(data: Route, routeID: any) {
  const supabase = await supabaseAdminServer();
  const { data: target, error } = await supabase
    .from("routes")
    .update({
      ...data,
      updated_at: new Date().toISOString(),
    })
    .eq("id", routeID)
    .select();
  if (error) {
    return {
      error: error.message,
    };
  }
}
