import { buttonVariants } from "@/components/ui/button";
import { supabaseServer } from "@/lib/supabase-server";
import { fetchUser } from "@/utils/user";
import Link from "next/link";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { RoutesTable } from "./RoutesTable";
import { Suspense } from "react";
import Loader from "@/components/Loader";
import { unstable_noStore } from "next/cache";

export default function MyRouteOffers() {
    return (
        <section className="">
            <div className="flex mb-5 justify-between items-center flex-wrap gap-2">
                <div>
                    <h3 className="text-2xl tracking-tight font-bold text-primary-900 flex items-center">
                        My Route Offers
                    </h3>
                    <p className="text-gray-400 text-sm">
                        View and manage your route offers
                    </p>
                </div>
                <Link
                    href="/u/post-offers"
                    className={`${buttonVariants({
                        variant: "default",
                        size: "icon",
                    })}`}
                >
                    <HiOutlinePlusCircle className="w-5 h-5" />
                </Link>
            </div>
            <Suspense fallback={<Loader />}>
                <RouteOffers />
            </Suspense>
        </section>
    );
}

async function RouteOffers() {
    unstable_noStore();
    const supabase = supabaseServer();
    const user = await fetchUser();
    if (user) {
        let { data: routes, error } = await supabase
            .from("routes")
            .select("*")
            .eq("vendor_id", user?.id);
        return <RoutesTable data={routes} />;
    }
}
