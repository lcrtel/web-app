import Link from "next/link";
import { supabaseServer } from "@/lib/supabase-server";
import { RoutesTable } from "./routes-table";
import { buttonVariants } from "@/components/ui/button";
import { HiOutlinePlusCircle } from "react-icons/hi";
import RoutesNav from "./nav";

export const revalidate = 60; // revalidate this page every 60 seconds

export default async function Page() {
    const supabase = supabaseServer();
    let { data: verified_routes } = await supabase
        .from("route_posts")
        .select("*")
        .match({ status: "verified" });
    let { data: non_verified_routes } = await supabase
        .from("route_posts")
        .select("*")
        .match({ status: "not_verified" });
    return (
        <div className="h-full">
            <div className="mb-3">
                <RoutesNav />
            </div>
            <div className="h-full">
                <div className="w-full max-h-[50%] overflow-y-auto">
                    <h2 className="font-semibold text-lg mb-3">
                        Verified Routes
                    </h2>
                    <RoutesTable data={verified_routes} />
                </div>
                <div className="w-full max-h-[50%] overflow-y-auto mt-3">
                    <h2 className="font-semibold text-lg mb-3">
                        Non Verified Routes
                    </h2>
                    <RoutesTable data={non_verified_routes} />
                </div>
            </div>
        </div>
    );
}
