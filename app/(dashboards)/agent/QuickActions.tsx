import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { AddAccountForm } from "../admin/(accounts)/_components/AddAccount";

const QuickActions = () => {
    return (
        <section className="mb-5">
            <h2 className="font-semibold tracking-tight text-lg mb-3">
                Quick Actions
            </h2>
            <div className="flex gap-2 flex-wrap">
                <AddAccountForm role="client" type="agent" />
                <AddAccountForm role="vendor" type="agent" />
                <Link
                    href="/agent/routes/post"
                    className={`${buttonVariants({
                        variant: "secondary",
                    })}`}
                >
                    Add Routes
                </Link>
                <Link
                    href="/agent/requests/post"
                    className={`${buttonVariants({
                        variant: "outline",
                    })}`}
                >
                    Add Targets
                </Link>
            </div>
        </section>
    );
};

export default QuickActions;
