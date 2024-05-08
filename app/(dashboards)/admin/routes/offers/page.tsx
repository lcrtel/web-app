import Loader from "@/components/Loader";
import { buttonVariants } from "@/components/ui/button";
import { unstable_noStore } from "next/cache";
import Link from "next/link";
import { Suspense } from "react";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { fetchVerfiedRoutes } from "./actions";
import { RoutesTable } from "./routes-table";

const Routes = async () => {
    unstable_noStore();
    const verified_routes = await fetchVerfiedRoutes();
    return (
            <div className="w-full my-3">
                <RoutesTable data={verified_routes} />
            </div>
    );
};

export default function Page() {
    return (
        <div className="h-full">
            <div className="flex  gap-2  flex-wrap md:items-center mb-4 justify-between ">
                <h1 className="text-2xl font-bold text-primary">
                    Route Offers
                </h1>
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
