import getMapping from "@/app/vos/getMapping";
import TableSkeleton from "@/components/ui/table-skeleton";
import { Suspense } from "react";
import { MappingGatewaysTable } from "./MappingGatewaysTable";

export const revalidate = 60;

const RoutingGateways = async () => {
    const rates = await getMapping();

    return (
        <>
            <MappingGatewaysTable data={rates?.data} />
        </>
    );
};

export default async function Page() {
    return (
        <div className=" ">
            <div className="mb-4 flex justify-between items-center ">
                <h1 className="text-2xl font-bold text-primary">
                    Mapping Gateways
                </h1>
            </div>
            <Suspense fallback={<TableSkeleton />}>
                <RoutingGateways />
            </Suspense>
        </div>
    );
}
