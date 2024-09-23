import RoutesSearch from "@/components/RoutesSearch";
import { Skeleton } from "@/components/ui/skeleton";
import { supabaseServer } from "@/lib/supabase-server";
import { fetchUser } from "@/utils/user";
import { SearchX } from "lucide-react";
import { Suspense } from "react";
import { TargetsTable } from "./targets-table";
import { HiArrowRight } from "react-icons/hi";
import Link from "next/link";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div className="">
      <h3 className="flex items-center text-2xl font-bold tracking-tight text-primary-900">
        Target Rates
      </h3>
      <p className="mb-4 text-sm text-slate-400">Explore our target rates</p>

      <div className="space-y-2">
        <Suspense>
          <RoutesSearch />
        </Suspense>
        <Suspense fallback={<Skeleton className="h-40" />}>
          <TargetRates searchParams={searchParams} />
        </Suspense>
      </div>
      <Link
        href="/u/post-offers"
        passHref
        className="mt-4 block w-full rounded-xl border bg-slate-50 p-5 transition-all ease-in hover:bg-slate-100 active:scale-[99%]"
      >
        <div className="flex items-center justify-between">
          <div className="">
            <h3 className="text-xl font-bold">Post your route offers</h3>
            <p className="text-sm text-slate-400">
              We will let you know when there is a target matching your offer
            </p>
          </div>
          <HiArrowRight className="h-5 w-5" />
        </div>
      </Link>
    </div>
  );
}

async function TargetRates({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const user = await fetchUser();
  const supabase = supabaseServer();
  let filter: any = {};
  if (searchParams.route_type) {
    filter.route_type = searchParams.route_type;
  }
  if (searchParams.prefix) {
    filter.destination_code = searchParams.prefix;
  }
  let query = supabase
    .from("targets")
    .select(
      "destination, destination_code, pdd, buying_rate,route_type, id, client_id,created_at, asr, acd, ports, remarks",
    )
    .match(filter);
  let { data: targets, error } = await query;
  if (user) {
    query = query.neq("client_id", user?.id);
  }
  return targets?.length ? (
    <TargetsTable data={targets} />
  ) : (
    <div className="flex h-[200px] flex-col items-center justify-center gap-5 rounded-lg border text-center text-slate-400">
      <SearchX className="size-10" />
      <p>Sorry, we did not find any targets for your search</p>
    </div>
  );
}
