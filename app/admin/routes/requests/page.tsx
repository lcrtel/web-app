import { supabaseServer } from "@/lib/supabase-server";
import { RoutesTable } from "./routes-table";
import RoutesNav from "../nav";

export const revalidate = 60; // revalidate this page every 60 seconds

export default async function Page() {
    const supabase = supabaseServer();
    let { data: pending_requests } = await supabase
        .from("route_requests")
        .select("*")
        .match({ status: "pending" });
    let { data: fulfilled_requests } = await supabase
        .from("route_requests")
        .select("*")
        .match({ status: "fulfilled" });
    return (
        <div className="">
            <div className="mb-5">
                <RoutesNav />
            </div>
            <div className="w-full max-h-[500px] overflow-y-auto">
                <h2 className="font-semibold text-lg mb-3">Pending Requests</h2>
                <RoutesTable data={pending_requests} />
            </div>
            <div className="w-full max-h-[500px] overflow-y-auto mt-3">
                <h2 className="font-semibold text-lg mb-3">
                    Fulfilled Requests
                </h2>
                <RoutesTable data={fulfilled_requests} />
            </div>
        </div>
    );
}
