"use server";

import { supabaseServer } from "@/lib/supabase-server";
import { z } from "zod";

const FormSchema = z.object({
  buying_rate: z
    .string()
    .refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: "Buying rate must be a valid number",
    })
    .optional(),
  whatsapp_no: z.string().min(9, {
    message: "WhatsApp number is required to contact you",
  }),
  payment_type: z.string({
    required_error: "Please select a payment type",
  }),
  ip: z.string().min(6, {
    message: "IP Address is required to configure the route",
  }),
});
export async function postPurchaseRequest(
  routeId: string,
  formData: z.infer<typeof FormSchema>,
) {
  const supabase = supabaseServer();
  const { error } = await supabase.from("purchases").insert([
    {
      route_id: routeId,
      buying_rate: formData.buying_rate,
      payment_type: formData.payment_type,
      ip: formData.ip,
      whatsapp_no: formData.whatsapp_no,
    },
  ]);
  if (error) {
    return { error: error.message };
  }
}
