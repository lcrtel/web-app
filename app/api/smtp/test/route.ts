import { EmailTemplate } from "@/components/email-template";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend("re_iMo7wPvA_21YPZki9Pa6Sv1wVrX2w7pj1");

export async function POST() {
    try {
        const data = await resend.emails.send({
            from: "Acme <onboarding@resend.dev>",
            to: ["lcrtelweb@gmail.com"],
            subject: "Hello world",
            html: "<p>Congrats on sending your <strong>first email</strong>!</p>",
        });

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error });
    }
}
