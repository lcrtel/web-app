import NotAuthorized from "@/components/NotAuthorized";
import { PageHeader, PageHeaderHeading } from "@/components/page-header";
import { Skeleton } from "@/components/ui/skeleton";
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
import { getUserRole } from "@/utils/user";
import { Suspense } from "react";
import { AddTargetsTable } from "./_components/AddTargetsTable";

export default async function PostTargetsPage() {
  const userRole = (await getUserRole()) as UserRolesEnum;
  return (
    <section className="">
      <PageHeader>
        <PageHeaderHeading>Post Targets</PageHeaderHeading>
      </PageHeader>
      {userRole === "director" ||
      userRole === "sales_manager" ||
      userRole === "sales_executive" ? (
        <Suspense fallback={<Skeleton className="h-96 w-full" />}>
          <AddTargets />
        </Suspense>
      ) : (
        <NotAuthorized />
      )}
    </section>
  );
}

async function AddTargets() {
  const supabase = await supabaseAdminServer();
  let { data: vendors } = await supabase
    .from("profiles")
    .select("*, user_roles!inner(*)")
    .eq("user_roles.role_slug", "user");
  return <AddTargetsTable users={vendors} />;
}
