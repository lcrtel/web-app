import { fetchUserMetadata } from "@/utils/user";
import Link from "next/link";
import React from "react";
import { HiArrowCircleRight } from "react-icons/hi";

export const dynamic = "force-dynamic";

const page = async () => {
    const user = await fetchUserMetadata();

    return (
        <main className="flex min-h-screen flex-col">
            <div className="flex mb-5 mt-2 justify-between items-center">
                <h3 className="text-2xl  font-semibold text-primary">
                    Welcome, {user !== null ? user?.first_name : ""}
                </h3>
            </div>
            <div className="flex flex-col md:flex-row gap-5">
                <Link
                    href="/user/routes/sell/post"
                    className="px-5 py-4 bg-surface rounded-2xl justify-between flex gap-2 items-center"
                >
                    Post your route offers!
                    <HiArrowCircleRight className="h-6 w-6" />
                </Link>
                <Link
                    href="/user/routes/buy"
                    className="px-5 py-4 bg-surface rounded-2xl justify-between flex gap-2 items-center"
                >
                    Buy Routes
                    <HiArrowCircleRight className="h-6 w-6" />
                </Link>
            </div>
        </main>
    );
};

export default page;
