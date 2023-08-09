import { AddRouteTable } from "./AddRoutes";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { HiArrowLeft } from "react-icons/hi";

const page = () => {
    return (
        <section className="">
            <div className="flex items-center gap-4 mb-4">
                <Link
                    href="/admin/routes"
                    className={buttonVariants({ variant: "secondary" })}
                >
                    <HiArrowLeft className="mr-1.5" /> Back
                </Link>
                <h3 className="text-lg  font-semibold text-primary">
                    Post route offers!
                </h3>
            </div>
            <AddRouteTable />
        </section>
    );
};

export default page;
