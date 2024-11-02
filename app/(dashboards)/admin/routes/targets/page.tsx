import Loader from "@/components/Loader";
import {
  PageActions,
  PageHeader,
  PageHeaderHeading,
} from "@/components/page-header";
import { buttonVariants } from "@/components/ui/button";
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
import { SupabaseClient } from "@supabase/supabase-js";
import { unstable_noStore } from "next/cache";
import Link from "next/link";
import { Suspense } from "react";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { TargetsTable } from "./TargetsTable";

export default async function Page() {
  const supabase = await supabaseAdminServer();
  return (
    <div>
      <PageHeader>
        <PageHeaderHeading>Buying Targets</PageHeaderHeading>
        <PageActions>
          <Link
            passHref
            href="/admin/routes/targets/post"
            className={buttonVariants({
              variant: "default",
              size: "sm",
            })}
          >
            Add
            <HiOutlinePlusCircle className="ml-2 h-5 w-5" />
          </Link>
        </PageActions>
      </PageHeader>
      <Suspense fallback={<Loader />}>
        <BuyingTargets supabase={supabase} />
      </Suspense>
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
  return (
    <div className="w-full py-2">
      <TargetsTable data={addClientNameToTargets(targets, clients)} />
    </div>
  );
}
