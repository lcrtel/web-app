import Loader from "@/components/Loader";
import { buttonVariants } from "@/components/ui/button";
import { supabaseServer } from "@/lib/supabase-server";
import { getUser } from "@/utils/user";
import { unstable_noStore } from "next/cache";
import Link from "next/link";
import { Suspense } from "react";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { RoutesTable } from "./RoutesTable";

export default function MyRouteOffers() {
  return (
    <section className="">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="flex items-center text-2xl font-bold tracking-tight text-primary-900">
            My Route Offers
          </h3>
          <p className="text-sm text-gray-400">
            View and manage your route offers
          </p>
        </div>
        <Link
          href="/user/post-offers"
          className={`${buttonVariants({
            variant: "default",
            size: "sm",
          })}`}
        >
          Add
          <HiOutlinePlusCircle className="ml-1 h-5 w-5" />
        </Link>
      </div>
      <Suspense fallback={<Loader />}>
        <RouteOffers />
      </Suspense>
    </section>
  );
}

async function RouteOffers() {
  unstable_noStore();
  const supabase = await supabaseServer();
  const user = await getUser();
  if (user) {
    let { data: routes, error } = await supabase
      .from("routes")
      .select("*")
      .eq("vendor_id", user?.id);
    return <RoutesTable data={routes} />;
  }
}
