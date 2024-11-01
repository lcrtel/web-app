import RoutesSearch from "@/components/RoutesSearch";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { supabaseServer } from "@/lib/supabase-server";
import { fetchUser } from "@/utils/user";
import { ArrowRight, SearchX } from "lucide-react";
import { unstable_noStore } from "next/cache";
import Link from "next/link";
import { Suspense } from "react";
import { HiArrowRight } from "react-icons/hi";
import { OffersTable } from "./offers-table";

export default async function Page(
  props: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  }
) {
  const searchParams = await props.searchParams;
  return (
    <div className="space-y-4">
      <div className="">
        <h2 className="flex items-center text-2xl font-bold tracking-tight text-primary-900">
          Route Offers
        </h2>
        <p className="text-sm text-slate-400">Explore our route offers</p>
      </div>
      <div className="space-y-2">
        <Suspense>
          <RoutesSearch />
        </Suspense>
        <Suspense fallback={<Skeleton className="h-40" />}>
          <Routes searchParams={searchParams} />
        </Suspense>
      </div>
      <Link
        href="/user/post-targets"
        passHref
        className="block w-full rounded-xl border bg-slate-50 p-5 transition-all ease-in hover:bg-slate-100 active:scale-[99%]"
      >
        <div className="flex items-center justify-between">
          <div className="">
            <p className="font-medium text-slate-500">
              No routes meet your needs?
            </p>
            <h3 className="text-xl font-bold">Post your buying target</h3>
            <p className="text-sm text-slate-400">
              We will let you know when there is a route matching your target
            </p>
          </div>
          <HiArrowRight className="h-5 w-5" />
        </div>
      </Link>
    </div>
  );
}

async function Routes({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  unstable_noStore();
  const user = await fetchUser();
  let filter: any = {};
  if (searchParams.route_type) {
    filter.route_type = searchParams.route_type;
  }
  if (searchParams.prefix) {
    filter.destination_code = searchParams.prefix;
  }
  const supabase = supabaseServer();
  let query = supabase
    .from("routes")
    .select("*")
    .eq("verification", "verified")
    .neq("vendor_id", user?.id)
    .match(filter);
  let { data: routes, error } = await query;
  query = query.neq("vendor_id", user?.id);

  return routes?.length ? (
    <>
      <OffersTable data={routes} />
      {user && <RoutesMatchingTheTargetDestination />}
    </>
  ) : (
    <div className="flex h-[200px] flex-col items-center justify-center gap-5 rounded-lg border text-center text-slate-400">
      <SearchX className="size-10" />
      <p>Sorry, we did not find any routes for your search</p>
      <Link
        href="/user/post-targets"
        className={`${buttonVariants({
          size: "sm",
        })}`}
      >
        Post your buying target <ArrowRight className="ml-2 size-4" />
      </Link>
    </div>
  );
}

async function RoutesMatchingTheTargetDestination() {
  const supabase = supabaseServer();
  let { data: matchedResults, error } = await supabase.rpc(
    "match_all_routes_targets",
  );
  return matchedResults?.length ? (
    <div className="">
      <h3 className="mb-2 text-xl font-bold">
        Route offers matching your targets
      </h3>
      <OffersTable data={matchedResults} />
    </div>
  ) : null;
}
