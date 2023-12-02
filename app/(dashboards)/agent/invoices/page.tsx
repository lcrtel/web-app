import fetchUser from "@/app/post/fetchUser";
import { buttonVariants } from "@/components/ui/button";
import { supabaseServer } from "@/lib/supabase-server";
import Link from "next/link";
import { CreateInvoice } from "./CreateInvoice";
import { InvoiceTable } from "./InvoiceTable";

export const revalidate = 0;

const page = async () => {
    const supabase = await supabaseServer();
    const agent: any = await fetchUser();

    const { data: invoices } = await supabase
        .from("invoices")
        .select(`*, profiles (*)`)

        const filteredInvoices = invoices?.filter((invoice) => invoice.profiles?.agent_id === agent.id)

    let { data: clients } = await supabase
        .from("profiles")
        .select("*")
        .eq("agent_id", agent.id)
        .or(`role.eq.client,role.eq.vendor`)

    let { data: payment_methods } = await supabase.from("config").select("*");

    return (
        <div className=" ">
            <div className="mb-5 ">
                <div className="flex items-center mb-3 justify-between ">
                    <h2 className="text-2xl font-bold text-primary">
                        Invoices
                    </h2>
                    <div className="flex items-center gap-2">
                        <Link
                            href="/agent/invoices/bulk"
                            className={buttonVariants({ variant: "ghost" })}
                        >
                            Bulk Invoice
                        </Link>
                        <CreateInvoice
                            clients={clients}
                            paymentMethods={payment_methods}
                        />
                    </div>
                </div>
            </div>
            {filteredInvoices?.length ? (
                <InvoiceTable data={filteredInvoices} />
            ) : (
                <div className="gap-2  h-12 text-center flex items-center text-sm  justify-center border py-10 rounded-lg">
                    <p>No invoices created yet</p>
                    <CreateInvoice
                        clients={clients}
                        paymentMethods={payment_methods}
                    />
                </div>
            )}
        </div>
    );
};

export default page;
