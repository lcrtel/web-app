import { supabaseServer } from "@/lib/supabase-server";
import { fetchUser } from "@/utils/user";
import BulkInvoiceForm from "./BulkInvoiceForm";
export const revalidate = 0;

export default async function page() {
  const supabase = supabaseServer();
  const user = await fetchUser();
  const { data: invoices } = await supabase.from("invoices").select(`*`);
  const agent: any = await fetchUser();
  let { data: gateways } = await supabase
    .from("gateways")
    .select(`*, routes (*), profiles (*)`);

  let { data: clients } = await supabase
    .from("profiles")
    .select("*")
    .or(`role.eq.client,role.eq.vendor`);
  let { data: agents } = await supabase
    .from("profiles")
    .select("*")
    .eq("role", "agent");
  let { data: payment_methods } = await supabase.from("config").select("*");
  return (
    <section className="flex h-full flex-col">
      <h3 className="mb-4 text-2xl font-bold tracking-tight">Bulk Invoice</h3>
      <BulkInvoiceForm
        clients={clients}
        paymentMethods={payment_methods}
        agents={agents}
      />
    </section>
  );
}
