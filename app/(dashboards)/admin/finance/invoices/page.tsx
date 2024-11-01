import { Button, buttonVariants } from "@/components/ui/button";
import TableSkeleton from "@/components/ui/table-skeleton";
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
import { SupabaseClient } from "@supabase/supabase-js";
import { unstable_noStore } from "next/cache";
import Link from "next/link";
import { Suspense } from "react";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { CreateInvoice } from "./CreateInvoice";
import { InvoiceTable } from "./InvoiceTable";

export default async function InvoicesPage() {
  const supabase = await supabaseAdminServer();

  return (
    <div className=" ">
      <div className="mb-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-primary text-2xl font-bold">Invoices</h2>
          <div className="flex items-center gap-2">
            <Link
              href="/admin/finance/invoices/bulk"
              className={buttonVariants({ variant: "outline", size: "sm" })}
            >
              Bulk Invoice
            </Link>
            <Suspense
              fallback={
                <Button className="gap-2" size="sm">
                  Create Invoice <HiOutlinePlusCircle className="h-4 w-4" />
                </Button>
              }
            >
              <Create supabase={supabase} />
            </Suspense>
          </div>
        </div>
        <Suspense fallback={<TableSkeleton />}>
          <Invoices supabase={supabase} />
        </Suspense>
      </div>
    </div>
  );
}

async function Create({ supabase }: { supabase: SupabaseClient }) {
  let { data: users } = await supabase
    .from("profiles")
    .select("*, user_roles!inner(*)")
    .eq("user_roles.role_slug", "user");
  let { data: payment_methods } = await supabase.from("config").select("*");
  return <CreateInvoice clients={users} paymentMethods={payment_methods} />;
}

async function Invoices({ supabase }: { supabase: any }) {
  unstable_noStore();
  const { data: invoices } = await supabase
    .from("invoices")
    .select(`*, profiles (name)`);

  return invoices?.length ? (
    <InvoiceTable data={invoices} />
  ) : (
    <div className="flex h-12 items-center justify-center gap-2 rounded-lg border py-10 text-center text-sm">
      <p>No invoices created yet</p>
    </div>
  );
}
