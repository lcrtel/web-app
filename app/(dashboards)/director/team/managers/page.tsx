import React, { Suspense } from "react";
import { AddManager } from "./AddManager";
import Loader from "@/components/Loader";
import { unstable_noStore } from "next/cache";
import { supabaseServer } from "@/lib/supabase-server";
import { ManagersTable } from "./ManagersTable";

export default function ManagersPage() {
    return (
        <div className="">
            <div className="flex pb-4 justify-between items-center">
                <h2 className="font-bold tracking-tight text-2xl">Managers</h2>
                <AddManager />
            </div>
            <div className="flex flex-col gap-3 xl:flex-row w-full overflow-x-auto">
                <Suspense fallback={<Loader />}>
                    <Managers />
                </Suspense>
            </div>
        </div>
    );
}
const Managers = async () => {
    unstable_noStore();
    const supabase = supabaseServer();
    let { data: managers, error } = await supabase
        .from("profiles")
        .select("*")
        .match({ role: "manager" });

    return <ManagersTable data={managers} />;
};
