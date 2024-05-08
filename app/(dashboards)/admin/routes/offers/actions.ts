"use server";

import { supabaseServer } from "@/lib/supabase-server";

export async function fetchUnVerfiedRoutes() {
    const supabase = supabaseServer();
    let { data: routes } = await supabase
        .from("routes")
        .select(`*, profiles (name, company_name)`).neq("verification", "verified");

    routes?.forEach((route: any) => {
        const { name, company_name } = route.profiles;
        delete route.profiles;
        route.vendor = name;
        route.vendor_company = company_name;
    });
    return routes;
}

export async function fetchVerfiedRoutes() {
    const supabase = supabaseServer();
    let { data: routes } = await supabase
        .from("routes")
        .select(`*, profiles (name, company_name)`);

    routes?.forEach((route: any) => {
        const { name, company_name } = route.profiles;
        delete route.profiles;
        route.vendor = name;
        route.vendor_company = company_name;
    });
    return routes;
}
