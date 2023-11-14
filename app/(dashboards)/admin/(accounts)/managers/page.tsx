import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
import AddManager from "./AddManager";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const revalidate = 0;

const Managers = async () => {
    const supabase = await supabaseAdminServer();
    const {
        data: { users },
        error,
    } = await supabase.auth.admin.listUsers();

    const managers = users.filter(
        (obj) =>
            obj.user_metadata.role === "manager" 
    );
    const managersList = managers.map((agent) => {
        const { id, created_at, updated_at, last_sign_in_at, ...usersList } =
            agent;
        return {
            ...usersList.user_metadata,
            id,
            created_at,
            updated_at,
            last_sign_in_at,
        };
    });

    return (
        <>
            {" "}
            {/* <UsersTable data={managersList} /> */}
        </>
    );
};

export default async function Page() {
    return (
        <div className=" ">
            <div className="mb-5 ">
                <div className="flex items-center mb-3 justify-between ">
                    <h2 className="text-2xl font-bold text-primary">Managers</h2>
                    <AddManager />
                </div>
            </div>

            <div className="flex flex-col gap-3 xl:flex-row w-full overflow-x-auto">
                <Suspense fallback={<Loader />}>
                    <Managers />
                </Suspense>
            </div>
        </div>
    );
}

const Loader = () => {
    return (
        <div className="w-full">
            <div className="bg-surface border h-10 rounded-lg mb-4" />
            <div className="w-full border rounded-xl divide-y">
                <div className="bg-surface h-10 rounded-t-xl" />
                <div className="p-3">
                    <Skeleton className=" w-full h-6 rounded-md" />
                </div>
                <div className="p-3">
                    <Skeleton className=" w-full h-6 rounded-md" />
                </div>
                <div className="p-3">
                    <Skeleton className=" w-full h-6 rounded-md" />
                </div>
                <div className="p-3">
                    <Skeleton className=" w-full h-6 rounded-md" />
                </div>
                <div className="p-3">
                    <Skeleton className=" w-full h-6 rounded-md" />
                </div>
            </div>
        </div>
    );
};