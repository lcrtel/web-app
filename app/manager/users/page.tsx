import React from "react";
import { UsersTable } from "./users-table";
import UserManagementNav from "./nav";
import { supabaseServer } from "@/lib/supabase-server";

const page = async () => {
    const supabase = supabaseServer();
    let { data: users, error } = await supabase.from("users").select("*");
    return (
        <div>
            <div className="mb-8 pt-5 md:pt-10">
                <h2 className="text-2xl mb-3 font-bold text-primary">
                    User Management
                </h2>
                <UserManagementNav />
            </div>
            {users?.length && <UsersTable data={users} />}
            <p>
                View and manage user accounts. Assign roles and permissions to
                users (e.g., admin, seller, buyer). Search, filter, and sort
                users based on different criteria. Disable or delete user
                accounts if necessary.
            </p>
            <h1>Application Management:</h1>
            <p>
                Handle user applications to become sellers. Review and
                approve/reject applications. Change user roles based on
                application status.
            </p>
        </div>
    );
};

export default page;
