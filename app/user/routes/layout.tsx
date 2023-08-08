import Navigation from "./nav";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import TradeNav from "./nav";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode;
}) {
    const supabase = createServerComponentClient<Database>({ cookies });
    const {
        data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
        redirect("/auth/login");
    }

    return (
        <section>
            <div className="mb-8 pt-5 md:pt-10">
                <h2 className="text-2xl font-bold text-primary">
                    Trade Routes
                </h2>
                <p className="mb-5 text-base text-gray-500">
                    Explore and Trade VoIP Routes in the Global Marketplace
                </p>
                <TradeNav />
            </div>
            <main>{children}</main>
        </section>
    );
}