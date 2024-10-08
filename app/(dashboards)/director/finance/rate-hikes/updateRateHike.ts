"use server";

import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
import { z } from "zod";

const RateHikeSchema = z.object({
  decreasePercentage: z.number().min(0).max(100),
  increasePercentage: z.number().min(0).max(100),
});

export async function updateRateHike(
  id: number,
  formData: z.infer<typeof RateHikeSchema>,
) {
  const supabase = supabaseAdminServer();

  const { error } = await supabase
    .from("rate_hikes")
    .update({
      decrease_percentage: formData.decreasePercentage,
      increase_percentage: formData.increasePercentage,
    })
    .eq("id", id);
  if (error) {
    return {
      error: error.message,
    };
  }
  return { success: "Rate hike updated successfully." };
}
