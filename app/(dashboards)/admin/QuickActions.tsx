import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import AddVendor from "./(accounts)/vendors/AddVendor";
import AddClient from "./(accounts)/clients/AddClient";
import AddAgent from "./(accounts)/agents/AddAgent";
import AddManager from "./(accounts)/managers/AddManager";

const QuickActions = () => {
    return (
        <section className="mb-5">
            <h2 className="font-semibold tracking-tight text-lg mb-3">
                Quick Actions
            </h2>
            <div className="flex gap-2 flex-wrap">
                <AddClient />
                <AddVendor />
                <AddAgent />
                {/* <AddManager /> */}
                <Link
                    href="/admin/routes/post"
                    className={`${buttonVariants({
                        variant: "secondary",
                    })}`}
                >
                    Add Routes
                </Link>
                <Link
                    href="/admin/targets/post"
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
