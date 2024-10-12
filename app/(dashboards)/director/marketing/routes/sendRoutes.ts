"use server";
import RouteMarketingEmail from "@/emails/RouteMarketingEmail";
import { transporter } from "@/utils/smtp-transporter";
import { renderAsync } from "@react-email/render";
import XLSX from "xlsx";

export default async function sendRoutes(
  routes: Route[],
  emailIds: string[],
  message: string,
) {
  const RoutesForExcel = routes.map((route) => {
    const {
      id,
      rate,
      vendor_id,
      new_id,
      remarks,
      selling_rate,
      verified_at,
      verification_by,
      verification,
      updated_at,
      ...rest
    } = route;
    return { rate: selling_rate, ...rest };
  });
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(RoutesForExcel);
  XLSX.utils.book_append_sheet(workbook, worksheet, "Route Details");
  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "buffer",
  });
  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: emailIds,
    subject: `Route offers`,
    html: await renderAsync(
      RouteMarketingEmail({ data: routes.slice(0, 10), message: message }),
    ),
    attachments: [
      {
        filename: "Route offers.xlsx",
        content: excelBuffer,
      },
    ],
  });
}
