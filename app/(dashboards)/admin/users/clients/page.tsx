import { Skeleton } from "@/components/ui/skeleton";
import { supabaseServer } from "@/lib/supabase-server";
import { unstable_noStore } from "next/cache";
import { Suspense } from "react";
import { AddAccountForm } from "../_components/AddAccount";
import { ClientsTable } from "./ClientsTable";

export default function Page() {
  return (
    <div className=" ">
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-primary text-2xl font-bold">Clients</h2>
          <AddAccountForm role="client" type="admin" />
        </div>
      </div>

      <div className="flex w-full flex-col gap-3 overflow-x-auto xl:flex-row">
        <Suspense fallback={<Loader />}>
          <Clients />
        </Suspense>
      </div>
    </div>
  );
}

const Clients = async () => {
  unstable_noStore();
  const supabase = supabaseServer();
  let { data: clients, error } = await supabase
    .from("profiles")
    .select("*")
    .or(`role.eq.client,role.eq.vendor`);

  let { data: targets } = await supabase.from("targets").select("*");

  const userRouteCounts = targets?.reduce((acc, route) => {
    const { client_id } = route;
    if (acc.has(client_id)) {
      acc.set(client_id, acc.get(client_id) + 1);
    } else {
      acc.set(client_id, 1);
    }
    return acc;
  }, new Map());

  const clientsWithTargetCounts = clients?.map((user) => {
    const { id } = user;
    const targetCount = userRouteCounts?.get(id) || 0;
    return { ...user, targets: targetCount };
  });

  return <ClientsTable data={clientsWithTargetCounts} />;
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
