"use server";

import { calculateNewRate } from "@/components/routes-and-targets/rateHikes";
import { supabaseServer } from "@/lib/supabase-server";
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";

export async function postTargetsAsAdmin(data: Target[]) {
  const supabaseAdmin = await supabaseAdminServer();
  const supabase = await supabaseServer();
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

  const { error } = await supabaseAdmin.from("targets").insert(targets);

  if (error) {
    return {
      error: error.message,
    };
  }
  await supabase.from("user_actions").insert({
    action_type: "post_target",
    action_details: `Posted ${data.length} targets(s)`,
  });
  return { error: null };
}
