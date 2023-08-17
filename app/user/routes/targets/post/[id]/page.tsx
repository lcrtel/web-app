import { Separator } from "@/components/ui/separator";
import { supabaseServer } from "@/lib/supabase-server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { revalidatePath } from "next/cache";
import { RouteForm } from "./route-form";
import DeleteRoute from "../../DeleteRoute";
import { redirect } from "next/navigation";
// import DeleteUser from "./DeleteUser";

export default async function Page({ params }: { params: { id: string } }) {
    const supabase = supabaseServer();
    let { data: route } = await supabase
        .from("buying_targets")
        .select("*")
        .match({ id: params.id });
    if (route === null) {
        redirect("/user/routes/targets");
    }

    return (
        <div>
            <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-semibold">Route Settings</h3>
                    <p className="text-sm text-muted-foreground">
                        View and edit your route offer details
                    </p>
                </div>
                <Separator />
                {route?.length ? <RouteForm route={route?.[0]} /> : null}

                <div className="flex justify-between items-center border border-red-500 rounded-lg p-4 text-red-500">
                    <div>
                        <h3 className="font-semibold tracking-tight">
                            Delete offer
                        </h3>
                        <p className="text-sm">
                            Once deleted, it will be gone forever. Please be
                            certain.
                        </p>
                    </div>
                    <div className="p-2 bg-red-500 text-white rounded-lg">
                        <DeleteRoute routeID={params.id} />
                    </div>
                </div>
            </div>
        </div>
    );
}
