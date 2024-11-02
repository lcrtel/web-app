"use server";

import { supabaseServer } from "@/lib/supabase-server";

export async function add20Percent(rate: number) {
  const increase = rate * 0.2; // Calculate 20% of the rate
  const result = rate + increase; // Add the increase to the original number
  return result.toFixed(5);
}
export async function dec20Percent(rate: number) {
  const commission = rate * 0.2;
  const result = rate - commission;
  return result.toFixed(5);
}
export async function getRateHike(destinationCode: number) {
  const supabase = await supabaseServer();
  const { data, error } = await supabase
    .from("rate_hikes")
    .select("increase_percentage, decrease_percentage")
    .eq("destination_code", destinationCode)
    .single();

  if (error) {
    return {
      increase_percentage: 20,
      decrease_percentage: 20,
    };
  }

  return data;
}
export async function calculateNewRate(
  rate: number,
  destination: number,
  isIncrease = true,
) {
  const rateHike = await getRateHike(destination);
  const percentage = isIncrease
    ? rateHike.increase_percentage
    : rateHike.decrease_percentage;
  const hike = rate * (percentage / 100);
  const newRate = isIncrease ? rate + hike : rate - hike;

  return newRate.toFixed(5).toString();
}
