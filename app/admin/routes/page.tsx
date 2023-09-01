import { supabaseAdmin } from "@/lib/supabase-admin";
import RoutesNav from "./nav";
import { RoutesTable } from "./routes-table";

export default async function Page() {
    const supabase = supabaseAdmin();
    let { data: verified_routes } = await supabase
        .from("route_offers")
        .select("*")
        .eq("verification", "verified");
    let { data: unverified_routes } = await supabase
        .from("route_offers")
        .select("*")
        .eq("verification", "pending");
    return (
        <div className="h-full">
            <div className="mb-3">
                <RoutesNav />
            </div>
            <div className="h-full">
                <div className="w-full max-h-[50%] overflow-y-auto">
                    <h2 className="font-semibold text-lg mb-3">
                        Non Verified Routes
                    </h2>
                    <RoutesTable data={unverified_routes} />
                </div>
                <div className="w-full max-h-[50%] overflow-y-auto mt-3">
                    <h2 className="font-semibold text-lg mb-3">
                        Verified Routes
                    </h2>
                    <RoutesTable data={verified_routes} />
                </div>
            </div>
        </div>
    );
}
