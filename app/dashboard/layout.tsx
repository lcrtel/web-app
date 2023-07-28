import { fetchUserData } from "@/utils/user";
import Navigation from "./nav";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode;
}) {
    const supabase = supabaseServer();

    let { data: user, error } = await supabase.from("users").select("*");

    const {
        data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
        redirect("/");
    }

    return (
        <section className="bg-white min-h-screen flex flex-col justify-between relative">
            {/* Include shared UI here e.g. a header or sidebar */}
            <div>
                <Navigation user={user} />
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
