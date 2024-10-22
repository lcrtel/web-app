import Loader from "@/components/Loader";
import { supabaseServer } from "@/lib/supabase-server";
import { fetchUser } from "@/utils/user";
import { unstable_noStore } from "next/cache";
import { Suspense } from "react";
import { DeleteButton } from "../purchases/DeleteButton";
import { PurchaseRequestForm } from "./PurchaseRequestForm";

export default function Page() {
  return (
    <section className="flex flex-col gap-5">
      <h1 className="text-2xl font-bold tracking-tight">Selected Routes</h1>
      <Suspense fallback={<Loader />}>
        <SelectedRoutes />
      </Suspense>
    </section>
  );
}

async function SelectedRoutes() {
  unstable_noStore();
  const supabase = supabaseServer();
  const user = await fetchUser();

  const { data: selectedRoutes } = await supabase
    .from("selected_routes")
    .select(`*, routes (*)`)
    .match({ user_id: user?.id });

  const { data: purchaseRequests } = await supabase
    .from("purchases")
    .select(`*, routes (*)`)
    .match({ client_id: user?.id, status: "pending" });
  return (
    <>
      {selectedRoutes?.length ? (
        <div className="grid w-full gap-4">
          <PurchaseRequestForm
            purchaseRequest={purchaseRequests?.[0]}
            selectedRoutes={selectedRoutes}
            user={user}
          />
        </div>
      ) : (
        <div className="flex h-[30vh] items-center justify-center rounded-lg border">
          <p className="text-center text-slate-400">Your cart is empty</p>
        </div>
      )}
      <div className=" ">
        <div className="mb-5 flex justify-between">
          <h3 className="text-xl font-semibold tracking-tight">
            Purchases
          </h3>
        </div>
        {purchaseRequests?.length ? (
          <div className="grid w-full gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {purchaseRequests?.map((purchaseRequest: any) => (
              <PurchaserequestCard
                request={purchaseRequest}
                key={purchaseRequest.id}
              />
            ))}
          </div>
        ) : (
          <div className="flex h-[30vh] items-center justify-center rounded-lg border">
            <p className="text-center text-slate-400">No Purchase Requsts</p>
          </div>
        )}
      </div>
    </>
  );
}
const PurchaserequestCard = ({ request }: { request: any }) => {
  return (
    <div className="flex w-full flex-col justify-between rounded-xl border bg-slate-50">
      <h2 className="border-b p-4 capitalize">Status: {request.status}</h2>
      <div className="p-4">
        <h3 className="text-base font-medium">Route details:</h3>
        <div className="mb-2.5 grid grid-cols-2">
          <div>
            <p className="text-xs text-gray-400">Destination</p>
            <h4 className="text-primary mr-3 text-base font-bold uppercase">
              {request.routes.destination}
            </h4>
          </div>
          <div>
            <p className="text-xs text-gray-400">Prefix</p>
            <h4 className="text-primary mr-3 text-base font-bold uppercase">
              {request.routes.destination_code}
            </h4>
          </div>
        </div>
        <div className="mb-2">
          <div className="mb-2.5 flex items-center">
            <div className="flex-1">
              <p className="text-xs text-gray-400">Type</p>
              <h4 className="text-primary text-base font-bold uppercase">
                {request.routes.route_type}
              </h4>
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-400">Rate</p>
              <h4 className="text-primary text-base font-bold">
                $ {request.routes.rate}
              </h4>
            </div>
          </div>
          <div className="flex flex-col gap-2.5 rounded-xl bg-white p-2.5">
            <div className="flex">
              <div className="flex-1">
                <p className="text-[10px] text-gray-400">PDD</p>
                <h4 className="text-primary text-sm font-semibold">
                  {request.routes.pdd}
                </h4>
              </div>
            </div>
            <div className="flex">
              <div className="flex-1">
                <p className="text-[10px] text-gray-400">ASR</p>
                <h4 className="text-primary text-sm font-semibold">
                  {request.routes.asr}%
                </h4>
              </div>
              <div className="flex-1">
                <p className="text-[10px] text-gray-400">ACD</p>
                <h4 className="text-primary text-sm font-semibold">
                  {request.routes.acd}
                </h4>
              </div>
            </div>
            <div className="flex">
              <div className="flex-1">
                <p className="text-[10px] text-gray-400">Ports</p>
                <h4 className="text-primary text-sm font-semibold">
                  {request.routes.ports}
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
