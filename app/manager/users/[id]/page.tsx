import { Separator } from "@/components/ui/separator";
import { supabaseServer } from "@/lib/supabase-server";
import { ProfileForm } from "./userform";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { supabaseAdmin } from "@/lib/supabase-admin";

export default async function Page({ params }: { params: { id: string } }) {
    const supabase = supabaseServer();
    let { data: users, error } = await supabase
        .from("users")
        .select("*")
        .match({ id: params.id });
    const admin = supabaseAdmin();

    const { data } = await admin.auth.admin.getUserById(params.id);
    console.log(data);

    return (
        <div>
            <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-medium">Account</h3>
                    <p className="text-sm text-muted-foreground">
                        View and edit account details
                    </p>
                </div>
                <Separator />
                <ProfileForm defaultValues={users?.[0]} />
            </div>
        </div>
    );
}
