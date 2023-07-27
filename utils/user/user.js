import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const supabase = createServerComponentClient({ cookies });

export const FetchUserRole = async () => {
    let { data: user } = await supabase.from("profiles").select("*");

    if (user && user.length > 0) {
        const userRoleId = user[0].role_id;
        let { data: role } = await supabase
            .from("roles")
            .select("name")
            .eq("id", userRoleId);
        return role[0].name;
    }

    return;
};

export const FetchUserData = async () => {
    let { data: user } = await supabase.from("profiles").select("*");

    return user;
};
