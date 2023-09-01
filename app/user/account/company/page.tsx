import { CompanyForm } from "./CompanyForm";
import { fetchUserData } from "@/utils/user";

export default async function Page() {
    const user = await fetchUserData();
    return (
        <>
            <h2 className=" font-bold text-xl tracking-tight mb-4">
                Company Details
            </h2>
            <CompanyForm user={user} />
        </>
    );
}
