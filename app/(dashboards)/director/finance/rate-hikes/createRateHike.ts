"use server";

import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
import { z } from "zod";

const RateHikeSchema = z.object({
  decreasePercentage: z.number().min(0).max(100),
  increasePercentage: z.number().min(0).max(100),
  destinationCode: z.number().positive(),
});

export async function createRateHike(formData: z.infer<typeof RateHikeSchema>) {
  const supabase = await supabaseAdminServer();

  const { error } = await supabase.from("rate_hikes").insert({
    decrease_percentage: formData.decreasePercentage,
    increase_percentage: formData.increasePercentage,
    destination_code: formData.destinationCode,
  });
  if (error) {
    return { error: error.code === "23505" ? "Rate hike already exists." : error.message };
  }
  return { success: "Rate hike created successfully." };
}
