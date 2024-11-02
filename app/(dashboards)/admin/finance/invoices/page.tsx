import {
  PageActions,
  PageHeader,
  PageHeaderHeading,
} from "@/components/page-header";
import { Button, buttonVariants } from "@/components/ui/button";
import TableSkeleton from "@/components/ui/table-skeleton";
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
import { unstable_noStore } from "next/cache";
import Link from "next/link";
import { Suspense } from "react";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { CreateInvoice } from "./CreateInvoice";
import { InvoiceTable } from "./InvoiceTable";

export default function InvoicesPage() {
  return (
    <div className="space-y-2">
      <PageHeader>
        <PageHeaderHeading>Invoices</PageHeaderHeading>
        <PageActions>
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
            <Create />
          </Suspense>
        </PageActions>
      </PageHeader>
      <Suspense fallback={<TableSkeleton />}>
        <Invoices />
      </Suspense>
    </div>
  );
}

async function Create() {
  const supabase = await supabaseAdminServer();
  let { data: users } = await supabase
    .from("profiles")
    .select("*, user_roles!inner(*)")
    .eq("user_roles.role_slug", "user");
  return <CreateInvoice clients={users} />;
}

async function Invoices() {
  const supabase = await supabaseAdminServer();

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
