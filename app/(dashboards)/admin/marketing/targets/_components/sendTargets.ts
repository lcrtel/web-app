"use server";
import TargetMarketingEmail from "@/emails/TargetMarketingEmail";
import { supabaseServer } from "@/lib/supabase-server";
import { transporter } from "@/utils/smtp-transporter";
import { renderAsync } from "@react-email/render";
import { format } from "date-fns";
import XLSX from "xlsx";

export default async function sendTargets(
  unfilteredTargets: Target[],
  emailId: string,
  user_id: string,
  message: string,
) {
  const supabase = await supabaseServer();
  const targets = unfilteredTargets.filter(
    (target) => target.client_id !== user_id,
  );
  if (targets.length === 0) return;
  const TargetsForExcel = targets.map((target) => {
    return {
      Destination: target.destination,
      Prefix: target.destination_code,
      Rate: target.buying_rate,
      Type: target.route_type.toUpperCase(),
      ASR: `${target.asr}%`,
      ACD: target.acd,
      "Posted on":
        target.created_at && format(new Date(target.created_at), "dd/MM/yyyy"),
      "Buy link": `=HYPERLINK("https://www.lcrtel.com/user/targets/${target.id}", "View")`, // Using formula directly as a string
    };
  });

  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(TargetsForExcel);

  // Ensure that the 'Buy link' column is properly registered as a formula
  Object.keys(worksheet).forEach((cell) => {
    if (cell.startsWith("H") && worksheet[cell].v.startsWith("=HYPERLINK")) {
      worksheet[cell].f = worksheet[cell].v; // Move the formula from 'v' to 'f' (value to formula)
      delete worksheet[cell].v; // Remove the 'v' field to prevent conflicts
    }
  });

  XLSX.utils.book_append_sheet(workbook, worksheet, "Target rates");
  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "buffer",
  });
  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: emailId,
    subject: `Target rates`,
    html: await renderAsync(
      TargetMarketingEmail({ data: targets.slice(0, 10), message: message }),
    ),
    attachments: [
      {
        filename: "Target rates.xlsx",
        content: excelBuffer,
      },
    ],
  });
  await supabase.from("user_actions").insert({
    action_type: "sent_buying_targets",
    action_details: `Sent buying targets to ${emailId}`,
  });
}
