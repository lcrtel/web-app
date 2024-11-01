"use server";
import PurchaseRequestEmailTemplate from "@/emails/PurchaseRequestEmailTemplate";
import { supabaseServer } from "@/lib/supabase-server";
import { renderAsync } from "@react-email/render";
import nodemailer from "nodemailer";
import XLSX from "xlsx";

export async function postPurchaseRequest(route: SelectedRoute, data: any) {
    const supabase = await supabaseServer();
    const { error } = await supabase.from("purchases").insert([
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

export async function sendPurchaseRequestNotificatiion(
    selectedRoutes: any,
    purchaseRequest: any,
    user: any
) {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(selectedRoutes);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Selected routes");
    const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "buffer",
    });

    const emailHtml = await renderAsync(
        PurchaseRequestEmailTemplate({
            user: user,
            selectedRoutes: selectedRoutes,
            request: purchaseRequest,
        })
    );

    transporter.sendMail({
        from: process.env.SMTP_USER,
        to: user?.email,
        subject: "Purchase Request Confirmation: Selected Routes Details",
        html: emailHtml,
        // attachments: [
        //     {
        //         filename: "Selected Routes.xlsx",
        //         content: excelBuffer,
        //     },
        // ],
    });
}

export async function removeFromSelectedRoutes(id: string, userId: string) {
    const supabase = await supabaseServer();
    const { error } = await supabase
        .from("selected_routes")
        .delete()
        .match({ id: id, user_id: userId });
    if (error) {
        return { error: error.message };
    }
}
