"use server";

import SubmitTargets from "@/emails/SubmitTargets";
import { supabaseServer } from "@/lib/supabase-server";
import { dec20Percent } from "@/utils/rateHikes";
import { transporter } from "@/utils/smtp-transporter";
import { fetchUser } from "@/utils/user";
import { renderAsync } from "@react-email/render";
import { User } from "@supabase/supabase-js";
import XLSX from "xlsx";

export async function postTargets(data: Target[]) {
  let user = await fetchUser();
  const supabase = supabaseServer();
  const { error } = await supabase.from("targets").insert(
    data.map((target: Target) => ({
      destination: target.destination,
      destination_code: target.destination_code,
      rate: target.rate,
      buying_rate: dec20Percent(Number(target.rate)),
      route_type: target.route_type,
      asr: target.asr,
      acd: target.acd,
      ports: target.ports,
      pdd: target.pdd,
      remarks: target.remarks,
    })),
  );
  // await sendTargetPostedEmail(user, data, user?.email);
  return { error: error?.message };
}
async function sendTargetPostedEmail(
  user: User | undefined,
  data: Target[],
  email: string | undefined,
) {
  const targetDetailsForExcel = data.map((route: Target) => {
    const { id, ...rest } = route;
    return rest;
  });
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(targetDetailsForExcel);
  XLSX.utils.book_append_sheet(workbook, worksheet, "Target Details");
  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "buffer",
  });
  const res = await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: email,
    subject: `Your Buying Targets Have Been Posted`,
    html: await renderAsync(
      SubmitTargets({ data: data.slice(0, 10), user: user }),
    ),
    attachments: [
      {
        filename: "Target Details.xlsx",
        content: excelBuffer,
      },
    ],
  });
}
