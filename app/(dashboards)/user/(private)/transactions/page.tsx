import getCustomerInfo from "@/app/vos/getCustomerInfo";
import getPayments from "@/app/vos/getPayments";
import getVendorInfo from "@/app/vos/getVendorInfo";
import { Skeleton } from "@/components/ui/skeleton";
import { getUser } from "@/utils/user";
import { Suspense } from "react";
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
  return <p className="text-2xl font-bold">{balance}</p>;
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
  return <p className="text-2xl font-bold">{overDraft}</p>;
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
        <div
          key={index}
          className="flex items-center justify-between gap-2 rounded-lg border p-2"
        >
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
  const userData = await getUser();

  return (
    <div>
      {" "}
      <div className="flex items-center gap-2">
        <IoWallet className="h-6 w-6" />
        <h2 className="text-2xl font-bold tracking-tight">Wallet</h2>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-4">
        <div className="flex w-full max-w-[300px] flex-col rounded-lg border p-4">
          <h3 className="text-slate-400">Balance</h3>
          <Suspense fallback={<Skeleton className="h-6 w-10" />}>
            <Balance user={userData} />
          </Suspense>
        </div>
        <div className="flex w-full max-w-[300px] flex-col rounded-lg border p-4">
          <h3 className="whitespace-nowrap text-slate-400">Over Draft</h3>
          <Suspense fallback={<Skeleton className="h-6 w-10" />}>
            <OverDraft user={userData} />
          </Suspense>
        </div>
      </div>
      <h2 className="pb-2 pt-4 text-xl font-semibold tracking-tight">
        Payments
      </h2>
      <Suspense fallback={<Skeleton className="h-40 w-full" />}>
        <Payments user={userData} />
      </Suspense>
    </div>
  );
};

export default page;
