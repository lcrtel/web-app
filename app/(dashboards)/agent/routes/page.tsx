import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { fetchVerfiedRoutes } from "./fetchVerfiedRoutes";
import { fetchUnVerfiedRoutes } from "./fetchUnVerfiedRoutes";
import { RoutesTable } from "./routes-table";
import { unstable_noStore } from "next/cache";
import { Suspense } from "react";
import Loader from "@/components/Loader";

const Routes = async () => {
    unstable_noStore();
    const verified_routes = await fetchVerfiedRoutes();
    const unverified_routes = await fetchUnVerfiedRoutes();
    return (
        <>
            <div className="w-full my-3">
                <RoutesTable data={verified_routes} />
            </div>
            {unverified_routes?.length ? (
                <div className="w-full">
                    <h2 className="font-semibold text-lg mb-2">
                        Unverified Route Offers
                    </h2>
                    <RoutesTable data={unverified_routes} />
                </div>
            ) : null}
        </>
    );
};

export default async function Page() {
    return (
        <div className="h-full">
            <div className="flex  gap-2  flex-wrap md:items-center mb-4 justify-between ">
                <h1 className="text-2xl font-bold text-primary">Route Offers</h1>
                <Link
                    passHref
                    href="/agent/routes/post"
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