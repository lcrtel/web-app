import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { AddAccountForm } from "./users/_components/AddAccount";
import { HiOutlinePlusCircle } from "react-icons/hi";

export default function QuickActions() {
  return (
    <section>
      <h2 className="mb-2 text-lg font-semibold tracking-tight">
        Quick Actions
      </h2>
      <div className="flex flex-wrap gap-2">
        <AddAccountForm role="CLIENT" />
        <AddAccountForm role="VENDOR" />
        <Link
          href="/admin/routes/offers/post"
          className={`${buttonVariants({
            variant: "outline",
            size: "sm",
          })}`}
        >
          Add Routes <HiOutlinePlusCircle className="ml-2 h-5 w-5" />
        </Link>
        <Link
          href="/admin/routes/targets/post"
          className={`${buttonVariants({
            variant: "outline",
            size: "sm",
          })}`}
        >
          Add Targets <HiOutlinePlusCircle className="ml-2 h-5 w-5" />
        </Link>
      </div>
    </section>
  );
}
