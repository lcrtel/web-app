import { PageHeader, PageHeaderHeading } from "@/components/page-header";
import { Skeleton } from "@/components/ui/skeleton";
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
import { Suspense } from "react";
import { getUserRole } from "@/utils/user";
import NotAuthorized from "@/components/NotAuthorized";
import RoutesMarketing from "./_components/RoutesMarketing";

export default function RoutesMarketingPage() {
  return (
    <section className="space-y-2">
      <PageHeader>
        <PageHeaderHeading>Routes Marketing</PageHeaderHeading>
      </PageHeader>
      <Suspense fallback={<Skeleton className="h-96 w-full" />}>
        <Marketing />
      </Suspense>
    </section>
  );
}

async function Marketing() {
  const userRole = (await getUserRole()) as UserRolesEnum;
  const supabase = await supabaseAdminServer();
  const { data: routes, error } = await supabase
    .from("routes")
    .select(`*, profiles (name, company_name)`);
  let clients: Profile[] = [];
  let { data } = await supabase
    .from("profiles")
    .select("*, user_roles!inner(*)")
    .eq("user_roles.role_slug", "user");
  // @ts-ignore
  clients = data;
  return userRole === "director" ||
    userRole === "sales_manager" ||
    userRole === "sales_executive" ? (
    <RoutesMarketing routes={routes} clients={clients} />
  ) : (
    <NotAuthorized />
  );
}
