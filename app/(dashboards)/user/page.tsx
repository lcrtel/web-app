import getCustomerInfo from "@/app/vos/getCustomerInfo";
import getRates from "@/app/vos/getRates";
import { Skeleton } from "@/components/ui/skeleton";
import { supabaseServer } from "@/lib/supabase-server";
import { fetchUserMetadata } from "@/utils/user";
import Link from "next/link";
import { Suspense } from "react";
import { HiArrowRight, HiOutlineExternalLink } from "react-icons/hi";
import { IoWallet } from "react-icons/io5";

export const revalidate = 0;

export default async function Dashboard() {
  const userData = await fetchUserMetadata();
  const supabase = supabaseServer();

  return (
    <main className="flex flex-col gap-5">
      <h3 className="text-primary text-2xl font-bold tracking-tight">
        Welcome, {userData?.name}👋
      </h3>
      <div className="flex flex-col justify-between gap-4 sm:flex-row-reverse">
        <div className=" sm:w-[300px] ">
          <div className="space-y-2 rounded-xl border bg-slate-50 p-3">
            <div className="flex  items-center gap-2">
              <IoWallet className="h-5 w-5" />
              <h2 className=" text-lg font-bold tracking-tight">Wallet</h2>
            </div>
            <Suspense
              fallback={
                <div className="rounded-lg bg-white p-3">
                  <h3 className="text-sm text-slate-400 ">Balance</h3>
                  <p className="font-medium">
                    $
                    <Skeleton className="h-4 w-full max-w-xs" />
                  </p>
                  <h3 className="pt-2 text-sm text-slate-400 ">Over Draft</h3>
                  <p className="font-medium">
                    $
                    <Skeleton className="h-4 w-full max-w-xs" />
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
          <Suspense fallback={<Skeleton className="mt-4 h-32 w-full" />}>
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
      <div className="rounded-lg bg-white p-3">
        <h3 className="text-sm text-slate-400 ">Balance</h3>
        <p className="font-medium">${profile?.balance}</p>
        <h3 className="pt-2 text-sm text-slate-400 ">Over Draft</h3>
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
          className="flex flex-wrap items-center justify-between gap-2 rounded-lg border bg-slate-50 px-4 py-2 "
        >
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <h4 className=" text-slate-400">Destination Code:</h4>
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
    <div className="flex  h-12 items-center justify-center gap-2 rounded-lg  border py-10 text-center text-sm">
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
        <h3 className="mb-2 text-lg font-semibold">Purchase Requests</h3>
      </div>

      <div className=" space-y-2">
        {purchaseRequests.map((item: any) => (
          <Link
            href={`/user/purchases/${item.id}`}
            passHref
            key={item.id}
            className={`flex cursor-pointer flex-wrap items-center justify-between gap-2 rounded-lg border p-3 transition-all duration-500 ease-in-out active:translate-x-1  `}
          >
            <div className="flex gap-4">
              <p>Area Code: {item.routes?.destination_code} </p>
              <p className="capitalize">
                Destination: {item.routes?.destination} -{" "}
                <span className="font-medium uppercase">
                  {item.routes?.route_type}
                </span>{" "}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-full border-[1.5px] border-slate-200 bg-slate-100 px-2 py-1 text-xs font-medium capitalize  text-slate-500">
                {item.status}
              </span>
              <div>
                <HiOutlineExternalLink className="-mt-[2px] h-5 w-5" />
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
    <div className="grid gap-3  md:grid-cols-2 ">
      <Link
        href="/user/routes"
        passHref
        className="rounded-xl border bg-slate-50 p-5 transition-all ease-in  hover:shadow-lg active:scale-[99%]"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold tracking-tight">
            🏷️ Explore our route offers
          </h3>
          <HiArrowRight className="h-5 w-5" />
        </div>
      </Link>
      <Link
        href="/user/my-targets/post"
        passHref
        className="rounded-xl border bg-slate-50 p-5 transition-all ease-in  hover:shadow-lg active:scale-[99%]"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold tracking-tight">
            🎯 Post your target rate
          </h3>
          <HiArrowRight className="h-5 w-5" />
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
