"use server";

import { supabaseServer } from "@/lib/supabase-server";
import { add20Percent } from "@/utils/rateHikes";
import { transporter } from "@/utils/smtp-transporter";
import { fetchUser } from "@/utils/user";
import { renderAsync } from "@react-email/render";
import RouteOfferUpdatesEmail from "../post-offers/[id]/RouteOfferUpdatesEmail";

export async function insertRoutesInDb(newRoutes: Route[]) {
  const user = await fetchUser();
  const supabase = supabaseServer();

  if (!user) {
    await supabase.auth.signInAnonymously();
  }
  const { data: route, error } = await supabase.from("routes").insert(
    newRoutes.map((newRoute: Route) => ({
      destination: newRoute.destination,
      destination_code: newRoute.destination_code,
      rate: newRoute.rate,
      selling_rate: add20Percent(Number(newRoute.rate)),
      route_type: newRoute.route_type,
      asr: newRoute.asr,
      acd: newRoute.acd,
      ports: newRoute.ports,
      pdd: newRoute.pdd,
      created_at: new Date().toISOString(),
    })),
  );

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
