import fetchUser from "@/app/(public)/post/fetchUser";
import { Skeleton } from "@/components/ui/skeleton";
import { supabaseServer } from "@/lib/supabase-server";
import { Suspense } from "react";
import { ClientsTable } from "../../../clients/ClientsTable";

export const revalidate = 0;

const Clients = async ({ agentID }: { agentID: string }) => {
    const supabase = supabaseServer();
    let { data: clients, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("agent_id", agentID)
        .or(`role.eq.client,role.eq.vendor`);

    let { data: targets } = await supabase.from("targets").select("*");

    const userRouteCounts = targets?.reduce((acc, route) => {
        const { client_id } = route;
        if (acc.has(client_id)) {
            acc.set(client_id, acc.get(client_id) + 1);
        } else {
            acc.set(client_id, 1);
        }
        return acc;
    }, new Map());

    const clientsWithTargetCounts = clients?.map((user) => {
        const { id } = user;
        const targetCount = userRouteCounts?.get(id) || 0;
        return { ...user, targets: targetCount };
    });

    return <ClientsTable data={clientsWithTargetCounts} />;
};

export default async function Page({ params }: { params: { id: string } }) {
    return (
        <div className=" ">
            <div className="mb-5 ">
                <div className="flex items-center mb-3 justify-between ">
                    <h2 className="text-lg font-semibold tracking-tight">
                        Clients
                    </h2>
                </div>
            </div>

            <div className="flex flex-col gap-3 xl:flex-row w-full overflow-x-auto">
                <Suspense fallback={<Loader />}>
                    <Clients agentID={params.id} />
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
