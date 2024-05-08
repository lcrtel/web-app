import Loader from "@/components/Loader";
import { supabaseServer } from "@/lib/supabase-server";
import { unstable_noStore } from "next/cache";
import { Suspense } from "react";
import { AddNOC } from "./AddNOC";
import { NOCTable } from "./NOCTable";

export default function ManagersPage() {
    return (
        <div className="">
            <div className="flex pb-4 justify-between items-center">
                <h2 className="font-bold tracking-tight text-2xl">NOC</h2>
                <AddNOC />
            </div>
            <div className="flex flex-col gap-3 xl:flex-row w-full overflow-x-auto">
                <Suspense fallback={<Loader />}>
                    <NOC />
                </Suspense>
            </div>
        </div>
    );
}
const NOC = async () => {
    unstable_noStore();
    const supabase = supabaseServer();
    let { data: noc, error } = await supabase
        .from("profiles")
        .select("*")
        .match({ role: "noc" });

    return <NOCTable data={noc} />;
};
