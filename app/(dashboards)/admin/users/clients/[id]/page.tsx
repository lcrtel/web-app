import getCustomerInfo from "@/app/vos/getCustomerInfo";
import getRates from "@/app/vos/getRates";
import { Skeleton } from "@/components/ui/skeleton";
import { supabaseServer } from "@/lib/supabase-server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { HiArrowRight } from "react-icons/hi";
import { IoWallet } from "react-icons/io5";

export const revalidate = 0;

export default function Page({ params }: { params: { id: string } }) {
    const supabase = supabaseServer();
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
                        <Suspense
                            fallback={
                                <div className="bg-white rounded-lg p-3">
                                    <h3 className="text-sm text-slate-400 ">
                                        Balance
                                    </h3>
                                    <p className="font-medium flex gap-2">
                                        $
                                        <Skeleton className="w-full max-w-xs h-4" />
                                    </p>
                                    <h3 className="text-sm pt-2 text-slate-400 ">
                                        Over Draft
                                    </h3>
                                    <p className="font-medium flex gap-2">
                                        $
                                        <Skeleton className="w-full max-w-xs h-4" />
                                    </p>
                                </div>
                            }
                        >
                            <Wallet supabase={supabase} userId={params.id} />
                        </Suspense>
                    </div>
                </div>
                <Link
                    href={`/admin/users/vendors/${params.id}/requests`}
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
                    href={`/admin/users/vendors/${params.id}/purchased_routes`}
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

async function Wallet({ supabase, userId }: { supabase: any; userId: any }) {
    const { data: user } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();
    return (
        user && (
            <div className="bg-white rounded-lg p-3">
                <h3 className="text-sm text-slate-400 ">Balance</h3>
                <p className="font-medium">${user?.balance}</p>
                <h3 className="text-sm pt-2 text-slate-400 ">Over Draft</h3>
                <p className="font-medium">${user?.over_draft}</p>

                <Suspense>
                    <UpdateWallet
                        supabase={supabase}
                        userId={userId}
                        userName={user?.name}
                    />
                </Suspense>
            </div>
        )
    );
}

const UpdateWallet = async ({
    supabase,
    userId,
    userName,
}: {
    supabase: any;
    userId: any;
    userName: any;
}) => {
    try {
        const VOSCustomer = await getCustomerInfo({
            name: userName.toLocaleUpperCase(),
        });

        if (VOSCustomer?.data) {
            await supabase
                .from("profiles")
                .update({
                    balance: VOSCustomer?.data?.balance?.replace(/\$/g, ""),
                    over_draft: VOSCustomer?.data?.over_draft,
                })
                .eq("id", userId);
        }
    } catch (error) {
        console.error("Error updating wallet:", error);
    }
    return <></>;
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