import { buttonVariants } from "@/components/ui/button";
import { supabaseServer } from "@/lib/supabase-server";
import formatDate from "@/utils/formatDate";
import { fetchUserData } from "@/utils/user";
import Link from "next/link";
import { HiDocumentText } from "react-icons/hi";
import { CreateInvoice } from "./CreateInvoice";

export const revalidate = 0;

const page = async () => {
    const supabase = await supabaseServer();
    const agent: any = await fetchUserData();

    const { data: invoices } = await supabase
        .from("invoices")
        .select(`*`)
        .eq("agent", agent?.id);

    let { data: gateways } = await supabase
        .from("gateways")
        .select(`*, routes (*), profiles (*)`);

    let { data: clients } = await supabase
        .from("profiles")
        .select("*")
        .eq("agent_id", agent?.id)
        .or(`role.eq.client,role.eq.vendor`);
        
    let { data: payment_methods } = await supabase
        .from("payment_methods")
        .select("*");

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
                            gateways={gateways}
                            paymentMethods={payment_methods}
                        />
                    </div>
                </div>
            </div>
            {/* <InvoiceTable data={invoices} /> */}
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                {invoices?.length ? (
                    invoices.map((invoice: any) => (
                        <Link href={`/agent/invoices/${invoice.invoice_id}`} passHref
                            key={invoice.invoice_id}
                            className="border rounded-lg  bg-slate-50"
                        >
                            <div className="flex items-center justify-between border-b p-3">
                                <div className="flex items-center gap-2">
                                    <HiDocumentText className="w-5 h-5" />
                                    <h4 className="text-base font-semibold ">
                                        Invoice #{invoice.invoice_id}
                                    </h4>
                                </div>
                                <p className="capitalize text-slate-400 text-sm">
                                    {invoice.status}
                                </p>
                            </div>
                            <div className="p-3 text-sm">
                                <div className="flex  gap-2">
                                    <p className="font-medium">Date Issued: </p>
                                    <p>{formatDate(invoice.date_issued)}</p>
                                </div>
                                <div className="flex  gap-2 mb-2">
                                    <p className="font-medium">Date Due: </p>
                                    <p>{formatDate(invoice.date_due)}</p>
                                </div>
                                <div className="flex gap-2">
                                    <p
                                        dangerouslySetInnerHTML={{
                                            __html: invoice.description?.replace(
                                                /\./g,
                                                ".<br>"
                                            ),
                                        }}
                                    />
                                </div>
                                <div className="flex font-medium text-base items-center mt-2 gap-2 ">
                                    <p className="">Total Amount: </p>
                                    <p>${invoice.total_amount}</p>
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="gap-2  h-12 text-center flex items-center text-sm  justify-center border py-10 rounded-lg">
                        <p>No invoices created yet</p>
                        <CreateInvoice
                            clients={clients}
                            gateways={gateways}
                            paymentMethods={payment_methods}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default page;
