"use server";

import { supabaseServer } from "@/lib/supabase-server";
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
import { z } from "zod";

const CreateRateHikeSchema = z.object({
  decreasePercentage: z.number().min(0).max(100),
  increasePercentage: z.number().min(0).max(100),
  destinationCode: z.number().positive(),
});

export async function createRateHike(
  formData: z.infer<typeof CreateRateHikeSchema>,
) {
  const supabaseAdmin = await supabaseAdminServer();
  const supabase = await supabaseServer();
  const { error } = await supabaseAdmin.from("rate_hikes").insert({
    decrease_percentage: formData.decreasePercentage,
    increase_percentage: formData.increasePercentage,
    destination_code: formData.destinationCode,
  });
  if (error) {
    return {
      error:
        error.code === "23505" ? "Rate hike already exists." : error.message,
    };
  }
  await supabase.from("user_actions").insert({
    action_type: "create_rate_hike",
    action_details: `Created new default rate hike/decrease for +${formData.destinationCode}`,
  });
  return { success: "Rate hike created successfully." };
}

export async function deleteRateHike(id: string, destination_code: string) {
  const supabaseAdmin = await supabaseAdminServer();
  const supabase = await supabaseServer();
  const { error } = await supabaseAdmin
    .from("rate_hikes")
    .delete()
    .eq("id", id);
  if (error) {
    return { error: error.message };
  }
  await supabase.from("user_actions").insert({
    action_type: "delete_rate_hike",
    action_details: `Deleted default rate hike/decrease for +${destination_code}`,
  });
  return { success: "Rate hike deleted successfully." };
}

const UpdateRateHikeSchema = z.object({
  decreasePercentage: z.number().min(0).max(100),
  increasePercentage: z.number().min(0).max(100),
});
export async function updateRateHike(
  id: number,
  destination_code: string,
  formData: z.infer<typeof UpdateRateHikeSchema>,
) {
  const supabaseAdmin = await supabaseAdminServer();
  const supabase = await supabaseServer();

  const { error } = await supabaseAdmin
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
  await supabase.from("user_actions").insert({
    action_type: "update_rate_hike",
    action_details: `Updated default rate hike/decrease for +${destination_code}`,
  });
  return { success: "Rate hike updated successfully." };
}
