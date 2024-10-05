import Loader from "@/components/Loader";
import { buttonVariants } from "@/components/ui/button";
import { supabaseServer } from "@/lib/supabase-server";
import { fetchUser } from "@/utils/user";
import { unstable_noStore } from "next/cache";
import Link from "next/link";
import { Suspense } from "react";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { TargetsTable } from "./TargetsTable";

export default function MyTargetRates() {
    return (
      <section className="">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="flex items-center text-2xl font-bold tracking-tight text-primary-900">
              My Target Rates
            </h3>
            <p className="text-sm text-gray-500">
              View and manage your target rates
            </p>
          </div>
          <Link
            href="/u/post-targets"
            className={`${buttonVariants({
              variant: "default",
              size: "sm",
            })}`}
          >
            Add
            <HiOutlinePlusCircle className="ml-1 h-5 w-5" />
          </Link>
        </div>
        <Suspense fallback={<Loader />}>
          <Targets />
        </Suspense>
      </section>
    );
}

async function Targets() {
    unstable_noStore();
    const supabase = supabaseServer();
    const user = await fetchUser();
    let { data: routes, error } = await supabase
        .from("targets")
        .select("*")
        .match({ client_id: user?.id });
    return <TargetsTable data={routes} />;
}
