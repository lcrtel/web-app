import { supabaseServer } from "@/lib/supabase-server";
import React, { use } from "react";
import { UsersTable } from "../../../dashboard/admin/users/users-table";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { HiBan, HiCheckCircle } from "react-icons/hi";
import UserManagementNav from "../../../dashboard/admin/users/nav";

const page = async () => {
    const supabase = supabaseServer();
    

    const PendingApplications = async () => {
        let { data: userApplications } = await supabase
            .from("seller_applications")
            .select(`user_id, users (*, id)`);
        console.log(userApplications);

        return userApplications?.map((application, index) => (
            <div
                className="w-full bg-surface rounded-lg px-4 py-3 mb-4"
                key={index}
            >
                <p className="text-gray-500">
                    Name:{" "}
                    <span className="font-semibold text-primary-500">
                        {application.users?.first_name}
                    </span>
                </p>
                <p className="text-gray-500">
                    Email:{" "}
                    <span className="font-semibold text-primary-500">
                        {application.users?.email}
                    </span>
                </p>
                <Link
                    href={`/admin/users/${application.users?.id}`}
                    className={`${buttonVariants({
                        variant: "default",
                        size: "sm",
                    })} mt-4 cursor-pointer`}
                >
                    View Details
                </Link>
            </div>
        ));
    };
    return (
        <div className=" ">
            <div className="mb-8 pt-5 md:pt-10">
                <h2 className="text-2xl mb-3 font-bold text-primary">
                    User Management
                </h2>
                <UserManagementNav />
            </div>
            <div className="w-2/3">
                {users?.length && <UsersTable data={users} />}
            </div>
            <div className="w-1/3 px-4">
                <h2 className="font-bold text-lg mb-5 mt-2">
                    Seller Applacations
                </h2>
                <h3 className="text-gray-400 mb-2">Pending</h3>

                <PendingApplications />
                <h3 className="text-gray-400 mb-2">Completed</h3>
                <div className="w-full bg-surface rounded-lg px-4 py-3">
                    <p className="text-gray-500">
                        Name:{" "}
                        <span className="font-semibold text-primary-500">
                            Mymoon
                        </span>
                    </p>
                    <p className="text-gray-500">
                        Email:{" "}
                        <span className="font-semibold text-primary-500">
                            pkmymoonpk@gmail.com
                        </span>
                    </p>
                    <div className="flex justify-between">
                        <Link
                            href={``}
                            className={`${buttonVariants({
                                variant: "default",
                                size: "sm",
                            })} mt-4 cursor-pointer`}
                        >
                            View Details
                        </Link>
                        <div className="flex gap-2">
                            <Link
                                href={``}
                                className={`${buttonVariants({
                                    variant: "destructive",
                                    size: "icon",
                                })} mt-4 cursor-pointer opacity-20`}
                            >
                                {/* Decline */}
                                <HiBan className="w-5 h-5" />
                            </Link>
                            <Link
                                href={``}
                                className={`${buttonVariants({
                                    variant: "default",
                                    size: "icon",
                                })} mt-4 cursor-pointer opacity-20`}
                            >
                                {/* Approve */}
                                <HiCheckCircle className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;
