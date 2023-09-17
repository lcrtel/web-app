import { supabaseAdmin } from "@/lib/supabase-admin";
import RoutesNav from "../nav";
import { RoutesTable } from "./routes-table";

export const revalidate = 0; // revalidate this page every 60 seconds

export default async function Page() {
    const supabase = supabaseAdmin();
    let { data: pending_requests } = await supabase
        .from("buying_targets")
        .select("*")
        .match({ status: "pending" });
    return (
        <div className="">
            <div className="mb-5">
                <RoutesNav />
            </div>
            <div className="w-full max-h-[500px] overflow-y-auto">
                <h2 className="font-semibold text-lg mb-3">Buying Targets</h2>
                <RoutesTable data={pending_requests} />
            </div>
        </div>
    );
}
