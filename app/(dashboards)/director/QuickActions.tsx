import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { AddAccountForm } from "./users/_components/AddAccount";

export default function QuickActions() {
  return (
    <section>
      <h2 className="text-lg mb-2 font-semibold tracking-tight">
        Quick Actions
      </h2>
      <div className="flex flex-wrap gap-2">
        <AddAccountForm role="CLIENT" />
        <AddAccountForm role="VENDOR" />
        <Link
          href="/director/routes/post"
          className={`${buttonVariants({
            variant: "outline",
            size: "sm",
          })}`}
        >
          Add Routes
        </Link>
        <Link
          href="/director/routes/targets/post"
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
