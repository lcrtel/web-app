"use server";
import RouteMarketingEmail from "@/emails/RouteMarketingEmail";
import { transporter } from "@/utils/smtp-transporter";
import { renderAsync } from "@react-email/render";
import { format } from "date-fns";
import XLSX from "xlsx";

export default async function sendRoutes(
  routes: Route[],
  emailIds: string[],
  message: string,
) {
  const RoutesForExcel = routes.map((route) => {
    return {
      Destination: route.destination,
      Prefix: route.destination_code,
      Rate: route.selling_rate,
      Type: route.route_type.toUpperCase(),
      ASR: `${route.asr}%`,
      ACD: route.acd,
      "Posted on":
        route.created_at && format(new Date(route.created_at), "dd/MM/yyyy"),
      "Buy link": `=HYPERLINK("https://www.lcrtel.com/user/routes/${route.id}", "Buy")`, // Using formula directly as a string
    };
  });

  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(RoutesForExcel);

  // Ensure that the 'Buy link' column is properly registered as a formula
  Object.keys(worksheet).forEach((cell) => {
    if (cell.startsWith("H") && worksheet[cell].v.startsWith("=HYPERLINK")) {
      worksheet[cell].f = worksheet[cell].v; // Move the formula from 'v' to 'f' (value to formula)
      delete worksheet[cell].v; // Remove the 'v' field to prevent conflicts
    }
  });

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
