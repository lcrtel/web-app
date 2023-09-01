"use server";

import { fetchUserData } from "@/utils/user";

export default async function fetchUser() {
    const user = await fetchUserData();
    return user;
}
