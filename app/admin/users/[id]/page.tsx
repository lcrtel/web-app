import { Separator } from "@/components/ui/separator";
import { supabaseAdmin } from "@/lib/supabase-admin";
import DeleteUser from "./DeleteUser";
import { ProfileForm } from "./userform";
export const revalidate = 0;
export default async function Page({ params }: { params: { id: string } }) {
    const supabase = supabaseAdmin();

    const {
        data: { user },
    } = await supabase.auth.admin.getUserById(params.id);

    return (
        <div>
            <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-medium">Account Settings</h3>
                    <p className="text-sm text-muted-foreground">
                        View and edit account details
                    </p>
                </div>
                <Separator />
                <ProfileForm user={user} />
                <div className="flex justify-between items-center border border-red-500 rounded-lg p-4 text-red-500">
                    <div>
                        <h3 className="font-semibold tracking-tight">
                            Delete this User
                        </h3>
                        <p className="text-sm">
                            Once deleted, it will be gone forever. Please be
                            certain.
                        </p>
                    </div>
                    <div className="p-2 bg-red-500 text-white rounded-lg">
                        <DeleteUser userID={params.id} />
                    </div>
                </div>
            </div>
        </div>
    );
}
