import { supabaseServer } from "@/lib/supabase-server";
import { Landmark } from "lucide-react";
import AddBank from "./add-bank/AddBank";
import { HiCash, HiCreditCard } from "react-icons/hi";
import DeleteBank from "./add-bank/DeleteBank";
export default async function Page() {
    const supabase = supabaseServer();

    let { data: payment_methods, error } = await supabase
        .from("config")
        .select("*");

    return (
        <div>
            <h1 className="text-2xl font-bold text-primary mb-5">
                Configuration
            </h1>
            <div className="flex flex-col md:items-center md:flex-row justify-between gap-2 mb-2">
                <h2 className="text-xl font-bold text-primary">
                    Payment Methods
                </h2>
                <AddBank />
            </div>
            <div className="grid  gap-4">
                {payment_methods?.length ? payment_methods?.map(
                    (paymentMethod: any) =>
                        paymentMethod.type === "bank" && (
                            <div
                                className="border rounded-xl p-4 max-w-sm"
                                key={paymentMethod.id}
                            >
                                <div className="flex justify-between items-center mb-3">
                                    <h4 className="font-semibold flex items-center  gap-2 text-lg ">
                                        <HiCreditCard className="w-6 h-6" />{" "}
                                        Bank Account
                                    </h4>
                                    <DeleteBank id={paymentMethod.id} />
                                </div>
                                <div className="grid gap-2 grid-cols-2">
                                    <h5 className="text-slate-400 font-medium text-base ">
                                        Account Holder:
                                    </h5>
                                    <p className="font-medium">
                                        {
                                            paymentMethod?.details?.accountHolderName
                                        }
                                    </p>
                                    <h5 className="text-slate-400 font-medium text-base ">
                                        Account Number:
                                    </h5>
                                    <p className="font-medium">
                                        {paymentMethod?.details?.accountNumber}
                                    </p>
                                    <h5 className="text-slate-400 font-medium text-base ">
                                        Bank Name:
                                    </h5>
                                    <p className="font-medium">
                                        {paymentMethod?.details?.accountNumber}
                                    </p>
                                    <h5 className="text-slate-400 font-medium text-base ">
                                        IFSC Code:
                                    </h5>
                                    <p className="font-medium">
                                        {paymentMethod?.details?.IFSCCode}
                                    </p>
                                    <h5 className="text-slate-400 font-medium text-base ">
                                        Branch Name:
                                    </h5>
                                    <p className="font-medium">
                                        {paymentMethod?.details?.branchName}
                                    </p>
                                </div>
                            </div>
                        )
                ) : <p className="text-slate-400">No payment methods added yet</p>}
            </div>
        </div>
    );
}
