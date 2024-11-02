import NotAuthorized from "@/components/NotAuthorized";
import { PageHeader, PageHeaderHeading } from "@/components/page-header";
import { Skeleton } from "@/components/ui/skeleton";
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
import { getUserRole } from "@/utils/user";
import { Suspense } from "react";
import { AddRoutesTable } from "./AddRoutesTable";

export default function page() {
  return (
    <section className="space-y-2">
      <PageHeader>
        <PageHeaderHeading>Post Routes</PageHeaderHeading>
      </PageHeader>
      <Suspense fallback={<Skeleton className="h-96 w-full" />}>
        <AddRoutes />
      </Suspense>
    </section>
  );
}

async function AddRoutes() {
  const userRole = (await getUserRole()) as UserRolesEnum;
  const supabase = await supabaseAdminServer();
  let { data: vendors } = await supabase
    .from("profiles")
    .select("*, user_roles!inner(*)")
    .eq("user_roles.role_slug", "user");
  return userRole === "director" ||
    userRole === "purchase_executive" ||
    userRole === "purchase_manager" ? (
    <AddRoutesTable users={vendors} />
  ) : (
    <NotAuthorized />
  );
}
