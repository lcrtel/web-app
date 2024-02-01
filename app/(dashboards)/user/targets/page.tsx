import fetchUser from "@/app/(public)/post/fetchUser";
import Loader from "@/components/Loader";
import { supabaseServer } from "@/lib/supabase-server";
import { unstable_noStore } from "next/cache";
import { Suspense } from "react";
import { TargetsTable } from "./targets-table";

export default async function Page() {
    return (
        <div className="">
            <h3 className="text-2xl font-bold text-primary-500 flex items-center tracking-tight">
                Target Rates
            </h3>
            <p className="text-sm text-slate-400 mb-4">
                Explore our target rates
            </p>
            <Suspense fallback={<Loader />}>
                <TargetRates />
            </Suspense>
        </div>
    );
}

async function TargetRates() {
    unstable_noStore();
    const user = await fetchUser();
    const supabase = supabaseServer();
    let { data: targets, error } = await supabase
        .from("targets")
        .select("*")
        .neq("client_id", user?.id);
    return targets?.length ? (
        <TargetsTable data={targets} />
    ) : (
        <div className="gap-2  h-12 text-center flex items-center justify-center bg-surface py-10 rounded-lg">
            <p>No target rates yet</p>
        </div>
    );
}
