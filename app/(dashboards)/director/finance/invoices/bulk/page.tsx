import { Skeleton } from "@/components/ui/skeleton";
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
import { Suspense } from "react";
import BulkInvoiceForm from "./BulkInvoiceForm";
export const revalidate = 0;

export default function page() {
  return (
    <section className="flex h-full flex-col">
      <h3 className="mb-4 text-2xl font-bold tracking-tight">Bulk Invoice</h3>
      <Suspense fallback={<Skeleton className="h-96 w-full" />}>
        <BulkInvoice />
      </Suspense>
    </section>
  );
}

async function BulkInvoice() {
  const supabase = await supabaseAdminServer();
  let { data: users } = await supabase
    .from("profiles")
    .select("*, user_roles!inner(*)")
    .eq("user_roles.role_slug", "user");
  let { data: payment_methods } = await supabase.from("config").select("*");
  return <BulkInvoiceForm clients={users} paymentMethods={payment_methods} />;
}
