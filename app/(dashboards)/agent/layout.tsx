import { supabaseServer } from "@/lib/supabase-server";
import { fetchUserMetadata, fetchUserRole } from "@/utils/user";
import AgentNav from "./AgentNav";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
export const revalidate = 0; // revalidate at most every hour

export default async function DashboardLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode;
}) {
    const userData = await fetchUserMetadata();
    const userRole = await fetchUserRole();
    if (userRole !== "agent") {
        redirect("/");
    }
    return (
        <section className="w-full h-screen overflow-hidden relative ">
            <AgentNav userRole={userRole} user={userData} />
            <div className="flex h-screen mt-[68px] md:mt-0 md:ml-64 md:py-5 bg-surface overflow-y-auto">
                <div className="flex-1 px-5 md:px-6 py-5 bg-white md:rounded-l-xl relative overflow-y-auto">
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
