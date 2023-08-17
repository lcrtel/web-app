import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import Email from "./emailTemplate";
import findMatchingTargets from "./findMatchingTargets";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
    const routeOffers = await request.json();
    const supabase = createRouteHandlerClient<Database>({ cookies });
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        },
    });
    const emailHtml = render(<Email data={routeOffers} />);
    try {
        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: "pkmymoonpk@gmail.com",
            subject: `Route Offers Posted`,
            html: emailHtml,
        });
    } catch (error) {
        console.log(error);
    }

    const { data: buyingTargets } = await supabase
        .from("buying_targets")
        .select("*");

    if (buyingTargets?.length) {
        const matchingTargets = findMatchingTargets(routeOffers, buyingTargets);
        // console.log(matchingTargets);

        if (matchingTargets?.length) {
            const targets = render(<Email data={matchingTargets} />);
            try {
                await transporter.sendMail({
                    from: process.env.SMTP_USER,
                    to: "pkmymoonpk@gmail.com",
                    subject: `Found Matching Targets`,
                    html: targets,
                });
            } catch (error) {
                console.log(error);
            }
        }
    }

    return NextResponse.json(routeOffers);
}
