import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { AddAccountForm } from "../director/users/_components/AddAccount";

export default function QuickActions() {
  return (
    <section>
      <h2 className="mb-2 text-lg font-semibold tracking-tight">
        Quick Actions
      </h2>
      <div className="flex flex-wrap gap-2">
        <AddAccountForm role="CLIENT" />
        <Link
          href="/sales_executive/targets"
          className={`${buttonVariants({
            variant: "outline",
            size: "sm",
          })}`}
        >
          Add Targets
        </Link>
      </div>
    </section>
  );
}
