"use server";

import { supabaseServer } from "@/lib/supabase-server";
import { getUpdatedValues } from "@/utils/getUpdatedValuesOfObject";
import { renderAsync } from "@react-email/render";
import { transporter } from "@/utils/smtp-transporter";
import { add20Percent } from "@/utils/rateHikes";


export async function insertRoutesInDb(newRoutes: Route[], vendor: string) {
    const supabase = supabaseServer();
    const { data: route, error } = await supabase
        .from("routes")
        .insert(
            newRoutes.map((route: any) => ({
                vendor_id: vendor,
                destination: route.destination,
                destination_code: route.destination_code,
                rate: route.rate,
                selling_rate: add20Percent(Number(route.rate)),
                route_type: route.route_type,
                asr: route.asr,
                acd: route.acd,
                ports: route.ports,
                capacity: route.capacity,
                pdd: route.pdd,
                verification: "verified",
            }))
        )
        .select();

    return { data: route, error };
}

async function updateRouteInDb(oldRouteId: string, updatedRoute: Route) {
    const supabase = supabaseServer();
    const { data: route, error } = await supabase
        .from("routes")
        .update({ ...updatedRoute, updated_at: new Date().toISOString() })
        .eq("id", oldRouteId)
        .select(`*, profiles (*)`)
        .single();
    if (error) throw new Error(error.message);
    return route;
}
// export async function sendUpdateEmail(
//     route: any,
//     oldRoute: Route,
//     updatedRoute: Route
// ) {
//     const emailHtml = await renderAsync(
//         RouteOfferUpdatesEmail({
//             newRoute: updatedRoute,
//             oldRoute: oldRoute,
//             username: route.profiles?.name,
//         })
//     );
//     if (route.profiles) {
//         transporter.sendMail({
//             from: process.env.SMTP_USER,
//             to: route.profiles.email || "notfound@mail.com",
//             cc: [
//                 route.profiles?.finance_department?.email,
//                 route.profiles?.noc_department?.email,
//                 route.profiles?.sales_department?.email,
//             ],
//             subject: `Your route offer has been updated`,
//             html: emailHtml,
//         });
//     }
// }

export async function deleteRoute(routeId: string) {
    const supabase = supabaseServer();
    const { error } = await supabase.from("routes").delete().eq("id", routeId);
    return { error };
}
