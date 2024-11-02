import Loader from "@/components/Loader";
import {
  PageActions,
  PageHeader,
  PageHeaderHeading,
} from "@/components/page-header";
import { RoutesTableReadOnlyAdmin } from "@/components/routes-and-targets/RoutesTableReadOnlyAdmin";
import { buttonVariants } from "@/components/ui/button";
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
import { getUserRole } from "@/utils/user";
import Link from "next/link";
import { Suspense } from "react";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { RoutesTable } from "./_components/RoutesTable";

export default async function RoutesPage() {
  const userRole = (await getUserRole()) as UserRolesEnum;

  return (
    <div>
      <PageHeader>
        <PageHeaderHeading>Route Offers</PageHeaderHeading>
        {(userRole === "director" ||
          userRole === "purchase_executive" ||
          userRole === "purchase_manager") && (
          <PageActions>
            <Link
              passHref
              href="/admin/routes/offers/post"
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
        <Routes userRole={userRole} />
      </Suspense>
    </div>
  );
}

async function Routes({ userRole }: { userRole: UserRolesEnum }) {
  const supabaseAdmin = await supabaseAdminServer();
  const { data: routes } = await supabaseAdmin
    .from("routes")
    .select(`*, profiles (name, company_name)`);
  if (routes)
    return (
      <div className="w-full py-2">
        {userRole === "director" ||
        userRole === "purchase_executive" ||
        userRole === "purchase_manager" ? (
          <RoutesTable data={routes} />
        ) : (
          <RoutesTableReadOnlyAdmin data={routes} />
        )}
      </div>
    );
}
