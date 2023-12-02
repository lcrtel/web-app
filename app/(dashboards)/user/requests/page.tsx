import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { supabaseServer } from "@/lib/supabase-server";
import { TargetsTable } from "./targets-table";

export const revalidate = 0; // revalidate this page every 60 seconds

export default async function Page() {
    const supabase = await supabaseServer();
    let { data: routes, error } = await supabase
        .from("targets")
        .select("*");
    return (
        <div className="">
            <h3 className="text-2xl font-bold text-primary-500 flex items-center tracking-tight">
                Route Requests
            </h3>
            <p className="text-sm text-slate-400 mb-4">
                Explore our requested rates
            </p>
            {routes?.length ? (
                <TargetsTable data={routes} />
            ) : (
                <div className="gap-2  h-12 text-center flex items-center justify-center bg-surface py-10 rounded-lg">
                    <p>No requests yet</p>
                    {/* <Link
                        href="/user/routes/requests/request"
                        className="bg-primary-500 px-3 ml-2 py-2 text-white rounded-md"
                    >
                        Request
                    </Link> */}
                </div>
            )}
        </div>
    );
}
