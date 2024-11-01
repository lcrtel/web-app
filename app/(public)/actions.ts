"use server";

import { supabaseServer } from "@/lib/supabase-server";

export default async function updatePhoneCodes(code: string) {
  const supabase = await supabaseServer();
  const { data: phoneCodes, error: error2 } = await supabase
    .from("phone_codes")
    .select("*");

  const destinations = phoneCodes?.filter((destination) =>
    destination.value?.includes(code),
  );
  try {
    const response = await fetch(
      `https://www.routecall.com/rc/code.rc?term=${code}`,
    );
    if (response.ok) {
      const codes = await response.json();
      if (codes) {
        await supabase.from("phone_codes").upsert(codes);
      }
    }
  } catch (error) {
    return destinations;
  }
  return destinations;
}

export async function marketSearch(prefix: string, type: string) {
  const supabase = await supabaseServer();
  let filter: any = {};
  if (type) {
    filter.route_type = type;
  }
  if (prefix) {
    filter.destination_code = prefix;
  }
  const { data: routes, error } = await supabase
    .from("routes")
    .select(
      "destination, destination_code, route_type, selling_rate, asr , pdd, created_at, id",
    )
    .match(filter).range(0, 10);
  if (error) {
    return { error: error.message };
  }
  return { data: routes };
}
