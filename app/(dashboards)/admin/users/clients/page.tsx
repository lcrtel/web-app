import {
  PageActions,
  PageHeader,
  PageHeaderHeading,
} from "@/components/page-header";
import { Skeleton } from "@/components/ui/skeleton";
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
import { Suspense } from "react";
import { AddAccountForm } from "../_components/AddAccount";
import { ClientsTable } from "./ClientsTable";

export default function Page() {
  return (
    <div className="space-y-2">
      <PageHeader>
        <PageHeaderHeading>Clients</PageHeaderHeading>
        <PageActions>
          <AddAccountForm role="CLIENT" />
        </PageActions>
      </PageHeader>
      <Suspense fallback={<Loader />}>
        <Clients />
      </Suspense>
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
