"use server";

import { supabaseServer } from "@/lib/supabase-server";
import { transporter } from "@/utils/smtp-transporter";
import { renderAsync } from "@react-email/render";
import RouteOfferUpdatesEmail from "../post-offers/[id]/RouteOfferUpdatesEmail";

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

export async function sendUpdateEmail(
  route: any,
  oldRoute: Route,
  updatedRoute: Route,
) {
  const emailHtml = await renderAsync(
    RouteOfferUpdatesEmail({
      newRoute: updatedRoute,
      oldRoute: oldRoute,
      username: route.profiles?.name,
    }),
  );
  if (route.profiles) {
    transporter.sendMail({
      from: process.env.SMTP_USER,
      to: route.profiles.email || "notfound@mail.com",
      cc: [
        route.profiles?.finance_department?.email,
        route.profiles?.noc_department?.email,
        route.profiles?.sales_department?.email,
      ],
      subject: `Your route offer has been updated`,
      html: emailHtml,
    });
  }
}

export async function deleteRoute(routeId: string) {
  const supabase = supabaseServer();
  const { error } = await supabase.from("routes").delete().eq("id", routeId);
  return { error };
}
