"use server";

import { supabaseServer } from "@/lib/supabase-server";
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
import { calculateNewRate } from "@/utils/rateHikes";

export async function postRoutesAsAdmin(newRoutes: Route[]) {
  const supabase = await supabaseAdminServer();
  const routes: any = await Promise.all(
    newRoutes.map(async (route: Route) => {
      return {
        vendor_id: route.vendor_id,
        destination: route.destination,
        destination_code: route.destination_code,
        rate: route.rate,
        selling_rate: await calculateNewRate(
          Number(route.rate),
          Number(route.destination_code),
          true,
        ),
        route_type: route.route_type,
        asr: route.asr,
        acd: route.acd,
        ports: route.ports,
        pdd: route.pdd,
        remarks: route.remarks,
        verification: "verified",
      };
    }),
  );
  const { data: route, error } = await supabase.from("routes").insert(routes);

  return { data: route, error };
}

async function updateRouteInDb(oldRouteId: string, updatedRoute: Route) {
  const supabase = await supabaseServer();
  const { data: route, error } = await supabase
    .from("routes")
    .update({ ...updatedRoute, updated_at: new Date().toISOString() })
    .eq("id", oldRouteId)
    .select(`*, profiles (*)`)
    .single();
  if (error) throw new Error(error.message);
  return route;
}

export async function deleteRoute(routeId: string) {
  const supabase = await supabaseServer();
  const { error } = await supabase.from("routes").delete().eq("id", routeId);
  return { error };
}