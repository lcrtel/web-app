import { supabaseAdmin } from "@/lib/supabase-admin";
import { UsersTable } from "../users/users-table";
import CreateNewSeller from "./CreateNewSeller";
export const revalidate = 0;
const page = async () => {
    const supabase = supabaseAdmin();

    const Sellers = async () => {
        const {
            data: { users },
            error,
        } = await supabase.auth.admin.listUsers();
        const sellers = users.filter(
            (obj) => obj.user_metadata.role === "seller"
        );
        const sellersList = sellers.map((seller) => {
            const {
                id,
                created_at,
                updated_at,
                last_sign_in_at,
                ...usersList
            } = seller;
            return {
                ...usersList.user_metadata,
                id,
                created_at,
                updated_at,
                last_sign_in_at,
            };
        });

        return (
            <div className="w-full xl:w-2/3">
                <h2 className="font-semibold text-lg mb-3">All Sellers</h2>
                {<UsersTable data={sellersList} />}
            </div>
        );
    };

    return (
        <div className=" ">
            <div className="mb-5 ">
                <div className="flex items-center mb-3 justify-between ">
                    <h2 className="text-2xl font-bold text-primary">Sellers</h2>
                    <CreateNewSeller />
                </div>
            </div>
            <div className="flex flex-col gap-3 xl:flex-row w-full overflow-x-auto">
                <Sellers />
            </div>
        </div>
    );
};

export default page;
