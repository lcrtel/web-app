"use server";

import { supabaseServer } from "@/lib/supabase-server";
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";

export async function fetchUnVerfiedRoutes() {
  const supabase = await supabaseAdminServer();
  const { data: routes, error } = await supabase
    .from("routes")
    .select(`*, profiles (name, company_name)`)
    .neq("verification", "verified");

  if (error) {
    return null;
  }

  if (!routes) {
    return [];
  }

  return routes.map((route: any) => {
    const profiles = route?.profiles ?? {};
    const { name, company_name } = profiles;
    return {
      ...route,
      vendor: name,
      vendor_company: company_name,
    };
  });
}

export async function fetchVerfiedRoutes() {
  const supabase = await supabaseAdminServer();
  const { data: routes, error } = await supabase
    .from("routes")
    .select(`*, profiles (name, company_name)`);

  if (error) {
    return null;
  }

  if (!routes) {
    return [];
  }

  return routes.map((route: any) => {
    const { profiles } = route ?? {};
    const { name, company_name } = profiles ?? {};
    const newRoute = { ...route };
    delete newRoute.profiles;
    newRoute.vendor = name;
    newRoute.vendor_company = company_name;
    return newRoute;
  });
}

export async function deleteRoutes(ids: string[]) {
  const supabase = await supabaseAdminServer();
  return await supabase.from("routes").delete().in("id", ids);
}
