import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { fetchUser } from "@/utils/user";
import { HiBan, HiOutlinePlusCircle, HiOutlineSearch } from "react-icons/hi";
import Link from "next/link";
import { Routes } from "./routes";
import { columns } from "./columns";
import { buttonVariants } from "@/components/ui/button";

// async function getData() {}

export default async function Page() {
    const supabase = createServerComponentClient({ cookies });
    const userRole = await fetchUser();

    const {
        data: { session },
    } = await supabase.auth.getSession();

    const { data: routes } = await supabase
        .from("route_posts")
        .select("*")
        .match({ seller_id: session.user.id });
    return (
        <div className="">
            {userRole === "seller" ? (
                <>
                    <div className="flex mb-4 justify-between items-center">
                        <h3 className="text-lg  font-semibold text-primary-500">
                            Sell VoIP Routes
                        </h3>
                        {routes?.length ? (
                            <Link
                                passHref
                                href="/dashboard/routes/sell/add"
                                className={buttonVariants({
                                    variant: "default",
                                    size: "sm",
                                })}
                            >
                                <HiOutlinePlusCircle className="mr-2 h-5 w-5" />
                                Add Routes
                            </Link>
                        ) : null}
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
                                    It looks like you don&apos;t have any routes
                                    listed yet.
                                </p>
                                <Link
                                    passHref
                                    href="/dashboard/routes/sell/add"
                                    className="flex mt-2 items-center justify-center rounded-xl bg-primary-500 px-3 gap-2 py-2 text-sm font-medium text-white "
                                >
                                    <HiOutlinePlusCircle className=" h-5 w-5" />
                                    Add Routes
                                </Link>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <div className="flex-1 border rounded-xl p-4">
                    <div className="flex p-10 flex-col gap-2 items-center justify-center">
                        <div className="bg-primary-500 bg-opacity-5 flex items-center justify-center p-2 rounded-full">
                            <HiBan className="w-10 h-10 rounded-full p-2 text-primary-500 bg-primary-500 bg-opacity-10" />
                        </div>
                        <h2 className="text-primary-500 text-lg font-semibold">
                            Apply to become a seller
                        </h2>
                        <p className="text-gray-500 max-w-lg text-center">
                            It looks like you don&apos;t the previliage to sell
                            routes.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
