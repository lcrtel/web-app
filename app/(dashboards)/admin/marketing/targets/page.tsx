import NotAuthorized from "@/components/NotAuthorized";
import { PageHeader, PageHeaderHeading } from "@/components/page-header";
import { Skeleton } from "@/components/ui/skeleton";
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
import { getUserRole } from "@/utils/user";
import { Suspense } from "react";
import TargetsMarketing from "./TargetsMarketing";

export default function RoutesMarketingPage() {
  return (
    <section className="space-y-2">
      <PageHeader>
        <PageHeaderHeading>Targets Marketing</PageHeaderHeading>
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
  let { data: targets } = await supabase
    .from("targets")
    .select("*, profiles(name, company_name)");
  let vendors: Profile[] = [];
  let { data } = await supabase
    .from("profiles")
    .select("*, user_roles!inner(*), routes(count)")
    .eq("user_roles.role_slug", "user");
  // @ts-ignore
  vendors = data?.filter((v) => v.routes[0].count > 0);
  return userRole === "director" ||
    userRole === "purchase_manager" ||
    userRole === "purchase_executive" ? (
    <TargetsMarketing targets={targets} vendors={vendors} />
  ) : (
    <NotAuthorized />
  );
}
