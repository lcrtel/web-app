import { Skeleton } from "@/components/ui/skeleton";
import { supabaseServer } from "@/lib/supabase-server";
import { getUser } from "@/utils/user";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { HiOutlineExternalLink } from "react-icons/hi";

export default async function Dashboard() {
  const user = await getUser();
  const supabase = await supabaseServer();
  return (
    <main className="flex flex-col gap-5">
      <h3 className="text-primary text-2xl font-bold tracking-tight">
        Welcome, {user?.name}👋
      </h3>
      <div className="flex flex-col justify-between gap-4 sm:flex-row-reverse">
        <div className="w-full">
          <Links />
          <Suspense fallback={<Skeleton className="mt-4 h-32 w-full" />}>
            <PurchaseRequests supabase={supabase} user={user} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}

const PurchaseRequests = async ({
  supabase,
  user,
}: {
  supabase: any;
  user: any;
}) => {
  let { data: purchaseRequests, error } = await supabase
    .from("purchases")
    .select(`*, routes (*)`)
  return purchaseRequests?.length ? (
    <div className="pt-4">
      <div className="flex justify-between">
        <h3 className="mb-2 text-xl font-bold"> Your purchase requests</h3>
      </div>

      <div className="space-y-2">
        {purchaseRequests.map((item: any) => (
          <Link
            href={`/user/purchases/${item.id}`}
            passHref
            key={item.id}
            className={`flex cursor-pointer flex-wrap items-center justify-between gap-2 rounded-lg border p-3 transition-all duration-500 ease-in-out active:translate-x-1`}
          >
            <div className="flex gap-4">
              <p>Prefix: {item.routes?.destination_code} </p>
              <p className="capitalize">
                Destination: {item.routes?.destination} -{" "}
                <span className="font-medium uppercase">
                  {item.routes?.route_type}
                </span>{" "}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-full border-[1.5px] border-slate-200 bg-slate-100 px-2 py-1 text-xs font-medium capitalize text-slate-500">
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
    <div className="flex flex-wrap gap-3">
      <Link
        href="/user/routes"
        passHref
        className="flex-1 whitespace-nowrap rounded-xl border bg-slate-50 p-5 transition-all ease-in hover:shadow-lg active:scale-[99%]"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold tracking-tight">
            Explore our route offers
          </h3>

          <ExternalLink className="size-5 text-primary-900" />
        </div>
      </Link>
      <Link
        href="/user/post-offers"
        passHref
        className="flex-1 whitespace-nowrap rounded-xl border bg-slate-50 p-5 transition-all ease-in hover:shadow-lg active:scale-[99%]"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold tracking-tight">
            Post your route offers
          </h3>

          <ExternalLink className="size-5 text-primary-900" />
        </div>
      </Link>
      <Link
        href="/user/targets"
        passHref
        className="flex-1 whitespace-nowrap rounded-xl border bg-slate-50 p-5 transition-all ease-in hover:shadow-lg active:scale-[99%]"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold tracking-tight">
            Explore our buying targets
          </h3>

          <ExternalLink className="size-5 text-primary-900" />
        </div>
      </Link>
      <Link
        href="/user/post-targets"
        passHref
        className="flex-1 whitespace-nowrap rounded-xl border bg-slate-50 p-5 transition-all ease-in hover:shadow-lg active:scale-[99%]"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold tracking-tight">
            Post your buying target
          </h3>

          <ExternalLink className="size-5 text-primary-900" />
        </div>
      </Link>
    </div>
  );
};
