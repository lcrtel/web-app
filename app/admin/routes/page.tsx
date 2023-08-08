import Link from "next/link";
import { supabaseServer } from "@/lib/supabase-server";
import { RoutesTable } from "./routes-table";

export const revalidate = 60; // revalidate this page every 60 seconds

export default async function Page() {
    const supabase = supabaseServer();
    let { data: routes, error } = await supabase.from("routes").select("*");
    return (
        <div className="">
            <div className="flex mb-4 justify-between items-center">
                <h3 className="text-lg  font-semibold text-primary-500">
                    Routes
                </h3>
            </div>
            <RoutesTable data={routes} />
        </div>
    );
}
