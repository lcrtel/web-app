import MetricsCard from "@/components/MetricsCard";
import { Skeleton } from "@/components/ui/skeleton";
import { supabaseServer } from "@/lib/supabase-server";
import { unstable_noStore } from "next/cache";
import Link from "next/link";
import { Suspense } from "react";

const Routes = async () => {
  const supabase = supabaseServer();

  unstable_noStore();
  let { data: offers, error } = await supabase
    .from("routes")
    .select("verification")
    .eq("verification", "verified");
  return (
    <Link href="/admin/routes/offers">
      <MetricsCard count={offers?.length} label="Routes" />
    </Link>
  );
};

const Targets = async () => {
  const supabase = supabaseServer();

  unstable_noStore();
  let { data: targets, error } = await supabase.from("targets").select("id");
  return (
    <Link href="/admin/routes/targets">
      <MetricsCard count={targets?.length} label="Route Requests" />
    </Link>
  );
};

const Clients = async () => {
  const supabase = supabaseServer();
  unstable_noStore();

  let { data: clients, error } = await supabase
    .from("profiles")
    .select("*")
    .or(`role.eq.client,role.eq.vendor`);
  return (
    <Link href="/admin/users/clients">
      <MetricsCard count={clients?.length} label="Clients" />
    </Link>
  );
};

const Vendors = async () => {
  const supabase = supabaseServer();
  unstable_noStore();

  let { data: vendors, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("role", "vendor");
  return (
    <Link href="/admin/users/vendors">
      <MetricsCard count={vendors?.length} label="Vendors" />
    </Link>
  );
};

const Agents = async () => {
  const supabase = supabaseServer();

  unstable_noStore();
  let { data: agents, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("role", "agent");

  return (
    <Link href="/admin/users/agents">
      <MetricsCard count={agents?.length} label="Agents" />
    </Link>
  );
};

const Overview = () => {
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
          <Vendors />
        </Suspense>
        <Suspense
          fallback={<Skeleton className="h-[110px] rounded-xl border" />}
        >
          {" "}
          <Agents />
        </Suspense>
      </div>
    </section>
  );
};

export default Overview;
