"use server";

import { supabaseServer } from "@/lib/supabase-server";
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";

export async function deleteRoute(routeID: any) {
  const supabaseAdmin = await supabaseAdminServer();
  const supabase = await supabaseServer();

  const { error } = await supabaseAdmin
    .from("routes")
    .delete()
    .eq("id", routeID);
  if (error) {
    return {
      error:
        error.code === "23502"
          ? "Can't Delete when there is active gateways"
          : error.message,
    };
  }
  await supabase.from("user_actions").insert({
    action_type: "delete_route",
    action_details: `Deleted a route with ID: ${routeID}`,
  });
  return { success: "Route deleted successfully." };
}
export async function editRoute(data: Route, routeID: any) {
  const supabaseAdmin = await supabaseAdminServer();
  const supabase = await supabaseServer();
  const { data: target, error } = await supabaseAdmin
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

  await supabase.from("user_actions").insert({
    action_type: "edit_route",
    action_details: `Edited a route with ID: ${routeID}`,
  });
  return { data: target, error };
}
