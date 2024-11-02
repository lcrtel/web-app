import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getUserRole } from "@/utils/user";
import Link from "next/link";
import { Suspense } from "react";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { AddAccountForm } from "./users/_components/AddAccount";

export default function QuickActions() {
  return (
    <section>
      <h2 className="mb-2 text-lg font-semibold tracking-tight">
        Quick Actions
      </h2>
      <Suspense fallback={<Skeleton />}>
        <Actions />
      </Suspense>
    </section>
  );
}
async function Actions() {
  const userRole = (await getUserRole()) as UserRolesEnum;
  return (
    <div className="flex flex-wrap gap-2">
      {(userRole === "director" ||
        userRole === "sales_manager" ||
        userRole === "sales_executive") && <AddAccountForm role="CLIENT" />}
      {(userRole === "director" ||
        userRole === "purchase_manager" ||
        userRole === "purchase_executive") && <AddAccountForm role="VENDOR" />}
      {userRole === "director" && (
        <Link
          href="/admin/routes/offers/post"
          className={`${buttonVariants({
            variant: "outline",
            size: "sm",
          })}`}
        >
          Add Routes <HiOutlinePlusCircle className="ml-2 h-5 w-5" />
        </Link>
      )}
      {userRole === "director" && (
        <Link
          href="/admin/routes/targets/post"
          className={`${buttonVariants({
            variant: "outline",
            size: "sm",
          })}`}
        >
          Add Targets <HiOutlinePlusCircle className="ml-2 h-5 w-5" />
        </Link>
      )}
    </div>
  );
}
