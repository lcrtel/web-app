import { Skeleton } from "@/components/ui/skeleton";
import { supabaseServer } from "@/lib/supabase-server";
import { fetchUser } from "@/utils/user";
import { Suspense } from "react";
import { OffersTable } from "../routes/offers-table";
import { PostTargetTable } from "./PostTargetTable";

export default async function PostTargetsPage(
  props: {
    searchParams: Promise<{ prefix: string; route_type: string }>;
  }
) {
  const searchParams = await props.searchParams;
  const user = await fetchUser();
  return (
    <section className="">
      <PostTargetTable userId={user?.id} userEmail={user?.email} />
      <Suspense fallback={<Skeleton className="h-32 w-full" />}>
        <RouteOffers
          route_type={searchParams.route_type}
          prefix={searchParams.prefix}
        />
      </Suspense>
    </section>
  );
}

async function RouteOffers({
  prefix,
  route_type,
}: {
  prefix: string;
  route_type: string;
}) {
  const user = await fetchUser();
  const supabase = await supabaseServer();
  let query = supabase
    .from("routes")
    .select("*")
    .eq("verification", "verified");

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
      query = query.neq("vendor_id", user?.id);
    }
    let { data: routes } = await query;
    return (
      !!routes?.length && (
        <>
          <h3 className="mb-2 mt-4 flex items-center text-xl font-bold tracking-tight text-primary-900">
            Our Route Offers
          </h3>
          <OffersTable data={routes} />
        </>
      )
    );
  }
}
