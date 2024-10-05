"use server";

import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
import { calculateNewRate } from "@/utils/rateHikes";

export async function postTargetsAsAdmin(data: Target[]) {
  const supabase = supabaseAdminServer();
  const targets: any = await Promise.all(
    data.map(async (route: Target) => {
      return {
        client_id: route.client_id,
        destination: route.destination,
        destination_code: route.destination_code,
        rate: route.rate,
        buying_rate: await calculateNewRate(
          Number(route.rate),
          Number(route.destination),
          false,
        ),
        route_type: route.route_type,
        asr: route.asr,
        acd: route.acd,
        ports: route.ports,
        pdd: route.pdd,
        remarks: route.remarks,
      };
    }),
  );
  const { data: route, error } = await supabase.from("targets").insert(targets);

  return { data: route, error };
}
