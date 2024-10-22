"use server";

import { supabaseServer } from "@/lib/supabase-server";
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
import { calculateNewRate } from "@/utils/rateHikes";

export async function postTargetsAsExecutive(data: Target[]) {
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
          Number(route.destination_code),
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
  const { data: targetsInserted, error } = await supabase
    .from("targets")
    .insert(targets)
    .select();

  const actions = targetsInserted?.map((target) => ({
    action_type: "target_created",
    action_details: JSON.stringify(target),
  }));
  const supabaseClient = supabaseServer();
  if (actions) {
    const { error } = await supabaseClient.from("user_actions").insert(actions);
    if (error) {
      return { error };
    }
  }
  return { error };
}
