import { fetchUser } from "@/utils/user";
import { HiBan, HiOutlinePlusCircle, HiOutlineSearch } from "react-icons/hi";
import Link from "next/link";
import { Routes } from "./routes";
import { columns } from "./columns";
import { supabaseServer } from "@/lib/supabase-server";
import { buttonVariants } from "@/components/ui/button";

export default async function Page() {
    const supabase = supabaseServer();

    const {
        data: { session },
    } = await supabase.auth.getSession();

    const { data: routes } = await supabase.from("route_requests").select("*");

    return (
        <div className="">
            <div className="flex mb-4 justify-between items-center">
                <h3 className="text-lg  font-semibold text-primary-500">
                    Route Requests
                </h3>
            </div>
            {routes?.length ? (
                <Routes columns={columns} data={routes} />
            ) : (
                <div className="flex-1 border rounded-xl p-4">
                    <div className="flex p-10 flex-col gap-2 items-center justify-center">
                        <div className="bg-primary-100 flex items-center justify-center p-2 rounded-full">
                            <HiOutlineSearch className="w-10 h-10 rounded-full p-2 text-primary-500 bg-primary-50" />
                        </div>
                        <p className="text-gray-500 max-w-lg text-center">
                            It looks like there are no buying targets listed
                            yet.
                        </p>
                        <Link
                            passHref
                            href="/dashboard/routes/requests/request"
                            className={buttonVariants({
                                variant: "default",
                                size: "sm",
                            })}
                        >
                            <HiOutlinePlusCircle className="mr-2 h-5 w-5" />
                            Post your buying target
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
