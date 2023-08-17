import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import Email from "./emailTemplate";
import findMatchingOffers from "./findMatchingOffers";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
    const buyingTargets = await request.json();
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
    const emailHtml = render(<Email data={buyingTargets} />);
    try {
        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: "pkmymoonpk@gmail.com",
            subject: `Buying Targets Posted`,
            html: emailHtml,
        });
    } catch (error) {
        console.log(error);
    }

    const { data: routeOffers } = await supabase
        .from("route_offers")
        .select("*");
    if (routeOffers?.length) {
        const matchingTargets = findMatchingOffers(buyingTargets, routeOffers);
        if (matchingTargets.length) {
            const targets = render(<Email data={matchingTargets} />);
            try {
                await transporter.sendMail({
                    from: process.env.SMTP_USER,
                    to: "pkmymoonpk@gmail.com",
                    subject: `Found Matching Route Offers`,
                    html: targets,
                });
            } catch (error) {
                console.log(error);
            }
        }
    }

    return NextResponse.json(buyingTargets);
}
