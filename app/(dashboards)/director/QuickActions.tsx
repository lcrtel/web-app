import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { AddAccountForm } from "./users/_components/AddAccount";

const QuickActions = () => {
    return (
        <section className="mb-5">
            <h2 className="font-semibold tracking-tight text-lg mb-3">
                Quick Actions
            </h2>
            <div className="flex gap-2 flex-wrap">
                <AddAccountForm role="CLIENT" />
                <AddAccountForm role="VENDOR" />
                <Link
                    href="/director/routes/post"
                    className={`${buttonVariants({
                        variant: "secondary",
                    })}`}
                >
                    Add Routes
                </Link>
                <Link
                    href="/director/routes/targets/post"
                    className={`${buttonVariants({
                        variant: "outline",
                    })}`}
                >
                    Add Route Requests
                </Link>
            </div>
        </section>
    );
};

export default QuickActions;
