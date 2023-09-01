import { supabaseServer } from "@/lib/supabase-server";
import { fetchUserData } from "@/utils/user";
import { PurchaseRequestForm } from "./PurchaseRequestForm";
import RealTimePurchaseRequests from "./RealTimePurchaseRequests";

export default async function Page() {
    const supabase = supabaseServer();
    const user = await fetchUserData();
    const { data: selectedRoutes, error } = await supabase
        .from("selected_routes")
        .select(`*, route_offers (*)`)
        .eq("user_id", user?.id);
    const { data: purchaseRequests } = await supabase
        .from("purchase_requests")
        .select(`*, route_offers (*)`)
        .match({ buyer_id: user?.id, status: "pending" });

    return (
        <section className="flex gap-5 ">
            <div className="w-full">
                <div className="flex my-5 justify-between">
                    <h3 className="text-2xl tracking-tight font-bold">
                        Selected Routes
                    </h3>
                </div>
                {selectedRoutes?.length ? (
                    <div className="grid gap-4 w-full">
                        {selectedRoutes?.map((item) => (
                            <div key={item.id}>
                                <PurchaseRequestForm
                                    selectedRoute={item}
                                    user={user}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="border rounded-lg py-5">
                        <p className="font-medium tracking-tight text-center">
                            No Route Selected
                        </p>
                    </div>
                )}
            </div>
            <div className="w-1/3 hidden md:block">
                <div className="flex my-5 justify-between">
                    <h3 className="text-2xl tracking-tight font-bold">
                        Purchase Requests
                    </h3>
                </div>
                {purchaseRequests?.length ? (
                    <div className="grid gap-2 w-full">
                        <RealTimePurchaseRequests
                            purchaseRequests={purchaseRequests}
                        />
                    </div>
                ) : (
                    <div className="border rounded-lg py-5">
                        <p className="font-medium tracking-tight text-center">
                            No Purchase Requsts
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}
