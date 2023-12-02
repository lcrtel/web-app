import InvoiceTemplate from "@/emails/Invoice";
import { supabaseRouteHandler } from "@/lib/supabaseRouteHandler";
import { renderAsync } from "@react-email/render";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
    const formData = await request.json();
    const supabase = await supabaseRouteHandler();
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        },
    });
    const { data: inv, error } = await supabase
        .from("invoices")
        .insert([formData])
        .select(`*, profiles (*)`)
        .single();


    const emailHtml = await renderAsync(<InvoiceTemplate data={{ ...inv }} />);

    try {
        transporter.sendMail({
            from: process.env.SMTP_USER,
            to: inv?.profiles?.email
                ? inv.profiles.email
                : process.env.SMTP_USER,
            subject: `Route Usage Invoice`,
            html: emailHtml,
        });
    } catch (error) {}
    if (error) {
        return new Response(JSON.stringify(error), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }

    return new Response("Client created successfully", { status: 200 });
}
