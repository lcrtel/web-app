import { Separator } from "@/components/ui/separator";
import { supabaseServer } from "@/lib/supabase-server";
import { ProfileForm } from "./userform";
import { supabaseAdmin } from "@/lib/supabase-admin";
import SellerApplication from "./SellerApplication";
import { revalidatePath } from "next/cache";
import DeleteUser from "./DeleteUser";

export default async function Page({ params }: { params: { id: string } }) {
    const supabase = supabaseServer();
    const adminSupabase = supabaseAdmin();

    const {
        data: { user },
    } = await adminSupabase.auth.admin.getUserById(params.id);

    const Application = async () => {
        let { data: application } = await supabase
            .from("seller_applications")
            .select("*")
            .match({ user_id: params.id });
        if (application?.[0]?.status === "pending") {
            return (
                <div className="flex gap-2 items-center justify-between p-2 bg-surface rounded-lg">
                    <p className="ml-2">
                        This user has applied to become a seller
                    </p>
                    <SellerApplication userID={params.id} />
                </div>
            );
        }
    };

    return (
        <div>
            <div className="space-y-6">
                <Application />
                <div>
                    <h3 className="text-lg font-medium">Account Settings</h3>
                    <p className="text-sm text-muted-foreground">
                        View and edit account details
                    </p>
                </div>
                <Separator />
                <ProfileForm user={user} />
                <DeleteUser />
            </div>
        </div>
    );
}
