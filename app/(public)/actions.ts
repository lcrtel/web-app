"use server";

import { supabaseServer } from "@/lib/supabase-server";

export default async function updatePhoneCodes(code: string) {
  const supabase = supabaseServer();
  const { data: phoneCodes, error: error2 } = await supabase
    .from("phone_codes")
    .select("*");

  const destinations = phoneCodes?.filter((destination) =>
    destination.value?.includes(code.toUpperCase()),
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
