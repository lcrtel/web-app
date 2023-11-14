import { AccountForm } from "./AccountForm";
import { fetchUserData } from "@/utils/user";

export default async function Page() {
    const user = await fetchUserData();
    return (
        <>
            <h2 className=" font-bold text-xl tracking-tight mb-4">
                My Details
            </h2>
            <AccountForm user={user} />
        </>
    );
}
