import { supabaseAdmin } from "@/lib/supabase-admin";
import InvoiceForm from "./InvoiceForm";

export default async function page() {
    const supabase = supabaseAdmin();
   let { data: users } = await supabase.from("profiles").select("*");
     let { data: conncetions } = await supabase
         .from("route_connections")
         .select(`*, route_offers (*)`);
         let { data: Banks } = await supabase.from("bank_accounts").select("*");
         return (
             <section className="flex flex-col h-full">
                 <h3 className="text-2xl tracking-tight font-bold mb-4">
                     Create Invoice
                 </h3>
                 <div className="px-5 ">
                     <InvoiceForm
                         users={users}
                         connections={conncetions}
                         banks={Banks}
                     />
                 </div>
             </section>
         );
}
