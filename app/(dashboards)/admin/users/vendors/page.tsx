import { Skeleton } from "@/components/ui/skeleton";
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
import { unstable_noStore } from "next/cache";
import { Suspense } from "react";
import { AddAccountForm } from "../_components/AddAccount";
import { VendorsTable } from "./VendorsTable";
import BackButton from "@/components/BackButton";
import Link from "next/link";

export default function Page() {
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
        <BackButton />
        <Link href="/director" className="hover:underline">
          Dashboard
        </Link>
        /
        <Link href="/admin/users/vendors" className="hover:underline">
          Vendors
        </Link>
      </div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-primary text-2xl font-bold">Vendors</h2>
        <AddAccountForm role="VENDOR" />
      </div>

      <div className="flex w-full flex-col gap-3 overflow-x-auto xl:flex-row">
        <Suspense fallback={<Loader />}>
          <Vendors />
        </Suspense>
      </div>
    </div>
  );
}
const Vendors = async () => {
  unstable_noStore();
  const supabase = await supabaseAdminServer();
  let { data: vendors, error } = await supabase
    .from("profiles")
    .select("*, user_roles!inner(*)")
    .eq("user_roles.role_slug", "user")
    .match({ user_type: "VENDOR" });

  return <VendorsTable data={vendors} />;
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
