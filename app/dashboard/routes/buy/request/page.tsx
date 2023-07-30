import { AddRouteTable } from "./routes";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { HiArrowLeft } from "react-icons/hi";

const page = () => {
    return (
        <section className="">
            <div className="flex items-center gap-4 mb-4">
                <Link
                    href="/dashboard/routes/buy"
                    className={buttonVariants({ variant: "secondary" })}
                >
                    <HiArrowLeft className="mr-1.5" /> Back
                </Link>
                <h3 className="text-lg  font-semibold text-primary">
                    Post your buying targets!
                </h3>
            </div>
            <AddRouteTable />
        </section>
    );
};

export default page;
