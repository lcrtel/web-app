import React from "react";
import { UsersTable } from "./users-table";
import { supabaseAdmin } from "@/lib/supabase-admin";
import CreateNewUser from "./CreateNewUser";

const page = async () => {
    const supabase = supabaseAdmin();
    const {
        data: { users },
        error,
    } = await supabase.auth.admin.listUsers();
    const usersList = users.map((user) => {
        const { id, created_at, updated_at, last_sign_in_at, ...usersList } =
            user;
        return {
            ...usersList.user_metadata,
            id,
            created_at,
            updated_at,
            last_sign_in_at,
        };
    });

    return (
        <div>
            <div className="mb-5 ">
                <div className="flex items-center mb-3 justify-between ">
                    <h2 className="text-2xl font-bold text-primary">Users</h2>
                    <CreateNewUser />
                </div>
            </div>

            {usersList?.length && <UsersTable data={usersList} />}
        </div>
    );
};

export default page;
