import { supabaseServer } from "@/lib/supabase-server";
import { fetchUserMetadata, fetchUserRole } from "@/utils/user";
import Link from "next/link";
import { redirect } from "next/navigation";
import Navigation from "./nav";

export const dynamic = "force-dynamic";
export const revalidate = 0; // revalidate at most every hour

export default async function DashboardLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode;
}) {
    const supabase = await supabaseServer();
    const {
        data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
        redirect("/auth/login");
    }
    const userData = await fetchUserMetadata();
    const userRole = await fetchUserRole();
    
    return (
        <section className="bg-white min-h-screen flex flex-col justify-between relative">
            <div>
                <Navigation userRole={userRole} user={userData} />
                <div className="h-2 background-animate bg-gradient-to-r from-secondary to-primary-500 w-full"></div>
                <section className="mx-auto max-w-8xl p-4 md:px-8 md:py-4">
                    {children}
                </section>
            </div>

            <footer className="w-full">
                <hr className="mt-5 border-gray-300 sm:mx-auto" />
                <div className="flex bg-white p-2 items-center justify-center">
                    <span className="text-xs text-gray-500 ">
                        © 2023 (1445 AH){" "}
                        <Link href="/" className="hover:underline">
                            LCRTelcom™
                        </Link>
                        . All Rights Reserved.
                    </span>
                </div>
            </footer>
        </section>
    );
}
