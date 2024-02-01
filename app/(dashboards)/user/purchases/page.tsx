import Loader from "@/components/Loader";
import { supabaseServer } from "@/lib/supabase-server";
import { fetchUserData } from "@/utils/user";
import { unstable_noStore } from "next/cache";
import { Suspense } from "react";
import { DeleteButton } from "./DeleteButton";
interface PurchaseRequestWithRoutes extends PurchaseRequest {
    routes: Route;
}
export default function PurchaseRequests() {
    return (
        <div>
            <h1 className="text-2xl tracking-tight font-bold">
                Purchase Requests
            </h1>
            <Suspense fallback={<Loader />}>
                <Requests />
            </Suspense>
        </div>
    );
}

async function Requests() {
    unstable_noStore();
    const user = await fetchUserData();
    const supabase = supabaseServer();
    let { data: purchase_requests }: any = await supabase
        .from("purchase_requests")
        .select(`*, routes (*)`)
        .match({ client_id: user?.id, status: "pending" });
    return purchase_requests?.length ? (
        <div className=" mt-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
                {purchase_requests?.map(
                    (purchaserequest: PurchaseRequestWithRoutes) => (
                        <PurchaserequestCard request={purchaserequest} key={purchaserequest.id} />
                    )
                )}
            </div>
        </div>
    ) : (
        <div className="gap-2 mt-4 h-12 text-center flex items-center text-sm  justify-center border py-10 rounded-lg">
            <p>No purchase requests found</p>
        </div>
    );
}
 const PurchaserequestCard = ({
    request,
}: {
    request: PurchaseRequestWithRoutes;
}) => {
    return (
        <div
            className="w-full  flex flex-col justify-between bg-slate-50 rounded-xl border "
        >
            <h2 className=" p-4 border-b capitalize">
                Status: {request.status}
            </h2>
            <div className="p-4">
                <h3 className=" text-base font-medium ">Route details:</h3>
                <div className="mb-2.5 grid grid-cols-2">
                    <div>
                        <p className=" text-xs text-gray-400">Destination</p>
                        <h4 className="text-base font-bold mr-3 uppercase text-primary">
                            {request.routes.destination}
                        </h4>
                    </div>
                    <div>
                        <p className=" text-xs text-gray-400">Code</p>
                        <h4 className="text-base font-bold mr-3 uppercase text-primary">
                            {request.routes.destination_code}
                        </h4>
                    </div>
                </div>
                <div className="mb-2">
                    <div className="mb-2.5 flex items-center">
                        <div className="flex-1">
                            <p className=" text-xs text-gray-400">Type</p>
                            <h4 className="text-base font-bold text-primary uppercase">
                                {request.routes.route_type}
                            </h4>
                        </div>
                        <div className="flex-1">
                            <p className=" text-xs text-gray-400">Rate</p>
                            <h4 className="text-base font-bold text-primary">
                                $ {request.routes.rate}
                            </h4>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2.5 rounded-xl bg-white p-2.5">
                        <div className="flex">
                            <div className="flex-1">
                                <p className=" text-[10px] text-gray-400">
                                    Prefix
                                </p>
                                <h4 className="text-sm font-semibold text-primary">
                                    {request.routes.prefix}
                                </h4>
                            </div>{" "}
                            <div className="flex-1">
                                <p className=" text-[10px] text-gray-400">
                                    PDD
                                </p>
                                <h4 className="text-sm font-semibold text-primary ">
                                    {request.routes.pdd}
                                </h4>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="flex-1">
                                <p className=" text-[10px] text-gray-400">
                                    ASR %
                                </p>
                                <h4 className="text-sm font-semibold text-primary">
                                    {request.routes.asr}
                                </h4>
                            </div>
                            <div className="flex-1">
                                <p className=" text-[10px] text-gray-400">
                                    ACD
                                </p>
                                <h4 className="text-sm font-semibold text-primary">
                                    {request.routes.acd}
                                </h4>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="flex-1">
                                <p className=" text-[10px] text-gray-400">
                                    Ports
                                </p>
                                <h4 className="text-sm font-semibold text-primary">
                                    {request.routes.ports}
                                </h4>
                            </div>
                            <div className="flex-1">
                                <p className=" text-[10px] text-gray-400">
                                    Capacity
                                </p>
                                <h4 className="text-sm font-semibold text-primary">
                                    {request.routes.capacity}
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
                <DeleteButton id={request.id} />
            </div>
        </div>
    );
};
