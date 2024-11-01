"use server";

import { supabaseServer } from "@/lib/supabase-server";
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
import { calculateNewRate } from "@/utils/rateHikes";
import { getUser } from "@/utils/user";

export async function postTargetsAsExecutive(data: Target[]) {
  const supabase = await supabaseAdminServer();
  const user = await getUser();
  const targets: any = await Promise.all(
    data.map(async (target: Target) => {
      return {
        client_id: target.client_id,
        destination: target.destination,
        destination_code: target.destination_code,
        rate: target.rate,
        buying_rate: await calculateNewRate(
          Number(target.rate),
          Number(target.destination_code),
          false,
        ),
        route_type: target.route_type,
        asr: target.asr,
        acd: target.acd,
        ports: target.ports,
        pdd: target.pdd,
        remarks: target.remarks,
        added_by: user?.id,
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
  const supabaseClient = await supabaseServer();
  if (actions) {
    const { error } = await supabaseClient.from("user_actions").insert(actions);
    if (error) {
      return { error };
    }
  }
  return { error };
}
