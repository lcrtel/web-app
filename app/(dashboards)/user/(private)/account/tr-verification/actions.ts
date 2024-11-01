"use server";
import { supabaseServer } from "@/lib/supabase-server";
import { z } from "zod";

const trSchema = z.object({
  name: z.string(),
  company_name: z.string(),
  website: z.string(),
  email: z.string().email(),
});
export async function submitTRVerificationForm(data: z.infer<typeof trSchema>) {
  const { name, company_name, website, email } = data;
  const supabase = await supabaseServer();
  const { error } = await supabase.from("tr_verifications").insert({
    company_email: email,
    company_name,
    name,
    website,
  });

  if (error) {
    return { error: error.message };
  }
}

export async function getTRVerificationStatus() {
  const supabase = await supabaseServer();
  const { data } = await supabase
    .from("tr_verifications")
    .select("status")
    .eq("status", "VERIFIED");
  if (data && data?.length > 1) {
    return true;
  } else {
    return false;
  }
}
