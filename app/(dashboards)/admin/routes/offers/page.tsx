import Loader from "@/components/Loader";
import { buttonVariants } from "@/components/ui/button";
import { unstable_noStore } from "next/cache";
import Link from "next/link";
import { Suspense } from "react";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { fetchVerfiedRoutes } from "./actions";
import { columns, RoutesTable } from "./RoutesTable";

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

export default function Page() {
  return (
    <div className="h-full">
      <div className="flex flex-wrap justify-between gap-2 md:items-center">
        <h1 className="text-primary text-2xl font-bold">Route Offers</h1>
        <Link
          passHref
          href="/admin/routes/post"
          className={buttonVariants({
            variant: "default",
            size: "sm",
          })}
        >
          <HiOutlinePlusCircle className="mr-2 h-5 w-5" />
          Add
        </Link>
      </div>
      <Suspense fallback={<Loader />}>
        <Routes />
      </Suspense>
    </div>
  );
}
