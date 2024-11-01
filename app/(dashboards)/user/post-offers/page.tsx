import { Skeleton } from "@/components/ui/skeleton";
import { supabaseServer } from "@/lib/supabase-server";
import { fetchUser } from "@/utils/user";
import { unstable_noStore } from "next/cache";
import { Suspense } from "react";
import { TargetsTable } from "../targets/targets-table";
import { PostOffersTable } from "./PostRouteTable";

export default async function PostRoutes(
  props: {
    searchParams: Promise<{ prefix: string; route_type: string }>;
  }
) {
  const searchParams = await props.searchParams;
  const user = await fetchUser();
  return (
    <section className="">
      <PostOffersTable userId={user?.id} userEmail={user?.email} />
      <Suspense fallback={<Skeleton className="h-32 w-full" />}>
        <TargetRates
          route_type={searchParams.route_type}
          prefix={searchParams.prefix}
        />
      </Suspense>
    </section>
  );
}

async function TargetRates({
  prefix,
  route_type,
}: {
  prefix: string;
  route_type: string;
}) {
  unstable_noStore();
  const user = await fetchUser();
  const supabase = await supabaseServer();
  let query = supabase.from("targets").select("*");
  let filter: any = {};
  if (route_type || prefix) {
    if (route_type || route_type !== "") {
      filter.route_type = route_type;
    }
    if (prefix) {
      filter.destination_code = prefix;
    }
    query = query.match(filter);
    if (user) {
      query = query.neq("client_id", user?.id);
    }
    let { data: targets } = await query;
    return (
      !!targets?.length && (
        <>
          <h3 className="mb-2 mt-4 flex items-center text-xl font-bold tracking-tight text-primary-900">
            Our Target Rates
          </h3>
          <TargetsTable data={targets} />
        </>
      )
    );
  }
}
