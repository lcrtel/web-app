import { FetchUserRole } from "@/utils/user/user";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
    const supabase = createServerComponentClient<Database>({ cookies });
    const {
        data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
        redirect("/");
    }
    const user = await FetchUserRole();

    return (
        <div>
            <form action="/auth/signout" method="post">
                <button className="button block" type="submit">
                    Sign out
                </button>
            </form>
        </div>
    );
};

export default page;
