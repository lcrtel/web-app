import { rootPath } from "@/components/navigation/navConfig";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
import Link from "next/link";
import { Suspense } from "react";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { CreateInvoice } from "../finance/invoices/CreateInvoice";
import AddTRSheet from "../finance/tr-verification/AddTRSheet";
import { AddAccountForm } from "../users/_components/AddAccount";
import { CreateDepartmentExecutive } from "../departments/_components/CreateDepartmentExecutive";

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
      {userRole === "director" && <DirectorActions />}
      {userRole === "sales_manager" && <SalesManagerActions />}
      {userRole === "sales_executive" && <SalesExecutiveActions />}
      {userRole === "purchase_manager" && <PurchaseManagerActions />}
      {userRole === "purchase_executive" && <PurchaseExecutiveActions />}
      {(userRole === "finance_manager" || userRole === "finance_executive") && (
        <FinanceManagerActions userRole={userRole} />
      )}
    </div>
  );
}
const DirectorActions = () => (
  <>
    <AddAccountForm role="CLIENT" />
    <AddAccountForm role="VENDOR" />
    <Link
      href="/admin/routes/offers/post"
      className={`${buttonVariants({ variant: "outline", size: "sm" })}`}
    >
      Add Routes <HiOutlinePlusCircle className="ml-2 h-5 w-5" />
    </Link>
    <Link
      href="/admin/routes/targets/post"
      className={`${buttonVariants({ variant: "outline", size: "sm" })}`}
    >
      Add Targets <HiOutlinePlusCircle className="ml-2 h-5 w-5" />
    </Link>
  </>
);

const SalesManagerActions = () => (
  <>
    <AddAccountForm role="CLIENT" />
    <CreateDepartmentExecutive department="sales" />
    <Link
      href="/admin/routes/targets/post"
      className={`${buttonVariants({ variant: "outline", size: "sm" })}`}
    >
      Add Targets <HiOutlinePlusCircle className="ml-2 h-5 w-5" />
    </Link>
  </>
);

const SalesExecutiveActions = () => (
  <>
    <AddAccountForm role="CLIENT" />
    <Link
      href="/admin/routes/targets/post"
      className={`${buttonVariants({ variant: "outline", size: "sm" })}`}
    >
      Add Targets <HiOutlinePlusCircle className="ml-2 h-5 w-5" />
    </Link>
  </>
);

const PurchaseManagerActions = () => (
  <>
    <AddAccountForm role="VENDOR" />
    <CreateDepartmentExecutive department="purchases" />
    <Link
      href="/admin/routes/offers/post"
      className={`${buttonVariants({ variant: "outline", size: "sm" })}`}
    >
      Add Routes <HiOutlinePlusCircle className="ml-2 h-5 w-5" />
    </Link>
  </>
);

const PurchaseExecutiveActions = () => (
  <>
    <AddAccountForm role="VENDOR" />
    <Link
      href="/admin/routes/offers/post"
      className={`${buttonVariants({ variant: "outline", size: "sm" })}`}
    >
      Add Routes <HiOutlinePlusCircle className="ml-2 h-5 w-5" />
    </Link>
  </>
);

async function FinanceManagerActions({
  userRole,
}: {
  userRole: UserRolesEnum;
}) {
  const supabase = await supabaseAdminServer();
  let { data: users } = await supabase
    .from("profiles")
    .select("*, user_roles!inner(*)")
    .eq("user_roles.role_slug", "user");
  return (
    <>
      <CreateInvoice clients={users} />
      {users && <AddTRSheet users={users} />}
      {userRole === "finance_manager" && (
        <CreateDepartmentExecutive department="finance" />
      )}
      <Link
        href={rootPath + "/finance/rate-hikes"}
        className={`${buttonVariants({ variant: "outline", size: "sm" })}`}
      >
        Add default rate hikes
        <HiOutlinePlusCircle className="ml-2 h-5 w-5" />
      </Link>
    </>
  );
}
