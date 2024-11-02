import { CreateDepartmentExecutive } from "@/components/departments/CreateDepartmentExecutive";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Suspense } from "react";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { AddAccountForm } from "./users/_components/AddAccount";

export default function QuickActions({
  userRole,
}: {
  userRole: UserRolesEnum;
}) {
  return (
    <section>
      <h2 className="mb-2 text-lg font-semibold tracking-tight">
        Quick Actions
      </h2>
      <Suspense fallback={<Skeleton />}>
        <Actions userRole={userRole} />
      </Suspense>
    </section>
  );
}
async function Actions({ userRole }: { userRole: UserRolesEnum }) {
  return (
    <div className="flex flex-wrap gap-2">
      {(userRole === "director" ||
        userRole === "sales_manager" ||
        userRole === "sales_executive") && <AddAccountForm role="CLIENT" />}
      {(userRole === "director" ||
        userRole === "purchase_manager" ||
        userRole === "purchase_executive") && <AddAccountForm role="VENDOR" />}

      {userRole === "purchase_manager" && (
        <CreateDepartmentExecutive department="purchases" />
      )}
      {userRole === "sales_manager" && (
        <CreateDepartmentExecutive department="sales" />
      )}

      {(userRole === "director" ||
        userRole === "purchase_manager" ||
        userRole === "purchase_executive") && (
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
      {(userRole === "director" ||
        userRole === "sales_executive" ||
        userRole === "sales_manager") && (
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
