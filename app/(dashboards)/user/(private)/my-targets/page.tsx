import Loader from "@/components/Loader";
import { buttonVariants } from "@/components/ui/button";
import { supabaseServer } from "@/lib/supabase-server";
import { fetchUser } from "@/utils/user";
import { unstable_noStore } from "next/cache";
import Link from "next/link";
import { Suspense } from "react";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { TargetsTable } from "./TargetsTable";

export default function MyTargetRates() {
    return (
        <section className="">
            <div className="flex mb-5 justify-between items-center flex-wrap gap-2">
                <div>
                    <h3 className="text-2xl tracking-tight font-bold text-primary-900 flex items-center">
                        My Target Rates
                    </h3>
                    <p className="text-gray-500 text-sm">
                        View and manage your target rates
                    </p>
                </div>
                <Link
                    href="/user/post-targets"
                    className={`${buttonVariants({
                        variant: "default",
                        size: "icon",
                    })}`}
                >
                    <HiOutlinePlusCircle className="w-5 h-5" />
                </Link>
            </div>
            <Suspense fallback={<Loader />}>
                <Targets />
            </Suspense>
        </section>
    );
}

async function Targets() {
    unstable_noStore();
    const supabase = supabaseServer();
    const user = await fetchUser();
    let { data: routes, error } = await supabase
        .from("targets")
        .select("*")
        .match({ client_id: user?.id });
    return <TargetsTable data={routes} />;
}
