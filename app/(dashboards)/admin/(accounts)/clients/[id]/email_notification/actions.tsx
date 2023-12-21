"use server";

import { renderAsync } from "@react-email/render";
import nodemailer from "nodemailer";
import EmailTemplate from "@/emails/EmailTemplate";
import RateNotificationTemplate from "@/emails/RateNotificationTemplate";

export async function sendLowBalanceNotification(data: any) {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    const emailHtml = await renderAsync(
        <EmailTemplate body={data.body} subject={data.subject} />
    );

    try {
        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: data.to,
            cc: data.cc,
            subject: data.subject,
            html: emailHtml,
        });
        return true;
    } catch (error) {
        return false;
    }
}
export async function sendPaymentReminder(data: any) {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    const emailHtml = await renderAsync(
        <EmailTemplate body={data.body} subject={data.subject} />
    );

    try {
        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: data.to,
            cc: data.cc,
            subject: data.subject,
            html: emailHtml,
        });
        return true;
    } catch (error) {
        return false;
    }
}
export async function sendRateNotification(data: any) {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    const emailHtml = await renderAsync(
        <RateNotificationTemplate data={data} />
    );

    try {
        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: data.to,
            cc: data.cc,
            subject: data.subject,
            html: emailHtml,
        });
        return true;
    } catch (error) {
        return false;
    }
}
