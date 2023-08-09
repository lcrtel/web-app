import { supabaseAdmin } from "@/lib/supabase-admin";
import { supabaseServer } from "@/lib/supabase-server";
import Link from "next/link";
import React from "react";

const Overview = async () => {
    const supabase = supabaseServer();
    const adminSupabase = supabaseAdmin();
    const ActiveListings = async () => {
        let { data: route_posts, error } = await supabase
            .from("route_posts")
            .select("status")
            .match({ status: "verified" });
        return (
            <div className="bg-primary-500 rounded-lg pt-1">
                <div className="rounded-md bg-surface px-5 py-4 shadow-sm border">
                    <h3 className="text-sm font-medium text-gray-400 tracking-tight">
                        Active Listings
                    </h3>
                    <p className="font-bold tracking-tight text-3xl ">
                        {route_posts?.length}
                    </p>
                </div>
            </div>
        );
    };
    const TotalUsers = async () => {
        const {
            data: { users },
            error,
        } = await adminSupabase.auth.admin.listUsers();
        return (
            <div className="bg-primary-500 rounded-lg pt-1">
                <div className="rounded-md bg-surface px-5 py-4 shadow-sm border">
                    <h3 className="text-sm font-medium text-gray-400 tracking-tight">
                        Total Users
                    </h3>
                    <p className="font-bold tracking-tight text-3xl ">
                        {users?.length}
                    </p>
                </div>
            </div>
        );
    };
    const TotalSellers = async () => {
        const {
            data: { users },
            error,
        } = await adminSupabase.auth.admin.listUsers();
        const sellers = users.filter(
            (obj) => obj.user_metadata.role === "seller"
        );
        return (
            <Link
                href="/admin/sellers"
                className="bg-primary-500 rounded-lg pt-1"
            >
                <div className="rounded-md bg-surface px-5 py-4 shadow-sm border">
                    <h3 className="text-sm font-medium text-gray-400 tracking-tight">
                        Total Sellers
                    </h3>
                    <p className="font-bold tracking-tight text-3xl ">
                        {sellers?.length}
                    </p>
                </div>
            </Link>
        );
    };
    const TotalManagers = async () => {
        const {
            data: { users },
            error,
        } = await adminSupabase.auth.admin.listUsers();
        const managers = users.filter(
            (obj) => obj.user_metadata.role === "manager"
        );
        return (
            <Link
                href="/admin/managers"
                className="bg-primary-500 rounded-lg pt-1"
            >
                <div className="rounded-md bg-surface px-5 py-4 shadow-sm border">
                    <h3 className="text-sm font-medium text-gray-400 tracking-tight">
                        Total Managers
                    </h3>
                    <p className="font-bold tracking-tight text-3xl ">
                        {managers?.length}
                    </p>
                </div>
            </Link>
        );
    };
    return (
        <section className="mb-5">
            <h2 className="font-semibold text-lg mb-3">Overview</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 gap-5 items-center">
                <ActiveListings />
                <div className="bg-primary-500 rounded-lg pt-1">
                    <div className="rounded-md bg-surface px-5 py-4 shadow-sm border">
                        <h3 className="text-sm font-medium text-gray-400 tracking-tight">
                            Total Sales
                        </h3>
                        <p className="font-bold tracking-tight text-3xl ">0</p>
                    </div>
                </div>
                <TotalUsers />
                <TotalSellers />
                <TotalManagers />
            </div>
        </section>
    );
};

export default Overview;
