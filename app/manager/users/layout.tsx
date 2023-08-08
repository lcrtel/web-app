import Navigation from "./nav";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import TradeNav from "./nav";
import UserManagementNav from "./nav";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode;
}) {
    return (
        <section>
            <main>{children}</main>
        </section>
    );
}
