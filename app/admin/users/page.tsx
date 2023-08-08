import React from "react";
import { UsersTable } from "./users-table";
import UserManagementNav from "./nav";
import { supabaseAdmin } from "@/lib/supabase-admin";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { HiOutlinePlusCircle, HiPlusCircle } from "react-icons/hi";
import ReloadButton from "@/components/ReloadButton";

const page = async () => {
    const supabase = supabaseAdmin();
    const {
        data: { users },
        error,
    } = await supabase.auth.admin.listUsers();
    const usersList = users.map((user) => {
        const { id, created_at, updated_at, ...usersList } = user;
        return {
            ...usersList.user_metadata,
            id,
            created_at,
            updated_at,
        };
    });

    return <div>{usersList?.length && <UsersTable data={usersList} />}</div>;
};

export default page;
