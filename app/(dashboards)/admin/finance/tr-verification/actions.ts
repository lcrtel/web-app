"use server";

import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
import { z } from "zod";

const trSchema = z.object({
  user: z.string({
    required_error: "Please select a user.",
  }),
  name: z.string(),
  company_name: z.string(),
  website: z.string(),
  email: z.string().email(),
  status: z.enum(["VERIFIED", "PENDING", "DECLINED"]),
});
export async function addTR(data: z.infer<typeof trSchema>) {
  const {
    name,
    company_name,
    website,
    email: company_email,
    status,
    user: user_id,
  } = data;
  const supabase = await supabaseAdminServer();
  const { error } = await supabase.from("tr_verifications").insert({
    user_id,
    company_email,
    company_name,
    name,
    website,
    status,
  });

  if (error) {
    return { error: error.message };
  }
}
