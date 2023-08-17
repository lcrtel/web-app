import Navigation from "./nav";
import Link from "next/link";
import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabase-server";
import { fetchUserRole, fetchUserMetadata } from "@/utils/user";
import LoginModal from "./LoginModal";

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
        redirect("/auth/login");
    }
    const userData = await fetchUserMetadata();
    const userRole = await fetchUserRole();
    if (userRole === "admin") {
        redirect("/admin");
    } else if (userRole === "manager") {
        redirect("/manager");
    }
    return (
        <section className="bg-white min-h-screen flex flex-col justify-between relative">
            {!session && <LoginModal session={session} />}
            <div>
                <Navigation userRole={userRole} user={userData} />
                <div className="h-2 background-animate bg-gradient-to-r from-secondary to-primary-500 w-full"></div>
                <section className="mx-auto max-w-8xl px-8 py-5">
                    {children}
                </section>
            </div>

            <footer className="w-full">
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
            </footer>
        </section>
    );
}
