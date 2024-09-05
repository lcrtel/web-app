import Loader from "@/components/Loader";
import RoutesSearch from "@/components/RoutesSearch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabaseServer } from "@/lib/supabase-server";
import { fetchUser } from "@/utils/user";
import { List, Table } from "lucide-react";
import { unstable_noStore } from "next/cache";
import Link from "next/link";
import { Suspense } from "react";
import { HiArrowRight } from "react-icons/hi";
import { OffersTable } from "./offers-table";

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

      <Suspense fallback={<Loader />}>
        <Routes searchParams={searchParams} />
      </Suspense>
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
  const supabase = supabaseServer();
  let { data: routes, error } = await supabase
    .from("routes")
    .select("*")
    .eq("verification", "verified")
    .neq("vendor_id", user?.id);
  return routes?.length ? (
    <Tabs defaultValue="table">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Suspense>
          <RoutesSearch />
        </Suspense>
        <TabsList>
          <TabsTrigger value="table">
            <Table className="size-4" />
          </TabsTrigger>
          <TabsTrigger value="list">
            <List className="size-4" />
          </TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="table">
        <OffersTable data={routes} />
      </TabsContent>
      <TabsContent value="list">Coming soon</TabsContent>
    </Tabs>
  ) : (
    <div className="flex h-12 items-center justify-center gap-2 rounded-lg bg-surface py-10 text-center">
      <p>No routes found</p>
    </div>
  );
}
