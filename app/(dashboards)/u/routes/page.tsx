import Loader from "@/components/Loader";
import RoutesSearch from "@/components/RoutesSearch";
import { buttonVariants } from "@/components/ui/button";
import { supabaseServer } from "@/lib/supabase-server";
import { fetchUser } from "@/utils/user";
import { ArrowRight, SearchX } from "lucide-react";
import { unstable_noStore } from "next/cache";
import Link from "next/link";
import { Suspense } from "react";
import { HiArrowRight } from "react-icons/hi";
import { OffersTable } from "./offers-table";
import { Skeleton } from "@/components/ui/skeleton";

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div className="">
      <h3 className="flex items-center text-2xl font-bold tracking-tight text-primary-900">
        Route Offers
      </h3>
      <p className="mb-4 text-sm text-slate-400">Explore our route offers</p>
      <div className="space-y-2">
        <Suspense>
          <RoutesSearch />
        </Suspense>
        <Suspense fallback={<Skeleton className="h-40"/>}>
          <Routes searchParams={searchParams} />
        </Suspense>
      </div>
      <Link
        href="/u/my-targets/post"
        passHref
        className="mt-4 block w-full rounded-xl border bg-slate-50 p-5 transition-all ease-in hover:bg-slate-100 active:scale-[99%]"
      >
        <div className="flex items-center justify-between">
          <div className="">
            <p className="font-medium text-slate-500">
              No routes meet your needs?
            </p>
            <h3 className="text-xl font-bold">Request for a route</h3>
            <p className="text-sm text-slate-400">
              We will let you know when there is a route matching your request
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
    .match(filter);
  let { data: routes, error } = await query;
  if (user) {
    query = query.neq("vendor_id", user?.id);
  }

  return routes?.length ? (
    <OffersTable data={routes} />
  ) : (
    <div className="flex h-[200px] flex-col items-center justify-center gap-5 rounded-lg border text-center text-slate-400">
      <SearchX className="size-10" />
      <p>Sorry, we did not find any routes for your search</p>
      <Link
        href="/u/post-targets"
        className={`${buttonVariants({
          size: "sm",
        })}`}
      >
        Post your buying target <ArrowRight className="ml-2 size-4" />
      </Link>
    </div>
  );
}
