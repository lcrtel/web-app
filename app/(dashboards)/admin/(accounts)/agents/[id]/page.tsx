import { Skeleton } from "@/components/ui/skeleton";
import { supabaseServer } from "@/lib/supabase-server";
import Link from "next/link";
import { Suspense } from "react";
import { HiArrowRight } from "react-icons/hi";

export const revalidate = 0;

const Vendors = async ({
    agentID,
    supabase,
}: {
    agentID: string;
    supabase: any;
}) => {
    let { data: vendors, error } = await supabase
        .from("profiles")
        .select("*")
        .match({ agent_id: agentID, role: "vendor" });

    return (
        <p className="font-bold tracking-tight text-3xl ">{vendors.length}</p>
    );
};
const Clients = async ({
    agentID,
    supabase,
}: {
    agentID: string;
    supabase: any;
}) => {
    let { data: clients, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("agent_id", agentID)
        .or(`role.eq.client,role.eq.vendor`);

    return (
        <p className="font-bold tracking-tight text-3xl ">{clients.length}</p>
    );
};
const RouteOffers = async ({
    agentID,
    supabase,
}: {
    agentID: string;
    supabase: any;
}) => {
    let { data: verified_routes } = await supabase
        .from("routes")
        .select(`*, profiles (agent_id)`)
        .match({ verification: "verified" });

    let routes = verified_routes?.filter(
        (offer: any) => offer.profiles?.agent_id === agentID
    );

    return (
        <p className="font-bold tracking-tight text-3xl ">{routes.length}</p>
    );
};

const RouteRequests = async ({
    agentID,
    supabase,
}: {
    agentID: string;
    supabase: any;
}) => {
    let { data: routeRequests, error } = await supabase
        .from("targets")
        .select(`*, profiles (agent_id)`);

    let requests = routeRequests?.filter(
        (offer: any) => offer.profiles?.agent_id === agentID
    );
    return (
        <p className="font-bold tracking-tight text-3xl ">{requests.length}</p>
    );
};
const Purchases = async ({
    agentID,
    supabase,
}: {
    agentID: string;
    supabase: any;
}) => {
    let { data: routeRequests, error } = await supabase
        .from("purchase_requests")
        .select(`*, profiles (agent_id)`)
        .eq("profiles.agent_id", agentID)
        .match({ status: "approved" });
    let purchases = routeRequests?.filter(
        (offer: any) => offer.profiles?.agent_id === agentID
    );
    return (
        <p className="font-bold tracking-tight text-3xl ">{purchases.length}</p>
    );
};

export default async function Page({ params }: { params: { id: string } }) {
    const supabase = supabaseServer();
    return (
        <section className="">
            <div className="grid  sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 max-w-7xl gap-4 md:gap-5 items-start">
                <Link
                    href={`/admin/agents/${params.id}/vendors`}
                    className="hover:bg-slate-50 hover:shadow-lg transition-all space-y-2 ease-in duration-300 border rounded-xl p-4 md:p-5 active:scale-[95%]"
                >
                    <h3 className="text-sm font-medium text-gray-400 tracking-tight flex items-center justify-between">
                        Vendors <HiArrowRight className="" />
                    </h3>
                    <Suspense
                        fallback={
                            <Skeleton className="h-9 border rounded-xl " />
                        }
                    >
                        <Vendors agentID={params.id} supabase={supabase} />
                    </Suspense>
                </Link>
                <Link
                    href={`/admin/agents/${params.id}/clients`}
                    className="hover:bg-slate-50 hover:shadow-lg transition-all space-y-2 ease-in duration-300 border rounded-xl p-4 md:p-5 active:scale-[95%]"
                >
                    <h3 className="text-sm font-medium text-gray-400 tracking-tight flex items-center justify-between">
                        Clients <HiArrowRight className="" />
                    </h3>
                    <Suspense
                        fallback={
                            <Skeleton className="h-9 border rounded-xl " />
                        }
                    >
                        <Clients agentID={params.id} supabase={supabase} />
                    </Suspense>
                </Link>
                <div className="hover:bg-slate-50 hover:shadow-lg transition-all space-y-2 ease-in duration-300 border rounded-xl p-4 md:p-5 active:scale-[95%]">
                    <h3 className="text-sm font-medium text-gray-400 tracking-tight flex items-center justify-between">
                        Route Offers
                         {/* <HiArrowRight className="" /> */}
                    </h3>
                    <Suspense
                        fallback={
                            <Skeleton className="h-9 border rounded-xl " />
                        }
                    >
                        <RouteOffers agentID={params.id} supabase={supabase} />
                    </Suspense>
                </div>
                <div className="hover:bg-slate-50 hover:shadow-lg transition-all space-y-2 ease-in duration-300 border rounded-xl p-4 md:p-5 active:scale-[95%]">
                    <h3 className="text-sm font-medium text-gray-400 tracking-tight flex items-center justify-between">
                        Route Requests 
                        {/* <HiArrowRight className="" /> */}
                    </h3>
                    <Suspense
                        fallback={
                            <Skeleton className="h-9 border rounded-xl " />
                        }
                    >
                        <RouteRequests
                            agentID={params.id}
                            supabase={supabase}
                        />
                    </Suspense>
                </div>
                <div className="hover:bg-slate-50 hover:shadow-lg transition-all space-y-2 ease-in duration-300 border rounded-xl p-4 md:p-5 active:scale-[95%]">
                    <h3 className="text-sm font-medium text-gray-400 tracking-tight flex items-center justify-between">
                        Purchases
                        {/* <HiArrowRight className="" /> */}
                    </h3>
                    <Suspense
                        fallback={
                            <Skeleton className="h-9 border rounded-xl " />
                        }
                    >
                        <Purchases agentID={params.id} supabase={supabase} />
                    </Suspense>
                </div>
            </div>
        </section>
    );
}
