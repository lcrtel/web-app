import BackButton from "@/components/BackButton";
import Loader from "@/components/Loader";
import { buttonVariants } from "@/components/ui/button";
import { unstable_noStore } from "next/cache";
import Link from "next/link";
import { Suspense } from "react";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { fetchVerfiedRoutes } from "./actions";
import { RoutesTable } from "./RoutesTable";
import {
  PageActions,
  PageHeader,
  PageHeaderHeading,
} from "@/components/page-header";

export default function RoutesPage() {
  return (
    <div>
      <PageHeader>
        <PageHeaderHeading>Route Offers</PageHeaderHeading>
        <PageActions>
          <Link
            passHref
            href="/admin/routes/offers/post"
            className={buttonVariants({
              variant: "default",
              size: "sm",
            })}
          >
            Add
            <HiOutlinePlusCircle className="ml-2 h-5 w-5" />
          </Link>
        </PageActions>
      </PageHeader>
      <Suspense fallback={<Loader />}>
        <Routes />
      </Suspense>
    </div>
  );
}

const Routes = async () => {
  const verified_routes = await fetchVerfiedRoutes();
  if (verified_routes)
    return (
      <div className="my-2 w-full">
        <RoutesTable data={verified_routes} />
      </div>
    );
};
