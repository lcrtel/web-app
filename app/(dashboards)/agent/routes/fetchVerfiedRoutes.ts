"use server"

import { supabaseServer } from "@/lib/supabase-server";
import { fetchUserData } from "@/utils/user";

export async function fetchVerfiedRoutes() {
    const supabase = supabaseServer();
    const user: any = await fetchUserData();

    let { data: vendors, error } = await supabase
        .from("profiles")
        .select("*")
        .match({ role: "vendor", agent_id: user.id });

    let { data: verified_routes } = await supabase
        .from("routes")
        .select("*")
        .eq("verification", "verified");
        

    function addVendorNameToRoutes(routes: any, users: any) {
        return routes
            .filter((route: any) =>
                users.some((user: any) => user.id === route.vendor_id)
            )
            .map((route: any) => {
                const { vendor_id } = route;
                const user = users.find((user: any) => user.id === vendor_id);
                const vendorName = user ? user.name : null;
                const vendorCompany = user ? user.company_name : null;

                return {
                    ...route,
                    vendor: vendorName,
                    vendor_company: vendorCompany,
                };
            });
    }

    const data = addVendorNameToRoutes(verified_routes, vendors);


    return data;
}

