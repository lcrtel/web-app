import { buttonVariants } from "@/components/ui/button";
import { supabaseServer } from "@/lib/supabase-server";
import { fetchUser } from "@/utils/user";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { HiBan, HiOutlinePlusCircle } from "react-icons/hi";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const userRole = await fetchUser();
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
                    <div className="flex p-10 flex-col gap-2 items-center justify-center">
                        <div className="bg-surface flex items-center justify-center p-2 rounded-full">
                            <HiBan className="w-10 h-10 rounded-full p-2 text-primary-500 bg-primary-50" />
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
        </section>
    );
}
