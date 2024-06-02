import { EditRoute } from "@/app/(dashboards)/admin/routes/offers/[id]/EditRoute";
import Loader from "@/components/Loader";
import { supabaseServer } from "@/lib/supabase-server";
import formatDate from "@/utils/formatDate";
import { Suspense } from "react";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1 className="text-lg font-semibold tracking-tight">Route Offers</h1>
      <div className="grid max-w-7xl gap-4 pt-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <Suspense
          fallback={
            <div className="container flex h-[400px] items-center justify-center">
              <Loader />
            </div>
          }
        >
          <Routes userId={params.id} />
        </Suspense>
      </div>
    </div>
  );
}

async function Routes({ userId }: { userId: any }) {
  const supabase = supabaseServer();
  let { data: routes, error } = await supabase
    .from("routes")
    .select("*")
    .eq("vendor_id", userId);
  return routes?.length ? (
    routes?.map((route) => (
      <div
        className="flex w-full flex-col justify-between rounded-xl border bg-surface p-4"
        key={route.id}
      >
        <p className="mb-2 text-xs text-gray-400">
          Posted on: {formatDate(route.created_at)}
        </p>
        <div className="mb-2.5 grid grid-cols-2">
          <div>
            <p className="text-xs text-gray-400">Destination</p>
            <h4 className="text-primary mr-3 text-base font-bold uppercase">
              {route.destination}
            </h4>
          </div>
          <div>
            <p className="text-xs text-gray-400">Prefix</p>
            <h4 className="text-primary mr-3 text-base font-bold uppercase">
              {route.destination_code}
            </h4>
          </div>
        </div>
        <div>
          <div className="mb-2.5 flex items-center">
            <div className="flex-1">
              <p className="text-xs text-gray-400">Type</p>
              <h4 className="text-primary text-base font-bold uppercase">
                {route.route_type}
              </h4>
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-400">Rate</p>
              <h4 className="text-primary text-base font-bold">
                $ {route.rate}
              </h4>
            </div>
          </div>
          <div className="flex flex-col gap-2.5 rounded-xl bg-white p-2.5">
            <div className="flex">
              <div className="flex-1">
                <p className="text-[10px] text-gray-400">PDD</p>
                <h4 className="text-primary text-sm font-semibold">
                  {route.pdd}
                </h4>
              </div>
            </div>
            <div className="flex">
              <div className="flex-1">
                <p className="text-[10px] text-gray-400">ASR</p>
                <h4 className="text-primary text-sm font-semibold">
                  {route.asr}%
                </h4>
              </div>
              <div className="flex-1">
                <p className="text-[10px] text-gray-400">ACD</p>
                <h4 className="text-primary text-sm font-semibold">
                  {route.acd}
                </h4>
              </div>
            </div>
            <div className="flex">
              <div className="flex-1">
                <p className="text-[10px] text-gray-400">Ports</p>
                <h4 className="text-primary text-sm font-semibold">
                  {route.ports}
                </h4>
              </div>
            </div>
          </div>
          <div className="mt-2.5 flex justify-end gap-2.5">
            <EditRoute route={route} />
          </div>
        </div>
      </div>
    ))
  ) : (
    <p className="text-slate-400">No routes posted</p>
  );
}
