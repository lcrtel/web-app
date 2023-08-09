import Link from "next/link";
import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabase-server";
import { fetchUserRole, fetchUserMetadata } from "@/utils/user";
import AdminNav from "./admin-nav";

export const dynamic = "force-dynamic";
export const revalidate = 10; // revalidate at most every hour

export default async function DashboardLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode;
}) {
    const supabase = supabaseServer();
    const {
        data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
        redirect("/");
    }
    const userData = await fetchUserMetadata();
    const userRole = await fetchUserRole();
    if (userRole !== "admin") {
        redirect("/user");
    }

    return (
        <section className=" min-h-screen flex flex-col md:flex-row  ">
            <AdminNav userRole={userRole} user={userData} />
            <div className="h-screen w-full flex flex-col mt-[68px] md:mt-0 md:ml-64 md:py-5 bg-surface">
                <div className="px-5 md:px-6 py-5 bg-white md:rounded-l-xl h-full relative overflow-y-auto ">
                    {children}
                </div>
            </div>

            {/* <footer className="w-full">
                <hr className="mt-5 border-gray-300 sm:mx-auto" />
                <div className="flex bg-white p-5 items-center justify-center">
                    <span className="text-sm text-gray-500 ">
                        © 2023{" "}
                        <Link href="/" className="hover:underline">
                            LCRTelcom™
                        </Link>
                        . All Rights Reserved.
                    </span>
                </div>
            </footer> */}
        </section>
    );
}
