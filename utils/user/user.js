import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";


export const FetchUserRole = async () => {
    const supabase = createServerComponentClient({ cookies });
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
    const supabase = createServerComponentClient({ cookies });
    let { data: user } = await supabase.from("profiles").select("*");

    return user;
};
