import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
import { SupabaseClient } from "@supabase/supabase-js";
import { unstable_noStore } from "next/cache";
import Link from "next/link";
import { Suspense } from "react";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { TargetsTable } from "./TargetsTable";
import BackButton from "@/components/BackButton";

export default function Page() {
  const supabase = supabaseAdminServer();
  return (
    <div className=" space-y-2">
      <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
        <BackButton />
        <Link href="/director" className="hover:underline">
          Dashboard
        </Link>
        /
        <Link
          href="/director/routes/targets"
          className="font-semibold hover:underline"
        >
          Targets
        </Link>
      </div>
      <div className="mb-4 flex flex-wrap justify-between gap-2 md:items-center">
        <h1 className="text-primary text-2xl font-bold">Buying Targets</h1>
        <Link
          passHref
          href="/director/routes/targets/post"
          className={buttonVariants({
            variant: "default",
            size: "sm",
          })}
        >
          Add
          <HiOutlinePlusCircle className="ml-2 h-5 w-5" />
        </Link>
      </div>
      <div className="w-full overflow-y-auto">
        <Suspense fallback={<Skeleton className="h-28 w-full" />}>
          <BuyingTargets supabase={supabase} />
        </Suspense>
      </div>
    </div>
  );
}

async function BuyingTargets({ supabase }: { supabase: SupabaseClient }) {
  unstable_noStore();
  let { data: clients } = await supabase.from("profiles").select("*");
  let { data: targets } = await supabase.from("targets").select("*");

  function addClientNameToTargets(targets: any, users: any) {
    return targets
      .filter((target: any) =>
        users.some((user: any) => user.id === target.client_id),
      )
      .map((target: any) => {
        const { client_id } = target;
        const user = users.find((user: any) => user.id === client_id);
        const clientName = user ? user.name : null;
        const clientCompany = user ? user.company_name : null;

        return {
          ...target,
          client: clientName,
          client_company: clientCompany,
        };
      });
  }
  return <TargetsTable data={addClientNameToTargets(targets, clients)} />;
}
