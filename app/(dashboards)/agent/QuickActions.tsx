import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import AddVendor from "./(accounts)/vendors/AddVendor";
import AddClient from "./(accounts)/clients/AddClient";


const QuickActions = () => {
    return (
        <section className="mb-5">
            <h2 className="font-semibold tracking-tight text-lg mb-3">
                Quick Actions
            </h2>
            <div className="flex gap-2 flex-wrap">
                <AddClient />
                <AddVendor />
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
