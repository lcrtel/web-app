import { buttonVariants } from "@/components/ui/button";
import { supabaseServer } from "@/lib/supabase-server";
import Link from "next/link";
import { InvoiceTable } from "./InvoiceTable";
export const revalidate = 0;
const page = async () => {
    const supabase = supabaseServer();
    const { data: invoices } = await supabase.from("invoices").select(`*`);
    return (
        <div className=" ">
            <div className="mb-5 ">
                <div className="flex items-center mb-3 justify-between ">
                    <h2 className="text-2xl font-bold text-primary">
                        Invoices
                    </h2>
                </div>
            </div>
            <div className="">
                {invoices?.length ? (
                    <InvoiceTable data={invoices} />
                ) : (
                    <div className="gap-2  h-12 text-center flex items-center text-sm  justify-center border py-10 rounded-lg">
                        <p>No invoices created yet</p>
                        <Link
                            href="/director/finance/invoices/new"
                            className={`${buttonVariants({
                                variant: "default",
                                size: "sm",
                            })}`}
                        >
                            Create Invoice
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default page;
