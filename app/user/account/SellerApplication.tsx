"use client";
import { Button } from "@/components/ui/button";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { supabaseClient } from "@/lib/supabase-client";
import { useRouter } from "next/navigation";

const SellerApplication = ({ userID }: { userID: string }) => {
    const supabase = supabaseClient();
    const adminSupabase = supabaseAdmin();
    const router = useRouter();
    async function handleApplication() {
        const { data, error } = await supabase
            .from("seller_applications")
            .update({ status: "approved" })
            .eq("user_id", userID);
        console.log(error?.message);
        console.log(data);
        const { data: user } = await adminSupabase.auth.admin.updateUserById(
            userID,
            {
                user_metadata: { role: "seller" },
            }
        );
        router.refresh();
    }
    return (
        <Button
            variant="default"
            size="sm"
            onClick={(e) => handleApplication()}
        >
            Approve
        </Button>
    );
};

export default SellerApplication;
