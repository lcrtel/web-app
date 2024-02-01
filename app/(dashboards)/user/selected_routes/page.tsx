import Loader from "@/components/Loader";
import { supabaseServer } from "@/lib/supabase-server";
import { fetchUserData } from "@/utils/user";
import { unstable_noStore } from "next/cache";
import { Suspense } from "react";
import { PurchaseRequestForm } from "./PurchaseRequestForm";
import { DeleteButton } from "../purchases/DeleteButton";
interface PurchaseRequestWithRoutes extends PurchaseRequest {
    routes: Route;
}
export default function Page() {
    return (
        <section className="flex gap-5 flex-col ">
            <h1 className="text-2xl tracking-tight font-bold">Selected Routes</h1>
            <Suspense fallback={<Loader />}>
                <SelectedRoutes />
            </Suspense>
        </section>
    );
}

async function SelectedRoutes() {
    unstable_noStore();
    const supabase = supabaseServer();
    const user = await fetchUserData();

    const { data: selectedRoutes } = await supabase
        .from("selected_routes")
        .select(`*, routes (*)`)
        .match({ user_id: user?.id });

    const { data: purchaseRequests } = await supabase
        .from("purchase_requests")
        .select(`*, routes (*)`)
        .match({ client_id: user?.id, status: "pending" });
    return (
        <>
            {selectedRoutes?.length ? (
                <div className="grid gap-4 w-full">
                    <PurchaseRequestForm
                        purchaseRequest={purchaseRequests?.[0]}
                        selectedRoutes={selectedRoutes}
                        user={user}
                    />
                </div>
            ) : (
                <div className="border rounded-lg h-[30vh] flex items-center justify-center">
                    <p className=" text-slate-400  text-center">
                        Your cart is empty
                    </p>
                </div>
            )}
            <div className=" ">
                <div className="flex mb-5 justify-between">
                    <h3 className="text-xl tracking-tight font-semibold">
                        Purchase Requests
                    </h3>
                </div>
                {purchaseRequests?.length ? (
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 w-full">
                        {purchaseRequests?.map((purchaseRequest: any) => (
                            <PurchaserequestCard request={purchaseRequest} key={purchaseRequest.id} />
                        ))}
                    </div>
                ) : (
                    <div className="border rounded-lg h-[30vh] flex items-center justify-center">
                        <p className=" text-slate-400 text-center">
                            No Purchase Requsts
                        </p>
                    </div>
                )}
            </div>
        </>
    );
}
 const PurchaserequestCard = ({
     request,
 }: {
     request: PurchaseRequestWithRoutes;
 }) => {
     return (
         <div className="w-full  flex flex-col justify-between bg-slate-50 rounded-xl border ">
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