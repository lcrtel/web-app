import getRates from "@/app/vos/getRates";
import { Skeleton } from "@/components/ui/skeleton";
import { supabaseServer } from "@/lib/supabase-server";
import { fetchUserData } from "@/utils/user";
import Link from "next/link";
import { Suspense } from "react";
import { HiOutlineExternalLink } from "react-icons/hi";

export default function Purchases() {
    return (
        <div>
            <div className="flex mb-4 justify-between">
                <h3 className="text-2xl tracking-tight font-bold">
                    Purchased Routes
                </h3>
            </div>
            <Suspense fallback={<Skeleton className="w-full h-20" />}>
                <PurchasedRoutes />
            </Suspense>
            <div className="flex py-4 justify-between">
                <h3 className="text-xl tracking-tight font-semibold">
                    Purchase Requests
                </h3>
            </div>
            <Suspense fallback={<Skeleton className="w-full h-20" />}>
                <PurchaseRequests />
            </Suspense>
        </div>
    );
}
const PurchasedRoutes = async () => {
    const user = await fetchUserData();
    const name: string = user?.user_metadata.name;
    const rates = await getRates({ name: name.toLocaleUpperCase() });
    return rates.data?.length ? (
        <div className=" grid gap-2">
            {rates.data?.map((rate, index) => (
                <div
                    key={index}
                    className="px-4 py-2 flex-wrap gap-2 rounded-lg border flex items-center justify-between bg-slate-50 "
                >
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <h4 className=" text-slate-400">Prefix:</h4>
                            <p className=" font-medium">{rate.prefix}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <h4 className=" text-slate-400">Area Prefix:</h4>
                            <p className=" font-medium">{rate.area_prefix}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <h4 className=" text-slate-400">Rate:</h4>
                        <p className=" font-medium">$ {rate.rate}/min</p>
                    </div>
                </div>
            ))}
        </div>
    ) : (
        <div className="gap-2  h-12 text-center flex items-center text-sm  justify-center border py-10 rounded-lg">
            <p>No purchases completed yet</p>
        </div>
    );
};

const PurchaseRequests = async () => {
    const supabase = supabaseServer();
    const user = await fetchUserData();
    let { data: purchaseRequests, error } = await supabase
        .from("purchase_requests")
        .select(`*, routes (*)`)
        .match({ client_id: user?.id, status: "pending" });
    return purchaseRequests?.length ? (
        <div className=" space-y-2">
            {purchaseRequests.map((item: any) => (
                <Link
                    href={`/user/purchase_requests/${item.id}`}
                    passHref
                    key={item.id}
                    className={`flex gap-5  active:translate-x-1 cursor-pointer transition-all ease-in-out duration-500 items-center justify-between border rounded-lg px-4 py-2  `}
                >
                    <div className="flex gap-4">
                        <p>Prefix: {item.routes?.prefix} </p>
                        <p className="capitalize">
                            Destination: {item.routes?.destination} -{" "}
                            <span className="uppercase font-medium">
                                {item.routes?.route_type}
                            </span>{" "}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-medium bg-slate-100 border-[1.5px] border-slate-200 text-slate-500 rounded-full px-2 py-1 ml-2 capitalize">
                            {item.status}
                        </span>
                        <div>
                            <HiOutlineExternalLink className="-mt-[2px] w-5 h-5" />
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    ) : (
        <div className="border rounded-md p-10 text-center text-gray-500 text-sm">
            No purchases requests found
        </div>
    );
};
