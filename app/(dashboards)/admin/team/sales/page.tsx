import Loader from "@/components/Loader";
import { supabaseServer } from "@/lib/supabase-server";
import { unstable_noStore } from "next/cache";
import { Suspense } from "react";
import { AddSalesMan } from "./AddSalesMan";
import { SalesMenTable } from "./SalesMenTable";

export default function ManagersPage() {
    return (
        <div className="">
            <div className="flex pb-4 justify-between items-center">
                <h2 className="font-bold tracking-tight text-2xl">Sales</h2>
                <AddSalesMan />
            </div>
            <div className="flex flex-col gap-3 xl:flex-row w-full overflow-x-auto">
                <Suspense fallback={<Loader />}>
                    <Salesmen />
                </Suspense>
            </div>
        </div>
    );
}
const Salesmen = async () => {
    unstable_noStore();
    const supabase = supabaseServer();
    let { data: managers, error } = await supabase
        .from("profiles")
        .select("*")
        .match({ role: "salesman" });

    return <SalesMenTable data={managers} />;
};
