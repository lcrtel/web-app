import { supabaseServer } from "@/lib/supabase-server";
import React, { use } from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { HiBan, HiCheckCircle } from "react-icons/hi";
import UserManagementNav from "../nav";
import { UsersTable } from "../users-table";
import { supabaseAdmin } from "@/lib/supabase-admin";

const page = async () => {
    const supabase = supabaseServer();
    const adminSupabase = supabaseAdmin();

    let { data: sellerApplications } = await supabase
        .from("seller_applications")
        .select("user_id")
        .match({ status: "pending" });
    if (!sellerApplications) {
        return null;
    }
    const userPromises = sellerApplications.map(async (application) => {
        const { data, error } = await adminSupabase.auth.admin.getUserById(
            application.user_id
        );
        return data;
    });
    const applicators = await Promise.all(userPromises);

    const PendingApplications = async () => {
        if (applicators?.length) {
            return applicators.map((applicator, index) => (
                <div
                    className="w-full bg-surface rounded-lg px-4 py-3 mb-4"
                    key={index}
                >
                    <p className="text-gray-500">
                        Applicant Name:{" "}
                        <span className="font-semibold text-primary-500">
                            {applicator.user?.user_metadata.first_name}
                        </span>
                    </p>
                    <p className="text-gray-500">
                        Applicant Email:{" "}
                        <span className="font-semibold text-primary-500">
                            {applicator.user?.user_metadata.email}
                        </span>
                    </p>
                    <Link
                        href={`/admin/users/${applicator.user?.id}`}
                        className={`${buttonVariants({
                            variant: "default",
                            size: "sm",
                        })} mt-4 cursor-pointer`}
                    >
                        View Details
                    </Link>
                </div>
            ));
        } else {
            return <p>No pending applications</p>;
        }
    };

    const Sellers = async () => {
        const {
            data: { users },
            error,
        } = await adminSupabase.auth.admin.listUsers();
        const sellers = users.filter(
            (obj) => obj.user_metadata.role === "seller"
        );
        const sellersList = sellers.map((seller) => {
            const { id, created_at, updated_at, ...usersList } = seller;
            return {
                ...usersList.user_metadata,
                id,
                created_at,
                updated_at,
            };
        });

        return (
            <div className="w-full xl:w-2/3">
                <h2 className="font-semibold text-lg mb-3">All Sellers</h2>
                {<UsersTable data={sellersList} />}
            </div>
        );
    };

    return (
        <div className=" ">
            <div className="flex flex-col gap-3 xl:flex-row w-full overflow-x-auto">
                <Sellers />
                <div className="w-full xl:w-1/3 xl:px-4">
                    <h2 className="font-semibold text-lg mb-3 mt-2">
                        Seller Applications
                    </h2>
                    <PendingApplications />
                </div>
            </div>
        </div>
    );
};

export default page;
