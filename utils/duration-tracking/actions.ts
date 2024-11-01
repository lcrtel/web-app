"use server";

import { supabaseServer } from "@/lib/supabase-server";

export async function updateDurationInDb(duration: number) {
  const supabase = await supabaseServer();
    const { error } = await supabase
      .from("user_durations")
      .insert({ duration: duration });
    if (error) {
      return { error: error.message };
    }
  
}
