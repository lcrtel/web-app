import Navigation from "./nav";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import TradeNav from "./nav";
import UserManagementNav from "./nav";
import { buttonVariants } from "@/components/ui/button";
import { HiOutlinePlusCircle } from "react-icons/hi";
import CreateNewUser from "./CreateNewUser";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode;
}) {
    return (
        <section>
            <div className="mb-5 ">
                <div className="flex items-center mb-3 justify-between ">
                    <h2 className="text-2xl font-bold text-primary">Users</h2>
                    <div>
                        {/* <Link
                            href="/admin/users/new"
                            className={`${buttonVariants({
                                variant: "default",
                            })}`}
                        >
                            <HiOutlinePlusCircle className="mr-1.5 w-4 h-4" />
                            Add user
                        </Link> */}
                        <CreateNewUser />
                    </div>
                </div>
                <UserManagementNav />
            </div>
            <main>{children}</main>
        </section>
    );
}
