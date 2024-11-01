import getRouting from "@/app/vos/getRouting";
import TableSkeleton from "@/components/ui/table-skeleton";
import { Suspense } from "react";
import { GatewaysTable } from "./GatewaysTable";

export const revalidate = 0;

const RoutingGateways = async () => {
    const rates = await getRouting();

    return (
        <>
            <GatewaysTable data={rates?.data} />
        </>
    );
};

export default async function Page() {
    return (
        <div className=" ">
            <div className="mb-4 flex justify-between items-center ">
                <h1 className="text-2xl font-bold text-primary">
                    Routing Gateways
                </h1>
            </div>
            <Suspense fallback={<TableSkeleton />}>
                <RoutingGateways />
            </Suspense>
        </div>
    );
}
