import Loader from "@/components/Loader";
import {
  PageActions,
  PageHeader,
  PageHeaderHeading,
} from "@/components/page-header";
import { TargetsTableReadOnlyAdmin } from "@/components/routes-and-targets/TargetsTableReadOnlyAdmin";
import { buttonVariants } from "@/components/ui/button";
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
import { getUserRole } from "@/utils/user";
import Link from "next/link";
import { Suspense } from "react";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { TargetsTable } from "./TargetsTable";

export default async function Page() {
  const userRole = (await getUserRole()) as UserRolesEnum;
  return (
    <div>
      <PageHeader>
        <PageHeaderHeading>Buying Targets</PageHeaderHeading>
        {(userRole === "director" ||
          userRole === "sales_manager" ||
          userRole === "sales_executive") && (
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
        )}
      </PageHeader>
      <Suspense fallback={<Loader />}>
        <BuyingTargets userRole={userRole} />
      </Suspense>
    </div>
  );
}

async function BuyingTargets({ userRole }: { userRole: UserRolesEnum }) {
  const supabase = await supabaseAdminServer();
  const { data: targets, error } = await supabase
    .from("targets")
    .select(`*, profiles (name, company_name)`);
  return (
    <div className="w-full py-2">
      {userRole === "director" ||
      userRole === "sales_manager" ||
      userRole === "sales_executive" ? (
        <TargetsTable data={targets} />
      ) : (
        <TargetsTableReadOnlyAdmin data={targets} />
      )}
    </div>
  );
}
