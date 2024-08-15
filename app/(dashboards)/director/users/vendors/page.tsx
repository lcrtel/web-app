import { Skeleton } from "@/components/ui/skeleton";
import { supabaseServer } from "@/lib/supabase-server";
import { unstable_noStore } from "next/cache";
import { Suspense } from "react";
import { AddAccountForm } from "../_components/AddAccount";
import { VendorsTable } from "./VendorsTable";

export default function Page() {
  return (
    <div className=" ">
      <div className="flex items-center justify-between">
        <h2 className="text-primary text-2xl font-bold">Vendors</h2>
        <AddAccountForm role="vendor" type="director" />
      </div>

      <div className="flex w-full flex-col gap-3 overflow-x-auto xl:flex-row">
        <Suspense fallback={<Loader />}>
          <Vendors />
        </Suspense>
      </div>
    </div>
  );
}
const Vendors = async () => {
  unstable_noStore();
  const supabase = supabaseServer();
  let { data: vendors, error } = await supabase
    .from("profiles")
    .select("*")
    .match({ role: "vendor" });

  let { data: routes } = await supabase.from("routes").select("*");

  const userRouteCount = routes?.reduce((acc, route) => {
    const { vendor_id } = route;
    if (acc.has(vendor_id)) {
      acc.set(vendor_id, acc.get(vendor_id) + 1);
    } else {
      acc.set(vendor_id, 1);
    }
    return acc;
  }, new Map());

  let { data: requests } = await supabase.from("targets").select("*");

  const userRouteRequestCount = requests?.reduce((acc, route) => {
    const { client_id } = route;
    if (acc.has(client_id)) {
      acc.set(client_id, acc.get(client_id) + 1);
    } else {
      acc.set(client_id, 1);
    }
    return acc;
  }, new Map());

  const vendorsWithRouteCounts = vendors?.map((user) => {
    const { id } = user;
    const routeCount = userRouteCount?.get(id) || 0;
    const routeRequestCount = userRouteRequestCount?.get(id) || 0;
    return { ...user, routes: routeCount, requests: routeRequestCount };
  });

  return <VendorsTable data={vendorsWithRouteCounts} />;
};

const Loader = () => {
  return (
    <div className="w-full">
      <div className="mb-4 h-10 rounded-lg border bg-surface" />
      <div className="w-full divide-y rounded-xl border">
        <div className="h-10 rounded-t-xl bg-surface" />
        <div className="p-3">
          <Skeleton className="h-6 w-full rounded-md" />
        </div>
        <div className="p-3">
          <Skeleton className="h-6 w-full rounded-md" />
        </div>
        <div className="p-3">
          <Skeleton className="h-6 w-full rounded-md" />
        </div>
        <div className="p-3">
          <Skeleton className="h-6 w-full rounded-md" />
        </div>
        <div className="p-3">
          <Skeleton className="h-6 w-full rounded-md" />
        </div>
      </div>
    </div>
  );
};
