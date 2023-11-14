import InvoiceTemplate from "@/emails/Invoice";
import { renderAsync } from "@react-email/render";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
    const invoiceDetails = await request.json();

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        },
    });



    const emailHtml = await renderAsync(<InvoiceTemplate data={invoiceDetails} />);

    try {
        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: invoiceDetails.profiles.email,
            subject: `Route Usage Invoice`,
            html: emailHtml,
        });
    } catch (error) {
    }

    return NextResponse.json(null);
}
