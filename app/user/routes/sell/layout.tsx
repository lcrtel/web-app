import { Button, buttonVariants } from "@/components/ui/button";
import { supabaseServer } from "@/lib/supabase-server";
import { fetchUserData, fetchUserRole } from "@/utils/user";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { HiBan, HiOutlinePlusCircle } from "react-icons/hi";
import SellerApplication from "./seller-application";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await fetchUserData()

    const userRole = await fetchUserRole();
    return (
        <section>
            {userRole === "seller" ? (
                <>
                    <div className="flex mb-4 justify-between items-center">
                        <h3 className="text-lg  font-semibold text-primary-500">
                            Sell VoIP Routes
                        </h3>
                    </div>{" "}
                    {children}
                </>
            ) : (
                <div className="flex-1 border rounded-xl p-4">
                    <SellerApplication userID={user?.id} />
                </div>
            )}
        </section>
    );
}
