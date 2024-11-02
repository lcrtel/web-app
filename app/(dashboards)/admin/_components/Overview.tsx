import { Skeleton } from "@/components/ui/skeleton";
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
import Link from "next/link";
import { Suspense } from "react";
import MetricsCard from "./MetricsCard";

export default function Overview({ userRole }: { userRole: UserRolesEnum }) {
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
        {(userRole === "director" ||
          userRole === "sales_manager" ||
          userRole === "sales_executive") && (
          <Suspense
            fallback={<Skeleton className="h-[110px] rounded-xl border" />}
          >
            <Clients />
          </Suspense>
        )}
        {(userRole === "director" ||
          userRole === "purchase_manager" ||
          userRole === "purchase_executive") && (
          <Suspense
            fallback={<Skeleton className="h-[110px] rounded-xl border" />}
          >
            <Vendors />
          </Suspense>
        )}
        {(userRole === "director" ||
          userRole === "finance_manager" ||
          userRole === "finance_executive") && (
          <Suspense
            fallback={<Skeleton className="h-[110px] rounded-xl border" />}
          >
            <Invoices />
          </Suspense>
        )}
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
    <Link href="/admin/routes/offers">
      <MetricsCard count={offers?.length} label="Routes" />
    </Link>
  );
};

const Targets = async () => {
  const supabase = await supabaseAdminServer();
  let { data: targets, error } = await supabase.from("targets").select("id");
  return (
    <Link href="/admin/routes/targets">
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
    <Link href="/admin/users/clients">
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
    <Link href="/admin/users/vendors">
      <MetricsCard count={vendors?.length} label="Vendors" />
    </Link>
  );
};
const Invoices = async () => {
  const supabase = await supabaseAdminServer();
  const { count, error } = await supabase
    .from("invoices")
    .select("*", { count: "exact", head: true });

  return (
    <Link href="/admin/finance/invoices">
     <MetricsCard count={count ?? 0} label="Invoices" />
    </Link>
  );
};
