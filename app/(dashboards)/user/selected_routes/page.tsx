import Loader from "@/components/Loader";
import { supabaseServer } from "@/lib/supabase-server";
import { fetchUserData } from "@/utils/user";
import { unstable_noStore } from "next/cache";
import { Suspense } from "react";
import { PurchaserequestCard } from "../purchases/page";
import { PurchaseRequestForm } from "./PurchaseRequestForm";

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
