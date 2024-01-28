import { supabaseServer } from "@/lib/supabase-server";
import { fetchUserData } from "@/utils/user";
import { PurchaseRequestForm } from "./PurchaseRequestForm";
import RealTimePurchaseRequests from "./RealTimePurchaseRequests";
export const revalidate = 0;
export default async function Page() {
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
        <section className="flex gap-5 flex-col ">
            <div className="w-full">
                <div className="flex mb-4 justify-between">
                    <h3 className="text-2xl tracking-tight font-bold flex items-center gap-2">
                        Cart{" "}
                        <span className="inline-flex items-center justify-center w-6 h-6  text-sm rounded-full bg-surface">
                            {selectedRoutes?.length}
                        </span>
                    </h3>
                </div>
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
            </div>
            <div className=" ">
                <div className="flex mb-5 justify-between">
                    <h3 className="text-xl tracking-tight font-semibold">
                        Purchase Requests
                    </h3>
                </div>
                {purchaseRequests?.length ? (
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 w-full">
                        <RealTimePurchaseRequests
                            purchaseRequests={purchaseRequests}
                        />
                    </div>
                ) : (
                    <div className="border rounded-lg h-[30vh] flex items-center justify-center">
                        <p className=" text-slate-400 text-center">
                            No Purchase Requsts
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}
