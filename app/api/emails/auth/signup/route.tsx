import Signup from "@/emails/Signup";
import { renderAsync } from "@react-email/render";
import nodemailer from "nodemailer";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
    const user = await request.json();
  const requestUrl = new URL(request.url);

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    const emailHtml = await renderAsync(Signup({ user: user }));
    
    try {
        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: user?.email,
            subject: `Welcome to LCRTel.com! Your Account Details Inside.`,
            html: emailHtml,
        });
    } catch (error) {
    }

    return new Response;
}
