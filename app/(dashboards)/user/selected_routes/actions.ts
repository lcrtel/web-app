"use server";
import { supabaseServer } from "@/lib/supabase-server";
import { renderAsync } from "@react-email/render";
import nodemailer from "nodemailer";

export async function postPurchaseRequest(route: SelectedRoute, data: any) {
    const supabase = supabaseServer();
    const { error } = await supabase.from("purchase_requests").insert([
        {
            route_id: route.route_id,
            payment_type: data.payment_type,
            ip: data.ip,
            whatsapp_no: data.whatsapp_no,
            communication_status: "not_contacted",
        },
    ]);
    if (error) {
        return { error: error.message };
    } else {
        await supabase.from("selected_routes").delete().eq("id", route.id);
    }
}

// export async function sendPurchaseRequestNotificatiion(data:any) {
// const transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 465,
//     secure: true,
//     auth: {
//         user: process.env.SMTP_USER,
//         pass: process.env.SMTP_PASSWORD,
//     },
// });

// const emailHtml = await renderAsync(AddAgentMailTemplate({ user: data }));

// transporter.sendMail({
//     from: process.env.SMTP_USER,
//     to: data?.email,
//     subject: `Welcome to LCRTel.com! Account Details Inside.`,
//     html: emailHtml,
// });
// }