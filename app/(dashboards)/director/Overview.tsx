import MetricsCard from "@/components/MetricsCard";
import { Skeleton } from "@/components/ui/skeleton";
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
import { unstable_noStore } from "next/cache";
import Link from "next/link";
import { Suspense } from "react";

export default function Overview() {
  return (
    <section>
      <h2 className="mb-2 text-lg font-semibold">Overview</h2>
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
          <Vendors />
        </Suspense>
      </div>
    </section>
  );
}

const Routes = async () => {
  const supabase = await supabaseAdminServer();
  let { data: offers, error } = await supabase
    .from("routes")
    .select("verification");
  return (
    <Link href="/director/routes/offers">
      <MetricsCard count={offers?.length} label="Routes" />
    </Link>
  );
};

const Targets = async () => {
  const supabase = await supabaseAdminServer();
  unstable_noStore();
  let { data: targets, error } = await supabase.from("targets").select("id");
  return (
    <Link href="/director/routes/targets">
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
    <Link href="/director/users/clients">
      <MetricsCard count={clients?.length} label="Clients" />
    </Link>
  );
};

const Vendors = async () => {
  const supabase = await supabaseAdminServer();
  let { data: vendors } = await supabase
    .from("profiles")
    .select("*, user_roles!inner(*)")
    .eq("user_roles.role_slug", "user")
    .match({ user_type: "VENDOR" });
  return (
    <Link href="/director/users/vendors">
      <MetricsCard count={vendors?.length} label="Vendors" />
    </Link>
  );
};
