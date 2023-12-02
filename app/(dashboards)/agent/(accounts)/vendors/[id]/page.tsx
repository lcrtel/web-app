import getCustomerInfo from "@/app/vos/getCustomerInfo";
import getRates from "@/app/vos/getRates";
import getVendorInfo from "@/app/vos/getVendorInfo";
import { Skeleton } from "@/components/ui/skeleton";
import { supabaseServer } from "@/lib/supabase-server";
import Link from "next/link";
import { Suspense } from "react";
import { HiArrowRight } from "react-icons/hi";
import { IoWallet } from "react-icons/io5";

export const revalidate = 0;

const Balance = async ({
    supabase,
    userID,
}: {
    supabase: any;
    userID: any;
}) => {
    const { data: user } = await supabase
        .from("profiles")
        .select("name")
        .eq("id", userID)
        .single();

    const name: string = user.name;
    let balance = "$ 0";
    try {
        const VOSCustomer = await getCustomerInfo({
            name: name.toLocaleUpperCase(),
        });
        if (VOSCustomer?.data) {
            balance = VOSCustomer?.data?.balance;
        }
    } catch {}
    return <p className="font-medium">{balance}</p>;
};
const OverDraft = async ({
    supabase,
    userID,
}: {
    supabase: any;
    userID: any;
}) => {
    const { data: user } = await supabase
        .from("profiles")
        .select("name")
        .eq("id", userID)
        .single();

    const name: string = user.name;

    let overDraft = "$ 0";
    try {
        const VOSCustomer = await getCustomerInfo({
            name: name.toLocaleUpperCase(),
        });
        if (VOSCustomer?.data) {
            overDraft = "$" + VOSCustomer?.data?.over_draft;
        }
    } catch {}
    return <p className="font-medium">{overDraft}</p>;
};

const RoutsCount = async ({
    supabase,
    userID,
}: {
    supabase: any;
    userID: any;
}) => {
    let { data: routes, error } = await supabase
        .from("routes")
        .select("vendor_id")
        .eq("vendor_id", userID);
    return (
        <p className="font-bold tracking-tight text-3xl ">{routes.length}</p>
    );
};

const RoutRequestsCount = async ({
    supabase,
    userID,
}: {
    supabase: any;
    userID: any;
}) => {
    let { data: requests, error } = await supabase
        .from("targets")
        .select("client_id")
        .eq("client_id", userID);
    return (
        <p className="font-bold tracking-tight text-3xl ">{requests.length}</p>
    );
};

const PurchasedRoutes = async ({
    supabase,
    userID,
}: {
    supabase: any;
    userID: any;
}) => {
    const { data: user } = await supabase
        .from("profiles")
        .select("name")
        .eq("id", userID)
        .single();

    const name: string = user.name;
    const rates = await getRates({ name: name.toLocaleUpperCase() });
    return (
        <p className="font-bold tracking-tight text-3xl ">
            {rates?.data?.length ? rates?.data?.length : 0}
        </p>
    );
};

export default async function Page({ params }: { params: { id: string } }) {
    const supabase = await supabaseServer();
    return (
        <section className="">
            <div className="grid  sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 max-w-7xl gap-4 md:gap-5 items-start">
                <div className=" ">
                    <div className="border bg-slate-50 rounded-xl p-3 space-y-2">
                        <div className="flex  items-center gap-2">
                            <IoWallet className="w-5 h-5" />
                            <h2 className=" font-bold tracking-tight text-lg">
                                Wallet
                            </h2>
                        </div>
                        <div className="bg-white rounded-lg p-3">
                            <h3 className="text-sm text-slate-400 ">Balance</h3>
                            <Suspense
                                fallback={<Skeleton className="w-full h-6" />}
                            >
                                <Balance
                                    userID={params.id}
                                    supabase={supabase}
                                />
                            </Suspense>
                            <h3 className="text-sm pt-2 text-slate-400 ">
                                Over Draft
                            </h3>
                            <Suspense
                                fallback={<Skeleton className="w-full h-6" />}
                            >
                                <OverDraft
                                    userID={params.id}
                                    supabase={supabase}
                                />
                            </Suspense>
                        </div>
                    </div>
                </div>
                <Link
                    href={`/agent/vendors/${params.id}/routes`}
                    className="hover:bg-slate-50 hover:shadow-lg transition-all space-y-2 ease-in duration-300 border rounded-xl p-4 md:p-5 active:scale-[95%]"
                >
                    <h3 className="text-sm font-medium text-gray-400 tracking-tight flex items-center justify-between">
                        Routes <HiArrowRight className="" />
                    </h3>
                    <Suspense
                        fallback={
                            <Skeleton className="h-9 border rounded-xl " />
                        }
                    >
                        <RoutsCount supabase={supabase} userID={params.id} />
                    </Suspense>
                </Link>
                <Link
                    href={`/agent/vendors/${params.id}/requests`}
                    className="hover:bg-slate-50 hover:shadow-lg transition-all space-y-2 ease-in duration-300 border rounded-xl p-4 md:p-5 active:scale-[95%]"
                >
                    <h3 className="text-sm font-medium text-gray-400 tracking-tight flex items-center justify-between">
                        Route Requests <HiArrowRight className="" />
                    </h3>
                    <Suspense
                        fallback={
                            <Skeleton className="h-9 border rounded-xl " />
                        }
                    >
                        <RoutRequestsCount
                            supabase={supabase}
                            userID={params.id}
                        />
                    </Suspense>
                </Link>
                <Link
                    href={`/agent/vendors/${params.id}/purchased_routes`}
                    className="hover:bg-slate-50 hover:shadow-lg transition-all space-y-2 ease-in duration-300 border rounded-xl p-4 md:p-5 active:scale-[95%]"
                >
                    <h3 className="text-sm font-medium text-gray-400 tracking-tight flex items-center justify-between">
                        Purchased Routes <HiArrowRight className="" />
                    </h3>
                    <Suspense fallback={<Skeleton className="h-9 border " />}>
                        <PurchasedRoutes
                            supabase={supabase}
                            userID={params.id}
                        />
                    </Suspense>
                </Link>
            </div>
        </section>
    );
}
