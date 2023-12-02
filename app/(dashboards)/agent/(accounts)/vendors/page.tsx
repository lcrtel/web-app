import fetchUser from "@/app/post/fetchUser";
import { Skeleton } from "@/components/ui/skeleton";
import { supabaseServer } from "@/lib/supabase-server";
import { Suspense } from "react";
import AddVendor from "./AddVendor";
import { VendorsTable } from "./VendorsTable";

export const revalidate = 0;

const Vendors = async () => {
    const supabase = await supabaseServer();
    const user = await fetchUser();
    let { data: vendors, error } = await supabase
        .from("profiles")
        .select("*")
        .match({ agent_id: user?.id, role: "vendor" });

    let { data: routes } = await supabase.from("routes").select("*");

    const userRouteCount = routes?.reduce((acc, route) => {
        const { vendor_id } = route;
        if (acc.has(vendor_id)) {
            acc.set(vendor_id, acc.get(vendor_id) + 1);
        } else {
            acc.set(vendor_id, 1);
        }
        return acc;
    }, new Map());

    let { data: requests } = await supabase.from("targets").select("*");

    const userRouteRequestCount = requests?.reduce((acc, route) => {
        const { client_id } = route;
        if (acc.has(client_id)) {
            acc.set(client_id, acc.get(client_id) + 1);
        } else {
            acc.set(client_id, 1);
        }
        return acc;
    }, new Map());

    const vendorsWithRouteCounts = vendors?.map((user) => {
        const { id } = user;
        const routeCount = userRouteCount?.get(id) || 0;
        const routeRequestCount = userRouteRequestCount?.get(id) || 0;
        return { ...user, routes: routeCount, requests: routeRequestCount };
    });

    return <VendorsTable data={vendorsWithRouteCounts} />;
};

export default async function Page() {
    return (
        <div className=" ">
            <div className="mb-5 ">
                <div className="flex items-center mb-3 justify-between ">
                    <h2 className="text-2xl font-bold text-primary">Vendors</h2>
                    <AddVendor />
                </div>
            </div>

            <div className="flex flex-col gap-3 xl:flex-row w-full overflow-x-auto">
                <Suspense fallback={<Loader />}>
                    <Vendors />
                </Suspense>
            </div>
        </div>
    );
}

const Loader = () => {
    return (
        <div className="w-full">
            <div className="bg-surface border h-10 rounded-lg mb-4" />
            <div className="w-full border rounded-xl divide-y">
                <div className="bg-surface h-10 rounded-t-xl" />
                <div className="p-3">
                    <Skeleton className=" w-full h-6 rounded-md" />
                </div>
                <div className="p-3">
                    <Skeleton className=" w-full h-6 rounded-md" />
                </div>
                <div className="p-3">
                    <Skeleton className=" w-full h-6 rounded-md" />
                </div>
                <div className="p-3">
                    <Skeleton className=" w-full h-6 rounded-md" />
                </div>
                <div className="p-3">
                    <Skeleton className=" w-full h-6 rounded-md" />
                </div>
            </div>
        </div>
    );
};
