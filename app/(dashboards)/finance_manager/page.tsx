import MetricsCard from "@/components/MetricsCard";
import { Skeleton } from "@/components/ui/skeleton";
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
import { unstable_noStore } from "next/cache";
import Link from "next/link";
import { Suspense } from "react";

export default function DashboardPage() {
  return (
    <section className="mb-5">
      <h2 className="mb-3 text-lg font-semibold">Overview</h2>
      <div className="grid grid-cols-2 items-center gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4 xl:grid-cols-5">
        <Suspense
          fallback={<Skeleton className="h-[110px] rounded-xl border" />}
        >
          <Routes />
        </Suspense>
        <Suspense
          fallback={<Skeleton className="h-[110px] rounded-xl border" />}
        >
          <Targets />
        </Suspense>
        <Suspense
          fallback={<Skeleton className="h-[110px] rounded-xl border" />}
        >
          <Clients />
        </Suspense>
        <Suspense
          fallback={<Skeleton className="h-[110px] rounded-xl border" />}
        >
          {" "}
          <Executives />
        </Suspense>
      </div>
    </section>
  );
}
const Routes = async () => {
  const supabase = await supabaseAdminServer();
  let { data: offers, error } = await supabase
    .from("routes")
    .select("verification")
    .eq("verification", "verified");
  return (
    <Link href="/sales_manager/routes">
      <MetricsCard count={offers?.length} label="Route offers" />
    </Link>
  );
};

const Targets = async () => {
  const supabase = await supabaseAdminServer();

  unstable_noStore();
  let { data: targets, error } = await supabase.from("targets").select("id");
  return (
    <Link href="/sales_manager/targets">
      <MetricsCard count={targets?.length} label="Buying targets" />
    </Link>
  );
};

const Clients = async () => {
  const supabase = await supabaseAdminServer();
  let { data: clients } = await supabase
    .from("profiles")
    .select("*, user_roles!inner(*)")
    .eq("user_roles.role_slug", "user")
    .match({ user_type: "CLIENT" });
  return (
    <Link href="/sales_manager/clients">
      <MetricsCard count={clients?.length} label="Clients" />
    </Link>
  );
};

const Executives = async () => {
  const supabase = await supabaseAdminServer();
    const { data } = await supabase
      .from("executives")
      .select("profiles(*), departments!inner (slug)")
      .eq("departments.slug", "finance");
  return (
    <Link href="/sales_manager/executives">
      <MetricsCard count={data?.length} label="Executives" />
    </Link>
  );
};
