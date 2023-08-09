import { Separator } from "@/components/ui/separator";
import { supabaseServer } from "@/lib/supabase-server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export default async function Page({ params }: { params: { id: string } }) {
    const supabase = supabaseServer();

    return (
        <div>
            <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-semibold">Route Details</h3>
                    <p className="text-sm text-muted-foreground">
                        View and edit route details
                    </p>
                </div>
                <Separator />
                <div className="flex justify-between items-center border border-red-500 rounded-lg p-4 text-red-500">
                    <div>
                        <h3 className="font-semibold tracking-tight">
                            Delete this Route
                        </h3>
                        <p className="text-sm">
                            Once deleted, it will be gone forever. Please be
                            certain.
                        </p>
                    </div>
                    <div className="p-2 bg-red-500 text-white rounded-lg">
                        {/* <DeleteUser userID={params.id} /> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
