// import { FetchUserRole } from "@/utils/user";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export const dynamic = "force-dynamic";

const page = async () => {
    const supabase = createServerComponentClient<Database>({ cookies });

    let { data: user, error } = await supabase
        .from("users")
        .select("first_name");

    return (
        <main className="flex min-h-screen flex-col">
            <div className="flex mb-4 justify-between items-center">
                <h3 className="text-lg  font-semibold text-primary">
                    Welcome, {user !== null ? user[0].first_name : ""}
                </h3>
            </div>
            <Link
                href="/dashboard/routes/buy"
                className="border border-primary-200 w-32  rounded-lg p-2 bg-surface"
            >
                Start Buying Routes
            </Link>
        </main>
    );
};

export default page;
