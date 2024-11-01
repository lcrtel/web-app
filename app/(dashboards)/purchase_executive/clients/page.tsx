import BackButton from "@/components/BackButton";
import { Skeleton } from "@/components/ui/skeleton";
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
import Link from "next/link";
import { Suspense } from "react";
import { AddAccountForm } from "../../director/users/_components/AddAccount";
import { ClientsTable } from "./ClientsTable";

export default function Page() {
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
        <BackButton />
        <Link href="/sales_manager" className="hover:underline">
          Dashboard
        </Link>
        /
        <Link href="/sales_manager/clients" className="hover:underline">
          Clients
        </Link>
      </div>
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-primary text-2xl font-bold">Clients</h2>
          <AddAccountForm role="CLIENT" />
        </div>
      </div>

      <div className="flex w-full flex-col gap-3 overflow-x-auto xl:flex-row">
        <Suspense fallback={<Loader />}>
          <Clients />
        </Suspense>
      </div>
    </div>
  );
}

const Clients = async () => {
  const supabase = await supabaseAdminServer();
  let { data: clients } = await supabase
    .from("profiles")
    .select("*, user_roles!inner(*)")
    .eq("user_roles.role_slug", "user")
    .match({ user_type: "CLIENT" });
  return <ClientsTable data={clients} />;
};

const Loader = () => {
  return (
    <div className="w-full">
      <div className="mb-4 h-10 rounded-lg border bg-surface" />
      <div className="w-full divide-y rounded-xl border">
        <div className="h-10 rounded-t-xl bg-surface" />
        <div className="p-3">
          <Skeleton className="h-6 w-full rounded-md" />
        </div>
        <div className="p-3">
          <Skeleton className="h-6 w-full rounded-md" />
        </div>
        <div className="p-3">
          <Skeleton className="h-6 w-full rounded-md" />
        </div>
        <div className="p-3">
          <Skeleton className="h-6 w-full rounded-md" />
        </div>
        <div className="p-3">
          <Skeleton className="h-6 w-full rounded-md" />
        </div>
      </div>
    </div>
  );
};
