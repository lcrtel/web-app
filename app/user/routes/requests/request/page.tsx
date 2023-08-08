import { AddRouteTable } from "./routes";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { HiArrowLeft } from "react-icons/hi";

const page = () => {
    return (
        <section className="">
            <div className="flex items-center gap-4 mb-4">
                <Link
                    passHref
                    href="/user/routes/requests"
                    className={buttonVariants({
                        variant: "secondary",
                        size: "sm",
                    })}
                >
                    <HiArrowLeft className="mr-2" />
                    Requests
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
