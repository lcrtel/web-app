import Link from "next/link";
import { supabaseServer } from "@/lib/supabase-server";
import { RoutesTable } from "./routes-table";
import { buttonVariants } from "@/components/ui/button";
import { HiOutlinePlusCircle } from "react-icons/hi";
import RoutesNav from "../nav";

export const revalidate = 60; // revalidate this page every 60 seconds

export default async function Page() {
    const supabase = supabaseServer();
    let { data: routes, error } = await supabase
        .from("route_requests")
        .select("*")
        .match({ status: "sold" });
    return (
        <div className="">
            <div className="mb-5">
                <RoutesNav />
            </div>
            <h2 className="font-semibold text-lg mb-3">Sold Routes</h2>
            <RoutesTable data={routes} />
        </div>
    );
}
