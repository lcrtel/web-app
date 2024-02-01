import getCustomerInfo from "@/app/vos/getCustomerInfo";
import getRates from "@/app/vos/getRates";
import { Skeleton } from "@/components/ui/skeleton";
import { supabaseServer } from "@/lib/supabase-server";
import { fetchUserData, fetchUserMetadata } from "@/utils/user";
import Link from "next/link";
import { Suspense } from "react";
import { HiArrowRight, HiOutlineExternalLink } from "react-icons/hi";
import { IoWallet } from "react-icons/io5";
import FetchLocalStorage from "./FetchLocalStorage";
import { redirect } from "next/navigation";

export const revalidate = 0;

export default async function Dashboard() {
    const userData = await fetchUserMetadata();
    const supabase = supabaseServer();

    return (
        <main className="flex flex-col gap-5">
            <h3 className="text-2xl font-bold text-primary tracking-tight">
                Welcome, {userData?.name}👋
            </h3>
            <div className="flex flex-col sm:flex-row-reverse justify-between gap-4">
                <div className=" sm:w-[300px] ">
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
                                    <p className="font-medium">
                                        $
                                        <Skeleton className="w-full max-w-xs h-4" />
                                    </p>
                                    <h3 className="text-sm pt-2 text-slate-400 ">
                                        Over Draft
                                    </h3>
                                    <p className="font-medium">
                                        $
                                        <Skeleton className="w-full max-w-xs h-4" />
                                    </p>
                                </div>
                            }
                        >
                            <Wallet supabase={supabase} userId={userData?.id} />
                        </Suspense>
                    </div>
                </div>
                <div className=" w-full">
                    <Links />
                    <Suspense
                        fallback={<Skeleton className="w-full h-32 mt-4" />}
                    >
                        <PurchaseRequests supabase={supabase} user={userData} />
                    </Suspense>
                    {/* <div className="pt-4">
                        <div className="flex justify-between">
                            <h3 className="text-lg font-semibold mb-2">
                                Purchased Routes
                            </h3>
                        </div>
                        <Suspense
                            fallback={<Skeleton className="w-full h-32" />}
                        >
                            <PurchasedRoutes user={userData} />
                        </Suspense>
                    </div> */}
                </div>
            </div>
            <FetchLocalStorage />
        </main>
    );
}
async function Wallet({ supabase, userId }: { supabase: any; userId: any }) {
    const {
        data: { user },
    } = await supabase.auth.getUser();
    const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();
    return (
        user && (
            <div className="bg-white rounded-lg p-3">
                <h3 className="text-sm text-slate-400 ">Balance</h3>
                <p className="font-medium">${profile?.balance}</p>
                <h3 className="text-sm pt-2 text-slate-400 ">Over Draft</h3>
                <p className="font-medium">${profile?.over_draft}</p>

                <Suspense>
                    <UpdateWallet
                        supabase={supabase}
                        userId={profile.id}
                        userName={profile?.name}
                    />
                </Suspense>
            </div>
        )
    );
}
const PurchasedRoutes = async ({ user }: { user: any }) => {
    const name: string = user?.name;
    const rates = await getRates({ name: name?.toLocaleUpperCase() });
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
            <p>No purchases yet</p>
        </div>
    );
};

const PurchaseRequests = async ({
    supabase,
    user,
}: {
    supabase: any;
    user: any;
}) => {
    let { data: purchaseRequests, error } = await supabase
        .from("purchase_requests")
        .select(`*, routes (*)`)
        .match({ client_id: user?.id, status: "pending" });
    return purchaseRequests?.length ? (
        <div className="pt-4">
            <div className="flex justify-between">
                <h3 className="text-lg font-semibold mb-2">
                    Purchase Requests
                </h3>
            </div>

            <div className=" space-y-2">
                {purchaseRequests.map((item: any) => (
                    <Link
                        href={`/user/purchase_requests/${item.id}`}
                        passHref
                        key={item.id}
                        className={`flex gap-2 flex-wrap active:translate-x-1 cursor-pointer transition-all ease-in-out duration-500 items-center justify-between border rounded-lg p-3  `}
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
                            <span className="text-xs font-medium bg-slate-100 border-[1.5px] border-slate-200 text-slate-500 rounded-full px-2 py-1  capitalize">
                                {item.status}
                            </span>
                            <div>
                                <HiOutlineExternalLink className="-mt-[2px] w-5 h-5" />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    ) : null;
};
const Links = () => {
    return (
        <div className="grid md:grid-cols-2  gap-3 ">
            <Link
                href="/user/routes"
                passHref
                className="bg-slate-50 hover:shadow-lg transition-all ease-in border rounded-xl  p-5 active:scale-[99%]"
            >
                <div className="flex justify-between items-center">
                    <h3 className="font-semibold tracking-tight text-xl">
                        🏷️ Explore our route offers
                    </h3>
                    <HiArrowRight className="w-5 h-5" />
                </div>
            </Link>
            <Link
                href="/user/my-requests/post"
                passHref
                className="bg-slate-50 hover:shadow-lg transition-all ease-in border rounded-xl  p-5 active:scale-[99%]"
            >
                <div className="flex justify-between items-center">
                    <h3 className="font-semibold tracking-tight text-xl">
                        🎯 Post your target rate
                    </h3>
                    <HiArrowRight className="w-5 h-5" />
                </div>
            </Link>
        </div>
    );
};

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
