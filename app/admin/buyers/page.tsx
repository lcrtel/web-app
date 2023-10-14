import { supabaseAdmin } from "@/lib/supabase-admin";
import { UsersTable } from "../users/users-table";
import CreateNewSeller from "./CreateNewBuyer";
export const revalidate = 0;
const page = async () => {
    const supabase = supabaseAdmin();

    const Buyers = async () => {
        const {
            data: { users },
            error,
        } = await supabase.auth.admin.listUsers();
        const sellers = users.filter(
            (obj) =>
                obj.user_metadata.role === "buyer" ||
                obj.user_metadata.role === "seller"
        );
        const sellersList = sellers.map((buyer) => {
            const {
                id,
                created_at,
                updated_at,
                last_sign_in_at,
                ...usersList
            } = buyer;
            return {
                ...usersList.user_metadata,
                id,
                created_at,
                updated_at,
                last_sign_in_at,
            };
        });

        return (
            <div className="w-full">
                <h2 className="font-semibold text-lg mb-3">All Buyers</h2>
                {<UsersTable data={sellersList} />}
            </div>
        );
    };

    return (
        <div className=" ">
            <div className="mb-5 ">
                <div className="flex items-center mb-3 justify-between ">
                    <h2 className="text-2xl font-bold text-primary">Buyers</h2>
                    <CreateNewSeller />
                </div>
            </div>
            <div className="flex flex-col gap-3 xl:flex-row w-full overflow-x-auto">
                <Buyers />
            </div>
        </div>
    );
};

export default page;
