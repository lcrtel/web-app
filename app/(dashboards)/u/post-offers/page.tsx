import Loader from "@/components/Loader";
import { Separator } from "@/components/ui/separator";
import { supabaseServer } from "@/lib/supabase-server";
import { fetchUser } from "@/utils/user";
import { unstable_noStore } from "next/cache";
import { Suspense } from "react";
import { TargetsTable } from "../targets/targets-table";
import { PostOffersTable } from "./PostRouteTable";

export default async function PostRoutes() {
  const user = await fetchUser();
  return (
    <section className="">
      <PostOffersTable userId={user?.id} userEmail={user?.email} />
      <Separator className="my-4" />
      <Suspense fallback={<Loader />}>
        <TargetRates />
      </Suspense>
    </section>
  );
}

async function TargetRates() {
  unstable_noStore();
  const user = await fetchUser();
  const supabase = supabaseServer();
  let { data: targets, error } = await supabase
    .from("targets")
    .select("*")
    .neq("client_id", user?.id);
  return targets?.length ? (
    <TargetsTable data={targets} />
  ) : (
    <div className="flex h-12 items-center justify-center gap-2 rounded-lg bg-surface py-10 text-center">
      <p>No target rates yet</p>
    </div>
  );
}
