"use server";

import SubmitRoutes from "@/emails/SubmitRoutes";
import { supabaseServer } from "@/lib/supabase-server";
import { add20Percent } from "@/utils/rateHikes";
import { transporter } from "@/utils/smtp-transporter";
import { fetchUser } from "@/utils/user";
import { renderAsync } from "@react-email/render";
import { User } from "@supabase/supabase-js";
import XLSX from "xlsx";

export async function postRouteOffer(route: Route) {
  const supabase = supabaseServer();
  const { error } = await supabase.from("routes").insert({
    destination: route.destination,
    destination_code: route.destination_code,
    rate:  route.rate,
    selling_rate: route.rate,
    route_type: route.route_type,
    asr: route.asr,
    acd: route.acd,
    ports: route.ports,
    pdd: route.pdd,
    remarks: route.remarks,
  });
  // await sendTargetPostedEmail(user, data, user?.email);
  return { error: error?.message };
}
async function sendRoutesPostedEmail(
  user: User | undefined,
  data: Route[],
  email: string | undefined,
) {
  const targetDetailsForExcel = data.map((route: Route) => {
    const { id, ...rest } = route;
    return rest;
  });
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(targetDetailsForExcel);
  XLSX.utils.book_append_sheet(workbook, worksheet, "Route Details");
  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "buffer",
  });
  const res = await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: email,
    subject: `Your route offers have been posted`,
    html: await renderAsync(
      SubmitRoutes({ data: data.slice(0, 10), user: user }),
    ),
    attachments: [
      {
        filename: "Route offers.xlsx",
        content: excelBuffer,
      },
    ],
  });
}
