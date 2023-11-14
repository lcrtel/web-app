import ResetPassword from "@/emails/ResetPassword";
import { renderAsync } from "@react-email/render";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
    const user = await request.json();
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    const emailHtml = await renderAsync(<ResetPassword user={user} />);
    
    try {
        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: user?.email,
            subject: `Your Password Has Been Successfully Reset`,
            html: emailHtml,
        });
    } catch (error) {
    }

    return NextResponse.json(user);
}
