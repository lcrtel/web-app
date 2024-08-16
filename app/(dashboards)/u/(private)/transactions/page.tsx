import getCustomerInfo from "@/app/vos/getCustomerInfo";
import getPayments from "@/app/vos/getPayments";
import getVendorInfo from "@/app/vos/getVendorInfo";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchUserMetadata } from "@/utils/user";
import Link from "next/link";
import React, { Suspense } from "react";
import { IoWallet } from "react-icons/io5";

const Balance = async ({ user }: { user: any }) => {
    let balance = "$0";
    let name: string = user.name;
    try {
        if (user.role === "client") {
            const VOSCustomer = await getCustomerInfo({
                name: name.toLocaleUpperCase(),
            });
            if (VOSCustomer?.data) {
                balance = VOSCustomer?.data?.balance;
            }
        } else if (user.role === "vendor") {
            const VOSVendor = await getVendorInfo({
                name: name.toLocaleUpperCase(),
            });
            if (VOSVendor?.data) {
                balance = VOSVendor?.data?.balance;
            }
        }
    } catch {}
    return <p className="font-bold text-2xl">{balance}</p>;
};

const OverDraft = async ({ user }: { user: any }) => {
    let overDraft = "$0";
    let name: string = user.name;
    try {
        if (user.role === "client") {
            const VOSCustomer = await getCustomerInfo({
                name: name.toLocaleUpperCase(),
            });
            if (VOSCustomer?.data) {
                overDraft = "$" + VOSCustomer?.data?.over_draft;
            }
        } else if (user.role === "vendor") {
            const VOSVendor = await getVendorInfo({
                name: name.toLocaleUpperCase(),
            });
            if (VOSVendor?.data) {
                overDraft = "$" + VOSVendor?.data?.over_draft;
            }
        }
    } catch {}
    return <p className="font-bold text-2xl">{overDraft}</p>;
};

const Payments = async ({ user }: { user: any }) => {
    let payments = [];
    let name: string = user.name;
    try {
        const VOSPayments = await getPayments({
            name: "NICETALK",
        });
        if (VOSPayments?.data) {
            payments = VOSPayments?.data;
        }
    } catch {}
    return payments.length ? (
<div className="flex flex-col gap-2">
        {payments.map((payment: any, index) => (
            <div key={index} className="border p-2 rounded-lg gap-2 flex items-center justify-between">
                <p className="font-medium"> Date: {payment.date}</p>
                <p className="font-medium"> Amount: ${payment.amount}</p>
            </div>
        ))}
</div>
    ) : (
        <p>No payments yet</p>
    );
};

const page = async () => {
    const userData = await fetchUserMetadata();

    return (
        <div>
            {" "}
            <div className="flex  items-center gap-2">
                <IoWallet className="w-6 h-6" />
                <h2 className=" font-bold tracking-tight text-2xl">Wallet</h2>
            </div>
            <div className=" mt-4 flex items-center flex-wrap gap-4 ">
                <div className="flex flex-col  w-full max-w-[300px] border rounded-lg p-4">
                    <h3 className=" text-slate-400 ">Balance</h3>
                    <Suspense fallback={<Skeleton className="w-10 h-6" />}>
                        <Balance user={userData} />
                    </Suspense>
                </div>
                <div className="flex flex-col  w-full max-w-[300px] border rounded-lg p-4">
                    <h3 className=" text-slate-400 whitespace-nowrap">
                        Over Draft
                    </h3>
                    <Suspense fallback={<Skeleton className="w-10 h-6" />}>
                        <OverDraft user={userData} />
                    </Suspense>
                </div>
            </div>
            <h2 className=" font-semibold tracking-tight text-xl pt-4 pb-2">
                Payments
            </h2>
            <Suspense fallback={<Skeleton className="w-full h-40" />}>
                <Payments user={userData} />
            </Suspense>
        </div>
    );
};

export default page;
