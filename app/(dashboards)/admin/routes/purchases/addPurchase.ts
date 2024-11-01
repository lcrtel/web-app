"use server";

import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
import { z } from "zod";
const routeFormSchema = z.object({
  buying_rate: z
    .string()
    .optional()
    .transform((val) => (val === "" ? undefined : val)),
  route_id: z.string(),
  user_id: z.string(),
  payment_type: z.enum(["prepaid", "postpaid"]),
  whatsapp_no: z.string(),
  ip: z
    .string()
    .optional()
    .transform((val) => (val === "" ? undefined : val)),
  status: z.string(),
  vos_status: z.string(),
  communication_status: z.string().optional(),
});

type FormData = z.infer<typeof routeFormSchema>;
export async function addPurchase(formData: FormData) {
  const supabase = await supabaseAdminServer();
  const { data, error } = await supabase
    .from("purchases")
    .insert(formData)
    .select();

  if (error) {
    return { error: error.message };
  }
}
