import BackButton from "@/components/BackButton";
import Loader from "@/components/Loader";
import { buttonVariants } from "@/components/ui/button";
import { unstable_noStore } from "next/cache";
import Link from "next/link";
import { Suspense } from "react";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { fetchVerfiedRoutes } from "./actions";
import { RoutesTable } from "./RoutesTable";

export default function RoutesPage() {
  return (
    <div className="h-full space-y-2">
      <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
        <BackButton />
        <Link href="/director" className="hover:underline">
          Dashboard
        </Link>
        /
        <Link
          href="/director/routes/offers"
          className="font-semibold hover:underline"
        >
          Routes
        </Link>
      </div>
      <div className="flex flex-wrap justify-between gap-2 md:items-center">
        <h1 className="text-primary text-2xl font-bold">Route Offers</h1>
        <Link
          passHref
          href="/director/routes/offers/post"
          className={buttonVariants({
            variant: "default",
            size: "sm",
          })}
        >
          Add
          <HiOutlinePlusCircle className="ml-2 h-5 w-5" />
        </Link>
      </div>
      <Suspense fallback={<Loader />}>
        <Routes />
      </Suspense>
    </div>
  );
}

const Routes = async () => {
  unstable_noStore();
  const verified_routes = await fetchVerfiedRoutes();
  if (verified_routes)
    return (
      <div className="my-2 w-full">
        <RoutesTable data={verified_routes} />
      </div>
    );
};
