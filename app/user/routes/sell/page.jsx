import { fetchUserRole } from "@/utils/user";
import { HiBan, HiOutlinePlusCircle, HiOutlineSearch } from "react-icons/hi";
import Link from "next/link";
import { Routes } from "./routes";
import { columns } from "./columns";
import { supabaseServer } from "@/lib/supabase-server";

export default async function Page() {
    const supabase = supabaseServer();

    const {
        data: { session },
    } = await supabase.auth.getSession();

    const { data: routes } = await supabase
        .from("route_posts")
        .select("*")
        .match({ seller_id: session.user.id });
    return (
        <div className="">
            {routes?.length ? (
                <Routes columns={columns} data={routes} />
            ) : (
                <div className="flex-1 border rounded-xl p-4">
                    <div className="flex p-10 flex-col gap-2 items-center justify-center">
                        <div className="bg-primary-100 flex items-center justify-center p-2 rounded-full">
                            <HiOutlineSearch className="w-10 h-10 rounded-full p-2 text-primary-500 bg-primary-50" />
                        </div>
                        <p className="text-gray-500 max-w-lg text-center">
                            It looks like you don&apos;t have any routes listed
                            yet.
                        </p>
                        <Link
                            passHref
                            href="/user/routes/sell/post"
                            className="flex mt-2 items-center justify-center rounded-xl bg-primary-500 px-3 gap-2 py-2 text-sm font-medium text-white "
                        >
                            <HiOutlinePlusCircle className=" h-5 w-5" />
                            Post Routes
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
