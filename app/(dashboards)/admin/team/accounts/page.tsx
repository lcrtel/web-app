import Loader from "@/components/Loader";
import { supabaseServer } from "@/lib/supabase-server";
import { unstable_noStore } from "next/cache";
import { Suspense } from "react";
import { AccountantsTable } from "./AccountantsTable";
import { AddAccountant } from "./AddAccountant";

export default function AccountantsPage() {
    return (
        <div className="">
            <div className="flex pb-4 justify-between items-center">
                <h2 className="font-bold tracking-tight text-2xl">
                    Accountants
                </h2>
                <AddAccountant />
            </div>
            <div className="flex flex-col gap-3 xl:flex-row w-full overflow-x-auto">
                <Suspense fallback={<Loader />}>
                    <Accountants />
                </Suspense>
            </div>
        </div>
    );
}
const Accountants = async () => {
    unstable_noStore();
    const supabase = supabaseServer();
    let { data: accountants, error } = await supabase
        .from("profiles")
        .select("*")
        .match({ role: "accountant" });

    return <AccountantsTable data={accountants} />;
};
