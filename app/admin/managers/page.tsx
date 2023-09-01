import React, { use } from "react";
import { UsersTable } from "./users-table";
import { supabaseAdmin } from "@/lib/supabase-admin";
import CreateNewManager from "./CreateNewManager";

const page = async () => {
    const supabase = supabaseAdmin();

    const Managers = async () => {
        const {
            data: { users },
            error,
        } = await supabase.auth.admin.listUsers();
        const managers = users.filter(
            (obj) => obj.user_metadata.role === "manager"
        );
        const managersList = managers.map((manager) => {
            const { id, created_at, updated_at, ...usersList } = manager;
            return {
                ...usersList.user_metadata,
                id,
                created_at,
                updated_at,
            };
        });

        return (
            <div className="w-full xl:w-2/3">
                <h2 className="font-semibold text-lg mb-3 mt-2">
                    All Managers
                </h2>
                <UsersTable data={managersList} />
            </div>
        );
    };

    return (
        <div className=" ">
            <div className="mb-5 ">
                <div className="flex items-center mb-3 justify-between ">
                    <h2 className="text-2xl font-bold text-primary">
                        Managers
                    </h2>
                    <CreateNewManager />
                </div>
            </div>
            <div className="flex flex-col gap-3 xl:flex-row w-full overflow-x-auto">
                <Managers />
                <div className="w-full xl:w-1/3 px-4"></div>
            </div>
        </div>
    );
};

export default page;
